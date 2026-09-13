"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { gsap } from "~/components/motion/gsap";

export function useHeroIntro(title: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = title.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const siblings = el.parentElement?.children;
        const tl = gsap.timeline({
          defaults: { duration: 0.65, ease: "power2.out" },
        });
        tl.addLabel("intro")
          .from(el, { autoAlpha: 0, y: 28 }, "intro")
          .from(
            siblings ? Array.from(siblings).filter((node) => node !== el) : [],
            { autoAlpha: 0, y: 16, stagger: 0.07 },
            "intro+=0.18",
          );
      });

      return () => mm.revert();
    },
    { scope: title },
  );
}
