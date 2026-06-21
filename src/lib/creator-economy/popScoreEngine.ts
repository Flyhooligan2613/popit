import type { PopScoreBreakdown, PopScoreSignalKey, PopScoreSignals } from "./types";

/** Weights favor community impact over raw popularity */
const SIGNAL_WEIGHTS: Record<PopScoreSignalKey, number> = {
  qualityReactions: 0.11,
  meaningfulComments: 0.12,
  shares: 0.1,
  saves: 0.09,
  profileVisits: 0.07,
  eventParticipationGenerated: 0.13,
  restaurantVisitsInfluenced: 0.11,
  liveStreamWatchTime: 0.08,
  followerGrowth: 0.05,
  consistentPosting: 0.07,
  communityTrust: 0.04,
  accountAuthenticity: 0.03,
};

const SIGNAL_LABELS: Record<PopScoreSignalKey, string> = {
  qualityReactions: "Quality reactions",
  meaningfulComments: "Meaningful comments",
  shares: "Shares",
  saves: "Saves",
  profileVisits: "Profile visits",
  eventParticipationGenerated: "Event participation",
  restaurantVisitsInfluenced: "Restaurant influence",
  liveStreamWatchTime: "Live watch time",
  followerGrowth: "Follower growth",
  consistentPosting: "Consistent posting",
  communityTrust: "Community trust",
  accountAuthenticity: "Authenticity",
};

export function getSignalLabel(key: PopScoreSignalKey): string {
  return SIGNAL_LABELS[key];
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/** Normalize raw signal counts into 0–1 strength */
function normalizeSignals(raw: Partial<PopScoreSignals>): PopScoreSignals {
  const defaults: PopScoreSignals = {
    qualityReactions: 0,
    meaningfulComments: 0,
    shares: 0,
    saves: 0,
    profileVisits: 0,
    eventParticipationGenerated: 0,
    restaurantVisitsInfluenced: 0,
    liveStreamWatchTime: 0,
    followerGrowth: 0,
    consistentPosting: 0,
    communityTrust: 0,
    accountAuthenticity: 0,
  };

  const merged = { ...defaults, ...raw };

  return {
    qualityReactions: clamp01(merged.qualityReactions / 12_000),
    meaningfulComments: clamp01(merged.meaningfulComments / 800),
    shares: clamp01(merged.shares / 2_500),
    saves: clamp01(merged.saves / 1_800),
    profileVisits: clamp01(merged.profileVisits / 5_000),
    eventParticipationGenerated: clamp01(merged.eventParticipationGenerated / 400),
    restaurantVisitsInfluenced: clamp01(merged.restaurantVisitsInfluenced / 250),
    liveStreamWatchTime: clamp01(merged.liveStreamWatchTime / 50_000),
    followerGrowth: clamp01(merged.followerGrowth / 600),
    consistentPosting: clamp01(merged.consistentPosting / 30),
    communityTrust: clamp01(merged.communityTrust),
    accountAuthenticity: clamp01(merged.accountAuthenticity),
  };
}

export function calculatePopScore(raw: Partial<PopScoreSignals>): PopScoreBreakdown {
  const signals = normalizeSignals(raw);
  const contributions = {} as Record<PopScoreSignalKey, number>;
  let weighted = 0;

  for (const key of Object.keys(SIGNAL_WEIGHTS) as PopScoreSignalKey[]) {
    const contribution = signals[key] * SIGNAL_WEIGHTS[key];
    contributions[key] = contribution;
    weighted += contribution;
  }

  const impactKeys: PopScoreSignalKey[] = [
    "eventParticipationGenerated",
    "restaurantVisitsInfluenced",
    "meaningfulComments",
    "communityTrust",
  ];
  const impactIndex =
    impactKeys.reduce((sum, k) => sum + signals[k], 0) / impactKeys.length;

  const score = Math.round(Math.min(99, Math.max(1, weighted * 100)));

  return { score, signals, contributions, impactIndex };
}

/** Derive POP Score from public engagement metrics (feed cards, profiles) */
export function popScoreFromEngagement(input: {
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  followersToday?: number;
  viewers?: number;
  interested?: number;
  verified?: boolean;
}): number {
  const commentQuality = (input.comments ?? 0) * 1.4;
  const reactions = (input.likes ?? 0) * 0.65;

  return calculatePopScore({
    qualityReactions: reactions,
    meaningfulComments: commentQuality,
    shares: input.shares ?? 0,
    saves: input.saves ?? 0,
    profileVisits: (input.followersToday ?? 0) * 8,
    eventParticipationGenerated: input.interested ?? 0,
    liveStreamWatchTime: (input.viewers ?? 0) * 60,
    followerGrowth: input.followersToday ?? 0,
    consistentPosting: 12,
    communityTrust: input.verified ? 0.85 : 0.55,
    accountAuthenticity: input.verified ? 0.9 : 0.6,
  }).score;
}

export function topSignalContributions(
  breakdown: PopScoreBreakdown,
  limit = 4
): { key: PopScoreSignalKey; label: string; pct: number }[] {
  return (Object.entries(breakdown.contributions) as [PopScoreSignalKey, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, value]) => ({
      key,
      label: SIGNAL_LABELS[key],
      pct: Math.round(value * 100),
    }));
}
