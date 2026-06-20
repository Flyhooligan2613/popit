"use client";

import { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { VERIFIED_BUSINESSES } from "@/lib/city/businesses";
import { deriveDistrictEnergy, rankByVibe } from "@/lib/city/vibeEngine";
import type { PopWorldCameraPhase } from "@/lib/popworld/types";
import PopWorldHud from "./PopWorldHud";
import PopWorldVenuePanel from "./PopWorldVenuePanel";
import "./popworld.css";

const PopWorldMap = dynamic(() => import("./PopWorldMap"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

function PopWorldEngine() {
  const searchParams = useSearchParams();
  const highlightSlug = searchParams.get("venue");
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(highlightSlug);
  const [phase, setPhase] = useState<PopWorldCameraPhase>("satellite");

  const rankedBusinesses = useMemo(
    () =>
      rankByVibe(
        VERIFIED_BUSINESSES.map((b) => ({
          ...b,
          id: b.slug,
          signals: b.vibeSignals,
          baseEnergy: b.energy,
        }))
      ),
    []
  );

  const selectedBusiness =
    VERIFIED_BUSINESSES.find((b) => b.slug === selectedVenueId) ?? null;

  const activeCount = rankedBusinesses.filter(
    (b) => deriveDistrictEnergy(b.vibeSignals, b.energy) >= 60
  ).length;

  const handleSelectVenue = (slug: string) => {
    setSelectedVenueId(slug);
  };

  const handleClosePanel = () => {
    setSelectedVenueId(null);
  };

  return (
    <div className="popworld-engine">
      <PopWorldMap
        selectedVenueId={selectedVenueId}
        onVenueSelect={handleSelectVenue}
        onPhaseChange={setPhase}
      />

      <PopWorldHud
        phase={phase}
        activeCount={activeCount}
        rankedBusinesses={rankedBusinesses}
        selectedVenueId={selectedVenueId}
        onSelectVenue={handleSelectVenue}
      />

      <PopWorldVenuePanel business={selectedBusiness} onClose={handleClosePanel} />
    </div>
  );
}

export default memo(PopWorldEngine);
