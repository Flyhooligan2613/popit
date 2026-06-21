"use client";

import { useEffect, type RefObject } from "react";

/** Subtle scale-up for horizontally centered carousel cards (GPU-friendly). */
export function useScrollCenterScale(
  viewportRef: RefObject<HTMLDivElement | null>,
  itemSelector: string,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    const el = viewportRef.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      const viewportCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
      el.querySelectorAll<HTMLElement>(itemSelector).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        const scale = Math.max(0.92, 1.06 - dist / 380);
        card.style.transform = `scale(${scale.toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [viewportRef, itemSelector, enabled]);
}
