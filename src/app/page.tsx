import Link from "next/link";

import { BoliviaMap } from "~/components/palmera/bolivia-map";
import { CommunityCard } from "~/components/palmera/community-card";
import { NarrativeHero } from "~/components/palmera/narrative-hero";
import { Button } from "~/components/ui/button";
import { formatUsdc } from "~/lib/format";
import { api } from "~/trpc/server";
import {
  Fingerprint,
  Landmark,
  Network,
  Wallet,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [communities, totals] = await Promise.all([
    api.community.getAll(),
    api.donation.getTotals(),
  ]);

  const featured = [...communities]
    .sort((a, b) => b.raisedAmount - a.raisedAmount)
    .slice(0, 3);

  const stats = [
    {
      label: "Fondos Liquidados",
      value: `${formatUsdc(totals.totalUsdc)} USDC`,
      sub: "on-chain verificado",
      icon: Wallet,
      accent: "text-primary",
    },
    {
      label: "Comunidades",
      value: String(communities.length),
      sub: "territorios validados",
      icon: Landmark,
      accent: "text-secondary",
    },
    {
      label: "Microdonaciones",
      value: String(totals.totalDonations),
      sub: "transacciones registradas",
      icon: Fingerprint,
      accent: "text-tertiary",
    },
    {
      label: "Red Descentralizada",
      value: "Avalanche",
      sub: "C-Chain · 43114",
      icon: Network,
      accent: "text-primary",
    },
  ];

  return (
    <div>
      <NarrativeHero />

      <section className="container py-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold">
              Telemetría de Impacto
            </span>
          </div>
          <span className="flex items-center gap-1 rounded bg-surface-container-high px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
            <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            On-chain
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-xl border border-border/40 bg-surface-container p-4"
              >
                <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </div>
                <p className="relative mt-2 font-display text-2xl font-bold leading-none text-foreground">
                  {stat.value}
                </p>
                <p className="relative mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-display text-lg font-bold">
            Cartografía Viva de Bolivia
          </span>
        </div>
        <BoliviaMap communities={featured} />
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">
            Proyectos Destacados
          </h2>
          <Link
            href="/comunidades"
            className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>

      <section className="container pb-16 pt-4">
        <div className="relative overflow-hidden rounded-xl border border-border/40 bg-surface-container-high p-6 sm:p-8">
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Unlock Protocol Beta · Membresía ecológica on-chain
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Conecta tu wallet y regenera Bolivia
              </h2>
              <p className="mt-2 text-muted-foreground">
                Adquiere tu llave digital comunitaria, recibe reportes en
                tiempo real y sé co-custodio de la biodiversidad.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href="/comunidades">Explorar comunidades</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
