"use client";

import { motion } from "framer-motion";
import { DEFAULT_CITY_LABEL } from "@/lib/location/cityDetection";
import CityEnergyFlames from "./CityEnergyFlames";
import type { EnergyTier } from "./types";

type CityEnergyMeterProps = {
  value: number;
  label: string;
  tier: EnergyTier;
  reducedMotion: boolean;
  mobileLite?: boolean;
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

function energyVibrance(value: number): number {
  return Math.max(0.28, Math.min(1, (value - 42) / 58));
}

export default function CityEnergyMeter({
  value,
  label,
  tier,
  reducedMotion,
  mobileLite = false,
  exploringCount = 3590,
  cityName = DEFAULT_CITY_LABEL,
  onClick,
}: CityEnergyMeterProps) {
  const rounded = Math.round(value);
  const fillPct = `${rounded}%`;
  const vibrance = energyVibrance(value);
  const ignited = tier === "on-fire" || tier === "overdrive";
  const blazing = value >= 82;
  const cooling = value < 62;
  const showFlames = value >= 55;
  const showSparks = value >= 48;
  const isLit = value >= 94 && (ignited || blazing);
  const displayLabel = isLit ? "CITY IS LIT" : blazing ? "ON FIRE" : label;
  const city = cityName ?? "your city";
  const statusLine =
    isLit || blazing
      ? `ON FIRE: ${city} is absolutely popping tonight! ${exploringCount.toLocaleString()} active explorers.`
      : cooling
        ? `${city} is cooling off — ${exploringCount.toLocaleString()} explorers still out.`
        : `${city} energy is building — ${exploringCount.toLocaleString()} explorers active.`;

  return (
    <button
      type="button"
      className={`city-energy city-energy-mock city-energy-polish popit-tap-target ${TIER_CLASS[tier]} ${ignited ? "is-ignited" : ""} ${blazing ? "is-blazing" : ""} ${cooling ? "is-cooling" : ""} ${isLit ? "is-lit" : ""} ${value >= 90 ? "is-high-energy" : ""}`}
      style={
        {
          "--energy-vibrance": String(vibrance),
          "--energy-pct": String(rounded),
        } as React.CSSProperties
      }
      role="group"
      aria-label={`City energy ${rounded} percent, ${displayLabel}. Tap to open city pulse.`}
      onClick={onClick}
    >
      <div className="city-energy-shimmer" aria-hidden />
      <div className="city-energy-flow" aria-hidden />
      <div className="city-energy-header">
        <span className="city-energy-title font-display">City Energy</span>
        <span className="city-energy-tier-tag font-display">{displayLabel}</span>
        <motion.span
          key={rounded}
          className="city-energy-value font-display"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          {rounded}%
        </motion.span>
      </div>

      <div className="city-energy-track city-energy-track-flame">
        <div className="city-energy-edge-glow" aria-hidden />
        <motion.div
          className="city-energy-fill city-energy-fill-flame"
          initial={false}
          animate={{ width: fillPct }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {showFlames && <div className="city-energy-fill-fire-coat" aria-hidden />}
        </motion.div>
        {showFlames && (
          <motion.div
            className="city-energy-flame-crest"
            initial={false}
            animate={{ width: fillPct }}
            transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <CityEnergyFlames
              intensity={vibrance}
              blazing={blazing}
              reducedMotion={reducedMotion}
              mobileLite={mobileLite}
            />
          </motion.div>
        )}
        <div className="city-energy-charge" aria-hidden />
        <div className="city-energy-stream" aria-hidden />
        {!reducedMotion && (
          <>
            <span className="city-energy-bar-particle city-energy-bar-particle-1" aria-hidden />
            <span className="city-energy-bar-particle city-energy-bar-particle-2" aria-hidden />
            <span className="city-energy-bar-particle city-energy-bar-particle-3" aria-hidden />
          </>
        )}
        {!reducedMotion && showSparks && (
          <>
            <span className="city-energy-spark city-energy-spark-1" aria-hidden />
            <span className="city-energy-spark city-energy-spark-2" aria-hidden />
            <span className="city-energy-spark city-energy-spark-3" aria-hidden />
          </>
        )}
        {!reducedMotion && blazing && (
          <>
            <span className="city-energy-ember city-energy-ember-1" aria-hidden />
            <span className="city-energy-ember city-energy-ember-2" aria-hidden />
            <span className="city-energy-ember city-energy-ember-3" aria-hidden />
          </>
        )}
      </div>

      <p className="city-energy-status font-body">{statusLine}</p>
    </button>
  );
}
