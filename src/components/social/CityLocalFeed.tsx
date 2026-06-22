"use client";

import { useMemo } from "react";
import FeedPostCard from "./FeedPostCard";
import ThoughtCard from "./ThoughtCard";
import PostCommentsSheet from "./PostCommentsSheet";
import { getPostsForCity } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import { usePostCommentsSheet } from "@/hooks/usePostCommentsSheet";

type CityLocalFeedProps = {
  city: string;
};

export default function CityLocalFeed({ city }: CityLocalFeedProps) {
  const { state, like, save, repost, follow } = useSocialStore();
  const { commentPost, openComments, closeComments } = usePostCommentsSheet();
  const posts = useMemo(() => getPostsForCity(city), [city, state]);

  return (
    <section className="city-local-feed" aria-label={`${city} local feed`}>
      <div className="city-local-feed__head">
        <h2 className="city-local-feed__title">In {city}</h2>
        <p className="city-local-feed__sub">
          Followers, creators &amp; businesses near you — like, comment &amp; share
        </p>
      </div>

      {posts.length === 0 && (
        <p className="city-local-feed__empty">No local posts yet. Be the first to pop in {city}.</p>
      )}

      <div className="city-local-feed__list">
        {posts.map((post) =>
          post.kind === "thought" ? (
            <ThoughtCard
              key={post.id}
              post={post}
              onLike={() => like(post.id)}
              onRepost={() => repost(post.id)}
              onSave={() => save(post.id)}
              onComment={() => openComments(post)}
              onFollow={() => follow(post.authorUsername)}
            />
          ) : (
            <FeedPostCard
              key={post.id}
              post={post}
              onLike={() => like(post.id)}
              onSave={() => save(post.id)}
              onRepost={() => repost(post.id)}
              onComment={() => openComments(post)}
              onFollow={() => follow(post.authorUsername)}
            />
          )
        )}
      </div>

      <PostCommentsSheet post={commentPost} onClose={closeComments} />
    </section>
  );
}
