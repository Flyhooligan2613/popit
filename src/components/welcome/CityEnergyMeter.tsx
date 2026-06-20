"use client";

import { motion } from "framer-motion";
import type { EnergyTier } from "./types";

type CityEnergyMeterProps = {
  value: number;
  label: string;
  tier: EnergyTier;
  reducedMotion: boolean;
};

const TIER_CLASS: Record<EnergyTier, string> = {
  calm: "energy-tier-calm",
  active: "energy-tier-active",
  busy: "energy-tier-busy",
  hot: "energy-tier-hot",
  "on-fire": "energy-tier-on-fire",
  overdrive: "energy-tier-overdrive",
};

export default function CityEnergyMeter({ value, label, tier, reducedMotion }: CityEnergyMeterProps) {
  const fillPct = `${Math.round(value)}%`;
  const ignited = tier === "on-fire" || tier === "overdrive";
  const sparking = tier === "hot" || ignited;
  const isLit = value >= 99 && ignited;
  const displayLabel = isLit ? "CITY IS LIT" : label;

  return (
    <div
      className={`city-energy city-energy-v3 ${TIER_CLASS[tier]} ${ignited ? "is-ignited" : ""} ${sparking ? "is-sparking" : ""} ${isLit ? "is-lit" : ""}`}
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`City energy ${Math.round(value)} percent, ${displayLabel}`}
    >
      <div className="city-energy-shimmer" aria-hidden />
      <div className="city-energy-flow" aria-hidden />
      <div className="city-energy-header">
        <span className="city-energy-title font-display">City Energy</span>
        <motion.span
          key={Math.round(value)}
          className="city-energy-value font-display"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          {Math.round(value)}%
        </motion.span>
      </div>

      <div className="city-energy-track">
        <motion.div
          className="city-energy-fill"
          initial={false}
          animate={{ width: fillPct }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="city-energy-charge" aria-hidden />
        <div className="city-energy-stream" aria-hidden />
        {!reducedMotion && sparking && (
          <>
            <span className="city-energy-spark city-energy-spark-1" aria-hidden />
            <span className="city-energy-spark city-energy-spark-2" aria-hidden />
            <span className="city-energy-spark city-energy-spark-3" aria-hidden />
          </>
        )}
        {ignited && !reducedMotion && (
          <>
            <span className="city-energy-flame city-energy-flame-1" aria-hidden />
            <span className="city-energy-flame city-energy-flame-2" aria-hidden />
            <span className="city-energy-heat" aria-hidden />
          </>
        )}
      </div>

      <motion.p
        key={displayLabel}
        className="city-energy-label font-display"
        animate={isLit ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={isLit ? { duration: 1.2, repeat: Infinity } : undefined}
      >
        {displayLabel}
      </motion.p>
    </div>
  );
}
