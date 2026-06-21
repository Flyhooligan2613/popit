"use client";

import { useEffect, useState, type RefObject } from "react";

/** 0→1 as the hero scrolls off-screen inside `.popit-home`. */
export function useHeroScrollProgress(heroRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const scroller = hero.closest(".popit-home");
    if (!scroller) return;

    let raf = 0;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const heroTop = rect.top - scrollerRect.top + scroller.scrollTop;
      const scrolled = scroller.scrollTop - heroTop * 0.15;
      const range = Math.max(hero.offsetHeight * 0.75, 1);
      const p = Math.min(1, Math.max(0, scrolled / range));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroRef]);

  return progress;
}
