"use client";

import { memo } from "react";
import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import type { Comment } from "@/lib/identity/commentsData";
import { getCommentAccent } from "@/lib/identity/commentsData";
import { IDENTITY_OPTIONS } from "@/lib/identity/types";

type LensCommentProps = {
  comment: Comment;
};

function LensComment({ comment }: LensCommentProps) {
  const accent = getCommentAccent(comment);
  const identityLabel = IDENTITY_OPTIONS.find((o) => o.id === comment.identity)?.label ?? comment.identity;

  return (
    <div className="flex gap-3 border-b border-white/6 py-4 last:border-0">
      <Link href={`/profile/${comment.username}`} className="shrink-0">
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

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Link href={`/profile/${comment.username}`} className="font-body text-sm font-bold text-white/90 hover:underline">
            {comment.author}
          </Link>
          <span
            className="rounded px-1.5 py-0.5 font-body text-[0.55rem] font-semibold uppercase tracking-wider"
            style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}33` }}
          >
            {identityLabel}
          </span>
          <span className="font-body text-[0.6rem] text-white/30">{comment.time}</span>
        </div>
        <p className="font-body text-sm leading-relaxed text-white/70">{comment.text}</p>
        <p className="font-body mt-1.5 text-[0.65rem] text-white/35">{comment.likes} pulse</p>
      </div>
    </div>
  );
}

export default memo(LensComment);
