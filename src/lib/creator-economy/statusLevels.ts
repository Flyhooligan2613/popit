import type { PopMarkTier } from "@/lib/pop-marks/types";
import type { PopStatusLevel, PopStatusId } from "./types";
export const POP_STATUS_LEVELS: PopStatusLevel[] = [
  {
    id: "rising",
    label: "Rising",
    tier: 1,
    accent: "#cbd5e1",
    badge: "⭐",
    popMark: null,
    hasPremiumBadge: false,
    tagline: "New creator showing strong growth",
    unlocks: ["City feed", "Check-ins", "Basic profile"],
    requirements: {
      requiresGoodStanding: true,
    },
  },
  {
    id: "rising-creator",
    label: "Verified Creator",
    tier: 2,
    accent: "#2563eb",
    badge: "◆",
    popMark: "blue",
    hasPremiumBadge: true,
    tagline: "Blue POP Mark — authentic creator on the rise",
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
    label: "Rising Creator",
    tier: 3,
    accent: "#059669",
    badge: "◆",
    popMark: "green",
    hasPremiumBadge: true,
    tagline: "Green POP Mark — rising creator with community trust",
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
    label: "Rising Creator",
    tier: 4,
    accent: "#059669",
    badge: "◆",
    popMark: "green",
    hasPremiumBadge: true,
    tagline: "Building toward Gold POP Mark",
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
    label: "Elite Business / Creator",
    tier: 5,
    accent: "#f59e0b",
    badge: "◆",
    popMark: "gold",
    hasPremiumBadge: true,
    tagline: "Gold POP Mark — prestigious recognition",
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
    label: "Legend",
    tier: 6,
    accent: "#9333ea",
    badge: "◆",
    popMark: "legend",
    hasPremiumBadge: true,
    tagline: "Legend POP Mark — invitation only",
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
    accent: "#f8fafc",
    badge: "👑",
    popMark: "icon",
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
