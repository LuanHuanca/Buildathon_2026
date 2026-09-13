// Palmera-specific. Donation flow: native USDC transfer on Avalanche C-Chain.
// Replaces the previous Pollar (fiat onramp) stub — see .claude/decisions.md ADR-009.

"use client";

import { Lock, Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { erc20Abi, parseUnits } from "viem";
import {
  useAccount,
  useConnect,
  useWriteContract,
} from "wagmi";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  TREASURY_ADDRESS,
  USDC_ADDRESS,
  USDC_DECIMALS,
} from "~/components/web3/constants";
import { formatUsdc } from "~/lib/format";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const PRESET_AMOUNTS = [5, 10, 25, 50];

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
  recentDonations = [],
}: {
  communityId: string;
  communityName: string;
  recentDonations?: RecentDonation[];
}) {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const [selected, setSelected] = useState<number>(10);
  const [custom, setCustom] = useState<string>("");

  const amount = custom.trim() ? Number(custom) : selected;
  const amountValid = Number.isFinite(amount) && amount > 0;
  const treasuryReady = TREASURY_ADDRESS.length > 0;

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
      const hash = await writeContractAsync({
        address: USDC_ADDRESS as `0x${string}`,
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          TREASURY_ADDRESS as `0x${string}`,
          parseUnits(String(amount), USDC_DECIMALS),
        ],
      });

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
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Apoyar a {communityName}
        </p>
        <div className="grid grid-cols-4 gap-2">
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
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border/40 bg-surface-container text-muted-foreground hover:bg-surface-container-high hover:text-foreground",
              )}
            >
              ${value}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
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
        disabled={busy || (!isConnected && !amountValid) || (isConnected && !treasuryReady)}
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

      <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Lock className="h-3 w-3 text-primary" />
        Avalanche C-Chain · USDC nativo
      </div>

      <div className="border-t border-border/40 pt-4">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Últimas donaciones
        </p>
        {recentDonations.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin donaciones aún.</p>
        ) : (
          <ul className="space-y-2.5">
            {recentDonations.map((donation) => (
              <li
                key={donation.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {shortAddress(donation.walletAddress)}
                </span>
                <span className="font-mono text-xs font-semibold text-primary">
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
