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
      <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
        Impacto · Ledger público
      </p>
      <h1 className="font-display mt-1 text-3xl font-bold">Transparencia</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Cada donación queda registrada on-chain. Este es el historial completo y
        verificable de los fondos.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border-border/40 bg-surface-container relative overflow-hidden rounded-xl border p-6">
          <span className="bg-primary/10 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl" />
          <p className="text-muted-foreground relative font-mono text-[11px] tracking-wider uppercase">
            Total recaudado
          </p>
          <p className="font-display text-primary relative mt-2 text-3xl font-bold">
            {formatUsdc(totals.totalUsdc)} USDC
          </p>
        </div>
        <div className="border-border/40 bg-surface-container relative overflow-hidden rounded-xl border p-6">
          <span className="bg-secondary/10 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl" />
          <p className="text-muted-foreground relative font-mono text-[11px] tracking-wider uppercase">
            Total de donaciones
          </p>
          <p className="font-display text-secondary relative mt-2 text-3xl font-bold">
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
