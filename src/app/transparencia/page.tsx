import {
  TransparencyTable,
  type TransparencyDonation,
} from "~/components/palmera/transparency-table";
import { formatUsdc } from "~/lib/format";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function TransparenciaPage() {
  const [donations, totals] = await Promise.all([
    api.donation.getAll(),
    api.donation.getTotals(),
  ]);

  const rows: TransparencyDonation[] = donations.map((donation) => ({
    id: donation.id,
    communityName: donation.community.name,
    walletAddress: donation.walletAddress,
    amountUsdc: donation.amountUsdc,
    txHash: donation.txHash,
    createdAt: donation.createdAt,
  }));

  return (
    <div className="container py-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
        Impacto · Ledger público
      </p>
      <h1 className="mt-1 font-display text-3xl font-bold">Transparencia</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Cada donación queda registrada on-chain. Este es el historial completo
        y verificable de los fondos.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl border border-border/40 bg-surface-container p-6">
          <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
          <p className="relative font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Total recaudado
          </p>
          <p className="relative mt-2 font-display text-3xl font-bold text-primary">
            {formatUsdc(totals.totalUsdc)} USDC
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border/40 bg-surface-container p-6">
          <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-secondary/10 blur-xl" />
          <p className="relative font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Total de donaciones
          </p>
          <p className="relative mt-2 font-display text-3xl font-bold text-secondary">
            {totals.totalDonations}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <TransparencyTable donations={rows} />
      </div>
    </div>
  );
}
