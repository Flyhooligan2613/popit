import type { IdentityType } from "./types";
import { getIdentityAccent } from "./types";
import { getUserProfile } from "./userProfile";
import { getActiveLiveSession } from "@/lib/social/liveStore";

export type SearchResult = {
  username: string;
  name: string;
  identity: IdentityType;
  followers: number;
  city: string;
  verified: boolean;
  live: boolean;
  tagline: string;
};

/** Legacy export — empty; real users come from auth / active sessions. */
export const SEARCH_DIRECTORY: SearchResult[] = [];

function buildSearchPool(): SearchResult[] {
  if (typeof window === "undefined") return [];

  const pool: SearchResult[] = [];
  const me = getUserProfile();
  pool.push({
    username: me.username,
    name: me.name,
    identity: me.identity,
    followers: me.followers,
    city: me.city,
    verified: me.verified,
    live: me.live,
    tagline: me.currentVibe,
  });

  const session = getActiveLiveSession();
  if (
    session &&
    session.broadcasterUsername.trim().toLowerCase() !== me.username.trim().toLowerCase()
  ) {
    pool.push({
      username: session.broadcasterUsername,
      name: session.broadcasterName,
      identity: "personal",
      followers: 0,
      city: session.city,
      verified: false,
      live: true,
      tagline: session.title,
    });
  }

  return pool;
}

export function searchDirectory(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  const pool = buildSearchPool();
  if (!q) return pool;
  return pool.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.username.toLowerCase().includes(q) ||
      r.identity.includes(q) ||
      r.tagline.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q)
  );
}

export function getSearchResultAccent(result: SearchResult): string {
  return getIdentityAccent(result.identity);
}

export function findProfileByUsername(username: string): SearchResult | null {
  const normalized = username.trim().toLowerCase();
  return (
    buildSearchPool().find((r) => r.username.trim().toLowerCase() === normalized) ?? null
  );
}
