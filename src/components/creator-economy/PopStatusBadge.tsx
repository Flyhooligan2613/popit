"use client";

import type { PopStatusLevel } from "@/lib/creator-economy/types";

type PopStatusBadgeProps = {
  level: PopStatusLevel;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
};

export default function PopStatusBadge({ level, size = "md", animate = true }: PopStatusBadgeProps) {
  if (!level.hasPremiumBadge) {
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

  return (
    <span
      className={`pop-status-badge pop-status-badge-${level.id} pop-status-badge-${size} ${animate ? "is-animated" : ""} ${level.id === "icon" ? "pop-status-badge-icon" : ""}`}
      style={{ "--status-accent": level.accent } as React.CSSProperties}
      title={level.tagline}
    >
      <span className="pop-status-badge-gem" aria-hidden>
        <span className="pop-status-badge-shine" />
        {level.id === "icon" ? level.badge : null}
      </span>
      <span className="pop-status-badge-label font-body">{level.label}</span>
    </span>
  );
}
