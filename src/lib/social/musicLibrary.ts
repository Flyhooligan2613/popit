export type MusicUsage =
  | "thought"
  | "story"
  | "page"
  | "liveBackground"
  | "liveSingAlong";

export type MusicGenre =
  | "hip-hop"
  | "rnb"
  | "pop"
  | "rock"
  | "latin"
  | "edm"
  | "country"
  | "reggaeton"
  | "afrobeats"
  | "jazz";

export type LicensedTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: MusicGenre;
  usage: Record<MusicUsage, boolean>;
  license: "popit-original" | "licensed-sync" | "catalog-preview";
  note?: string;
};

export const MUSIC_GENRES: { id: MusicGenre; label: string }[] = [
  { id: "hip-hop", label: "Hip-Hop" },
  { id: "rnb", label: "R&B" },
  { id: "pop", label: "Pop" },
  { id: "rock", label: "Rock" },
  { id: "latin", label: "Latin" },
  { id: "reggaeton", label: "Reggaeton" },
  { id: "edm", label: "EDM" },
  { id: "country", label: "Country" },
  { id: "afrobeats", label: "Afrobeats" },
  { id: "jazz", label: "Jazz" },
];

/** POP'IT music catalog — preview-style library across genres (rights handled at publish time) */
export const LICENSED_TRACKS: LicensedTrack[] = [
  { id: "city-pulse-01", title: "City Pulse", artist: "POP'IT Originals", duration: "0:30", genre: "edm", license: "popit-original", usage: { thought: true, story: true, page: true, liveBackground: true, liveSingAlong: true } },
  { id: "night-drive-02", title: "Night Drive", artist: "POP'IT Originals", duration: "0:45", genre: "rnb", license: "popit-original", usage: { thought: true, story: true, page: true, liveBackground: true, liveSingAlong: true } },
  { id: "brickell-bounce", title: "Brickell Bounce", artist: "Miami Heat", duration: "2:48", genre: "hip-hop", license: "catalog-preview", note: "Story & sing-along live OK", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "south-beach-pop", title: "South Beach Pop", artist: "Neon Collective", duration: "3:12", genre: "pop", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "wynwood-wave", title: "Wynwood Wave", artist: "Art District", duration: "2:56", genre: "edm", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "midnight-reggaeton", title: "Midnight Reggaeton", artist: "La Calle", duration: "3:05", genre: "reggaeton", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "ocean-drive-rnb", title: "Ocean Drive", artist: "Velvet Lane", duration: "3:30", genre: "rnb", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "club-anthem-edm", title: "Club Anthem", artist: "Pulse DJs", duration: "2:40", genre: "edm", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: true, liveSingAlong: true } },
  { id: "latin-fire", title: "Latin Fire", artist: "Calle Ocho", duration: "2:52", genre: "latin", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "rock-the-district", title: "Rock the District", artist: "Brickell Rock", duration: "3:18", genre: "rock", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "country-coast", title: "Country Coast", artist: "Bayou Sun", duration: "3:22", genre: "country", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "afrobeats-night", title: "Afrobeats Night", artist: "Global Pulse", duration: "2:58", genre: "afrobeats", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "jazz-rooftop", title: "Jazz Rooftop", artist: "Skyline Trio", duration: "4:02", genre: "jazz", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: true, liveSingAlong: true } },
  { id: "trap-miami", title: "Trap Miami", artist: "808 District", duration: "2:44", genre: "hip-hop", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
  { id: "pop-star-lite", title: "Pop Star Lite", artist: "Chart Runners", duration: "3:08", genre: "pop", license: "catalog-preview", usage: { thought: true, story: true, page: true, liveBackground: false, liveSingAlong: true } },
];

export function tracksForUsage(usage: MusicUsage, genre?: MusicGenre | "all"): LicensedTrack[] {
  return LICENSED_TRACKS.filter(
    (track) => track.usage[usage] && (genre === undefined || genre === "all" || track.genre === genre)
  );
}

export function liveBackgroundBlocked(track: LicensedTrack): boolean {
  return !track.usage.liveBackground;
}

export const MUSIC_COPYRIGHT_NOTICE =
  "Catalog previews work like YouTube Music — pick a track for stories and posts. Live club streams can sing along on camera; background sync tracks may be limited.";

export const LIVE_MUSIC_NOTICE =
  "Sing along on camera while you party — pick a track below. Background sync-licensed audio in live video may be restricted later.";

export const LIVE_SINGALONG_NOTICE =
  "Sing-along mode plays lyrics-friendly tracks while you're live at the club. You're on camera performing — not using the song as background filler.";

export function genreLabel(genre: MusicGenre): string {
  return MUSIC_GENRES.find((g) => g.id === genre)?.label ?? genre;
}
