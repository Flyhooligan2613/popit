"use client";

import { formatCount } from "@/lib/social/socialStore";
import type { SocialPost } from "@/lib/social/types";

type EngagementBarProps = {
  post: SocialPost;
  onLike: () => void;
  onComment?: () => void;
  onRepost: () => void;
  onSave: () => void;
  onShare?: () => void;
  compact?: boolean;
};

export default function EngagementBar({
  post,
  onLike,
  onComment,
  onRepost,
  onSave,
  onShare,
  compact,
}: EngagementBarProps) {
  return (
    <div className={`engagement-bar ${compact ? "engagement-bar--compact" : ""}`}>
      <button
        type="button"
        className={`engagement-bar__btn ${post.liked ? "is-active" : ""}`}
        onClick={onLike}
        aria-label="Like"
      >
        <span>{post.liked ? "❤️" : "🤍"}</span>
        {!compact && <span>{formatCount(post.likes)}</span>}
      </button>
      <button type="button" className="engagement-bar__btn" onClick={onComment} aria-label="Comment">
        <span>💬</span>
        {!compact && <span>{formatCount(post.comments)}</span>}
      </button>
      <button
        type="button"
        className={`engagement-bar__btn ${post.reposted ? "is-active" : ""}`}
        onClick={onRepost}
        aria-label="Repost"
      >
        <span>🔁</span>
        {!compact && <span>{formatCount(post.reposts)}</span>}
      </button>
      <button type="button" className="engagement-bar__btn" onClick={onShare} aria-label="Share">
        <span>↗</span>
      </button>
      <button
        type="button"
        className={`engagement-bar__btn engagement-bar__btn--save ${post.saved ? "is-active" : ""}`}
        onClick={onSave}
        aria-label="Save"
      >
        <span>{post.saved ? "🔖" : "📑"}</span>
        {!compact && <span>{formatCount(post.saves)}</span>}
      </button>
    </div>
  );
}
