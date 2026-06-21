"use client";

import { memo, useMemo } from "react";
import GlassPanel from "@/components/pulse/GlassPanel";
import LensComment from "./LensComment";
import { CITY_COMMENTS } from "@/lib/identity/commentsData";
import { rankComments } from "@/lib/reputation/commentRanking";

function CommentThread() {
  const ranked = useMemo(() => rankComments(CITY_COMMENTS), []);

  return (
    <GlassPanel hover={false} weight="light" accent="#A855F7" glow="rgba(168,85,247,0.08)" className="comment-thread px-4 py-2">
      <h3 className="text-poster mb-1 text-lg uppercase tracking-wider text-white/90">City Pulse</h3>
      <p className="font-body mb-1 text-xs text-white/40">Live voices across the city — ranked by trust &amp; engagement</p>
      <p className="font-body mb-3 text-[0.6rem] text-white/28">
        Relevance · Likes · Replies · Recency · Community reputation · POP Score
      </p>
      {ranked.map((comment) => (
        <LensComment key={comment.id} comment={comment} />
      ))}
    </GlassPanel>
  );
}

export default memo(CommentThread);
