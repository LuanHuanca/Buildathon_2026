import Link from "next/link";

import { BoliviaMapLoader } from "~/components/map/bolivia-map-loader";

import type { FeaturedCommunity } from "../types";

export function GeoVisor({
  communities,
}: {
  communities: FeaturedCommunity[];
}) {
  return (
    <section id="mapa" className="border-border scroll-mt-20 border-t">
      <div className="container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div>
          <p className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
            Territorio
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold lg:text-4xl">
            Explora el territorio antes de decidir.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md">
            Comunidades, patrimonio, investigación y rutas responsables en un
            mismo mapa. Cada punto abre evidencia, una meta y una acción.
          </p>
          <ul className="mt-8 space-y-3">
            {communities.map((community) => (
              <li key={community.id}>
                <Link
                  href={`/comunidades/${community.slug}`}
                  className="border-border hover:text-tertiary flex items-baseline justify-between gap-4 border-b py-3 text-sm"
                >
                  <span>{community.name}</span>
                  <span className="text-outline font-mono text-[11px]">
                    {community.department}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <BoliviaMapLoader
          communities={communities.map((community) => ({
            slug: community.slug,
            name: community.name,
            lat: community.lat,
            lng: community.lng,
          }))}
        />
      </div>
    </section>
  );
}
