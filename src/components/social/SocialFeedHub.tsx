"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PullToRefresh from "@/components/ui/PullToRefresh";
import StoriesStrip from "./StoriesStrip";
import FeedPostCard from "./FeedPostCard";
import ThoughtCard from "./ThoughtCard";
import ReelsFeed from "./ReelsFeed";
import { getPostsForFeed } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import type { FeedTab } from "@/lib/social/types";

const TABS: { id: FeedTab; label: string; sub: string }[] = [
  { id: "foryou", label: "For You", sub: "City + social" },
  { id: "following", label: "Following", sub: "Friends" },
  { id: "reels", label: "Reels", sub: "Pulse clips" },
  { id: "thoughts", label: "Thoughts", sub: "City voice" },
];

export default function SocialFeedHub() {
  const [tab, setTab] = useState<FeedTab>("foryou");
  const { state, like, save, repost, follow, refresh } = useSocialStore();

  const posts = useMemo(() => getPostsForFeed(tab), [tab, state]);

  const handleRefresh = async () => {
    refresh();
    await new Promise((r) => window.setTimeout(r, 500));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="social-feed-hub">
      <div className="social-feed-hub__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`social-feed-hub__tab ${tab === t.id ? "is-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="social-feed-hub__tab-sub">{t.sub}</span>
          </button>
        ))}
      </div>

      {tab !== "reels" && tab !== "thoughts" && (
        <>
          <StoriesStrip stories={state.stories} onView={refresh} />
          <div className="social-feed-hub__composer">
            <Link href="/map" className="social-feed-hub__map-chip">
              📍 See what&apos;s live on the map
            </Link>
          </div>
        </>
      )}

      {tab === "reels" ? (
        <ReelsFeed
          reels={posts}
          onLike={like}
          onRepost={repost}
          onSave={save}
        />
      ) : tab === "thoughts" ? (
        <div className="social-feed-hub__thoughts">
          {posts.map((post) => (
            <ThoughtCard
              key={post.id}
              post={post}
              onLike={() => like(post.id)}
              onRepost={() => repost(post.id)}
              onSave={() => save(post.id)}
              onFollow={() => follow(post.authorUsername)}
            />
          ))}
        </div>
      ) : (
        <div className="social-feed-hub__posts">
          {posts.map((post) =>
            post.kind === "thought" ? (
              <ThoughtCard
                key={post.id}
                post={post}
                onLike={() => like(post.id)}
                onRepost={() => repost(post.id)}
                onSave={() => save(post.id)}
                onFollow={() => follow(post.authorUsername)}
              />
            ) : (
              <FeedPostCard
                key={post.id}
                post={post}
                onLike={() => like(post.id)}
                onRepost={() => repost(post.id)}
                onSave={() => save(post.id)}
                onFollow={() => follow(post.authorUsername)}
              />
            )
          )}
        </div>
      )}
    </PullToRefresh>
  );
}
