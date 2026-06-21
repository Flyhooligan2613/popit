"use client";

import { useId } from "react";

type CityEnergyFlamesProps = {
  intensity: number;
  blazing: boolean;
  reducedMotion: boolean;
};

type FlameSlot = {
  left: number;
  scale: number;
  delay: number;
  variant: 0 | 1 | 2;
};

const FLAME_SLOTS: FlameSlot[] = [
  { left: 4, scale: 0.9, delay: 0, variant: 0 },
  { left: 14, scale: 1.15, delay: 0.11, variant: 1 },
  { left: 26, scale: 0.95, delay: 0.04, variant: 2 },
  { left: 38, scale: 1.3, delay: 0.17, variant: 0 },
  { left: 50, scale: 1.05, delay: 0.07, variant: 1 },
  { left: 62, scale: 1.2, delay: 0.21, variant: 2 },
  { left: 74, scale: 0.92, delay: 0.13, variant: 0 },
  { left: 86, scale: 1.1, delay: 0.09, variant: 1 },
  { left: 96, scale: 0.85, delay: 0.15, variant: 2 },
];

/** Asymmetric flame silhouettes — reads as separate tongues, not one blob. */
const FLAME_PATHS = [
  "M16 48 C10 36 6 28 7 19 C7.5 12 10 6 12 2 C13 0 14.5 0 16 2 C18 6 20.5 12 21 19 C22 28 18 36 16 48Z",
  "M15 48 C8 34 5 26 6.5 18 C7 11 10 5 13 1 C14 0 15.5 1 16.5 3 C19 7 22 13 22.5 20 C23.5 30 19 38 15 48Z",
  "M17 48 C11 35 7 27 8 18 C8.5 10 11 4 14 1 C15 0 16.5 0 17.5 2 C20 6 23 12 23.5 19 C24.5 29 21 37 17 48Z",
];

const CORE_PATHS = [
  "M16 42 C12 33 10 27 11 21 C11.5 16 13 12 14.5 9 C15 7 16 5 16 5 C16 5 17 7 17.5 9 C19 12 20.5 16 21 21 C22 27 20 33 16 42Z",
  "M15 41 C11 32 9 26 10 20 C10.5 15 12 11 13.5 8 C14 6 15 5 15 5 C15 5 16 6 16.5 8 C18 11 19.5 15 20 20 C21 26 19 32 15 41Z",
  "M17 41 C13 32 10 26 11.5 20 C12 14 14 10 15.5 7 C16 5 17 4 17 4 C17 4 18 5 18.5 7 C20 10 22 14 22.5 20 C23.5 26 21 32 17 41Z",
];

function FlameSvg({ uid, variant }: { uid: string; variant: 0 | 1 | 2 }) {
  const outerId = `${uid}-outer`;
  const coreId = `${uid}-core`;
  const glowId = `${uid}-glow`;
  const blurId = `${uid}-blur`;

  return (
    <svg className="city-energy-flame-svg" viewBox="0 0 32 48" fill="none" aria-hidden>
      <defs>
        <filter id={blurId} x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
        <radialGradient id={glowId} cx="50%" cy="85%" r="65%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ff3300" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff1100" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={outerId} x1="16" y1="48" x2="16" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cc2200" />
          <stop offset="18%" stopColor="#ff4500" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="78%" stopColor="#ffcc33" />
          <stop offset="100%" stopColor="#fff8dc" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={coreId} cx="50%" cy="78%" r="58%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="28%" stopColor="#fff4a8" />
          <stop offset="55%" stopColor="#ffd54a" />
          <stop offset="82%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse className="city-energy-flame-halo" cx="16" cy="44" rx="11" ry="5" fill={`url(#${glowId})`} filter={`url(#${blurId})`} />
      <path
        className="city-energy-flame-outer"
        d={FLAME_PATHS[variant]}
        fill={`url(#${outerId})`}
      />
      <path
        className="city-energy-flame-wisp"
        d={FLAME_PATHS[(variant + 1) % 3]}
        fill={`url(#${outerId})`}
        opacity="0.45"
      />
      <path
        className="city-energy-flame-core"
        d={CORE_PATHS[variant]}
        fill={`url(#${coreId})`}
      />
    </svg>
  );
}

export default function CityEnergyFlames({ intensity, blazing, reducedMotion }: CityEnergyFlamesProps) {
  const baseId = useId();
  const count = blazing ? 9 : Math.max(4, Math.round(intensity * 7));

  return (
    <div
      className={`city-energy-flames ${blazing ? "is-blazing" : ""} ${reducedMotion ? "is-static" : ""}`}
      style={{ "--flame-intensity": String(intensity) } as React.CSSProperties}
      aria-hidden
    >
      {FLAME_SLOTS.slice(0, count).map((slot, i) => (
        <span
          key={`${slot.left}-${slot.variant}`}
          className={`city-energy-flame-tongue city-energy-flame-tongue-${(i % 3) + 1}`}
          style={{
            left: `${slot.left}%`,
            "--flame-scale": String(slot.scale * (0.8 + intensity * 0.45)),
            "--flame-delay": `${slot.delay}s`,
          } as React.CSSProperties}
        >
          <FlameSvg uid={`${baseId}-${i}`} variant={slot.variant} />
        </span>
      ))}
    </div>
  );
}
