"use client";

import { useMemo } from "react";

type HeroParticleFieldProps = {
  scrollProgress: number;
  reducedMotion: boolean;
};

const COUNT = 22;

function seeded(i: number, mod: number) {
  return ((i * 17 + 7) % mod) / mod;
}

export default function HeroParticleField({ scrollProgress, reducedMotion }: HeroParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        x: 4 + seeded(i, 92) * 92,
        y: 8 + seeded(i + 3, 88) * 84,
        size: i % 4 === 0 ? 2 : i % 3 === 0 ? 3 : 1.5,
        delay: seeded(i, 6) * 5,
        duration: 5 + seeded(i + 1, 4) * 4,
        sparkle: i % 7 === 0,
      })),
    []
  );

  if (reducedMotion) return null;

  const driftY = scrollProgress * -18;

  return (
    <div
      className="hero-particle-field"
      aria-hidden
      style={{ "--hero-particle-drift": `${driftY}px` } as Record<string, string>}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`hero-particle ${p.sparkle ? "is-sparkle" : ""}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
