import { resolveCareerFromXp, xpFromPopScore } from "./careerLevels";
import { getEligibleChannels, getUpcomingChannels } from "./monetization";
import { calculatePopScore } from "./popScoreEngine";
import type { CreatorEconomyProfile, PopScoreSignals } from "./types";

export function buildCreatorEconomyProfile(signals: Partial<PopScoreSignals>): CreatorEconomyProfile {
  const popScore = calculatePopScore(signals);
  const xp = xpFromPopScore(popScore.score, popScore.impactIndex);
  const career = resolveCareerFromXp(xp);

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

export function buildDemoEconomyProfile(): CreatorEconomyProfile {
  return buildCreatorEconomyProfile({
    qualityReactions: 4200,
    meaningfulComments: 186,
    shares: 920,
    saves: 640,
    profileVisits: 2800,
    eventParticipationGenerated: 48,
    restaurantVisitsInfluenced: 31,
    liveStreamWatchTime: 8200,
    followerGrowth: 124,
    consistentPosting: 18,
    communityTrust: 0.78,
    accountAuthenticity: 0.82,
  });
}

export { getUpcomingChannels };
