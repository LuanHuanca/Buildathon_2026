"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

const FRAMES = [
  {
    title: "El eco lítico de milenios despierta.",
    desc: "La raíz originaria del Altiplano se entrelaza con contratos autónomos que custodian el patrimonio ancestral andino.",
    tag: "Altiplano Ancestral",
    loc: "LOC // -16.5550, -68.6738 · TIWANAKU",
    gradient:
      "linear-gradient(135deg, #1b2a4a 0%, #2d1b3d 45%, #0b0f0d 100%)",
  },
  {
    title: "Geometría blanca y energía viva.",
    desc: "El Salar de Uyuni custodia reservas críticas de litio monitoreadas por DAO comunitarias bajo balance ecológico.",
    tag: "Salar y Litio Sostenible",
    loc: "LOC // -20.1338, -67.4891 · UYUNI",
    gradient:
      "linear-gradient(135deg, #0e2a35 0%, #1a3a4a 45%, #0b0f0d 100%)",
  },
  {
    title: "Pulmón húmedo y saberes ancestrales.",
    desc: "El Madidi vibra con miles de especies protegidas mediante micro-donaciones canalizadas sin intermediarios.",
    tag: "Amazonía y Comunidades Vivas",
    loc: "LOC // -14.2833, -68.7500 · MADIDI",
    gradient:
      "linear-gradient(135deg, #06281d 0%, #0d3a2b 45%, #0b0f0d 100%)",
  },
  {
    title: "Cripto-ecología para las próximas generaciones.",
    desc: "Un ecosistema digital abierto donde cada persona regenera parcelas nativas con Unlock Keys.",
    tag: "Regeneración Web3",
    loc: "LOC // GLOBAL · PALMERA L2 SMART CONTRACT",
    gradient:
      "linear-gradient(135deg, #003822 0%, #1b3a1b 45%, #0b0f0d 100%)",
  },
];

export function NarrativeHero() {
  const [index, setIndex] = useState(0);
  const frame = FRAMES[index]!;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % FRAMES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-primary/10 blur-[90px]" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="container py-10">
        <div className="relative flex h-[420px] flex-col justify-between overflow-hidden rounded-xl border border-border/40 p-4 shadow-xl sm:p-5">
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: frame.gradient }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_70%_30%,rgba(0,229,153,0.14),transparent)]" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded bg-surface-container/80 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
              FRAME // 0{index + 1}/04
            </span>
            <span className="flex items-center gap-1.5 rounded bg-surface-container/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-secondary backdrop-blur">
              {frame.tag}
            </span>
          </div>

          <div
            key={index}
            className="relative z-10 flex max-w-xl flex-col gap-2"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
              {frame.loc}
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground drop-shadow-md sm:text-4xl">
              {frame.title}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {frame.desc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Desliza para evolucionar</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
                Oráculo ecológico activo
              </span>
            </div>
            <div className="grid h-1.5 grid-cols-4 gap-1.5">
              {FRAMES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Fotograma ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    i === index
                      ? "bg-primary"
                      : "bg-surface-container-highest hover:bg-surface-container",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {FRAMES.map((f, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors",
                i === index
                  ? "bg-surface-container text-foreground"
                  : "bg-surface-container-low text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  i === index ? "bg-primary" : "bg-surface-container-highest",
                )}
              />
              0{i + 1} {f.tag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
