import type { IdentityType } from "@/lib/identity/types";
import { getIdentityAccent } from "@/lib/identity/types";
import { getUserProfile } from "@/lib/identity/userProfile";
import { getActiveLiveSession } from "@/lib/social/liveStore";

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

export type LiveNearFilter = "near" | "live" | "creators" | "venues";

function buildLiveNearPool(city: string): LiveNearProfile[] {
  if (typeof window === "undefined") return [];

  const normalized = city.trim().toLowerCase();
  const items: LiveNearProfile[] = [];
  const session = getActiveLiveSession();
  const me = getUserProfile();

  if (session) {
    const matchesCity =
      !normalized ||
      normalized === "your city" ||
      session.city.trim().toLowerCase() === normalized;

    if (matchesCity) {
      items.push({
        username: session.broadcasterUsername,
        name: session.broadcasterName,
        identity: me.username.toLowerCase() === session.broadcasterUsername.toLowerCase() ? me.identity : "personal",
        followers: me.username.toLowerCase() === session.broadcasterUsername.toLowerCase() ? me.followers : 0,
        city: session.city,
        neighborhood: session.city,
        verified: me.username.toLowerCase() === session.broadcasterUsername.toLowerCase() ? me.verified : false,
        live: true,
        tagline: session.title,
        viewers: session.viewerCount,
        distanceLabel:
          me.username.toLowerCase() === session.broadcasterUsername.toLowerCase() ? "You" : "Live now",
        accent: session.broadcasterAccent,
      });
    }
  }

  const meOnAir =
    session &&
    session.broadcasterUsername.trim().toLowerCase() === me.username.trim().toLowerCase();

  if (!meOnAir) {
    const matchesCity =
      !normalized || normalized === "your city" || me.city.trim().toLowerCase() === normalized;

    if (matchesCity) {
      items.push({
        username: me.username,
        name: me.name,
        identity: me.identity,
        followers: me.followers,
        city: me.city,
        neighborhood: "Your block",
        verified: me.verified,
        live: false,
        tagline: me.currentVibe,
        distanceLabel: "You",
        accent: getIdentityAccent(me.identity),
      });
    }
  }

  return items;
}

export function getLiveNearProfiles(city: string, filter: LiveNearFilter = "near"): LiveNearProfile[] {
  let items = buildLiveNearPool(city);

  if (filter === "live") items = items.filter((p) => p.live);
  if (filter === "creators") {
    items = items.filter((p) =>
      ["content-creator", "dj", "music-artist", "gamer", "photographer", "videographer", "personal"].includes(
        p.identity
      )
    );
  }
  if (filter === "venues") {
    items = items.filter((p) => ["restaurant", "nightclub", "business"].includes(p.identity));
  }

  return items.sort((a, b) => {
    if (a.live !== b.live) return a.live ? -1 : 1;
    return (b.viewers ?? 0) - (a.viewers ?? 0);
  });
}
