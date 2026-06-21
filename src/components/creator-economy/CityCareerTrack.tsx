"use client";

import { motion } from "framer-motion";
import { POP_STATUS_LEVELS } from "@/lib/creator-economy/statusLevels";
import type { PopStatusState } from "@/lib/creator-economy/types";

type CityCareerTrackProps = {
  career: PopStatusState;
  reducedMotion?: boolean;
  compact?: boolean;
};

export default function CityCareerTrack({ career, reducedMotion = false, compact = false }: CityCareerTrackProps) {
  const activeIdx = POP_STATUS_LEVELS.findIndex((l) => l.id === career.level.id);

  return (
    <div className={`city-career-track ${compact ? "is-compact" : ""}`}>
      <div className="city-career-track-levels" role="list" aria-label="POP Status progression">
        {POP_STATUS_LEVELS.map((level, i) => {
          const state = i < activeIdx ? "past" : i === activeIdx ? "active" : "future";
          const dotContent =
            state === "past" ? "✓" : level.id === "icon" ? "👑" : level.hasPremiumBadge ? "◆" : "⭐";

          return (
            <div
              key={level.id}
              className={`city-career-track-node is-${state} pop-status-track-${level.id}`}
              style={{ "--career-accent": level.accent } as React.CSSProperties}
              role="listitem"
              aria-current={state === "active" ? "step" : undefined}
              title={level.label}
            >
              <span className="city-career-track-dot" aria-hidden>
                {dotContent}
              </span>
              {!compact && <span className="city-career-track-name font-body">{level.label}</span>}
            </div>
          );
        })}
      </div>

      {career.nextLevel && (
        <div className="city-career-track-progress">
          <div className="city-career-track-progress-meta font-body">
            <span>{Math.round(career.progressToNext * 100)}% to {career.nextLevel.label}</span>
            <span>POP {career.metrics.popScore}</span>
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
          {career.nextRequirements.length > 0 && (
            <p className="city-career-track-gaps font-body">
              {career.nextRequirements.slice(0, 2).join(" · ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
