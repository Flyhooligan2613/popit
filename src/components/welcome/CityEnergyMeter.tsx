"use client";

import { motion } from "framer-motion";
import type { EnergyTier } from "./types";

type CityEnergyMeterProps = {
  value: number;
  label: string;
  tier: EnergyTier;
  reducedMotion: boolean;
  exploringCount?: number;
  cityName?: string | null;
  onClick?: () => void;
};

const TIER_CLASS: Record<EnergyTier, string> = {
  calm: "energy-tier-calm",
  active: "energy-tier-active",
  busy: "energy-tier-busy",
  hot: "energy-tier-hot",
  "on-fire": "energy-tier-on-fire",
  overdrive: "energy-tier-overdrive",
};

export default function CityEnergyMeter({
  value,
  label,
  tier,
  reducedMotion,
  exploringCount = 3590,
  cityName = "Miami",
  onClick,
}: CityEnergyMeterProps) {
  const fillPct = `${Math.round(value)}%`;
  const ignited = tier === "on-fire" || tier === "overdrive";
  const sparking = tier === "hot" || ignited;
  const isLit = value >= 99 && ignited;
  const displayLabel = isLit ? "CITY IS LIT" : label;
  const city = cityName ?? "your city";
  const statusLine =
    ignited || isLit
      ? `ON FIRE: ${city} is absolutely popping tonight! ${exploringCount.toLocaleString()} active explorers.`
      : `${city} energy is building — ${exploringCount.toLocaleString()} explorers active.`;

  const isHighEnergy = value >= 90;

  return (
    <button
      type="button"
      className={`city-energy city-energy-mock city-energy-polish popit-tap-target ${TIER_CLASS[tier]} ${ignited ? "is-ignited" : ""} ${sparking ? "is-sparking" : ""} ${isLit ? "is-lit" : ""} ${isHighEnergy ? "is-high-energy" : ""}`}
      role="group"
      aria-label={`City energy ${Math.round(value)} percent, ${displayLabel}. Tap to open city pulse.`}
      onClick={onClick}
    >
      <div className="city-energy-shimmer" aria-hidden />
      <div className="city-energy-flow" aria-hidden />
      <div className="city-energy-header">
        <span className="city-energy-title font-display">City Energy</span>
        <span className="city-energy-tier-tag font-display">{displayLabel}</span>
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

      <div className="city-energy-track city-energy-track-flame">
        <div className="city-energy-edge-glow" aria-hidden />
        <motion.div
          className="city-energy-fill city-energy-fill-flame"
          initial={false}
          animate={{ width: fillPct }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="city-energy-charge" aria-hidden />
        <div className="city-energy-stream" aria-hidden />
        {!reducedMotion && (
          <>
            <span className="city-energy-bar-particle city-energy-bar-particle-1" aria-hidden />
            <span className="city-energy-bar-particle city-energy-bar-particle-2" aria-hidden />
            <span className="city-energy-bar-particle city-energy-bar-particle-3" aria-hidden />
          </>
        )}
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

      <p className="city-energy-status font-body">{statusLine}</p>
    </button>
  );
}
