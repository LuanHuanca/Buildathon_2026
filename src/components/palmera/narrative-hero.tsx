"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

const FRAMES = [
  {
    title: "El eco lítico de milenios despierta.",
    desc: "La raíz originaria del Altiplano se entrelaza con contratos autónomos que custodian el patrimonio ancestral andino.",
    tag: "Altiplano Ancestral",
    loc: "LOC // -16.5550, -68.6738 · TIWANAKU",
    gradient: "linear-gradient(135deg, #1b2a4a 0%, #2d1b3d 45%, #0b0f0d 100%)",
  },
  {
    title: "Geometría blanca y energía viva.",
    desc: "El Salar de Uyuni custodia reservas críticas de litio monitoreadas por DAO comunitarias bajo balance ecológico.",
    tag: "Salar y Litio Sostenible",
    loc: "LOC // -20.1338, -67.4891 · UYUNI",
    gradient: "linear-gradient(135deg, #0e2a35 0%, #1a3a4a 45%, #0b0f0d 100%)",
  },
  {
    title: "Pulmón húmedo y saberes ancestrales.",
    desc: "El Madidi vibra con miles de especies protegidas mediante micro-donaciones canalizadas sin intermediarios.",
    tag: "Amazonía y Comunidades Vivas",
    loc: "LOC // -14.2833, -68.7500 · MADIDI",
    gradient: "linear-gradient(135deg, #06281d 0%, #0d3a2b 45%, #0b0f0d 100%)",
  },
  {
    title: "Cripto-ecología para las próximas generaciones.",
    desc: "Un ecosistema digital abierto donde cada persona regenera parcelas nativas con Unlock Keys.",
    tag: "Regeneración Web3",
    loc: "LOC // GLOBAL · PALMERA L2 SMART CONTRACT",
    gradient: "linear-gradient(135deg, #003822 0%, #1b3a1b 45%, #0b0f0d 100%)",
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
    <section className="border-border/40 relative overflow-hidden border-b">
      <div className="bg-primary/10 absolute -top-16 -left-20 h-72 w-72 rounded-full blur-[90px]" />
      <div className="bg-secondary/10 absolute top-1/2 -right-24 h-80 w-80 rounded-full blur-[100px]" />

      <div className="container py-10">
        <div className="border-border/40 relative flex h-[420px] flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-xl sm:p-5">
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: frame.gradient }}
          />
          <div className="from-surface-container-lowest via-surface-container-lowest/40 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_70%_30%,rgba(229,142,38,0.14),transparent)]" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-surface-container/80 text-primary rounded px-2.5 py-1 font-mono text-xs font-bold tracking-widest uppercase backdrop-blur">
              FRAME // 0{index + 1}/04
            </span>
            <span className="bg-surface-container/80 text-secondary flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[11px] tracking-widest uppercase backdrop-blur">
              {frame.tag}
            </span>
          </div>

          <div
            key={index}
            className="relative z-10 flex max-w-xl flex-col gap-2"
          >
            <span className="text-primary font-mono text-[11px] tracking-widest uppercase">
              {frame.loc}
            </span>
            <h2 className="font-display text-foreground text-3xl leading-tight font-bold drop-shadow-md sm:text-4xl">
              {frame.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {frame.desc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
              <span>Desliza para evolucionar</span>
              <span className="text-primary flex items-center gap-1">
                <span className="bg-primary h-1.5 w-1.5 animate-ping rounded-full" />
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
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors",
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
