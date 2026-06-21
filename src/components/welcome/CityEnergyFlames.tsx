"use client";

import { useId, useMemo } from "react";

type CityEnergyFlamesProps = {
  intensity: number;
  blazing: boolean;
  reducedMotion: boolean;
  mobileLite?: boolean;
};

type DripSlot = {
  left: number;
  scale: number;
  delay: number;
  duration: number;
};

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

/** Reference art — sharp triangular tongues, flat base */
const PEAK_HEIGHTS = [
  30, 18, 34, 14, 28, 22, 36, 16, 30, 20, 32, 12, 26, 18, 34, 14, 28, 22, 32, 16, 30, 20, 26, 18,
];

function buildCartoonFlamePath(width = 480, baseY = 46, segments = 24): string {
  const step = width / segments;
  let d = `M 0 ${baseY}`;

  for (let i = 0; i < segments; i++) {
    const x0 = i * step;
    const x1 = x0 + step;
    const peakX = x0 + step * 0.5;
    const peakY = baseY - PEAK_HEIGHTS[i % PEAK_HEIGHTS.length];
    d += ` L ${x0} ${baseY} L ${peakX} ${peakY} L ${x1} ${baseY}`;
  }

  d += ` L ${width} ${baseY} Z`;
  return d;
}

function ContinuousFlameStrip({ uid }: { uid: string }) {
  const gradId = `${uid}-flame-fill`;
  const flamePath = useMemo(() => buildCartoonFlamePath(), []);

  return (
    <svg
      className="city-energy-flame-strip-svg"
      viewBox="0 0 480 52"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="240" y1="46" x2="240" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="50%" stopColor="#ffeb3b" />
          <stop offset="78%" stopColor="#ffc107" />
          <stop offset="100%" stopColor="#ff9800" />
        </linearGradient>
      </defs>

      {/* Ground glow */}
      <ellipse
        className="city-energy-flame-ground-glow"
        cx="240"
        cy="49"
        rx="230"
        ry="5"
        fill="#ff9800"
        opacity="0.45"
      />

      {/* Thick orange base bar */}
      <rect x="0" y="43" width="480" height="5" fill="#ff6f00" />

      {/* Yellow fill + red cartoon outline + inner yellow rim */}
      <path
        className="city-energy-flame-strip-fill"
        d={flamePath}
        fill={`url(#${gradId})`}
        stroke="#c62828"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke fill"
      />
      <path
        className="city-energy-flame-strip-inner"
        d={flamePath}
        fill="none"
        stroke="#ffeb3b"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.95"
      />
    </svg>
  );
}

function EmberSvg({ uid }: { uid: string }) {
  return (
    <svg className="city-energy-ember-svg" viewBox="0 0 10 16" fill="none" aria-hidden>
      <defs>
        <radialGradient id={`${uid}-ember`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="45%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#ff6f00" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <path
        className="city-energy-ember-body"
        d="M5 0 C6.5 0 7.5 2 7.5 4 C7.5 7 6.5 11 5.5 14 C5 15.5 5 16 5 16 C5 16 4.5 15.5 4 14 C3 11 2 7 2 4 C2 2 3.5 0 5 0Z"
        fill={`url(#${uid}-ember)`}
      />
    </svg>
  );
}

export default function CityEnergyFlames({ intensity, blazing, reducedMotion, mobileLite = false }: CityEnergyFlamesProps) {
  const baseId = useId();
  const dripMax = mobileLite ? 5 : 10;
  const dripCount = blazing ? dripMax : Math.max(mobileLite ? 3 : 4, Math.round(intensity * (mobileLite ? 5 : 7)));

  return (
    <div
      className={`city-energy-fire-stack ${blazing ? "is-blazing" : ""} ${reducedMotion ? "is-static" : ""}`}
      style={{ "--flame-intensity": String(intensity) } as React.CSSProperties}
      aria-hidden
    >
      <div className="city-energy-flames city-energy-flames-crest">
        <ContinuousFlameStrip uid={baseId} />
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
            <EmberSvg uid={`${baseId}-e-${i}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
