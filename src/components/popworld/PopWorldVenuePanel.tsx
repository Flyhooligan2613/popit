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
import Link from "next/link";

type PopWorldVenuePanelProps = {
  business: VerifiedBusiness | null;
  onClose: () => void;
};

function PopWorldVenuePanel({ business, onClose }: PopWorldVenuePanelProps) {
  const energy = business ? deriveDistrictEnergy(business.vibeSignals, business.energy) : 0;
  const theme = business ? getDistrictTheme(business.districtId) : null;

  return (
    <AnimatePresence>
      {business && theme && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="popworld-venue-panel"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <GlassPanel weight="light" accent={theme.primary} glow={theme.glow} hover={false} className="w-full">
              <div className="popworld-venue-panel__expand p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-poster text-lg text-white">{business.name}</h3>
                      {business.verified && (
                        <span className="rounded-full bg-[#00D4FF]/20 px-2 py-0.5 text-[0.58rem] font-bold text-[#00D4FF]">
                          VERIFIED
                        </span>
                      )}
                      {business.live && <HypeLiveBadge energy={energy} />}
                    </div>
                    <p className="font-body text-xs text-white/45">{business.tagline}</p>
                    <p className="mt-1 font-body text-[0.65rem] uppercase tracking-[0.16em] text-white/30">
                      {business.districtName} · {theme.label} District
                    </p>
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
                    verified={business.verified}
                    live={business.live}
                    href={`/business/${business.slug}`}
                    size={56}
                  />
                  <div className="flex-1">
                    <HypeLabel energy={energy} />
                    <div className="mt-1">
                      <HypeLevel energy={energy} seed={business.slug} />
                    </div>
                  </div>
                </div>

                <div className="popworld-venue-panel__stats">
                  <div className="popworld-venue-panel__stat">
                    <div className="popworld-venue-panel__stat-value">{energy}</div>
                    <div className="popworld-venue-panel__stat-label">POP Score</div>
                  </div>
                  <div className="popworld-venue-panel__stat">
                    <div className="popworld-venue-panel__stat-value">#{Math.max(1, 9 - Math.floor(energy / 12))}</div>
                    <div className="popworld-venue-panel__stat-label">District Rank</div>
                  </div>
                  <div className="popworld-venue-panel__stat">
                    <div className="popworld-venue-panel__stat-value">{business.friendsCheckedIn.length}</div>
                    <div className="popworld-venue-panel__stat-label">Friends Here</div>
                  </div>
                </div>

                {business.waitTime && (
                  <p className="mt-3 font-body text-xs text-white/50">
                    Wait time: <span className="text-white/80">{business.waitTime}</span>
                  </p>
                )}

                {business.menuHighlight && (
                  <p className="mt-2 font-body text-xs text-white/50">
                    Tonight: <span className="text-white/80">{business.menuHighlight}</span>
                  </p>
                )}

                {business.liveContent.length > 0 && (
                  <div className="popworld-venue-panel__media">
                    {business.liveContent.slice(0, 3).map((item) => (
                      <div key={item.id} className="popworld-venue-panel__media-item">
                        {item.type === "live" ? "🔴 " : ""}
                        {item.title}
                      </div>
                    ))}
                  </div>
                )}

                {business.todayEvents.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/35">
                      Tonight
                    </p>
                    {business.todayEvents.map((ev) => (
                      <p key={ev.id} className="font-body text-xs text-white/55">
                        {ev.time} — {ev.title}
                      </p>
                    ))}
                  </div>
                )}

                <Link
                  href={`/business/${business.slug}`}
                  className="mt-4 block w-full rounded-full py-3 text-center font-body text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                    boxShadow: `0 0 24px ${theme.glow}`,
                  }}
                >
                  Enter Venue →
                </Link>
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(PopWorldVenuePanel);
