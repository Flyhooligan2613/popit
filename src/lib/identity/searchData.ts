import type { IdentityType } from "./types";
import { getIdentityAccent } from "./types";

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

export const SEARCH_DIRECTORY: SearchResult[] = [
  {
    username: "pulse-kitchen",
    name: "Pulse Kitchen",
    identity: "restaurant",
    followers: 28400,
    city: "Miami",
    verified: true,
    live: false,
    tagline: "Fine dining · Wynwood",
  },
  {
    username: "neon-lounge",
    name: "Neon Lounge",
    identity: "nightclub",
    followers: 52100,
    city: "Miami",
    verified: true,
    live: true,
    tagline: "On fire tonight · Brickell",
  },
  {
    username: "dj-kairo",
    name: "KAIRO",
    identity: "dj",
    followers: 41200,
    city: "Miami",
    verified: true,
    live: true,
    tagline: "House · Techno · Main room",
  },
  {
    username: "nova-games",
    name: "Nova",
    identity: "gamer",
    followers: 18900,
    city: "Miami",
    verified: false,
    live: false,
    tagline: "Diamond rank · Valorant",
  },
  {
    username: "marcus-j",
    name: "Marcus J",
    identity: "athlete",
    followers: 67300,
    city: "Miami",
    verified: true,
    live: false,
    tagline: "Point Guard · City League",
  },
  {
    username: "luna-creates",
    name: "Luna",
    identity: "content-creator",
    followers: 94000,
    city: "Miami",
    verified: true,
    live: false,
    tagline: "Creator studio · 42K subs",
  },
  {
    username: "skyline-co",
    name: "Skyline Co",
    identity: "business",
    followers: 15200,
    city: "Miami",
    verified: true,
    live: false,
    tagline: "Digital storefront · Design District",
  },
  {
    username: "flygoon",
    name: "Marcus",
    identity: "personal",
    followers: 18420,
    city: "Miami",
    verified: true,
    live: false,
    tagline: "Exploring the city pulse",
  },
];

export function searchDirectory(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_DIRECTORY;
  return SEARCH_DIRECTORY.filter(
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
