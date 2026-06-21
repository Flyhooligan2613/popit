"use client";

import { topSignalContributions } from "@/lib/creator-economy/popScoreEngine";
import type { PopScoreBreakdown } from "@/lib/creator-economy/types";
import PopScoreRing from "@/components/welcome/PopScoreRing";

type PopScorePanelProps = {
  breakdown: PopScoreBreakdown;
  reducedMotion?: boolean;
  compact?: boolean;
};

export default function PopScorePanel({ breakdown, reducedMotion = false, compact = false }: PopScorePanelProps) {
  const topSignals = topSignalContributions(breakdown, compact ? 3 : 4);

  return (
    <div className={`pop-score-panel ${compact ? "is-compact" : ""}`}>
      <div className="pop-score-panel-ring">
        <PopScoreRing score={breakdown.score} reducedMotion={reducedMotion} />
      </div>
      <div className="pop-score-panel-body">
        <p className="pop-score-panel-title font-display">POP Score</p>
        <p className="pop-score-panel-sub font-body">
          Impact index {Math.round(breakdown.impactIndex * 100)} · Community-first ranking
        </p>
        <ul className="pop-score-panel-signals">
          {topSignals.map((s) => (
            <li key={s.key} className="pop-score-signal-row font-body">
              <span className="pop-score-signal-label">{s.label}</span>
              <span className="pop-score-signal-bar" aria-hidden>
                <span className="pop-score-signal-fill" style={{ width: `${Math.max(8, s.pct)}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
