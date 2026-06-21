"use client";

import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";

type PopScoreRingProps = {
  score: number;
  reducedMotion?: boolean;
};

export default function PopScoreRing({ score, reducedMotion = false }: PopScoreRingProps) {
  const display = useAnimatedNumber(score, reducedMotion ? 0 : 600);
  const pct = Math.min(100, Math.max(0, display));
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (pct / 100) * circumference;
  const hot = pct >= 90;

  return (
    <div className={`pop-score-ring ${hot ? "is-hot" : ""}`} aria-label={`Pop score ${display}`}>
      <svg className="pop-score-svg" viewBox="0 0 44 44" aria-hidden>
        <circle className="pop-score-track" cx="22" cy="22" r="18" />
        <circle
          className="pop-score-fill"
          cx="22"
          cy="22"
          r="18"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="pop-score-inner font-body">
        <span className="pop-score-label">POP</span>
        <span className="pop-score-value font-display">{display}</span>
      </div>
    </div>
  );
}
