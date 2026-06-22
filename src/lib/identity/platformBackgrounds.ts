import type { IdentityType } from "./types";

export type BackgroundCategoryId = "flags" | "identity" | "city" | "culture";

export type PlatformBackground = {
  id: string;
  label: string;
  category: BackgroundCategoryId;
  emoji?: string;
  /** Full-screen overlay gradient / pattern */
  gradient: string;
  /** Optional accent glow on top of city scenes */
  glow?: string;
  /** Identity lane backgrounds — shown when user matches or in identity tab */
  identities?: IdentityType[];
};

export const BACKGROUND_CATEGORIES: {
  id: BackgroundCategoryId;
  label: string;
  description: string;
}[] = [
  { id: "flags", label: "Flags & Roots", description: "Rep your country on your POP card" },
  { id: "identity", label: "Your Lane", description: "Backgrounds tied to who you are" },
  { id: "city", label: "City Energy", description: "Neon skylines and district vibes" },
  { id: "culture", label: "Culture & Mood", description: "Patterns, pride, and atmosphere" },
];

export const PLATFORM_BACKGROUNDS: PlatformBackground[] = [
  // Flags
  { id: "flag-us", label: "United States", category: "flags", emoji: "🇺🇸", gradient: "linear-gradient(160deg, #B22234 0%, #3C3B6E 45%, #050505 100%)", glow: "rgba(60,59,110,0.35)" },
  { id: "flag-jm", label: "Jamaica", category: "flags", emoji: "🇯🇲", gradient: "linear-gradient(160deg, #009B3A 0%, #FED100 40%, #050505 100%)", glow: "rgba(0,155,58,0.3)" },
  { id: "flag-ht", label: "Haiti", category: "flags", emoji: "🇭🇹", gradient: "linear-gradient(160deg, #00209F 0%, #D21034 50%, #050505 100%)", glow: "rgba(210,16,52,0.28)" },
  { id: "flag-cu", label: "Cuba", category: "flags", emoji: "🇨🇺", gradient: "linear-gradient(160deg, #002A8F 0%, #CF142B 45%, #050505 100%)", glow: "rgba(207,20,43,0.28)" },
  { id: "flag-do", label: "Dominican Republic", category: "flags", emoji: "🇩🇴", gradient: "linear-gradient(160deg, #002D62 0%, #CE1126 40%, #050505 100%)", glow: "rgba(0,45,98,0.3)" },
  { id: "flag-pr", label: "Puerto Rico", category: "flags", emoji: "🇵🇷", gradient: "linear-gradient(160deg, #ED0000 0%, #0050F0 45%, #050505 100%)", glow: "rgba(237,0,0,0.25)" },
  { id: "flag-br", label: "Brazil", category: "flags", emoji: "🇧🇷", gradient: "linear-gradient(160deg, #009C3B 0%, #FFDF00 35%, #050505 100%)", glow: "rgba(0,156,59,0.28)" },
  { id: "flag-mx", label: "Mexico", category: "flags", emoji: "🇲🇽", gradient: "linear-gradient(160deg, #006847 0%, #CE1126 50%, #050505 100%)", glow: "rgba(0,104,71,0.28)" },
  { id: "flag-ng", label: "Nigeria", category: "flags", emoji: "🇳🇬", gradient: "linear-gradient(160deg, #008751 0%, #FFFFFF 30%, #008751 60%, #050505 100%)", glow: "rgba(0,135,81,0.25)" },
  { id: "flag-co", label: "Colombia", category: "flags", emoji: "🇨🇴", gradient: "linear-gradient(160deg, #FCD116 0%, #003893 40%, #CE1126 70%, #050505 100%)", glow: "rgba(252,209,22,0.22)" },

  // Identity lanes
  { id: "id-music-artist", label: "Music Artist", category: "identity", emoji: "🎤", gradient: "linear-gradient(145deg, #A855F7 0%, #FF4D6D 40%, #050505 100%)", glow: "rgba(168,85,247,0.35)", identities: ["music-artist", "dj"] },
  { id: "id-athlete", label: "Athlete Arena", category: "identity", emoji: "🏟", gradient: "linear-gradient(145deg, #34D399 0%, #0099FF 45%, #050505 100%)", glow: "rgba(52,211,153,0.3)", identities: ["athlete", "fitness"] },
  { id: "id-restaurant", label: "Kitchen Glow", category: "identity", emoji: "🍽", gradient: "linear-gradient(145deg, #FFB020 0%, #FF4D6D 40%, #050505 100%)", glow: "rgba(255,176,32,0.28)", identities: ["restaurant", "food-creator"] },
  { id: "id-nightclub", label: "Nightclub Pulse", category: "identity", emoji: "🪩", gradient: "linear-gradient(145deg, #FF4D6D 0%, #A855F7 50%, #050505 100%)", glow: "rgba(255,77,109,0.35)", identities: ["nightclub"] },
  { id: "id-creator", label: "Creator Studio", category: "identity", emoji: "📸", gradient: "linear-gradient(145deg, #00D4FF 0%, #A855F7 45%, #050505 100%)", glow: "rgba(0,212,255,0.28)", identities: ["content-creator", "photographer", "videographer"] },
  { id: "id-gamer", label: "Gamer Grid", category: "identity", emoji: "🎮", gradient: "linear-gradient(145deg, #7C3AED 0%, #00D4FF 40%, #050505 100%)", glow: "rgba(124,58,237,0.32)", identities: ["gamer"] },
  { id: "id-business", label: "Business District", category: "identity", emoji: "💼", gradient: "linear-gradient(145deg, #64748B 0%, #00D4FF 35%, #050505 100%)", glow: "rgba(100,116,139,0.25)", identities: ["business", "entrepreneur"] },
  { id: "id-personal", label: "Personal City", category: "identity", emoji: "✨", gradient: "linear-gradient(145deg, #FF4D6D 0%, #00D4FF 50%, #050505 100%)", glow: "rgba(255,77,109,0.25)", identities: ["personal", "travel", "community"] },

  // City
  { id: "city-neon", label: "Neon Brickell", category: "city", emoji: "🌃", gradient: "linear-gradient(180deg, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.35) 35%, #050505 100%)", glow: "rgba(255,77,109,0.3)" },
  { id: "city-ocean", label: "Ocean Drive", category: "city", emoji: "🌊", gradient: "linear-gradient(180deg, rgba(0,212,255,0.45) 0%, rgba(0,80,120,0.35) 40%, #050505 100%)", glow: "rgba(0,212,255,0.28)" },
  { id: "city-wynwood", label: "Wynwood Murals", category: "city", emoji: "🎨", gradient: "linear-gradient(135deg, rgba(255,122,0,0.4) 0%, rgba(168,85,247,0.35) 50%, #050505 100%)", glow: "rgba(255,122,0,0.25)" },
  { id: "city-rooftop", label: "Rooftop Sunset", category: "city", emoji: "🌅", gradient: "linear-gradient(180deg, rgba(255,140,60,0.5) 0%, rgba(168,85,247,0.25) 45%, #050505 100%)", glow: "rgba(255,140,60,0.22)" },
  { id: "city-late", label: "Late Night", category: "city", emoji: "🌙", gradient: "linear-gradient(180deg, rgba(30,20,80,0.7) 0%, rgba(5,5,5,0.95) 100%)", glow: "rgba(88,70,180,0.35)" },

  // Culture
  { id: "culture-pride", label: "City Pride", category: "culture", emoji: "🏳️‍🌈", gradient: "linear-gradient(90deg, #FF4D6D, #FF7A00, #FED100, #34D399, #00D4FF, #A855F7)", glow: "rgba(168,85,247,0.25)" },
  { id: "culture-gold", label: "Gold Hour", category: "culture", emoji: "✨", gradient: "linear-gradient(160deg, rgba(255,215,100,0.45) 0%, rgba(255,77,109,0.2) 50%, #050505 100%)", glow: "rgba(255,215,100,0.2)" },
  { id: "culture-heritage", label: "Heritage Pattern", category: "culture", emoji: "🪡", gradient: "repeating-linear-gradient(45deg, rgba(255,77,109,0.12) 0 8px, rgba(0,212,255,0.08) 8px 16px), linear-gradient(180deg, #0a0a12, #050505)", glow: "rgba(255,77,109,0.18)" },
  { id: "culture-island", label: "Island Vibes", category: "culture", emoji: "🌴", gradient: "linear-gradient(160deg, rgba(0,180,120,0.4) 0%, rgba(0,212,255,0.25) 40%, #050505 100%)", glow: "rgba(0,180,120,0.25)" },
];

