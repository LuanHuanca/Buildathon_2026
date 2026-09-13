// Palmera-specific. Amount picker + custom input + Donar button.
// "Donar" is wired to Pollar in Phase 3; recent donations come from
// donationRouter.getAll in Phase 2 (see .claude/tasks.md).

"use client";

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
        <p className="mb-3 text-sm font-semibold text-foreground">
          Donar a {communityName}
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
                "rounded-lg border px-2 py-2 text-sm font-semibold transition-colors",
                !custom.trim() && selected === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-palmera-slate hover:bg-muted",
              )}
            >
              ${value}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-palmera-slate">
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

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-palmera-muted">
          Últimas donaciones
        </p>
        {recentDonations.length === 0 ? (
          <p className="text-sm text-palmera-muted">Sin donaciones aún.</p>
        ) : (
          <ul className="space-y-2">
            {recentDonations.map((donation) => (
              <li
                key={donation.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-mono text-xs text-palmera-slate">
                  {shortAddress(donation.walletAddress)}
                </span>
                <span className="font-semibold text-palmera-forest">
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
