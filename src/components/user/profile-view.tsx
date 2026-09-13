"use client";

import { Check, Copy, ExternalLink, Wallet } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

import { WalletButton } from "~/components/web3/wallet-button";
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
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-surface-container-low p-5">
        <span className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-primary to-secondary p-0.5 shadow-[0_0_15px_rgba(0,229,153,0.35)]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-surface-container-lowest font-display text-xl font-bold text-primary">
              {initials(user.name)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-xl font-bold text-foreground">
              {user.name}
            </h1>
            <p className="font-mono text-xs text-muted-foreground">
              {user.email}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded bg-surface-container-lowest px-2 py-1 font-mono text-xs text-foreground">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                {isConnected && address ? shortAddress(address) : "Sin wallet"}
              </span>
              {isConnected && address && (
                <button
                  onClick={copyWallet}
                  className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
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
        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Miembro desde {formatDate(user.createdAt)}
          </span>
          <span className="flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
            <Check className="h-3 w-3" />
            Correo verificado
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/40 bg-surface-container p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Aporte total
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-primary">
            {formatUsdc(total)} USDC
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-surface-container p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Proyectos apoyados
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-secondary">
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
            <span className="font-mono text-xs text-primary">
              {donations.length} registros
            </span>
          )}
        </div>

        {!isConnected ? (
          <div className="rounded-xl border border-dashed border-border/40 bg-surface-container-low p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Conectá tu wallet para ver tu historial de donaciones.
            </p>
          </div>
        ) : donations?.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/40 bg-surface-container-low p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Aún no hay donaciones desde esta wallet.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="rounded-xl border border-border/40 bg-surface-container p-4 transition-colors hover:bg-surface-container-high"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-foreground">
                      {donation.community.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {formatDate(donation.createdAt)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-lg font-bold text-primary">
                      {formatUsdc(donation.amountUsdc)} USDC
                    </div>
                    <span className="mt-1 inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-primary">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      Completado
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between rounded bg-surface-container-lowest/80 px-2.5 py-1.5">
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    TX: {shortAddress(donation.txHash)}
                  </span>
                  <a
                    href={`https://snowtrace.io/tx/${donation.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-0.5 font-mono text-xs text-primary hover:underline"
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
