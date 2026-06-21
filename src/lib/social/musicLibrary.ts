export type MusicUsage = "thought" | "story" | "page" | "liveBackground";

export type LicensedTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  usage: Record<MusicUsage, boolean>;
  license: "popit-original" | "licensed-sync" | "user-owned";
  note?: string;
};

/** POP'IT licensed catalog — live streams cannot use sync-licensed tracks in background */
export const LICENSED_TRACKS: LicensedTrack[] = [
  {
    id: "city-pulse-01",
    title: "City Pulse",
    artist: "POP'IT Originals",
    duration: "0:30",
    license: "popit-original",
    usage: { thought: true, story: true, page: true, liveBackground: true },
  },
  {
    id: "night-drive-02",
    title: "Night Drive",
    artist: "POP'IT Originals",
    duration: "0:45",
    license: "popit-original",
    usage: { thought: true, story: true, page: true, liveBackground: true },
  },
  {
    id: "sync-hit-03",
    title: "Neon Skyline",
    artist: "Licensed Sync",
    duration: "0:30",
    license: "licensed-sync",
    note: "Allowed in posts, stories, and thoughts — not in live broadcasts.",
    usage: { thought: true, story: true, page: true, liveBackground: false },
  },
  {
    id: "sync-hit-04",
    title: "Brickell Bounce",
    artist: "Licensed Sync",
    duration: "0:28",
    license: "licensed-sync",
    note: "Allowed in posts, stories, and thoughts — not in live broadcasts.",
    usage: { thought: true, story: true, page: true, liveBackground: false },
  },
  {
    id: "sync-hit-05",
    title: "Wynwood Wave",
    artist: "Licensed Sync",
    duration: "0:32",
    license: "licensed-sync",
    usage: { thought: true, story: true, page: false, liveBackground: false },
  },
];

export function tracksForUsage(usage: MusicUsage): LicensedTrack[] {
  return LICENSED_TRACKS.filter((track) => track.usage[usage]);
}

export function liveBackgroundBlocked(track: LicensedTrack): boolean {
  return !track.usage.liveBackground;
}

export const MUSIC_COPYRIGHT_NOTICE =
  "Licensed tracks may appear in thoughts, stories, and page posts. Live broadcasts may only use POP'IT cleared originals in the background to protect creators and rights holders.";

export const LIVE_MUSIC_NOTICE =
  "You can't add sync-licensed music to live video backgrounds. Choose a POP'IT Original or go live without background music.";
