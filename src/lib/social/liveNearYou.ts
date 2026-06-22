import type { IdentityType } from "@/lib/identity/types";
import { getIdentityAccent } from "@/lib/identity/types";

export type LiveNearProfile = {
  username: string;
  name: string;
  identity: IdentityType;
  followers: number;
  city: string;
  neighborhood: string;
  verified: boolean;
  live: boolean;
  tagline: string;
  viewers?: number;
  distanceLabel: string;
  accent: string;
};

export const LIVE_NEAR_DIRECTORY: Omit<LiveNearProfile, "accent">[] = [
  {
    username: "neon-lounge",
    name: "Neon Lounge",
    identity: "nightclub",
    followers: 52100,
    city: "Miami",
    neighborhood: "Brickell",
    verified: true,
    live: true,
    tagline: "Main room · 14K watching",
    viewers: 14200,
    distanceLabel: "0.4 mi",
  },
  {
    username: "dj-kairo",
    name: "KAIRO",
    identity: "dj",
    followers: 41200,
    city: "Miami",
    neighborhood: "Wynwood",
    verified: true,
    live: true,
    tagline: "Techno set live",
    viewers: 8900,
    distanceLabel: "1.2 mi",
  },
  {
    username: "pulse-kitchen",
    name: "Pulse Kitchen",
    identity: "restaurant",
    followers: 28400,
    city: "Miami",
    neighborhood: "Wynwood",
    verified: true,
    live: true,
    tagline: "Chef's table stream",
    viewers: 2100,
    distanceLabel: "1.8 mi",
  },
  {
    username: "marcus-j",
    name: "Marcus J",
    identity: "athlete",
    followers: 67300,
    city: "Miami",
    neighborhood: "South Beach",
    verified: true,
    live: true,
    tagline: "Post-game city walk",
    viewers: 5600,
    distanceLabel: "2.1 mi",
  },
  {
    username: "luna-creates",
    name: "Luna",
    identity: "content-creator",
    followers: 94000,
    city: "Miami",
    neighborhood: "Design District",
    verified: true,
    live: true,
    tagline: "Studio Q&A",
    viewers: 3200,
    distanceLabel: "2.6 mi",
  },
  {
    username: "nova-games",
    name: "Nova",
    identity: "gamer",
    followers: 18900,
    city: "Miami",
    neighborhood: "Gaming District",
    verified: false,
    live: true,
    tagline: "Ranked grind · cam on",
    viewers: 1800,
    distanceLabel: "3.0 mi",
  },
  {
    username: "skyline-co",
    name: "Skyline Co",
    identity: "business",
    followers: 15200,
    city: "Miami",
    neighborhood: "Brickell",
    verified: true,
    live: false,
    tagline: "Pop-up launch soon",
    distanceLabel: "0.9 mi",
  },
  {
    username: "flygoon",
    name: "Marcus",
    identity: "personal",
    followers: 18420,
    city: "Miami",
    neighborhood: "Your block",
    verified: true,
    live: false,
    tagline: "City explorer",
    distanceLabel: "You",
  },
];

export type LiveNearFilter = "near" | "live" | "creators" | "venues";

export function getLiveNearProfiles(city: string, filter: LiveNearFilter = "near"): LiveNearProfile[] {
  const normalized = city.trim().toLowerCase();
  let items = LIVE_NEAR_DIRECTORY.filter(
    (p) => !normalized || p.city.toLowerCase() === normalized || normalized === "your city"
  ).map((p) => ({ ...p, accent: getIdentityAccent(p.identity) }));

  if (filter === "live") items = items.filter((p) => p.live);
  if (filter === "creators") {
    items = items.filter((p) =>
      ["content-creator", "dj", "music-artist", "gamer", "photographer", "videographer"].includes(p.identity)
    );
  }
  if (filter === "venues") {
    items = items.filter((p) =>
      ["restaurant", "nightclub", "business"].includes(p.identity)
    );
  }

  return items.sort((a, b) => {
    if (a.live !== b.live) return a.live ? -1 : 1;
    return (b.viewers ?? 0) - (a.viewers ?? 0);
  });
}
