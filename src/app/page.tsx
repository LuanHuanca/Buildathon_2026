import { HomeLanding } from "~/components/home/home-landing";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [communities, totals] = await Promise.all([
    api.community.getAll(),
    api.donation.getTotals(),
  ]);

  const featured = [...communities]
    .sort((a, b) => b.raisedAmount - a.raisedAmount)
    .slice(0, 3);

  return <HomeLanding communities={featured} totalUsdc={totals.totalUsdc} />;
}
