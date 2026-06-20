"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { PopWorldCameraPhase } from "@/lib/popworld/types";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import type { VerifiedBusiness } from "@/lib/city/businesses";

const PHASE_LABELS: Partial<Record<PopWorldCameraPhase, string>> = {
  satellite: "Scanning your city…",
  descent: "Descending into Miami…",
  "buildings-rise": "Buildings rising…",
  "lights-on": "City lights awakening…",
  districts: "Districts coming online…",
  "venues-glow": "Venues pulsing with energy…",
  alive: "POP WORLD is alive",
};

type PopWorldHudProps = {
  phase: PopWorldCameraPhase;
  activeCount: number;
  rankedBusinesses: (VerifiedBusiness & { vibeScore?: number })[];
  selectedVenueId: string | null;
  onSelectVenue: (slug: string) => void;
};

function PopWorldHud({
  phase,
  activeCount,
  rankedBusinesses,
  selectedVenueId,
  onSelectVenue,
}: PopWorldHudProps) {
  const phaseLabel = PHASE_LABELS[phase] ?? "";

  return (
    <div className="popworld-hud">
      <header className="popworld-hud__header">
        <p className="popworld-hud__eyebrow">POP WORLD</p>
        <h1 className="popworld-hud__title">YOUR CITY IS ALIVE</h1>
        <p className="popworld-hud__sub">
          {activeCount} venues surging · Real buildings · Real energy
        </p>
        {phase !== "alive" && (
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
