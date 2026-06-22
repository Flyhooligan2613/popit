"use client";

import { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useResolvedCity } from "@/hooks/useResolvedCity";
import { getCityWorld } from "@/lib/popworld/cityWorlds";
import { rankBusinessesWithLookups } from "@/lib/popworld/cityBusinesses";
import { getVerifiedBusinessesForCity } from "@/lib/popworld/cityBusinesses";
import { recordVenueLookup } from "@/lib/popworld/venueLookup";
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
  const userCity = useResolvedCity();

  const cityWorld = getCityWorld(userCity);

  const rankedBusinesses = useMemo(() => {
    const boosted = rankBusinessesWithLookups(userCity);
    return rankByVibe(
      boosted.map((b) => ({
        ...b,
        id: b.slug,
        signals: b.vibeSignals,
        baseEnergy: b.displayEnergy,
      }))
    );
  }, [userCity]);

  const verifiedBusinesses = useMemo(() => getVerifiedBusinessesForCity(userCity), [userCity]);

  const selectedBusiness =
    verifiedBusinesses.find((b) => b.slug === selectedVenueId) ?? null;

  const activeCount = rankedBusinesses.filter(
    (b) => deriveDistrictEnergy(b.vibeSignals, b.energy) >= 60
  ).length;

  const handleSelectVenue = (slug: string) => {
    recordVenueLookup(slug);
    setSelectedVenueId(slug);
  };

  return (
    <div className="popworld-engine">
      <PopWorldMap
        city={userCity}
        selectedVenueId={selectedVenueId}
        onVenueSelect={handleSelectVenue}
        onPhaseChange={setPhase}
      />

      <PopWorldHud
        phase={phase}
        cityWorld={cityWorld}
        activeCount={activeCount}
        verifiedCount={verifiedBusinesses.length}
        rankedBusinesses={rankedBusinesses}
        selectedVenueId={selectedVenueId}
        onSelectVenue={handleSelectVenue}
      />

      <PopWorldVenuePanel business={selectedBusiness} onClose={() => setSelectedVenueId(null)} />
    </div>
  );
}

export default memo(PopWorldEngine);
