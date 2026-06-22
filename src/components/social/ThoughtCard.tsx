"use client";

import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import EngagementBar from "./EngagementBar";
import { formatTimeAgo } from "@/lib/social/socialStore";
import type { SocialPost } from "@/lib/social/types";

type ThoughtCardProps = {
  post: SocialPost;
  onLike: () => void;
  onRepost: () => void;
  onSave: () => void;
  onComment?: () => void;
  onFollow?: () => void;
};

export default function ThoughtCard({
  post,
  onLike,
  onRepost,
  onSave,
  onComment,
  onFollow,
}: ThoughtCardProps) {
  return (
    <article className="thought-card">
      <div className="thought-card__row">
        <Link href={`/profile/${post.authorUsername}`}>
          <PopitLens
            name={post.authorName}
            followers={0}
            verified={post.verified}
            accent={post.authorAccent}
            size={44}
            followersBeneath={false}
          />
        </Link>
        <div className="thought-card__main">
          <header className="thought-card__head">
            <div>
              <Link href={`/profile/${post.authorUsername}`} className="thought-card__name">
                {post.authorName}
              </Link>
              <span className="thought-card__handle">@{post.authorUsername}</span>
              <span className="thought-card__time">· {formatTimeAgo(post.createdAt)}</span>
            </div>
            {onFollow && !post.following && (
              <button type="button" className="thought-card__follow" onClick={onFollow}>
                Follow
              </button>
            )}
          </header>
          <p className="thought-card__text">{post.text}</p>
          {post.musicTrack && <p className="thought-card__music">♪ {post.musicTrack}</p>}
          <EngagementBar
            post={post}
            onLike={onLike}
            onComment={onComment}
            onRepost={onRepost}
            onSave={onSave}
            compact
          />
        </div>
      </div>
    </article>
  );
}
