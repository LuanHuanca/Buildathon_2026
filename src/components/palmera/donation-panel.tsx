// Palmera-specific. Donation flow: native USDC transfer on Avalanche C-Chain.
// Replaces the previous Pollar (fiat onramp) stub — see .claude/decisions.md ADR-009.

"use client";

import { Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { erc20Abi, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useConnect,
  usePublicClient,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DONATION_CHAIN_ID,
  donationChain,
  networkName,
  txUrl,
  USDC_ADDRESSES,
} from "~/lib/chains";
import { formatUsdc } from "~/lib/format";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];
const USDC_DECIMALS = 6;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export interface RecentDonation {
  id: string;
  walletAddress: string;
  amountUsdc: number;
  createdAt: Date | string;
}

function shortAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function DonationPanel({
  communityId,
  communityName,
  treasuryAddress,
  recentDonations = [],
}: {
  communityId: string;
  communityName: string;
  treasuryAddress: string;
  recentDonations?: RecentDonation[];
}) {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();
  const publicClient = usePublicClient({ chainId: DONATION_CHAIN_ID });

  const [selected, setSelected] = useState<number>(10);
  const [custom, setCustom] = useState<string>("");

  const amount = custom.trim() ? Number(custom) : selected;
  const amountValid = Number.isFinite(amount) && amount > 0;
  const treasuryReady =
    /^0x[a-fA-F0-9]{40}$/.test(treasuryAddress) &&
    treasuryAddress.toLowerCase() !== ZERO_ADDRESS;
  const usdcAddress =
    USDC_ADDRESSES[DONATION_CHAIN_ID] ?? USDC_ADDRESSES[donationChain.id]!;

  const createDonation = api.donation.create.useMutation({
    onSuccess: () => {
      toast.success("Donación registrada on-chain");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const busy = isWriting || createDonation.isPending;

  const handleDonate = async () => {
    if (!isConnected || !address) {
      const connector = connectors[0];
      if (connector) connect({ connector });
      return;
    }

    if (!treasuryReady || !amountValid) return;

    try {
      if (chainId !== DONATION_CHAIN_ID) {
        await switchChainAsync({ chainId: DONATION_CHAIN_ID });
      }

      const hash = await writeContractAsync({
        chainId: DONATION_CHAIN_ID,
        address: usdcAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          treasuryAddress as `0x${string}`,
          parseUnits(String(amount), USDC_DECIMALS),
        ],
      });

      await publicClient?.waitForTransactionReceipt({ hash });
      await createDonation.mutateAsync({
        communityId,
        walletAddress: address,
        amountUsdc: amount,
        txHash: hash,
      });
    } catch {
      toast.error("Transacción cancelada o fallida");
    }
  };

  const ctaLabel = !isConnected
    ? "Conectar wallet"
    : !treasuryReady
      ? "Tesorería no configurada"
      : `Donar ${formatUsdc(amount)} USDC`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
          Apoyar a {communityName}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelected(value);
                setCustom("");
              }}
              className={cn(
                "rounded-lg border py-2.5 font-mono text-sm font-semibold transition-all active:scale-95",
                !custom.trim() && selected === value
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "border-border/40 bg-surface-container text-muted-foreground hover:bg-surface-container-high hover:text-foreground",
              )}
            >
              ${value}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
          Otro monto (USDC)
        </label>
        <Input
          type="number"
          min={1}
          value={custom}
          placeholder="Ej. 100"
          onChange={(e) => setCustom(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        size="lg"
        disabled={
          busy ||
          (!isConnected && !amountValid) ||
          (isConnected && !treasuryReady)
        }
        data-community-id={communityId}
        onClick={handleDonate}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wallet className="h-4 w-4" />
        )}
        {ctaLabel}
      </Button>

      <p className="text-muted-foreground text-center text-xs leading-relaxed">
        La membresía y la donación son actos separados. Esta donación usa{" "}
        {networkName(donationChain.id)}.
      </p>

      {createDonation.data?.txHash ? (
        <a
          href={txUrl(createDonation.data.txHash)}
          target="_blank"
          rel="noreferrer"
          className="text-primary block text-center text-xs font-semibold underline"
        >
          Ver transacción en el explorador ↗
        </a>
      ) : null}

      <div className="border-border/40 border-t pt-4">
        <p className="text-muted-foreground mb-3 font-mono text-[11px] tracking-widest uppercase">
          Últimas donaciones
        </p>
        {recentDonations.length === 0 ? (
          <p className="text-muted-foreground text-sm">Sin donaciones aún.</p>
        ) : (
          <ul className="space-y-2.5">
            {recentDonations.map((donation) => (
              <li
                key={donation.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground font-mono text-xs">
                  {shortAddress(donation.walletAddress)}
                </span>
                <span className="text-primary font-mono text-xs font-semibold">
                  {formatUsdc(donation.amountUsdc)} USDC
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
