"use client";

import { memo } from "react";
import GlassPanel from "@/components/pulse/GlassPanel";
import LensComment from "./LensComment";
import { CITY_COMMENTS } from "@/lib/identity/commentsData";

function CommentThread() {
  return (
    <GlassPanel hover={false} weight="light" accent="#A855F7" glow="rgba(168,85,247,0.08)" className="px-4 py-2">
      <h3 className="text-poster mb-1 text-lg uppercase tracking-wider text-white/90">City Pulse</h3>
      <p className="font-body mb-3 text-xs text-white/40">Live voices across the city</p>
      {CITY_COMMENTS.map((comment) => (
        <LensComment key={comment.id} comment={comment} />
      ))}
    </GlassPanel>
  );
}

export default memo(CommentThread);
