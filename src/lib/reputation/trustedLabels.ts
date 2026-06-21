import type { UserReputation, TrustedReviewLabel } from "./types";

export function resolveTrustedReviewLabel(
  reputation: UserReputation,
  opts?: { trending?: boolean; helpfulReviews?: number }
): TrustedReviewLabel | null {
  const { trending = false, helpfulReviews = reputation.helpfulReviews } = opts ?? {};

  if (reputation.popMark === "legend" || reputation.popMark === "icon" || reputation.level >= 71) {
    return { id: "pop-legend-opinion", emoji: "💎", text: "POP Legend Opinion" };
  }

  if (reputation.popMark === "gold" || reputation.level >= 56) {
    return { id: "community-favorite", emoji: "🏆", text: "Community Favorite" };
  }

  if (trending && (reputation.popMark === "blue" || reputation.popMark === "green")) {
    return { id: "trending-creator-review", emoji: "🔥", text: "Trending Creator Review" };
  }

  if (
    helpfulReviews >= 50 ||
    reputation.popScoreRating >= 65 ||
    reputation.popMark === "green" ||
    reputation.positiveCommunityRating >= 95
  ) {
    return { id: "trusted-review", emoji: "⭐", text: "Trusted Review" };
  }

  return null;
}
