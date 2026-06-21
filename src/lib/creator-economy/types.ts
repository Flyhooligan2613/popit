/** Engagement signals that feed the dynamic POP Score — impact over vanity metrics */
export type PopScoreSignalKey =
  | "qualityReactions"
  | "meaningfulComments"
  | "shares"
  | "saves"
  | "profileVisits"
  | "eventParticipationGenerated"
  | "restaurantVisitsInfluenced"
  | "liveStreamWatchTime"
  | "followerGrowth"
  | "consistentPosting"
  | "communityTrust"
  | "accountAuthenticity";

export type PopScoreSignals = Record<PopScoreSignalKey, number>;

export type PopScoreBreakdown = {
  score: number;
  signals: PopScoreSignals;
  /** Normalized 0–1 contribution per signal */
  contributions: Record<PopScoreSignalKey, number>;
  impactIndex: number;
};

/** POP'IT Identity & Status System v1.0 tier ids */
export type PopStatusId =
  | "rising"
  | "rising-creator"
  | "verified-creator"
  | "elite-creator"
  | "gold-status"
  | "diamond"
  | "icon";

/** @deprecated Alias — use PopStatusId */
export type CityCareerLevelId = PopStatusId;

export type PopStatusRequirements = {
  minFollowers?: number;
  minTotalLikes?: number;
  minPopScore?: number;
  /** Must have positive account standing (guidelines respected) */
  requiresGoodStanding?: boolean;
  /** Awarded by invitation or exceptional achievement — not follower count alone */
  invitationOnly?: boolean;
  /** Never auto-awarded from metrics */
  manualOnly?: boolean;
  /** Verified business can qualify at this tier */
  businessEligible?: boolean;
};

import type { PopMarkTier } from "@/lib/pop-marks/types";

export type PopStatusLevel = {
  id: PopStatusId;
  label: string;
  tier: number;
  accent: string;
  /** Display glyph — null for no-badge Rising state */
  badge: string | null;
  /** POP Mark tier when earned — POP'IT recognition system */
  popMark: PopMarkTier | null;
  /** Premium animated badge chrome */
  hasPremiumBadge: boolean;
  tagline: string;
  unlocks: string[];
  requirements: PopStatusRequirements;
};

/** @deprecated Alias — use PopStatusLevel */
export type CityCareerLevel = PopStatusLevel;

export type PopStatusMetrics = {
  followers: number;
  totalLikes: number;
  popScore: number;
  accountStanding: "good" | "restricted";
  activeParticipation?: boolean;
  isVerifiedBusiness?: boolean;
  isDiamondInvited?: boolean;
  isIconAwarded?: boolean;
};

export type PopStatusState = {
  level: PopStatusLevel;
  metrics: PopStatusMetrics;
  nextLevel: PopStatusLevel | null;
  /** 0–1 progress toward the next auto-awarded tier */
  progressToNext: number;
  /** Human-readable gaps for the next tier */
  nextRequirements: string[];
};

/** @deprecated Alias — use PopStatusState */
export type CityCareerState = PopStatusState;

export type MonetizationChannelId =
  | "creator-bonus"
  | "live-gifts"
  | "event-referrals"
  | "restaurant-referrals"
  | "business-partnerships"
  | "affiliate"
  | "ticket-commissions"
  | "community-challenges"
  | "brand-collabs"
  | "premium-subscriptions"
  | "marketplace"
  | "digital-products";

export type MonetizationChannel = {
  id: MonetizationChannelId;
  label: string;
  description: string;
  minCareerLevel: PopStatusId;
  icon: string;
};

export type CreatorEconomyProfile = {
  popScore: PopScoreBreakdown;
  career: PopStatusState;
  eligibleChannels: MonetizationChannel[];
  lifetimeImpact: number;
};
