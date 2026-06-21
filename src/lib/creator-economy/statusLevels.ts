import type { PopStatusLevel, PopStatusId } from "./types";

/** POP'IT Identity & Status System v1.0 — achievement over vanity metrics */
export const POP_STATUS_LEVELS: PopStatusLevel[] = [
  {
    id: "rising",
    label: "Rising",
    tier: 1,
    accent: "#cbd5e1",
    badge: "⭐",
    hasPremiumBadge: false,
    tagline: "New creator showing strong growth",
    unlocks: ["City feed", "Check-ins", "Basic profile"],
    requirements: {
      requiresGoodStanding: true,
    },
  },
  {
    id: "rising-creator",
    label: "Rising Creator",
    tier: 2,
    accent: "#22c55e",
    badge: "◆",
    hasPremiumBadge: true,
    tagline: "Emerging creator gaining real traction",
    unlocks: ["Community challenges", "Referral tracking", "Creator insights"],
    requirements: {
      minFollowers: 25_000,
      minTotalLikes: 100_000,
      minPopScore: 55,
      requiresGoodStanding: true,
    },
  },
  {
    id: "verified-creator",
    label: "Verified Creator",
    tier: 3,
    accent: "#3b82f6",
    badge: "◆",
    hasPremiumBadge: true,
    tagline: "Trusted and influential creator",
    unlocks: ["Creator studio", "Live streaming", "Creator bonuses"],
    requirements: {
      minFollowers: 100_000,
      minTotalLikes: 250_000,
      minPopScore: 68,
      requiresGoodStanding: true,
    },
  },
  {
    id: "elite-creator",
    label: "Elite Creator",
    tier: 4,
    accent: "#a855f7",
    badge: "◆",
    hasPremiumBadge: true,
    tagline: "Leading creator within your city",
    unlocks: ["Premium analytics", "Ticket commissions", "Partnership desk"],
    requirements: {
      minFollowers: 250_000,
      minTotalLikes: 750_000,
      minPopScore: 78,
      requiresGoodStanding: true,
    },
  },
  {
    id: "gold-status",
    label: "Gold Status",
    tier: 5,
    accent: "#fbbf24",
    badge: "◆",
    hasPremiumBadge: true,
    tagline: "Highest verified public status",
    unlocks: ["Marketplace", "Brand campaigns", "Affiliate programs"],
    requirements: {
      minFollowers: 500_000,
      minTotalLikes: 1_000_000,
      minPopScore: 88,
      requiresGoodStanding: true,
      businessEligible: true,
    },
  },
  {
    id: "diamond",
    label: "Diamond",
    tier: 6,
    accent: "#67e8f9",
    badge: "◆",
    hasPremiumBadge: true,
    tagline: "Exceptional long-term city impact",
    unlocks: ["Digital products", "Platform features", "Priority support"],
    requirements: {
      minPopScore: 85,
      requiresGoodStanding: true,
      invitationOnly: true,
    },
  },
  {
    id: "icon",
    label: "ICON",
    tier: 7,
    accent: "#fcd34d",
    badge: "👑",
    hasPremiumBadge: true,
    tagline: "Defines culture in your city",
    unlocks: ["All monetization", "ICON recognition", "Culture-defining status"],
    requirements: {
      requiresGoodStanding: true,
      manualOnly: true,
    },
  },
];

export function getStatusLevel(id: PopStatusId): PopStatusLevel {
  return POP_STATUS_LEVELS.find((l) => l.id === id) ?? POP_STATUS_LEVELS[0];
}

/** @deprecated Use getStatusLevel */
export const CITY_CAREER_LEVELS = POP_STATUS_LEVELS;
/** @deprecated Use getStatusLevel */
export const getCareerLevel = getStatusLevel;
