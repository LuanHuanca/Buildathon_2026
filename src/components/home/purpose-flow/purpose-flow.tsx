import { ArrowRight, Eye, HeartHandshake, ScanSearch } from "lucide-react";
import Link from "next/link";

import { demoResearchers } from "~/content/researchers";

const STEPS = [
  {
    icon: ScanSearch,
    title: "Explora",
    body: "Conoce la necesidad, el equipo responsable y la meta antes de aportar.",
  },
  {
    icon: HeartHandshake,
    title: "Apoya",
    body: "Dona USDC en Avalanche directamente a la wallet de cada comunidad.",
  },
  {
    icon: Eye,
    title: "Verifica",
    body: "Sigue el hash, el destino y las actualizaciones sin depender de un PDF.",
  },
];

export function PurposeFlow() {
  return (
    <>
      <section className="border-border border-t py-16 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-secondary font-mono text-[11px] tracking-[0.18em] uppercase">
              Por qué existe Munay
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold lg:text-5xl">
              La investigación no debería desaparecer por falta de confianza.
            </h2>
            <p className="text-muted-foreground mt-5">
              Cuando una comunidad pierde financiamiento, también se pierden
              archivos orales, lenguas, técnicas de agua y formas de cuidar el
              territorio. Munay conecta evidencia, responsables y aportes en una
              ruta que cualquiera puede revisar.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className="surface-card p-5" data-reveal>
                <div className="flex items-center justify-between">
                  <Icon className="text-primary h-6 w-6" />
                  <span className="text-outline font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-display mt-8 text-2xl font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t py-16 lg:py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-tertiary font-mono text-[11px] tracking-[0.18em] uppercase">
                Investigación local
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold lg:text-4xl">
                Conoce a quienes documentan.
              </h2>
            </div>
            <Link
              href="/investigadores"
              className="text-primary flex items-center gap-2 text-sm font-semibold"
            >
              Ver directorio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {demoResearchers.map((researcher) => (
              <article
                key={researcher.id}
                className="border-border bg-surface-container-low rounded-xl border p-5"
                data-reveal
              >
                <p className="text-primary font-mono text-[10px] tracking-wider uppercase">
                  {researcher.specialty}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold">
                  {researcher.name}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {researcher.activeProject}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
