"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { PopWorldCameraPhase } from "@/lib/popworld/types";
import type { CityWorldConfig } from "@/lib/popworld/cityWorlds";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import type { VerifiedBusiness } from "@/lib/city/businesses";

type PopWorldHudProps = {
  phase: PopWorldCameraPhase;
  cityWorld: CityWorldConfig;
  activeCount: number;
  verifiedCount: number;
  rankedBusinesses: (VerifiedBusiness & { vibeScore?: number })[];
  selectedVenueId: string | null;
  onSelectVenue: (slug: string) => void;
};

function PopWorldHud({
  phase,
  cityWorld,
  activeCount,
  verifiedCount,
  rankedBusinesses,
  selectedVenueId,
  onSelectVenue,
}: PopWorldHudProps) {
  const phaseLabel =
    phase === "satellite"
      ? `Scanning ${cityWorld.label}…`
      : phase === "descent"
        ? cityWorld.descentLine
        : phase === "alive"
          ? cityWorld.aliveLine
          : null;

  return (
    <div className="popworld-hud">
      <header className="popworld-hud__header">
        <p className="popworld-hud__eyebrow">POP WORLD · Verified</p>
        <h1 className="popworld-hud__title">{cityWorld.downtownLabel}</h1>
        <p className="popworld-hud__sub">
          {verifiedCount} verified spots · {activeCount} surging · Real streets · Live energy
        </p>
        {phaseLabel && phase !== "alive" && (
          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="popworld-hud__phase"
          >
            {phaseLabel}
          </motion.p>
        )}
      </header>

      <div className="popworld-hud__chips">
        {rankedBusinesses.slice(0, 6).map((biz) => {
          const energy = deriveDistrictEnergy(biz.vibeSignals, biz.energy);
          return (
            <button
              key={biz.slug}
              type="button"
              className={`popworld-hud__chip${selectedVenueId === biz.slug ? " popworld-hud__chip--active" : ""}`}
              onClick={() => onSelectVenue(biz.slug)}
            >
              {biz.verified && <span className="popworld-hud__verified" aria-label="Verified">✓</span>}
              {biz.name}
              <span className="popworld-hud__chip-energy">{energy}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(PopWorldHud);
