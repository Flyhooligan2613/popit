"use client";

import type { CityCareerLevel } from "@/lib/creator-economy/types";

type CityCareerBadgeProps = {
  level: CityCareerLevel;
  size?: "sm" | "md";
};

export default function CityCareerBadge({ level, size = "md" }: CityCareerBadgeProps) {
  return (
    <span
      className={`city-career-badge city-career-badge-${size}`}
      style={{ "--career-accent": level.accent } as React.CSSProperties}
    >
      <span className="city-career-badge-icon" aria-hidden>
        {level.badge}
      </span>
      <span className="city-career-badge-label font-body">{level.label}</span>
    </span>
  );
}
