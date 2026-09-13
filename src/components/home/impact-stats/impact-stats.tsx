"use client";

import { useRef } from "react";

import { useCountUp } from "./use-count-up";
import { EDITORIAL_STATS } from "./impact";

function formatCount(value: number) {
  return new Intl.NumberFormat("es-BO").format(value);
}

function StatFigure({
  value,
  format = formatCount,
}: {
  value: number;
  format?: (value: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, format);
  return <span ref={ref}>{format(value)}</span>;
}

export function ImpactStats({ totalUsdc }: { totalUsdc: number }) {
  const cards = [
    ...EDITORIAL_STATS.map((stat) => ({
      id: stat.id,
      label: stat.label,
      value: stat.value,
      note: stat.note,
      suffix: "",
    })),
    {
      id: "usdc",
      label: "USDC registrados",
      value: Math.round(totalUsdc),
      note: "Total verificado en la base",
      suffix: " USDC",
    },
  ];

  return (
    <section className="container py-16 lg:py-24">
      <p className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
        Impacto
      </p>
      <h2 className="font-display mt-3 max-w-xl text-3xl font-bold lg:text-4xl">
        Cifras que aún se cuentan a mano, y una que ya está en el registro.
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.id} className="surface-card p-5">
            <p className="font-display text-tertiary text-4xl font-bold">
              <StatFigure value={card.value} />
              {card.suffix}
            </p>
            <p className="text-foreground mt-2 text-sm">{card.label}</p>
            <p className="text-outline mt-3 font-mono text-[10px] tracking-[0.14em] uppercase">
              {card.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
