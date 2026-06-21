import { resolvePopMarkTier } from "@/lib/pop-marks/resolvePopMark";
import type { PopMarkTier } from "@/lib/pop-marks/types";
import { POP_MARK_CONFIG } from "@/lib/pop-marks/types";
import type { UserReputation } from "./types";

export function formatLifetimePopScore(score: number): string {
  return score.toLocaleString("en-US");
}

export function formatCompactCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function levelFromLifetimeScore(lifetimePopScore: number): number {
  return Math.max(1, Math.min(99, Math.floor(lifetimePopScore / 1620)));
}

export function levelTitleFromLevel(level: number): string {
  if (level >= 86) return "ICON";
  if (level >= 71) return "POP Legend";
  if (level >= 56) return "Elite Voice";
  if (level >= 41) return "City Leader";
  if (level >= 26) return "Community Builder";
  if (level >= 11) return "Rising Voice";
  return "Explorer";
}

export function trustLabelFromPopMark(popMark: PopMarkTier | null): string | null {
  if (!popMark) return null;
  const key = popMark === "diamond" ? "legend" : popMark;
  return POP_MARK_CONFIG[key as keyof typeof POP_MARK_CONFIG]?.subtitle ?? null;
}

export function lifetimePopScoreFromSignals(
  followers: number,
  popScoreRating: number,
  verified: boolean
): number {
  const followerPart = followers * 0.08;
  const ratingPart = popScoreRating * 680;
  const trustBonus = verified ? 8000 : 0;
  return Math.round(followerPart + ratingPart + trustBonus);
}

type ReputationInput = {
  followers: number;
  following?: number;
  popScoreRating: number;
  verified: boolean;
  identity?: string;
  communitySince?: number;
  lifetimePopScore?: number;
  popMark?: PopMarkTier | null;
};

export function buildUserReputation(input: ReputationInput): UserReputation {
  const { followers, following = 0, popScoreRating, verified, communitySince = 2026 } = input;
  const lifetimePopScore =
    input.lifetimePopScore ??
    lifetimePopScoreFromSignals(followers, popScoreRating, verified);
  const level = levelFromLifetimeScore(lifetimePopScore);
  const totalLikes = Math.round(followers * (verified ? 4.2 : 2.1));

  const popMark =
    input.popMark ??
    resolvePopMarkTier({
      followers,
      totalLikes,
      popScore: popScoreRating,
      accountStanding: "good",
      isVerifiedBusiness: input.identity === "restaurant" && verified,
      isDiamondInvited: popScoreRating >= 95 && followers >= 500_000,
      isIconAwarded: false,
    });

  const engagementFactor = verified ? 1.15 : 0.85;

  return {
    lifetimePopScore,
    popScoreRating,
    level,
    levelTitle: levelTitleFromLevel(level),
    popMark,
    trustLabel: trustLabelFromPopMark(popMark),
    achievementCount: Math.round(level * 0.6 + (verified ? 8 : 3)),
    yearsOnPlatform: Math.max(1, 2026 - communitySince + 1),
    helpfulReviews: Math.round(followers * 0.07 * engagementFactor),
    positiveCommunityRating: Math.min(99.9, 88 + popScoreRating * 0.11 + (verified ? 4 : 0)),
    liveStreams: Math.round(followers * 0.008 * engagementFactor),
    eventsAttended: Math.round(followers * 0.013 * engagementFactor),
    businessesSupported: Math.round(followers * 0.022 * engagementFactor),
    photosShared: Math.round(followers * 0.115 * engagementFactor),
    commentsPosted: Math.round(followers * 0.32 * engagementFactor + following * 0.5),
    communitySince,
  };
}

/** Derive engine rating 1–99 from follower scale when only pulseScore-like data exists */
export function popScoreRatingFromPulse(pulseScore: number): number {
  return Math.max(1, Math.min(99, Math.round(pulseScore)));
}
