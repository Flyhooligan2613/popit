"use client";

import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import UserTrustStrip from "./UserTrustStrip";
import TrustedReviewBadge from "./TrustedReviewBadge";
import type { UserReputation } from "@/lib/reputation/types";
import { resolveTrustedReviewLabel } from "@/lib/reputation/trustedLabels";
import { buildUserReputation, formatCompactCount } from "@/lib/reputation/reputationEngine";
import { getIdentityAccent } from "@/lib/identity/types";
import type { IdentityType } from "@/lib/identity/types";
import type { PopMarkTier } from "@/lib/pop-marks/types";

export type SmartReview = {
  id: string;
  author: string;
  username: string;
  identity: IdentityType;
  followers: number;
  verified: boolean;
  popScoreRating: number;
  text: string;
  likes: number;
  trending?: boolean;
  communitySince?: number;
  lifetimePopScore?: number;
  popMark?: PopMarkTier | null;
};

type SmartReviewCardProps = {
  review: SmartReview;
  reputation: UserReputation;
};

export default function SmartReviewCard({ review, reputation }: SmartReviewCardProps) {
  const accent = getIdentityAccent(review.identity);
  const label = resolveTrustedReviewLabel(reputation, {
    trending: review.trending,
  });

  return (
    <article className="smart-review-card">
      {label && (
        <div className="smart-review-card__label">
          <TrustedReviewBadge label={label} />
        </div>
      )}
      <div className="smart-review-card__body">
        <Link href={`/profile/${review.username}`} className="smart-review-card__avatar">
          <PopitLens
            name={review.author}
            followers={review.followers}
            verified={review.verified}
            accent={accent}
            size={44}
            followersBeneath={false}
          />
        </Link>
        <div className="smart-review-card__content">
          <UserTrustStrip
            username={review.username}
            displayName={review.author}
            reputation={reputation}
            accent={accent}
            compact
          />
          <p className="smart-review-card__text">&ldquo;{review.text}&rdquo;</p>
          <p className="smart-review-card__engagement">
            <span>❤️ {formatCompactCount(review.likes)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export function buildReviewReputation(review: SmartReview): UserReputation {
  return buildUserReputation({
    followers: review.followers,
    popScoreRating: review.popScoreRating,
    verified: review.verified,
    identity: review.identity,
    communitySince: review.communitySince ?? 2024,
    lifetimePopScore: review.lifetimePopScore,
    popMark: review.popMark,
  });
}
