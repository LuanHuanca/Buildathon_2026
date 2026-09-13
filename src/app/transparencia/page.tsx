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
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold">Transparencia</h1>
      <p className="mt-2 max-w-2xl text-palmera-slate">
        Cada donación queda registrada on-chain. Acá mostramos el historial
        completo y verificable.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-palmera-muted">Total recaudado</p>
          <p className="font-display text-3xl font-bold text-palmera-forest">
            {formatUsdc(totals.totalUsdc)} USDC
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-palmera-muted">Total de donaciones</p>
          <p className="font-display text-3xl font-bold text-palmera-indigo">
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