export const DEFAULT_PLATFORM_BACKGROUND_ID = "city-neon";

const BACKGROUND_KEY = "popit:platformBackground";
const USER_KEY = "popit:user";

export function savePlatformBackground(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BACKGROUND_KEY, id);
  try {
    const raw = localStorage.getItem(USER_KEY);
    const current = raw ? JSON.parse(raw) : {};
    localStorage.setItem(USER_KEY, JSON.stringify({ ...current, platformBackgroundId: id }));
  } catch {
    /* profile sync is best-effort */
  }
  window.dispatchEvent(new Event("popit:platformBackground:update"));
}

export function getPlatformBackgroundId(): string {
  if (typeof window === "undefined") return DEFAULT_PLATFORM_BACKGROUND_ID;
  const stored = localStorage.getItem(BACKGROUND_KEY);
  if (stored) return stored;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      const profile = JSON.parse(raw) as { platformBackgroundId?: string };
      if (profile.platformBackgroundId) return profile.platformBackgroundId;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_PLATFORM_BACKGROUND_ID;
}

export function getPlatformBackground(id?: string): PlatformBackground {
  const resolved = id ?? getPlatformBackgroundId();
  return (
    PLATFORM_BACKGROUNDS.find((b) => b.id === resolved) ??
    PLATFORM_BACKGROUNDS.find((b) => b.id === DEFAULT_PLATFORM_BACKGROUND_ID)!
  );
}

export function backgroundsForCategory(
  category: BackgroundCategoryId,
  identity?: IdentityType
): PlatformBackground[] {
  const items = PLATFORM_BACKGROUNDS.filter((b) => b.category === category);
  if (category !== "identity" || !identity) return items;
  return items.filter(
    (b) => !b.identities?.length || b.identities.includes(identity)
  );
}

export function recommendedBackgrounds(identity: IdentityType): PlatformBackground[] {
  const identityMatch = PLATFORM_BACKGROUNDS.filter((b) => b.identities?.includes(identity));
  const cityPick = PLATFORM_BACKGROUNDS.filter((b) => b.category === "city").slice(0, 2);
  return [...identityMatch.slice(0, 2), ...cityPick];
}
