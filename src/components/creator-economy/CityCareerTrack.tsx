"use client";

import { motion } from "framer-motion";
import { CITY_CAREER_LEVELS } from "@/lib/creator-economy/careerLevels";
import type { CityCareerState } from "@/lib/creator-economy/types";

type CityCareerTrackProps = {
  career: CityCareerState;
  reducedMotion?: boolean;
  compact?: boolean;
};

export default function CityCareerTrack({ career, reducedMotion = false, compact = false }: CityCareerTrackProps) {
  const activeIdx = CITY_CAREER_LEVELS.findIndex((l) => l.id === career.level.id);

  return (
    <div className={`city-career-track ${compact ? "is-compact" : ""}`}>
      <div className="city-career-track-levels" role="list" aria-label="City career progression">
        {CITY_CAREER_LEVELS.map((level, i) => {
          const state = i < activeIdx ? "past" : i === activeIdx ? "active" : "future";
          return (
            <div
              key={level.id}
              className={`city-career-track-node is-${state}`}
              style={{ "--career-accent": level.accent } as React.CSSProperties}
              role="listitem"
              aria-current={state === "active" ? "step" : undefined}
            >
              <span className="city-career-track-dot" aria-hidden>
                {state === "past" ? "✓" : level.badge}
              </span>
              {!compact && <span className="city-career-track-name font-body">{level.label}</span>}
            </div>
          );
        })}
      </div>

      {career.nextLevel && (
        <div className="city-career-track-progress">
          <div className="city-career-track-progress-meta font-body">
            <span>{career.xp.toLocaleString()} XP</span>
            <span>{career.nextLevel.label}</span>
          </div>
          <div className="city-career-track-bar" aria-hidden>
            <motion.span
              className="city-career-track-fill"
              style={{ "--career-accent": career.level.accent } as React.CSSProperties}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: career.progressToNext }}
              transition={{ duration: reducedMotion ? 0.15 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
