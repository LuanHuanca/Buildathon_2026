"use client";

import { Check, Copy, ExternalLink, Wallet } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

import { WalletButton } from "~/components/web3/wallet-button";
import { txUrl } from "~/lib/chains";
import { formatUsdc } from "~/lib/format";
import { api } from "~/trpc/react";

export interface ProfileUser {
  name: string;
  email: string;
  createdAt: Date | string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function shortAddress(address: string): string {
  if (address.length <= 14) return address;
  return `${address.slice(0, 8)}…${address.slice(-4)}`;
}

function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ProfileView({ user }: { user: ProfileUser }) {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);

  const { data: donations } = api.donation.getByWallet.useQuery(
    { walletAddress: address ?? "" },
    { enabled: !!address },
  );

  const total = donations?.reduce((sum, d) => sum + d.amountUsdc, 0) ?? 0;
  const projectCount = donations
    ? new Set(donations.map((d) => d.community.slug)).size
    : 0;

  async function copyWallet() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {/* Identity card */}
      <div className="border-border/40 bg-surface-container-low relative overflow-hidden rounded-xl border p-5">
        <span className="bg-primary/10 absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="from-primary via-primary to-secondary flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr p-0.5 shadow-[0_0_15px_rgba(229,142,38,0.28)]">
            <span className="bg-surface-container-lowest font-display text-primary flex h-full w-full items-center justify-center rounded-full text-xl font-bold">
              {initials(user.name)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-foreground truncate text-xl font-bold">
              {user.name}
            </h1>
            <p className="text-muted-foreground font-mono text-xs">
              {user.email}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="bg-surface-container-lowest text-foreground flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs">
                <Wallet className="text-primary h-3.5 w-3.5" />
                {isConnected && address ? shortAddress(address) : "Sin wallet"}
              </span>
              {isConnected && address && (
                <button
                  onClick={copyWallet}
                  className="text-muted-foreground hover:text-primary flex items-center gap-1 font-mono text-xs transition-colors"
                >
                  {copied ? (
                    <Check className="text-primary h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              )}
              {!isConnected && <WalletButton />}
            </div>
          </div>
        </div>
        <div className="border-border/40 relative mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
          <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
            Miembro desde {formatDate(user.createdAt)}
          </span>
          <span className="bg-primary/10 text-primary flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase">
            <Check className="h-3 w-3" />
            Identidad Web3
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border-border/40 bg-surface-container rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
            Aporte total
          </p>
          <p className="font-display text-primary mt-1.5 text-2xl font-bold">
            {formatUsdc(total)} USDC
          </p>
        </div>
        <div className="border-border/40 bg-surface-container rounded-xl border p-4">
          <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
            Proyectos apoyados
          </p>
          <p className="font-display text-secondary mt-1.5 text-2xl font-bold">
            {projectCount}
          </p>
        </div>
      </div>

      {/* Donation history */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">
            Historial de mis donaciones
          </h2>
          {donations && (
            <span className="text-primary font-mono text-xs">
              {donations.length} registros
            </span>
          )}
        </div>

        {!isConnected ? (
          <div className="border-border/40 bg-surface-container-low rounded-xl border border-dashed p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Conectá tu wallet para ver tu historial de donaciones.
            </p>
          </div>
        ) : donations?.length === 0 ? (
          <div className="border-border/40 bg-surface-container-low rounded-xl border border-dashed p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Aún no hay donaciones desde esta wallet.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="border-border/40 bg-surface-container hover:bg-surface-container-high rounded-xl border p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-foreground truncate font-medium">
                      {donation.community.name}
                    </h3>
                    <p className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
                      {formatDate(donation.createdAt)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-primary text-lg font-bold">
                      {formatUsdc(donation.amountUsdc)} USDC
                    </div>
                    <span className="bg-primary/10 text-primary mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase">
                      <span className="bg-primary h-1 w-1 rounded-full" />
                      Completado
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest/80 mt-2 flex items-center justify-between rounded px-2.5 py-1.5">
                  <span className="text-muted-foreground truncate font-mono text-xs">
                    TX: {shortAddress(donation.txHash)}
                  </span>
                  <a
                    href={txUrl(donation.txHash)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary flex items-center gap-0.5 font-mono text-xs hover:underline"
                  >
                    Explorer
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
