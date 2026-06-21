"use client";

import { useId } from "react";

type CityEnergyFlamesProps = {
  intensity: number;
  blazing: boolean;
  reducedMotion: boolean;
  mobileLite?: boolean;
};

type FlameSlot = {
  left: number;
  scale: number;
  delay: number;
  variant: 0 | 1 | 2;
};

type DripSlot = {
  left: number;
  scale: number;
  delay: number;
  duration: number;
};

const FLAME_SLOTS: FlameSlot[] = [
  { left: 3, scale: 0.95, delay: 0, variant: 0 },
  { left: 12, scale: 1.2, delay: 0.11, variant: 1 },
  { left: 22, scale: 1, delay: 0.04, variant: 2 },
  { left: 33, scale: 1.35, delay: 0.17, variant: 0 },
  { left: 44, scale: 1.08, delay: 0.07, variant: 1 },
  { left: 55, scale: 1.28, delay: 0.21, variant: 2 },
  { left: 66, scale: 0.98, delay: 0.13, variant: 0 },
  { left: 77, scale: 1.18, delay: 0.09, variant: 1 },
  { left: 88, scale: 1.05, delay: 0.15, variant: 2 },
  { left: 97, scale: 0.9, delay: 0.19, variant: 0 },
];

const DRIP_SLOTS: DripSlot[] = [
  { left: 8, scale: 0.85, delay: 0, duration: 2.1 },
  { left: 19, scale: 1.1, delay: 0.55, duration: 1.85 },
  { left: 31, scale: 0.95, delay: 1.1, duration: 2.35 },
  { left: 43, scale: 1.2, delay: 0.35, duration: 2.0 },
  { left: 54, scale: 1, delay: 0.85, duration: 2.2 },
  { left: 65, scale: 1.15, delay: 1.45, duration: 1.95 },
  { left: 76, scale: 0.9, delay: 0.2, duration: 2.4 },
  { left: 87, scale: 1.05, delay: 1.7, duration: 2.05 },
  { left: 95, scale: 0.8, delay: 0.65, duration: 2.15 },
];

const FLAME_PATHS = [
  "M16 52 C9 38 5 29 6.5 19 C7 11 10 5 12.5 1 C13.5 -1 15 0 16 1.5 C17 0 18.5 -1 19.5 1 C22 5 24.5 11 25 19 C26.5 29 22 38 16 52Z",
  "M15 52 C7 36 4 27 6 17 C6.5 9 9.5 3 13 0 C14.5 -1 16 0.5 17 2.5 C20 6 23 12 23.5 20 C25 31 20 40 15 52Z",
  "M17 52 C10 37 6 28 7.5 17 C8 8 11 2 14.5 0 C15.5 -1 17 0 18 2 C21 6 24 12 24.5 19 C26 30 22 39 17 52Z",
];

const CORE_PATHS = [
  "M16 44 C12 34 10 28 11 22 C11.5 17 13 13 14.5 10 C15 8 16 6 16 6 C16 6 17 8 17.5 10 C19 13 20.5 17 21 22 C22 28 20 34 16 44Z",
  "M15 43 C11 33 9 27 10 21 C10.5 16 12 12 13.5 9 C14 7 15 6 15 6 C15 6 16 7 16.5 9 C18 12 19.5 16 20 21 C21 27 19 33 15 43Z",
  "M17 43 C13 33 10 27 11.5 21 C12 15 14 11 15.5 8 C16 6 17 5 17 5 C17 5 18 6 18.5 8 C20 11 22 15 22.5 21 C23.5 27 21 33 17 43Z",
];

function FlameSvg({ uid, variant, distort }: { uid: string; variant: 0 | 1 | 2; distort: boolean }) {
  const outerId = `${uid}-outer`;
  const coreId = `${uid}-core`;
  const glowId = `${uid}-glow`;
  const blurId = `${uid}-blur`;
  const distortId = `${uid}-distort`;

  return (
    <svg className="city-energy-flame-svg" viewBox="0 0 32 52" fill="none" aria-hidden>
      <defs>
        {distort && (
          <filter id={distortId} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.14" numOctaves="2" seed={variant + 2} result="noise">
              <animate attributeName="baseFrequency" dur="0.65s" repeatCount="indefinite" values="0.045 0.14;0.07 0.2;0.05 0.16;0.045 0.14" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        )}
        <filter id={blurId} x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" />
        </filter>
        <radialGradient id={glowId} cx="50%" cy="88%" r="70%">
          <stop offset="0%" stopColor="#ff7700" stopOpacity="1" />
          <stop offset="50%" stopColor="#ff3300" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ff1100" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={outerId} x1="16" y1="52" x2="16" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#aa1800" />
          <stop offset="12%" stopColor="#dd3300" />
          <stop offset="35%" stopColor="#ff5500" />
          <stop offset="62%" stopColor="#ffaa22" />
          <stop offset="88%" stopColor="#ffe566" />
          <stop offset="100%" stopColor="#fffef0" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id={coreId} cx="50%" cy="82%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="22%" stopColor="#fff8c4" />
          <stop offset="48%" stopColor="#ffd54a" />
          <stop offset="75%" stopColor="#ff7700" />
          <stop offset="100%" stopColor="#cc2200" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse className="city-energy-flame-halo" cx="16" cy="48" rx="12" ry="6" fill={`url(#${glowId})`} filter={`url(#${blurId})`} />
      <g filter={distort ? `url(#${distortId})` : undefined}>
        <path className="city-energy-flame-outer" d={FLAME_PATHS[variant]} fill={`url(#${outerId})`} />
        <path
          className="city-energy-flame-wisp"
          d={FLAME_PATHS[(variant + 1) % 3]}
          fill={`url(#${outerId})`}
          opacity="0.5"
        />
        <path className="city-energy-flame-core" d={CORE_PATHS[variant]} fill={`url(#${coreId})`} />
      </g>
    </svg>
  );
}

