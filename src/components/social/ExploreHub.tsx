"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { WELCOME_LOBBY_ROUTE } from "@/lib/session";
import PopSearchBar from "@/components/nav/PopSearchBar";
import FeedPostCard from "./FeedPostCard";
import PostCommentsSheet from "./PostCommentsSheet";
import { formatCount, getExplorePosts } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import { usePostCommentsSheet } from "@/hooks/usePostCommentsSheet";

type ExploreFilter = "all" | "reels" | "photos" | "trending";

const FILTERS: { id: ExploreFilter; label: string }[] = [
  { id: "all", label: "For You" },
  { id: "trending", label: "Trending" },
  { id: "reels", label: "Reels" },
  { id: "photos", label: "Photos" },
];

export default function ExploreHub() {
  const [filter, setFilter] = useState<ExploreFilter>("all");
  const { state, like, save, repost, follow, refresh } = useSocialStore();
  const { commentPost, openComments, closeComments } = usePostCommentsSheet();
  const posts = useMemo(() => getExplorePosts(filter), [filter, state]);

  const handleRefresh = async () => {
    refresh();
    await new Promise((r) => window.setTimeout(r, 500));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="explore-hub">
      <div className="explore-hub__head">
        <div className="explore-hub__head-row">
          <Link href={WELCOME_LOBBY_ROUTE} className="social-page__back" aria-label="Back">
            ←
          </Link>
          <h1 className="explore-hub__title">Explore</h1>
        </div>
        <p className="explore-hub__sub">Likes, searches &amp; creators from across the world</p>
        <PopSearchBar className="explore-hub__search" />
      </div>

      <div className="explore-hub__filters" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`explore-hub__filter ${filter === f.id ? "is-active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="explore-hub__grid">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/profile/${post.authorUsername}`}
            className="explore-hub__tile"
            style={{ background: `linear-gradient(145deg, ${post.mediaHue ?? post.authorAccent}55, #050505)` }}
          >
            <div className="explore-hub__tile-meta">
              <span className="explore-hub__tile-author">{post.authorName}</span>
              <span className="explore-hub__tile-stat">♥ {formatCount(post.likes)}</span>
            </div>
            {post.kind === "reel" && <span className="explore-hub__tile-badge">▶ Reel</span>}
            {post.text && <p className="explore-hub__tile-caption">{post.text.slice(0, 80)}</p>}
          </Link>
        ))}
      </div>

      <div className="explore-hub__feed">
        <h2 className="explore-hub__section-title">Recommended for you</h2>
        {posts.slice(0, 6).map((post) => (
          <FeedPostCard
            key={`feed-${post.id}`}
            post={post}
            onLike={() => like(post.id)}
            onSave={() => save(post.id)}
            onRepost={() => repost(post.id)}
            onComment={() => openComments(post)}
            onFollow={() => follow(post.authorUsername)}
          />
        ))}
      </div>

      <PostCommentsSheet post={commentPost} onClose={closeComments} />
    </PullToRefresh>
  );
}
