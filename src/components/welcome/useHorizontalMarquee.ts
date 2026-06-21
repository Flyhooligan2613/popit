"use client";

import { useEffect, useRef } from "react";
import { isPageVisible } from "@/lib/mobilePerformance";

type UseHorizontalMarqueeOptions = {
  speed?: number;
  paused?: boolean;
  enabled?: boolean;
};

/** RAF horizontal scroll — never uses scrollIntoView (avoids page jump). */
export function useHorizontalMarquee({
  speed = 0.45,
  paused = false,
  enabled = true,
}: UseHorizontalMarqueeOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = viewportRef.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      if (!paused && isPageVisible() && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, paused, enabled]);

  return viewportRef;
}
