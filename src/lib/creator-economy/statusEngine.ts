import { getStatusLevel, POP_STATUS_LEVELS } from "./statusLevels";
import type { PopStatusLevel, PopStatusMetrics, PopStatusState } from "./types";

function hasGoodStanding(metrics: PopStatusMetrics): boolean {
  return metrics.accountStanding === "good";
}

function meetsAutoRequirements(metrics: PopStatusMetrics, level: PopStatusLevel): boolean {
  const req = level.requirements;
  if (req.manualOnly || req.invitationOnly) return false;
  if (req.requiresGoodStanding && !hasGoodStanding(metrics)) return false;
  if (req.minFollowers != null && metrics.followers < req.minFollowers) return false;
  if (req.minTotalLikes != null && metrics.totalLikes < req.minTotalLikes) return false;
  if (req.minPopScore != null && metrics.popScore < req.minPopScore) return false;
  return true;
}

function meetsRising(metrics: PopStatusMetrics): boolean {
  if (!hasGoodStanding(metrics)) return false;
  return metrics.activeParticipation !== false;
}

function meetsGold(metrics: PopStatusMetrics): boolean {
  if (!hasGoodStanding(metrics)) return false;
  if (metrics.isVerifiedBusiness && metrics.popScore >= 75) return true;
  return meetsAutoRequirements(metrics, getStatusLevel("gold-status"));
}

function meetsDiamond(metrics: PopStatusMetrics): boolean {
  if (!metrics.isDiamondInvited || !hasGoodStanding(metrics)) return false;
  return metrics.popScore >= (getStatusLevel("diamond").requirements.minPopScore ?? 85);
}

const AUTO_TIER_ORDER: PopStatusLevel["id"][] = [
  "gold-status",
  "elite-creator",
  "verified-creator",
  "rising-creator",
];

/** Resolve highest POP Status tier from metrics — ICON and Diamond never auto from followers alone */
export function resolvePopStatus(metrics: PopStatusMetrics): PopStatusState {
  let level = getStatusLevel("rising");

  if (metrics.isIconAwarded && hasGoodStanding(metrics)) {
    level = getStatusLevel("icon");
  } else if (meetsDiamond(metrics)) {
    level = getStatusLevel("diamond");
  } else {
    for (const id of AUTO_TIER_ORDER) {
      const candidate = getStatusLevel(id);
      const qualified = id === "gold-status" ? meetsGold(metrics) : meetsAutoRequirements(metrics, candidate);
      if (qualified) {
        level = candidate;
        break;
      }
    }
    if (level.id === "rising" && meetsRising(metrics)) {
      level = getStatusLevel("rising");
    }
  }

  const nextLevel = getNextAutoLevel(level.id);
  const progressToNext = nextLevel ? computeProgress(metrics, nextLevel) : 1;
  const nextRequirements = nextLevel ? describeGaps(metrics, nextLevel) : [];

  return {
    level,
    metrics,
    nextLevel,
    progressToNext,
    nextRequirements,
  };
}

function getNextAutoLevel(currentId: PopStatusLevel["id"]): PopStatusLevel | null {
  const idx = POP_STATUS_LEVELS.findIndex((l) => l.id === currentId);
  for (let i = idx + 1; i < POP_STATUS_LEVELS.length; i++) {
    const candidate = POP_STATUS_LEVELS[i];
    if (candidate.requirements.manualOnly || candidate.requirements.invitationOnly) continue;
    return candidate;
  }
  return null;
}

function ratio(current: number, target?: number): number {
  if (target == null || target <= 0) return 1;
  return Math.min(1, current / target);
}

function computeProgress(metrics: PopStatusMetrics, next: PopStatusLevel): number {
  const req = next.requirements;
  const parts: number[] = [];

  if (req.minFollowers != null) parts.push(ratio(metrics.followers, req.minFollowers));
  if (req.minTotalLikes != null) parts.push(ratio(metrics.totalLikes, req.minTotalLikes));
  if (req.minPopScore != null) parts.push(ratio(metrics.popScore, req.minPopScore));
  if (req.requiresGoodStanding) parts.push(hasGoodStanding(metrics) ? 1 : 0);

  if (parts.length === 0) return 0;
  return Math.min(1, Math.max(0, parts.reduce((a, b) => a + b, 0) / parts.length));
}

function describeGaps(metrics: PopStatusMetrics, next: PopStatusLevel): string[] {
  const req = next.requirements;
  const gaps: string[] = [];

  if (req.minFollowers != null && metrics.followers < req.minFollowers) {
    gaps.push(`${formatCount(req.minFollowers - metrics.followers)} more followers`);
  }
  if (req.minTotalLikes != null && metrics.totalLikes < req.minTotalLikes) {
    gaps.push(`${formatCount(req.minTotalLikes - metrics.totalLikes)} more likes`);
  }
  if (req.minPopScore != null && metrics.popScore < req.minPopScore) {
    gaps.push(`POP Score ${req.minPopScore}+ (yours: ${metrics.popScore})`);
  }
  if (req.requiresGoodStanding && !hasGoodStanding(metrics)) {
    gaps.push("Positive account standing");
  }

  return gaps;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toLocaleString();
}

export function metricsFromSignals(
  signals: Partial<import("./types").PopScoreSignals>,
  popScore: number
): PopStatusMetrics {
  const reactions = signals.qualityReactions ?? 0;
  const totalLikes = Math.round(reactions / 0.65);
  const followers = Math.round(totalLikes * 0.42 + (signals.followerGrowth ?? 0) * 180);

  return {
    followers,
    totalLikes,
    popScore,
    accountStanding: (signals.communityTrust ?? 0.5) >= 0.4 ? "good" : "restricted",
    activeParticipation: (signals.consistentPosting ?? 0) > 0 || totalLikes > 500,
    isVerifiedBusiness: false,
    isDiamondInvited: false,
    isIconAwarded: false,
  };
}
