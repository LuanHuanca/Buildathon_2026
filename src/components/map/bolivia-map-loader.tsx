"use client";

import dynamic from "next/dynamic";

import type { MapCommunity } from "./bolivia-map";

const BoliviaLeaflet = dynamic(
  () => import("./bolivia-map").then((mod) => mod.BoliviaLeaflet),
  {
    ssr: false,
    loading: () => (
      <div className="border-border bg-surface-container-low text-muted-foreground flex h-[520px] items-center justify-center rounded-xl border text-sm">
        Cargando territorio boliviano…
      </div>
    ),
  },
);

export function BoliviaMapLoader({
  communities,
}: {
  communities: MapCommunity[];
}) {
  return <BoliviaLeaflet communities={communities} />;
}
