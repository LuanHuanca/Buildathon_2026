import { ArrowRight, Clock3, MapPin, Route, UsersRound } from "lucide-react";
import Link from "next/link";

import {
  prototypeTourismRoutes,
  TOURISM_DEMO_DISCLAIMER,
} from "~/content/tourism-routes";

export default function TurismoPage() {
  return (
    <main className="container py-10 md:py-16">
      <section className="border-tertiary/20 bg-surface-container-low grid overflow-hidden rounded-[2rem] border lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
          <p className="text-label text-tertiary font-mono tracking-[0.2em] uppercase">
            Rutas prototipo · Bolivia
          </p>
          <h1 className="font-display text-display text-foreground md:text-display-lg mt-4">
            Viajar despacio, escuchar primero
          </h1>
          <p className="text-body-lg text-muted-foreground mt-5 max-w-xl">
            Una exploración visual de experiencias diseñadas alrededor de la
            hospitalidad comunitaria, el cuidado del paisaje y una distribución
            transparente del valor.
          </p>
          <div className="mt-7">
            <Link
              href="/comunidades"
              className="bg-tertiary text-tertiary-foreground focus-visible:outline-tertiary inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Conocer comunidades
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="bg-surface-container-high relative min-h-72 lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed remote demo asset */}
          <img
            src={prototypeTourismRoutes[0]!.gallery[0]!.src}
            alt="Paisaje ilustrativo de una ruta turística prototipo"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="from-surface/80 lg:from-surface-container-low/30 absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:to-transparent" />
          <span className="bg-surface/75 text-foreground absolute bottom-5 left-5 rounded-full border border-white/20 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase backdrop-blur">
            Imagen referencial · demo
          </span>
        </div>
      </section>

      <aside className="border-primary/25 bg-primary/10 text-muted-foreground mt-6 flex gap-3 rounded-xl border p-4 text-sm">
        <Route
          className="text-primary mt-0.5 size-5 shrink-0"
          aria-hidden="true"
        />
        <p>
          <strong className="text-foreground">
            Vista conceptual, sin reservas.
          </strong>{" "}
          {TOURISM_DEMO_DISCLAIMER}
        </p>
      </aside>

      <section className="mt-12 md:mt-16" aria-labelledby="rutas-title">
        <div className="md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <p className="text-label text-primary font-mono tracking-widest uppercase">
              Itinerarios de muestra
            </p>
            <h2
              id="rutas-title"
              className="font-display text-headline text-foreground md:text-headline-xl mt-2"
            >
              Rutas imaginadas con propósito
            </h2>
          </div>
          <p className="text-muted-foreground mt-3 max-w-md text-sm md:mt-0">
            Los montos y porcentajes sirven únicamente para visualizar un
            posible modelo de distribución.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {prototypeTourismRoutes.map((route, index) => (
            <article
              key={route.id}
              className="surface-card grid overflow-hidden lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div
                className={`bg-surface-container-high relative min-h-72 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- fixed remote demo asset */}
                <img
                  src={route.gallery[0]!.src}
                  alt={route.gallery[0]!.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="bg-surface/85 text-tertiary absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest uppercase backdrop-blur">
                  Prototipo
                </span>
              </div>

              <div className="flex flex-col p-6 md:p-8">
                <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="flex items-center gap-2">
                    <Clock3
                      className="text-primary size-4"
                      aria-hidden="true"
                    />
                    {route.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin
                      className="text-secondary size-4"
                      aria-hidden="true"
                    />
                    {route.location}
                  </span>
                </div>

                <h3 className="font-display text-headline-md text-foreground mt-5">
                  {route.name}
                </h3>
                <p className="text-body text-muted-foreground mt-3">
                  {route.description}
                </p>

                <div className="border-border/50 mt-6 grid gap-5 border-y py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                      Precio ilustrativo
                    </p>
                    <p className="font-display text-primary mt-1 text-2xl">
                      {route.priceUSDC} USDC
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                      Distribución propuesta
                    </p>
                    <p className="font-display text-tertiary mt-1 flex items-center gap-2 text-2xl">
                      <UsersRound className="size-5" aria-hidden="true" />
                      {route.communityPercent}% comunidad
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                    Podría incluir
                  </p>
                  <ul className="text-foreground mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    {route.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="bg-tertiary mt-2 size-1.5 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-muted-foreground mt-6 text-xs">
                  No disponible para reservar o pagar. Presentación de
                  demostración únicamente.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-primary/20 bg-primary/10 mt-12 rounded-2xl border p-6 text-center md:p-10">
        <h2 className="font-display text-headline-md text-foreground">
          Primero la relación, después el itinerario
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm">
          Explora las iniciativas comunitarias disponibles en la plataforma.
          Esta página todavía no procesa solicitudes, reservas ni pagos.
        </p>
        <Link
          href="/comunidades"
          className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          Ir a comunidades
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
