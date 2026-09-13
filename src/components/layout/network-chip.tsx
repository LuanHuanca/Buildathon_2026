"use client";

import { DONATION_CHAIN_ID, networkName, UNLOCK_CHAIN_ID } from "~/lib/chains";

export function NetworkChip() {
  return (
    <span className="bg-surface-container-high/80 text-foreground hidden items-center gap-3 rounded-full px-3 py-1 font-mono text-[9px] tracking-wider uppercase lg:flex">
      <span className="flex items-center gap-1.5">
        <span className="bg-tertiary h-1.5 w-1.5 rounded-full" />
        Donar · {networkName(DONATION_CHAIN_ID)}
      </span>
      <span className="bg-border h-3 w-px" />
      <span className="flex items-center gap-1.5">
        <span className="bg-secondary h-1.5 w-1.5 rounded-full" />
        Acceso · {networkName(UNLOCK_CHAIN_ID)}
      </span>
    </span>
  );
}
