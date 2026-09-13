import Link from "next/link";

import { BoliviaMap } from "~/components/palmera/bolivia-map";
import { CommunityCard } from "~/components/palmera/community-card";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await api.community.getFeatured();

  return (
    <div>
      <section className="border-b border-border bg-background">
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl font-bold text-palmera-indigo sm:text-5xl">
            Transparencia radical para comunidades indígenas de Bolivia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-palmera-slate">
            Conecta aliados globales con comunidades Uru, Aymara y Yampara
            mediante donaciones trazables y turismo cultural ético.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/comunidades">Ver comunidades</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/transparencia">Ver transparencia</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="mb-6 font-display text-2xl font-bold">
          Dónde trabajamos
        </h2>
        <BoliviaMap communities={featured} />
      </section>

      <section className="container pb-20">
        <h2 className="mb-6 font-display text-2xl font-bold">
          Comunidades destacadas
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>
    </div>
  );
}
