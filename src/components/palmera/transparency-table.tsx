// Palmera-specific. On-chain tx history table for /transparencia.
// Builds on Lumio's table + scrollable-table pattern (see lumio-context-summary.md).

import { formatUsdc } from "~/lib/format";

export interface TransparencyDonation {
  id: string;
  communityName: string;
  walletAddress: string;
  amountUsdc: number;
  txHash: string;
  createdAt: Date | string;
}

function short(value: string, head = 8, tail = 6): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function TransparencyTable({
  donations,
  showCommunityColumn = true,
}: {
  donations: TransparencyDonation[];
  showCommunityColumn?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/40 bg-surface-container-low">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40 text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {showCommunityColumn && (
              <th className="px-4 py-3 font-medium">Comunidad</th>
            )}
            <th className="px-4 py-3 font-medium">Wallet</th>
            <th className="px-4 py-3 font-medium">Monto</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Hash</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr
              key={donation.id}
              className="border-b border-border/30 last:border-0"
            >
              {showCommunityColumn && (
                <td className="px-4 py-3 font-medium text-foreground">
                  {donation.communityName}
                </td>
              )}
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {short(donation.walletAddress)}
              </td>
              <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                {formatUsdc(donation.amountUsdc)} USDC
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(donation.createdAt)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-outline">
                {short(donation.txHash, 10, 8)}
              </td>
            </tr>
          ))}
          {donations.length === 0 && (
            <tr>
              <td
                colSpan={showCommunityColumn ? 5 : 4}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                Sin transacciones registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
