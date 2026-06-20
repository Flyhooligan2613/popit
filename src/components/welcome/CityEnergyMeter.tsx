"use client";

import { motion } from "framer-motion";

type CityEnergyMeterProps = {
  value: number;
  label: string;
  tier: "cool" | "warm" | "hot" | "overdrive";
  reducedMotion: boolean;
};

const TIER_CLASS = {
  cool: "energy-tier-cool",
  warm: "energy-tier-warm",
  hot: "energy-tier-hot",
  overdrive: "energy-tier-overdrive",
} as const;

export default function CityEnergyMeter({ value, label, tier, reducedMotion }: CityEnergyMeterProps) {
  const onFire = tier === "overdrive";
  const fillPct = `${Math.round(value)}%`;

  return (
    <div
      className={`city-energy ${TIER_CLASS[tier]} ${onFire ? "is-on-fire" : ""}`}
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`City energy ${Math.round(value)} percent, ${label}`}
    >
      <div className="city-energy-header">
        <span className="city-energy-title font-display">City Energy</span>
        <span className="city-energy-value font-display">{Math.round(value)}%</span>
      </div>

      <div className="city-energy-track">
        <motion.div
          className="city-energy-fill"
          initial={false}
          animate={{ width: fillPct }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        {onFire && !reducedMotion && (
          <>
            <span className="city-energy-spark city-energy-spark-1" aria-hidden />
            <span className="city-energy-spark city-energy-spark-2" aria-hidden />
            <span className="city-energy-spark city-energy-spark-3" aria-hidden />
            <span className="city-energy-heat" aria-hidden />
          </>
        )}
      </div>

      <p className="city-energy-label font-display">{label}</p>
    </div>
  );
}
