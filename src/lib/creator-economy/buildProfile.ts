import { getEligibleChannels, getUpcomingChannels } from "./monetization";
import { calculatePopScore } from "./popScoreEngine";
import { metricsFromSignals, resolvePopStatus } from "./statusEngine";
import type { CreatorEconomyProfile, PopScoreSignals, PopStatusMetrics } from "./types";

export function buildCreatorEconomyProfile(signals: Partial<PopScoreSignals>): CreatorEconomyProfile {
  const popScore = calculatePopScore(signals);
  const metrics = metricsFromSignals(signals, popScore.score);
  const career = resolvePopStatus(metrics);

  return {
    popScore,
    career,
    eligibleChannels: getEligibleChannels(career.level.id),
    lifetimeImpact: Math.round(
      (signals.eventParticipationGenerated ?? 0) * 2.4 +
        (signals.restaurantVisitsInfluenced ?? 0) * 3.1 +
        (signals.meaningfulComments ?? 0) * 0.8
    ),
  };
}

export function buildCreatorEconomyProfileFromMetrics(
  signals: Partial<PopScoreSignals>,
  metrics: PopStatusMetrics
): CreatorEconomyProfile {
  const popScore = calculatePopScore(signals);
  const career = resolvePopStatus({ ...metrics, popScore: popScore.score });

  return {
    popScore,
    career,
    eligibleChannels: getEligibleChannels(career.level.id),
    lifetimeImpact: Math.round(
      (signals.eventParticipationGenerated ?? 0) * 2.4 +
        (signals.restaurantVisitsInfluenced ?? 0) * 3.1 +
        (signals.meaningfulComments ?? 0) * 0.8
    ),
  };
}

/** Demo profile — Verified Creator tier with progress toward Elite */
export function buildDemoEconomyProfile(): CreatorEconomyProfile {
  const signals: Partial<PopScoreSignals> = {
    qualityReactions: 168_000,
    meaningfulComments: 4200,
    shares: 12_400,
    saves: 8900,
    profileVisits: 48_000,
    eventParticipationGenerated: 186,
    restaurantVisitsInfluenced: 92,
    liveStreamWatchTime: 42_000,
    followerGrowth: 890,
    consistentPosting: 22,
    communityTrust: 0.88,
    accountAuthenticity: 0.91,
  };

  const popScore = calculatePopScore(signals);

  return buildCreatorEconomyProfileFromMetrics(signals, {
    followers: 118_000,
    totalLikes: 268_000,
    popScore: popScore.score,
    accountStanding: "good",
    activeParticipation: true,
    isVerifiedBusiness: false,
    isDiamondInvited: false,
    isIconAwarded: false,
  });
}

export { getUpcomingChannels };
