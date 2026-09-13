// Palmera-specific. Amount picker + custom input + Donar button.
// "Donar" is wired to Pollar in Phase 3; recent donations come from
// donationRouter.getAll in Phase 2 (see .claude/tasks.md).

"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatUsdc } from "~/lib/format";
import { cn } from "~/lib/utils";

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
  const [selected, setSelected] = useState<number>(10);
  const [custom, setCustom] = useState<string>("");

  const amount = custom.trim() ? Number(custom) : selected;

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
        disabled={!amount || amount <= 0}
        data-community-id={communityId}
      >
        Donar {formatUsdc(amount)} USDC
      </Button>

      <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Lock className="h-3 w-3 text-primary" />
        Transacción cifrada · Unlock Protocol
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
