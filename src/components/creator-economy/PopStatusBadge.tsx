"use client";

import PopMark from "@/components/pop-marks/PopMark";
import type { PopStatusLevel, PopStatusState } from "@/lib/creator-economy/types";

type PopStatusBadgeProps = {
  level: PopStatusLevel;
  size?: "sm" | "md";
  animate?: boolean;
  career?: PopStatusState | null;
};

const SIZE_MAP = { sm: 16, md: 20 } as const;

export default function PopStatusBadge({ level, size = "md", animate = true, career = null }: PopStatusBadgeProps) {
  if (level.popMark) {
    return (
      <PopMark
        tier={level.popMark}
        size={SIZE_MAP[size]}
        animate={animate}
        interactive
        career={career}
        label={`${level.label} POP Mark`}
      />
    );
  }

  return (
    <span className={`pop-status-rising-only pop-status-rising-only-${size} font-body`}>
      {level.badge && (
        <span className="pop-status-rising-star" aria-hidden>
          {level.badge}
        </span>
      )}
      <span>{level.label}</span>
    </span>
  );
}
