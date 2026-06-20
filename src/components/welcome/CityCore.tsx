"use client";

import { motion } from "framer-motion";
import type { EnergyTier } from "./types";

type CityCoreProps = {
  energy: number;
  tier: EnergyTier;
  reducedMotion: boolean;
};

export default function CityCore({ energy, tier, reducedMotion }: CityCoreProps) {
  const norm = energy / 100;
  const ignited = tier === "on-fire" || tier === "overdrive";

  return (
    <div
      className={`city-core ${ignited ? "is-ignited" : ""} tier-${tier}`}
      aria-hidden
      style={{ "--core-energy": String(norm) } as Record<string, string>}
    >
      <div className="city-core-ring city-core-ring-outer" />
      <div className="city-core-ring city-core-ring-inner" />
      {!reducedMotion && (
        <>
          <span className="city-core-orbit city-core-orbit-1" />
          <span className="city-core-orbit city-core-orbit-2" />
          <span className="city-core-orbit city-core-orbit-3" />
        </>
      )}
      <motion.div
        className="city-core-orb"
        animate={
          reducedMotion
            ? { scale: 1 }
            : { scale: [1, 1 + norm * 0.06, 1], opacity: [0.88, 1, 0.88] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="city-core-label font-display">City Core</div>
    </div>
  );
}
