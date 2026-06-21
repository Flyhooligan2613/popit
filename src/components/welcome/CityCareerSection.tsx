"use client";

import { motion } from "framer-motion";
import PopStatusBadge from "@/components/creator-economy/PopStatusBadge";
import CityCareerTrack from "@/components/creator-economy/CityCareerTrack";
import PopScorePanel from "@/components/creator-economy/PopScorePanel";
import { useLivePopScore } from "@/components/creator-economy/useLivePopScore";
import { getUpcomingChannels } from "@/lib/creator-economy";

type CityCareerSectionProps = {
  reducedMotion: boolean;
  onExplore?: () => void;
  onSectionClick?: () => void;
};

export default function CityCareerSection({ reducedMotion, onExplore, onSectionClick }: CityCareerSectionProps) {
  const economy = useLivePopScore(reducedMotion);
  const upcoming = getUpcomingChannels(economy.career.level.id, 2);

  return (
    <section className="city-career-section" aria-label="POP'IT Identity and Status">
      <button type="button" className="city-career-header popit-tap-target" onClick={onSectionClick ?? onExplore}>
        <div className="city-career-header-left">
          <span className="city-career-header-icon" aria-hidden>
            ◆
          </span>
          <div>
            <h2 className="city-career-title font-display">POP Status</h2>
            <p className="city-career-sub font-body">
              Achievement over popularity — your journey, not a checkmark.
            </p>
          </div>
        </div>
        <PopStatusBadge level={economy.career.level} size="sm" animate={!reducedMotion} />
      </button>

      <div className="city-career-grid">
        <PopScorePanel breakdown={economy.popScore} reducedMotion={reducedMotion} compact />
        <div className="city-career-side">
          <CityCareerTrack career={economy.career} reducedMotion={reducedMotion} compact />
          <div className="city-career-earn">
            <p className="city-career-earn-label font-body">Ways to earn</p>
            <div className="city-career-earn-chips">
              {economy.eligibleChannels.slice(0, 3).map((c) => (
                <span key={c.id} className="city-career-earn-chip font-body">
                  {c.icon} {c.label}
                </span>
              ))}
            </div>
            {upcoming.length > 0 && (
              <p className="city-career-next font-body">
                Next unlock: {upcoming[0].icon} {upcoming[0].label}
              </p>
            )}
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        className="city-career-cta font-body"
        onClick={onExplore}
        whileTap={{ scale: 0.98 }}
      >
        View your status journey
      </motion.button>

      <p className="city-career-quote font-body">
        &ldquo;POP&apos;IT recognizes achievement — not just followers.&rdquo;
      </p>
    </section>
  );
}
