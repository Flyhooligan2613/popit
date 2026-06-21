"use client";

import { useId } from "react";

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

/** One continuous flame band — flat base, cartoon peaks across full width */
const FLAME_STRIP_PATH = `
M 0 46
C 6 46 9 43 13 37
C 17 29 21 33 25 24
C 29 15 33 19 37 11
C 41 5 45 13 49 17
C 53 9 57 7 61 15
C 65 23 69 17 73 11
C 77 7 81 15 85 21
C 89 13 93 9 97 17
C 101 25 105 19 109 13
C 113 7 117 15 121 21
C 125 13 129 9 133 17
C 137 25 141 19 145 13
C 149 7 153 15 157 21
C 161 13 165 9 169 17
C 173 25 177 19 181 13
C 185 7 189 15 193 21
C 197 13 201 9 205 17
C 209 25 213 19 217 13
C 221 7 225 15 229 21
C 233 13 237 9 241 17
C 245 25 249 19 253 13
C 257 7 261 15 265 21
C 269 13 273 9 277 17
C 281 25 285 19 289 13
C 293 7 297 15 301 21
C 305 13 309 9 313 17
C 317 25 321 19 325 13
C 329 7 333 15 337 21
C 341 13 345 9 349 17
C 353 25 357 19 361 13
C 365 7 369 15 373 21
C 377 13 381 9 385 17
C 389 25 393 19 397 13
L 400 46
L 0 46
Z
`;

function ContinuousFlameStrip({
  uid,
  distort,
  intensity,
}: {
  uid: string;
  distort: boolean;
  intensity: number;
}) {
  const distortId = `${uid}-strip-distort`;
  const glowId = `${uid}-strip-glow`;
  const yellowId = `${uid}-strip-yellow`;
  const orangeId = `${uid}-strip-orange`;

  return (
    <svg
      className="city-energy-flame-strip-svg"
      viewBox="0 0 400 50"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        {distort && (
          <filter id={distortId} x="-8%" y="-35%" width="116%" height="170%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.08"
              numOctaves="2"
              seed="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="0.85s"
                repeatCount="indefinite"
                values="0.012 0.08;0.018 0.11;0.014 0.09;0.012 0.08"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        )}
        <radialGradient id={glowId} cx="50%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#ff7700" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#ff3300" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ff1100" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={yellowId} x1="200" y1="46" x2="200" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffb300" />
          <stop offset="35%" stopColor="#ffe566" />
          <stop offset="72%" stopColor="#fff176" />
          <stop offset="100%" stopColor="#fffde7" />
        </linearGradient>
        <linearGradient id={orangeId} x1="200" y1="46" x2="200" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cc2200" />
          <stop offset="40%" stopColor="#ff4500" />
          <stop offset="100%" stopColor="#ff6b00" />
        </linearGradient>
      </defs>

      <ellipse
        className="city-energy-flame-strip-glow"
        cx="200"
        cy="48"
        rx="210"
        ry="10"
        fill={`url(#${glowId})`}
        style={{ opacity: 0.35 + intensity * 0.45 }}
      />

      <g filter={distort ? `url(#${distortId})` : undefined} className="city-energy-flame-strip-body">
        <path
          className="city-energy-flame-strip-outline"
          d={FLAME_STRIP_PATH}
          fill={`url(#${orangeId})`}
          stroke="#c41e00"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          className="city-energy-flame-strip-core"
          d={FLAME_STRIP_PATH}
          fill={`url(#${yellowId})`}
          transform="translate(200 46) scale(0.86) translate(-200 -46)"
        />
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

export default function CityEnergyFlames({ intensity, blazing, reducedMotion, mobileLite = false }: CityEnergyFlamesProps) {
  const baseId = useId();
  const dripMax = mobileLite ? 4 : 9;
  const dripCount = blazing ? dripMax : Math.max(mobileLite ? 2 : 3, Math.round(intensity * (mobileLite ? 4 : 6)));
  const distort = !reducedMotion && !mobileLite;

  return (
    <div
      className={`city-energy-fire-stack ${blazing ? "is-blazing" : ""} ${reducedMotion ? "is-static" : ""}`}
      style={{ "--flame-intensity": String(intensity) } as React.CSSProperties}
      aria-hidden
    >
      <div className="city-energy-flames city-energy-flames-crest">
        <ContinuousFlameStrip uid={baseId} distort={distort} intensity={intensity} />
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
