import type { CityCareerLevel, CityCareerLevelId, CityCareerState } from "./types";

export const CITY_CAREER_LEVELS: CityCareerLevel[] = [
  {
    id: "explorer",
    label: "Explorer",
    tier: 1,
    minXp: 0,
    accent: "#94a3b8",
    badge: "🧭",
    tagline: "Discover your city",
    unlocks: ["City feed", "Check-ins", "Basic profile"],
  },
  {
    id: "contributor",
    label: "Contributor",
    tier: 2,
    minXp: 500,
    accent: "#22c55e",
    badge: "✦",
    tagline: "Shape local conversations",
    unlocks: ["Community badges", "Event RSVPs", "Referral tracking"],
  },
  {
    id: "creator",
    label: "Creator",
    tier: 3,
    minXp: 2_000,
    accent: "#00d4ff",
    badge: "◎",
    tagline: "Publish moments that move people",
    unlocks: ["Creator studio", "Live streaming", "Creator bonuses"],
  },
  {
    id: "city-creator",
    label: "City Creator",
    tier: 4,
    minXp: 6_000,
    accent: "#a855f7",
    badge: "◈",
    tagline: "Influence how your city shows up",
    unlocks: ["District spotlight", "Event referrals", "Brand collab invites"],
  },
  {
    id: "elite-creator",
    label: "Elite Creator",
    tier: 5,
    minXp: 15_000,
    accent: "#ff8a00",
    badge: "✧",
    tagline: "Lead culture in your city",
    unlocks: ["Premium analytics", "Ticket commissions", "Partnership desk"],
  },
  {
    id: "city-legend",
    label: "City Legend",
    tier: 6,
    minXp: 35_000,
    accent: "#ff4d6d",
    badge: "★",
    tagline: "Your name is part of the city story",
    unlocks: ["City-wide features", "Marketplace access", "Challenge host"],
  },
  {
    id: "pop-legend",
    label: "POP Legend",
    tier: 7,
    minXp: 75_000,
    accent: "#fbbf24",
    badge: "👑",
    tagline: "Built your reputation here",
    unlocks: ["All monetization", "Legend badge", "Platform recognition"],
  },
];

export function getCareerLevel(id: CityCareerLevelId): CityCareerLevel {
  return CITY_CAREER_LEVELS.find((l) => l.id === id) ?? CITY_CAREER_LEVELS[0];
}

export function resolveCareerFromXp(xp: number): CityCareerState {
  let level = CITY_CAREER_LEVELS[0];
  for (const candidate of CITY_CAREER_LEVELS) {
    if (xp >= candidate.minXp) level = candidate;
  }
  const nextIdx = CITY_CAREER_LEVELS.findIndex((l) => l.id === level.id) + 1;
  const nextLevel = nextIdx < CITY_CAREER_LEVELS.length ? CITY_CAREER_LEVELS[nextIdx] : null;
  const progressToNext = nextLevel
    ? (xp - level.minXp) / (nextLevel.minXp - level.minXp)
    : 1;

  return {
    level,
    xp,
    nextLevel,
    progressToNext: Math.min(1, Math.max(0, progressToNext)),
  };
}

export function xpFromPopScore(score: number, impactIndex: number): number {
  return Math.round(score * 48 + impactIndex * 1200);
}