function DripSvg({ uid }: { uid: string }) {
  const gradId = `${uid}-drip`;
  const hotId = `${uid}-hot`;

  return (
    <svg className="city-energy-drip-svg" viewBox="0 0 14 28" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="7" y1="0" x2="7" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffcc44" />
          <stop offset="35%" stopColor="#ff6600" />
          <stop offset="75%" stopColor="#ff2200" />
          <stop offset="100%" stopColor="#cc1100" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id={hotId} cx="50%" cy="15%" r="45%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="100%" stopColor="#ff8800" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        className="city-energy-drip-body"
        d="M7 0 C9 0 10.5 3 10.5 6 C10.5 10 9 16 8 21 C7.5 24 7 26 7 28 C7 26 6.5 24 6 21 C5 16 3.5 10 3.5 6 C3.5 3 5 0 7 0Z"
        fill={`url(#${gradId})`}
      />
      <ellipse className="city-energy-drip-hotspot" cx="7" cy="4" rx="3" ry="2.5" fill={`url(#${hotId})`} />
    </svg>
  );
}

function LeadingEdgeFlare({ uid }: { uid: string }) {
  const gradId = `${uid}-edge`;

  return (
    <svg className="city-energy-edge-flare-svg" viewBox="0 0 20 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="10" y1="40" x2="10" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff4400" />
          <stop offset="50%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="city-energy-edge-flare"
        d="M10 40 C6 30 2 22 3 14 C4 8 7 3 10 0 C13 3 16 8 17 14 C18 22 14 30 10 40Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

export default function CityEnergyFlames({ intensity, blazing, reducedMotion, mobileLite = false }: CityEnergyFlamesProps) {
  const baseId = useId();
  const crestMax = mobileLite ? 6 : 10;
  const dripMax = mobileLite ? 4 : 9;
  const crestCount = blazing ? crestMax : Math.max(mobileLite ? 3 : 5, Math.round(intensity * (mobileLite ? 5 : 8)));
  const dripCount = blazing ? dripMax : Math.max(mobileLite ? 2 : 3, Math.round(intensity * (mobileLite ? 4 : 6)));
  const distort = !reducedMotion && !mobileLite;

  return (
    <div
      className={`city-energy-fire-stack ${blazing ? "is-blazing" : ""} ${reducedMotion ? "is-static" : ""}`}
      style={{ "--flame-intensity": String(intensity) } as React.CSSProperties}
      aria-hidden
    >
      <div className="city-energy-flames city-energy-flames-crest">
        {FLAME_SLOTS.slice(0, crestCount).map((slot, i) => (
          <span
            key={`crest-${slot.left}`}
            className={`city-energy-flame-tongue city-energy-flame-tongue-${(i % 3) + 1}`}
            style={{
              left: `${slot.left}%`,
              "--flame-scale": String(slot.scale * (0.85 + intensity * 0.5)),
              "--flame-delay": `${slot.delay}s`,
            } as React.CSSProperties}
          >
            <FlameSvg uid={`${baseId}-f-${i}`} variant={slot.variant} distort={distort} />
          </span>
        ))}
        <span className="city-energy-flame-tip">
          <LeadingEdgeFlare uid={`${baseId}-edge`} />
        </span>
      </div>

      <div className="city-energy-fire-drips">
        {DRIP_SLOTS.slice(0, dripCount).map((slot, i) => (
          <span
            key={`drip-${slot.left}`}
            className={`city-energy-fire-drip city-energy-fire-drip-${(i % 3) + 1}`}
            style={{
              left: `${slot.left}%`,
              "--drip-scale": String(slot.scale * (0.75 + intensity * 0.45)),
              "--drip-delay": `${slot.delay}s`,
              "--drip-duration": `${slot.duration}s`,
            } as React.CSSProperties}
          >
            <DripSvg uid={`${baseId}-d-${i}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
