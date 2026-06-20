"use client";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 19) % 92),
  y: 6 + ((i * 23) % 88),
  size: i % 3 === 0 ? 2 : 3,
  delay: (i % 6) * 0.55,
  duration: 4.5 + (i % 5),
}));

type AmbientFieldProps = {
  active: boolean;
  intensity: number;
};

export default function AmbientField({ active, intensity }: AmbientFieldProps) {
  if (!active) return null;

  return (
    <div
      className="popit-ambient-field"
      aria-hidden
      style={{ "--ambient-intensity": String(intensity) } as Record<string, string>}
    >
      <div className="popit-ambient-wave" />
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="popit-ambient-particle"
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
