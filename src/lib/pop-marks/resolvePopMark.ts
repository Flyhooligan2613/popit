import type { PopStatusId, PopStatusMetrics } from "@/lib/creator-economy/types";
import type { PopMarkTier } from "./types";

/** Map internal POP Status tier → visible POP Mark (null = no mark yet) */
export function popMarkFromStatusId(statusId: PopStatusId): PopMarkTier | null {
  switch (statusId) {
    case "rising":
      return null;
    case "rising-creator":
      return "blue";
    case "verified-creator":
    case "elite-creator":
      return "green";
    case "gold-status":
      return "gold";
    case "diamond":
      return "legend";
    case "icon":
      return "icon";
    default:
      return null;
  }
}

/** Direct resolution from metrics — aligned with POP Mark level thresholds */
export function resolvePopMarkTier(metrics: PopStatusMetrics): PopMarkTier | null {
  if (metrics.isIconAwarded) return "icon";
  if (metrics.isDiamondInvited) return "legend";
  if (metrics.accountStanding !== "good") return null;

  if (metrics.isVerifiedBusiness && metrics.popScore >= 75) return "gold";
  if (
    metrics.followers >= 500_000 &&
    metrics.totalLikes >= 1_000_000 &&
    metrics.popScore >= 80
  ) {
    return "gold";
  }
  if (metrics.followers >= 100_000 && metrics.totalLikes >= 250_000 && metrics.popScore >= 65) {
    return "green";
  }
  if (metrics.followers >= 25_000 && metrics.totalLikes >= 100_000 && metrics.popScore >= 50) {
    return "blue";
  }

  return null;
}

export function nextPopMarkTier(current: PopMarkTier | null): PopMarkTier | null {
  if (!current) return "blue";
  const order: PopMarkTier[] = ["blue", "green", "gold", "legend", "icon"];
  const normalized = current === "diamond" ? "legend" : current;
  const idx = order.indexOf(normalized as (typeof order)[number]);
  return idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
}
