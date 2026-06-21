import type { PopMarkTier } from "@/lib/pop-marks/types";

/** Lifetime cumulative POP Score — displayed across the platform (e.g. 84,320) */
export type UserReputation = {
  lifetimePopScore: number;
  /** Engine rating 1–99 */
  popScoreRating: number;
  level: number;
  levelTitle: string;
  popMark: PopMarkTier | null;
  trustLabel: string | null;
  achievementCount: number;
  yearsOnPlatform: number;
  helpfulReviews: number;
  positiveCommunityRating: number;
  liveStreams: number;
  eventsAttended: number;
  businessesSupported: number;
  photosShared: number;
  commentsPosted: number;
  communitySince: number;
};

export type TrustedReviewLabelId =
  | "trusted-review"
  | "community-favorite"
  | "pop-legend-opinion"
  | "trending-creator-review";

export type TrustedReviewLabel = {
  id: TrustedReviewLabelId;
  emoji: string;
  text: string;
};

export type RankedCommentMeta = {
  rankScore: number;
  recencyScore: number;
  engagementScore: number;
  reputationBoost: number;
};
