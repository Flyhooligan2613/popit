"use client";

import PopStatusBadge from "./PopStatusBadge";
import type { PopStatusLevel } from "@/lib/creator-economy/types";

type CityCareerBadgeProps = {
  level: PopStatusLevel;
  size?: "sm" | "md";
};

/** @deprecated Prefer PopStatusBadge — kept for existing imports */
export default function CityCareerBadge({ level, size = "md" }: CityCareerBadgeProps) {
  return <PopStatusBadge level={level} size={size} />;
}
