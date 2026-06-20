"use client";

import type { EnergyTier } from "./types";
import { GLOBE_HOTSPOTS } from "./data";

type HolographicGlobeProps = {
  energyNorm: number;
  tier: EnergyTier;
  reducedMotion: boolean;
  focusCity?: string | null;
};

export default function HolographicGlobe({
  energyNorm,
  tier,
  reducedMotion,
  focusCity,
}: HolographicGlobeProps) {
  const ignited = tier === "on-fire" || tier === "overdrive";
  const activeCount = Math.min(
    GLOBE_HOTSPOTS.length,
    Math.max(2, Math.round(2 + energyNorm * (GLOBE_HOTSPOTS.length - 2)))
  );

  const nodes = GLOBE_HOTSPOTS.map((node, i) => ({
    ...node,
    active: i < activeCount || (focusCity && node.city.toLowerCase() === focusCity.toLowerCase()),
  }));

  const activeNodes = nodes.filter((n) => n.active);
  const arcs: { from: (typeof nodes)[0]; to: (typeof nodes)[0] }[] = [];
  for (let i = 0; i < activeNodes.length - 1; i++) {
    if (i % 2 === 0 && activeNodes[i + 1]) {
      arcs.push({ from: activeNodes[i], to: activeNodes[i + 1] });
    }
  }

  return (
    <div
      className={`holo-globe holo-globe-v3 ${ignited ? "is-ignited" : ""} tier-${tier}`}
      aria-label="POP'IT network core"
      style={{ "--globe-energy": String(energyNorm) } as Record<string, string>}
    >
      <div className="holo-globe-stage">
        {!reducedMotion && (
          <>
            <div className="holo-globe-lightning holo-globe-lightning-1" aria-hidden />
            <div className="holo-globe-lightning holo-globe-lightning-2" aria-hidden />
            <div className="holo-globe-flash" aria-hidden />
            <span className="holo-globe-orbit holo-globe-orbit-1" aria-hidden />
            <span className="holo-globe-orbit holo-globe-orbit-2" aria-hidden />
            <span className="holo-globe-orbit holo-globe-orbit-3" aria-hidden />
            <span className="holo-globe-particle holo-globe-particle-1" aria-hidden />
            <span className="holo-globe-particle holo-globe-particle-2" aria-hidden />
            <span className="holo-globe-particle holo-globe-particle-3" aria-hidden />
            <span className="holo-globe-particle holo-globe-particle-4" aria-hidden />
          </>
        )}

        <div className={`holo-globe-rotate ${reducedMotion ? "is-static" : ""}`}>
          <div className="holo-globe-sphere" aria-hidden>
            <div className="holo-globe-grid" />
            <div className="holo-globe-latitude" />
            <div className="holo-globe-shine" />
            <div className="holo-globe-core-glow" />
          </div>

          <svg className="holo-globe-arcs" viewBox="0 0 100 100" aria-hidden>
            {arcs.map(({ from, to }, i) => (
              <path
                key={`${from.id}-${to.id}`}
                className={`holo-globe-arc ${reducedMotion ? "" : "is-animated"}`}
                d={`M ${from.x} ${from.y} Q 50 ${50 - energyNorm * 10} ${to.x} ${to.y}`}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            ))}
          </svg>

          {nodes.map((node) => (
            <span
              key={node.id}
              className={`holo-globe-node ${node.active ? "is-active" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              title={node.city}
              aria-hidden
            >
              <span className="holo-globe-pin" aria-hidden />
              <span className="holo-globe-node-core" />
              {node.active && !reducedMotion && <span className="holo-globe-node-pulse" />}
            </span>
          ))}
        </div>

        <div className="holo-globe-halo" aria-hidden />
        <div className="holo-globe-ring" aria-hidden />
      </div>

      <p className="holo-globe-label font-display">Network Core</p>
      {focusCity && <p className="holo-globe-focus font-body">Focus · {focusCity}</p>}
    </div>
  );
}
