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

export type CityCareerLevelId =
  | "explorer"
  | "contributor"
  | "creator"
  | "city-creator"
  | "elite-creator"
  | "city-legend"
  | "pop-legend";

export type CityCareerLevel = {
  id: CityCareerLevelId;
  label: string;
  tier: number;
  minXp: number;
  accent: string;
  badge: string;
  tagline: string;
  unlocks: string[];
};

export type CityCareerState = {
  level: CityCareerLevel;
  xp: number;
  nextLevel: CityCareerLevel | null;
  progressToNext: number;
};

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
  minCareerLevel: CityCareerLevelId;
  icon: string;
};

export type CreatorEconomyProfile = {
  popScore: PopScoreBreakdown;
  career: CityCareerState;
  eligibleChannels: MonetizationChannel[];
  lifetimeImpact: number;
};
