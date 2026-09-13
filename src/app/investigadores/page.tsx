import { ArrowRight, BookOpen, FlaskConical, ShieldCheck } from "lucide-react";
import Link from "next/link";

import {
  demoResearchers,
  RESEARCHERS_DEMO_DISCLAIMER,
} from "~/content/researchers";

export default function InvestigadoresPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="border-primary/20 bg-surface-container-low relative overflow-hidden rounded-[2rem] border px-6 py-10 md:px-10 md:py-14">
        <div className="bg-primary/10 absolute -top-24 -right-20 h-64 w-64 rounded-full blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-label text-primary font-mono tracking-[0.2em] uppercase">
            Directorio experimental · Contenido demo
          </p>
          <h1 className="font-display text-display text-foreground md:text-display-lg mt-4">
            Investigación con contexto, cuidado y reciprocidad
          </h1>
          <p className="text-body-lg text-muted-foreground mt-5 max-w-2xl">
            Una vista prototipo de cómo conectar proyectos comunitarios con
            perfiles de investigación, haciendo visibles sus temas, métodos y
            compromisos.
          </p>
          <Link
            href="/comunidades"
            className="bg-primary text-primary-foreground focus-visible:outline-primary mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Explorar comunidades
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <aside className="border-tertiary/25 bg-tertiary/10 text-muted-foreground mt-6 flex gap-3 rounded-xl border p-4 text-sm">
        <ShieldCheck
          className="text-tertiary mt-0.5 size-5 shrink-0"
          aria-hidden="true"
        />
        <p>
          <strong className="text-foreground">Prototipo, no directorio.</strong>{" "}
          {RESEARCHERS_DEMO_DISCLAIMER}
        </p>
      </aside>

      <section className="mt-12 md:mt-16" aria-labelledby="perfiles-title">
        <div className="max-w-2xl">
          <p className="text-label text-tertiary font-mono tracking-widest uppercase">
            Perfiles representativos
          </p>
          <h2
            id="perfiles-title"
            className="font-display text-headline text-foreground md:text-headline-xl mt-2"
          >
            Tres formas de acompañar un territorio
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {demoResearchers.map((researcher) => (
            <article
              key={researcher.id}
              className="surface-card group hover:border-primary/30 overflow-hidden transition duration-300 hover:-translate-y-1"
            >
              <div className="bg-surface-container-high relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- fixed remote demo asset */}
                <img
                  src={researcher.photo.src}
                  alt={researcher.photo.alt}
                  className="h-full w-full object-cover saturate-[0.85] transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="bg-surface/90 text-primary absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest uppercase backdrop-blur">
                  Perfil demo
                </span>
              </div>

              <div className="p-6">
                <p className="text-tertiary text-sm font-medium">
                  {researcher.specialty}
                </p>
                <h3 className="font-display text-title-lg text-foreground mt-2">
                  {researcher.name}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {researcher.institution}
                </p>
                <p className="text-body text-muted-foreground mt-5">
                  {researcher.bio}
                </p>

                <div className="border-border/50 mt-6 border-t pt-5">
                  <div className="flex gap-3">
                    <FlaskConical
                      className="text-primary mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                        Proyecto activo · demo
                      </p>
                      <p className="text-foreground mt-1 text-sm">
                        {researcher.activeProject}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
                    <BookOpen
                      className="text-secondary size-4"
                      aria-hidden="true"
                    />
                    {researcher.lockAddress
                      ? "Archivo demo configurado"
                      : "Archivo demo sin contrato configurado"}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-secondary/20 bg-secondary/10 mt-12 rounded-2xl border p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div>
          <p className="font-display text-title-lg text-foreground">
            El territorio define las condiciones
          </p>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            Esta maqueta propone que cada colaboración parta del consentimiento,
            la atribución y los acuerdos de acceso de cada comunidad.
          </p>
        </div>
        <Link
          href="/comunidades"
          className="text-secondary mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold hover:underline md:mt-0"
        >
          Conocer iniciativas
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
