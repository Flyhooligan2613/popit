"use client";

import { useEffect, useState } from "react";

export const ENERGY_COLORS = ["#FF4D6D", "#FF7A00", "#A855F7", "#00D4FF", "#7C3AED", "#0099FF", "#FFFFFF"];

export const SWIRLS = [
  { color: "#FF4D6D", d: "M -320 -200 C -200 -150 -100 -60 0 0 C 80 50 160 90 240 110", delay: 0 },
  { color: "#A855F7", d: "M -360 10 C -240 8 -120 4 0 0 C 120 -4 240 -10 360 -20", delay: 0.18 },
  { color: "#00D4FF", d: "M -280 230 C -190 170 -100 80 0 0 C 90 -70 180 -150 250 -210", delay: 0.34 },
];

export function buildConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    color: ENERGY_COLORS[i % ENERGY_COLORS.length],
    angle: (i * 37 + (i % 17) * 19) % 360,
    dist: 320 + (i % 28) * 42 + Math.floor(i / 28) * 56,
    fall: 120 + (i % 14) * 52,
    w: i % 5 === 0 ? 6 + (i % 4) : 3 + (i % 4),
    h: i % 5 === 0 ? 6 + (i % 4) : 10 + (i % 8) * 2,
    round: i % 4 === 1,
    streak: i % 5 === 0,
    delay: (i % 35) * 0.008,
    spin: -280 + (i % 23) * 32,
    duration: 1.9 + (i % 9) * 0.16,
  }));
}

export function buildBurstParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    color: ENERGY_COLORS[i % ENERGY_COLORS.length],
    angle: (i * 10 + (i % 7) * 8) % 360,
    dist: 200 + (i % 12) * 38,
    size: 4 + (i % 6),
  }));
}

export const SHOCK_RING_DELAYS = [0, 0.12, 0.28, 0.45];

export function getShakeKeyframes(mobile: boolean) {
  const m = mobile ? 1.45 : 1;
  return {
    x: [0, -18 * m, 22 * m, -16 * m, 14 * m, -12 * m, 10 * m, -8 * m, 6 * m, -4 * m, 2 * m, 0],
    y: [0, 14 * m, -18 * m, 12 * m, -14 * m, 10 * m, -8 * m, 6 * m, -4 * m, 3 * m, -2 * m, 0],
    rotate: [0, -1.2 * m, 1.4 * m, -1 * m, 0.8 * m, -0.5 * m, 0.3 * m, 0],
  };
}

export function getAftershockKeyframes(mobile: boolean) {
  const m = mobile ? 1.35 : 1;
  return {
    x: [0, -10 * m, 12 * m, -9 * m, 7 * m, -5 * m, 3 * m, 0],
    y: [0, 8 * m, -10 * m, 7 * m, -6 * m, 4 * m, -2 * m, 0],
    rotate: [0, -0.7 * m, 0.6 * m, -0.4 * m, 0.2 * m, 0],
  };
}

export function detectMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const touch = navigator.maxTouchPoints > 0;
  return (coarse || narrow) && touch;
}

export function useOpeningMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => setMobile(detectMobileDevice());
    update();
    const mq = window.matchMedia("(max-width: 900px)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mobile;
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* unsupported */
  }
}

export function hapticLensAppear(mobile: boolean) {
  if (!mobile) return;
  vibrate(12);
}

export function hapticFocusSnap(mobile: boolean) {
  if (!mobile) return;
  vibrate([18, 40, 22]);
}

export function hapticSwirlPeak(mobile: boolean) {
  if (!mobile) return;
  vibrate([10, 14, 10, 14, 18]);
}

export function hapticBurstImpact(mobile: boolean) {
  if (!mobile) return;
  vibrate([45, 25, 70, 35, 90, 40]);
}

export function hapticBurstAftershock(mobile: boolean) {
  if (!mobile) return;
  vibrate([30, 20, 45, 25]);
}

export function useResponsiveLensSize(desktop: number) {
  const mobile = useOpeningMobile();
  if (!mobile) return desktop;
  if (typeof window === "undefined") return desktop;
  return Math.min(Math.round(window.innerWidth * 0.52), desktop + 24);
}

export function useResponsiveLogoWidth(desktop: number) {
  const mobile = useOpeningMobile();
  if (!mobile) return desktop;
  if (typeof window === "undefined") return desktop;
  return Math.min(Math.round(window.innerWidth * 0.78), desktop);
}
