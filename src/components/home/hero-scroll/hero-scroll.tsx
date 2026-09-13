"use client";

import { useRef, useState } from "react";

import { cn } from "~/lib/utils";

import { HERO_FRAMES, HERO_OUTRO } from "./frames";
import { useHeroIntro } from "./use-hero-timeline";

export function HeroScroll() {
  const title = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);
  const frame = HERO_FRAMES[index] ?? HERO_FRAMES[0]!;
  useHeroIntro(title);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: frame.wash }}
        aria-hidden
      />
      <div className="from-background absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent" />
      <div className="relative container flex min-h-[calc(100svh-4rem)] flex-col justify-end pt-28 pb-12">
        <p className="text-tertiary font-mono text-[11px] tracking-[0.2em] uppercase">
          Munay · Bolivia
        </p>
        <h1
          ref={title}
          className="font-display text-display text-foreground lg:text-display-lg mt-3 max-w-2xl font-extrabold will-change-transform"
        >
          36 naciones. Una red para que su conocimiento siga vivo.
        </h1>
        <p className="text-foreground/80 mt-5 max-w-2xl text-lg">
          Apoya investigación, patrimonio y turismo comunitario con aportes
          verificables. La confianza no depende de una promesa: queda en
          Avalanche.
        </p>
        <p className="text-primary mt-8 font-mono text-[11px] tracking-[0.16em] uppercase">
          {frame.kicker}
        </p>
        <h2 className="font-display text-headline mt-2 max-w-xl font-bold">
          {frame.title}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">{frame.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {HERO_FRAMES.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "rounded-md border px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-[box-shadow,background-color,border-color]",
                itemIndex === index
                  ? "border-primary bg-primary text-primary-foreground glow-amber"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {item.kicker.split("·")[1]?.trim() ?? item.id}
            </button>
          ))}
        </div>
        <p className="font-display text-title-lg text-foreground/90 mt-10 max-w-xl">
          {HERO_OUTRO} Empieza por una historia y verifica cada aporte.
        </p>
      </div>
    </section>
  );
}
