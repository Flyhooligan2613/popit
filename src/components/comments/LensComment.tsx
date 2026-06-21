"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import UserTrustStrip from "@/components/reputation/UserTrustStrip";
import type { Comment } from "@/lib/identity/commentsData";
import { getCommentAccent } from "@/lib/identity/commentsData";
import { buildUserReputation, formatCompactCount } from "@/lib/reputation/reputationEngine";

type LensCommentProps = {
  comment: Comment;
};

function LensComment({ comment }: LensCommentProps) {
  const accent = getCommentAccent(comment);
  const reputation = useMemo(
    () =>
      buildUserReputation({
        followers: comment.followers,
        popScoreRating: comment.popScoreRating,
        verified: comment.verified,
        identity: comment.identity,
        communitySince: comment.communitySince,
        lifetimePopScore: comment.lifetimePopScore,
        popMark: comment.popMark,
      }),
    [comment]
  );

  return (
    <article className="lens-comment">
      <div className="lens-comment__row">
        <Link href={`/profile/${comment.username}`} className="lens-comment__avatar shrink-0">
          <PopitLens
            name={comment.author}
            followers={comment.followers}
            verified={comment.verified}
            live={comment.live}
            accent={accent}
            size={44}
            followersBeneath={false}
          />
        </Link>

        <div className="lens-comment__body min-w-0 flex-1">
          <div className="lens-comment__header">
            <UserTrustStrip
              username={comment.username}
              displayName={comment.author}
              reputation={reputation}
              accent={accent}
              compact
            />
            <span className="lens-comment__time">{comment.time}</span>
          </div>

          <p className="lens-comment__text">&ldquo;{comment.text}&rdquo;</p>

          <div className="lens-comment__actions">
            <span className="lens-comment__likes">❤️ {formatCompactCount(comment.likes)}</span>
            <button type="button" className="lens-comment__reply">
              💬 Reply
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(LensComment);
