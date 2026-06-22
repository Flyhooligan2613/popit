"use client";

import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import EngagementBar from "./EngagementBar";
import { formatTimeAgo } from "@/lib/social/socialStore";
import type { SocialPost } from "@/lib/social/types";

type FeedPostCardProps = {
  post: SocialPost;
  onLike: () => void;
  onRepost: () => void;
  onSave: () => void;
  onFollow?: () => void;
};

export default function FeedPostCard({ post, onLike, onRepost, onSave, onFollow }: FeedPostCardProps) {
  return (
    <article className="feed-post">
      <header className="feed-post__head">
        <Link href={`/profile/${post.authorUsername}`} className="feed-post__author">
          <PopitLens
            name={post.authorName}
            followers={0}
            verified={post.verified}
            live={post.live}
            accent={post.authorAccent}
            size={40}
            followersBeneath={false}
          />
          <div>
            <p className="feed-post__name">{post.authorName}</p>
            <p className="feed-post__meta">
              {post.venue ?? post.city} · {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </Link>
        {onFollow && !post.following && post.authorUsername !== "you" && (
          <button type="button" className="feed-post__follow" onClick={onFollow}>
            Follow
          </button>
        )}
      </header>

      {(post.kind === "page" || post.kind === "checkin" || post.kind === "reel") && (
        <div
          className="feed-post__media"
          style={{ background: `linear-gradient(160deg, ${post.mediaHue ?? post.authorAccent}55, #050505)` }}
        >
          {post.kind === "reel" && <span className="feed-post__reel-badge">REEL</span>}
          {post.live && <span className="feed-post__live-badge">LIVE</span>}
          {post.musicTrack && <span className="feed-post__music">♪ {post.musicTrack}</span>}
        </div>
      )}

      <EngagementBar post={post} onLike={onLike} onRepost={onRepost} onSave={onSave} />

      <div className="feed-post__body">
        {post.title && <strong className="feed-post__title">{post.title}</strong>}
        <p className="feed-post__text">{post.text}</p>
      </div>
    </article>
  );
}
