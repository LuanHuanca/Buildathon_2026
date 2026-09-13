"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { gsap } from "~/components/motion/gsap";
import { usePrefersReducedMotion } from "~/components/motion/use-reduced-motion";

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  value: number,
  format: (value: number) => string,
) {
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 0.9,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(Math.round(state.n));
        },
      });
    },
    { dependencies: [value, reduced, format] },
  );
}
