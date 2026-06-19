"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassPanel from "@/components/pulse/GlassPanel";
import HypeLevel, { HypeLabel } from "@/components/pulse/HypeLevel";
import { HypeLiveBadge } from "@/components/pulse/LiveDot";
import LensProfileTransition from "@/components/profile/LensProfileTransition";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import type { VerifiedBusiness } from "@/lib/city/businesses";

type MapBottomSheetProps = {
  business: VerifiedBusiness | null;
  onClose: () => void;
};

function MapBottomSheet({ business, onClose }: MapBottomSheetProps) {
  const energy = business ? deriveDistrictEnergy(business.vibeSignals, business.energy) : 0;
  const theme = business ? getDistrictTheme(business.districtId) : null;

  return (
    <AnimatePresence>
      {business && theme && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-[72px] left-0 right-0 z-50 mx-auto max-w-[680px] px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <GlassPanel weight="light" accent={theme.primary} glow={theme.glow} hover={false} className="w-full">
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-poster text-lg text-white">{business.name}</h3>
                    <p className="font-body text-xs text-white/45">{business.tagline}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 rounded-full border border-white/10 px-2 py-1 font-body text-[0.65rem] text-white/40"
                  >
                    Close
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <LensProfileTransition
                    name={business.name}
                    followers={18400 + energy * 100}
                    creatorLevel={6 + Math.floor(energy / 12)}
                    influence={energy}
                    verified
                    live={business.live}
                    accent={theme.primary}
                    href={`/business/${business.slug}`}
                    size={64}
                  />
                  {business.live && <HypeLiveBadge energy={energy} />}
                </div>

                <div className="mb-3">
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="text-poster text-[0.65rem] tracking-wider text-white/45">Hype Level</span>
                    <HypeLabel energy={energy} />
                  </div>
                  <HypeLevel energy={energy} seed={business.slug} />
                </div>

                {business.waitTime && (
                  <p className="font-body text-xs text-white/50">
                    Wait · <span style={{ color: theme.primary }}>{business.waitTime}</span>
                  </p>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(MapBottomSheet);
