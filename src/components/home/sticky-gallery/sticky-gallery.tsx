import Link from "next/link";

import { Reveal } from "~/components/motion/reveal";
import { CATEGORY_LABELS } from "~/components/palmera/categories";

import type { FeaturedCommunity } from "../types";

const WASHES = [
  "radial-gradient(circle at 30% 70%, rgba(229,142,38,0.32), transparent 42%), linear-gradient(160deg, #3e322c, #1a110c)",
  "radial-gradient(circle at 60% 30%, rgba(255,178,189,0.18), transparent 36%), linear-gradient(180deg, #322822, #1a110c)",
  "radial-gradient(circle at 40% 80%, rgba(107,216,203,0.22), transparent 44%), linear-gradient(200deg, #231a14, #150c08)",
];

export function StickyGallery({
  communities,
}: {
  communities: FeaturedCommunity[];
}) {
  if (communities.length === 0) return null;

  return (
    <section className="border-border border-t py-16 lg:py-24">
      <div className="container">
        <p className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
          Comunidades
        </p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-bold lg:text-4xl">
          Capítulos de custodia, no de turismo.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, index) => (
            <Reveal key={community.id}>
              <article className="surface-card overflow-hidden">
                <div
                  className="relative aspect-[4/3]"
                  style={{ background: WASHES[index % WASHES.length] }}
                >
                  {community.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={community.images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="font-display text-foreground/80 absolute bottom-4 left-4 text-5xl font-bold">
                      {community.name.slice(0, 1)}
                    </p>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-tertiary font-mono text-[11px] tracking-[0.16em] uppercase">
                    {CATEGORY_LABELS[community.category] ?? community.category}{" "}
                    · {community.department}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-bold">
                    {community.name}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm">
                    {community.problem}
                  </p>
                  <Link
                    href={`/comunidades/${community.slug}`}
                    className="text-primary hover:text-tertiary mt-5 inline-flex text-sm font-medium"
                  >
                    Abrir proyecto
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
