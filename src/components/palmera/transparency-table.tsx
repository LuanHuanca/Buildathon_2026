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
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-palmera-muted">
            {showCommunityColumn && <th className="px-4 py-3 font-semibold">Comunidad</th>}
            <th className="px-4 py-3 font-semibold">Wallet</th>
            <th className="px-4 py-3 font-semibold">Monto</th>
            <th className="px-4 py-3 font-semibold">Fecha</th>
            <th className="px-4 py-3 font-semibold">Hash</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr
              key={donation.id}
              className="border-b border-border/60 last:border-0"
            >
              {showCommunityColumn && (
                <td className="px-4 py-3 font-medium text-foreground">
                  {donation.communityName}
                </td>
              )}
              <td className="px-4 py-3 font-mono text-xs text-palmera-slate">
                {short(donation.walletAddress)}
              </td>
              <td className="px-4 py-3 font-semibold text-palmera-forest">
                {formatUsdc(donation.amountUsdc)} USDC
              </td>
              <td className="px-4 py-3 text-palmera-slate">
                {formatDate(donation.createdAt)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-palmera-muted">
                {short(donation.txHash, 10, 8)}
              </td>
            </tr>
          ))}
          {donations.length === 0 && (
            <tr>
              <td
                colSpan={showCommunityColumn ? 5 : 4}
                className="px-4 py-8 text-center text-palmera-muted"
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
