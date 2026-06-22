"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PopitLens from "@/components/profile/PopitLens";
import ThoughtCard from "@/components/social/ThoughtCard";
import { searchDirectory } from "@/lib/identity/searchData";
import { getSearchResultAccent } from "@/lib/identity/searchData";
import { IDENTITY_OPTIONS } from "@/lib/identity/types";
import { searchPosts } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import type { SearchTab } from "@/lib/social/types";

const SEARCH_TABS: { id: SearchTab; label: string }[] = [
  { id: "people", label: "People" },
  { id: "posts", label: "Posts" },
  { id: "tags", label: "Tags" },
  { id: "places", label: "Places" },
];

const TRENDING_TAGS = [
  { tag: "#WhatsPopping", count: "12.4K posts" },
  { tag: "#MiamiEats", count: "8.1K posts" },
  { tag: "#BrickellNights", count: "5.6K posts" },
  { tag: "#WynwoodWalk", count: "4.2K posts" },
];

const TRENDING_PLACES = [
  { name: "Neon Lounge", area: "Brickell", live: true },
  { name: "LIV Nightclub", area: "South Beach", live: true },
  { name: "Joe's Pizza", area: "South Beach", live: false },
  { name: "Wynwood Walls", area: "Wynwood", live: false },
];

function CitySearch() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchTab>("people");
  const { like, repost, save, follow } = useSocialStore();
  const people = useMemo(() => searchDirectory(query), [query]);
  const posts = useMemo(() => searchPosts(query), [query]);
  const tags = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRENDING_TAGS.filter((t) => !q || t.tag.toLowerCase().includes(q));
  }, [query]);
  const places = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRENDING_PLACES.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#050505] pb-24 pt-6 app-page-pad">
      <div className="px-4">
        <Link
          href="/pulse"
          className="mb-4 inline-flex items-center gap-2 font-body text-xs text-white/40 hover:text-white/70"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Your City
        </Link>

        <h1 className="text-poster mb-1 text-3xl uppercase text-white">Search</h1>
        <p className="font-body mb-4 text-sm text-white/40">People, posts, tags & places — same everywhere</p>

        <div className="search-hub__tabs">
          {SEARCH_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`search-hub__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Restaurants, DJs, creators..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 font-body text-sm text-white outline-none placeholder:text-white/30 focus:border-[#FF4D6D]/40"
          />
        </div>

        <div className="flex flex-col gap-3">
          {tab === "people" &&
            people.map((result, i) => {
              const accent = getSearchResultAccent(result);
              const identityLabel = IDENTITY_OPTIONS.find((o) => o.id === result.identity)?.label ?? result.identity;

              return (
                <motion.div
                  key={result.username}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/profile/${result.username}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <PopitLens
                      name={result.name}
                      followers={result.followers}
                      verified={result.verified}
                      live={result.live}
                      accent={accent}
                      size={52}
                      followersBeneath={false}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-body text-sm font-bold text-white/90">{result.name}</span>
                        <span
                          className="rounded px-1.5 py-0.5 font-body text-[0.55rem] font-semibold uppercase tracking-wider"
                          style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}30` }}
                        >
                          {identityLabel}
                        </span>
                      </div>
                      <p className="font-body truncate text-xs text-white/45">{result.tagline}</p>
                      <p className="font-body text-[0.6rem] text-white/30">
                        {(result.followers / 1000).toFixed(1)}K followers · {result.city}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

          {tab === "posts" &&
            posts.map((post) => (
              <ThoughtCard
                key={post.id}
                post={post}
                onLike={() => like(post.id)}
                onRepost={() => repost(post.id)}
                onSave={() => save(post.id)}
                onFollow={() => follow(post.authorUsername)}
              />
            ))}

          {tab === "tags" &&
            tags.map((item) => (
              <button
                key={item.tag}
                type="button"
                className="search-hub__tag w-full text-left"
                onClick={() => setQuery(item.tag.replace("#", ""))}
              >
                <strong>{item.tag}</strong>
                <span>{item.count}</span>
              </button>
            ))}

          {tab === "places" &&
            places.map((place) => (
              <Link key={place.name} href="/map" className="search-hub__place block">
                <strong>{place.name}</strong>
                <span>
                  {place.area} · {place.live ? "Live on map" : "See on POP WORLD"}
                </span>
              </Link>
            ))}

          {tab === "people" && people.length === 0 && (
            <p className="py-12 text-center font-body text-sm text-white/40">No people found for &ldquo;{query}&rdquo;</p>
          )}
          {tab === "posts" && posts.length === 0 && (
            <p className="py-12 text-center font-body text-sm text-white/40">No posts found for &ldquo;{query}&rdquo;</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CitySearch);
