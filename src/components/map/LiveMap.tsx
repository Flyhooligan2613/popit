"use client";

import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import LivingCityBackground from "@/components/pulse/LivingCityBackground";
import { VERIFIED_BUSINESSES } from "@/lib/city/businesses";
import { deriveDistrictEnergy, rankByVibe } from "@/lib/city/vibeEngine";
import { getVenueCameraTarget } from "./livingWorldData";
import LivingWorldMap from "./LivingWorldMap";
import MapBottomSheet from "./MapBottomSheet";
import "./map.css";

function LiveMap() {
  const searchParams = useSearchParams();
  const highlightSlug = searchParams.get("venue");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(highlightSlug);
  const [cameraSlug, setCameraSlug] = useState<string | null>(null);

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
    VERIFIED_BUSINESSES.find((b) => b.slug === selectedSlug) ?? null;

  const camera = cameraSlug ? getVenueCameraTarget(cameraSlug) : { x: 0, y: 0, scale: 1 };

  const handleSelectVenue = (slug: string) => {
    setSelectedSlug(slug);
    setCameraSlug(slug);
  };

  const handleCloseSheet = () => {
    setSelectedSlug(null);
    setCameraSlug(null);
  };

  const activeCount = rankedBusinesses.filter(
    (b) => deriveDistrictEnergy(b.vibeSignals, b.energy) >= 60
  ).length;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <LivingCityBackground />

      <div className="relative z-[1] mx-auto flex h-full max-w-[680px] flex-col px-3 pb-24 pt-10">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 px-1"
        >
          <p className="mb-1 font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#00D4FF]/80">
            Living World
          </p>
          <h1 className="text-poster mb-1 text-[clamp(2.4rem,8vw,3.2rem)] text-white">
            STEP INTO THE CITY
          </h1>
          <p className="font-body text-sm text-white/40">
            {activeCount} venues alive · The city breathes without you
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[380px] flex-1 overflow-hidden rounded-[20px] border border-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, #180a20 0%, #030303 75%)",
            perspective: "900px",
          }}
        >
          <motion.div
            className="h-full w-full"
            animate={{
              scale: camera.scale,
              x: camera.x,
              y: camera.y,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50% 45%" }}
          >
            <LivingWorldMap
              businesses={rankedBusinesses}
              selectedSlug={selectedSlug}
              onSelectVenue={handleSelectVenue}
            />
          </motion.div>

          {cameraSlug && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 bg-black/20"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-3 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rankedBusinesses.slice(0, 5).map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => handleSelectVenue(b.slug)}
              className="shrink-0 rounded-full border border-white/[0.08] bg-black/50 px-3 py-1.5 font-body text-[0.65rem] font-semibold uppercase tracking-wider text-white/55 backdrop-blur-sm"
            >
              {b.name}
            </button>
          ))}
        </motion.div>
      </div>

      <MapBottomSheet business={selectedBusiness} onClose={handleCloseSheet} />
    </div>
  );
}

export default memo(LiveMap);
