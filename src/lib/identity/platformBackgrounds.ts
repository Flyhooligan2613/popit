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
  /** Sub-style of a parent background (shown in nested picker) */
  variantOf?: string;
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
  { id: "flag-us-stripes", label: "Stars & Stripes", variantOf: "flag-us", category: "flags", emoji: "🇺🇸", gradient: "repeating-linear-gradient(180deg, #B22234 0 12px, #fff 12px 24px, #B22234 24px 36px), linear-gradient(160deg, #3C3B6E 0%, #050505 100%)", glow: "rgba(60,59,110,0.3)" },
  { id: "flag-jm", label: "Jamaica", category: "flags", emoji: "🇯🇲", gradient: "linear-gradient(160deg, #009B3A 0%, #FED100 40%, #050505 100%)", glow: "rgba(0,155,58,0.3)" },
  { id: "flag-jm-vibes", label: "Island Cross", variantOf: "flag-jm", category: "flags", emoji: "🇯🇲", gradient: "linear-gradient(135deg, #009B3A 0%, #000 35%, #FED100 65%, #000 100%), linear-gradient(180deg, transparent, #050505 85%)", glow: "rgba(254,209,0,0.22)" },
  { id: "flag-ht", label: "Haiti", category: "flags", emoji: "🇭🇹", gradient: "linear-gradient(160deg, #00209F 0%, #D21034 50%, #050505 100%)", glow: "rgba(210,16,52,0.28)" },
  { id: "flag-ht-coat", label: "Heritage Blue", variantOf: "flag-ht", category: "flags", emoji: "🇭🇹", gradient: "radial-gradient(circle at 50% 30%, rgba(210,16,52,0.35) 0%, transparent 45%), linear-gradient(160deg, #00209F 0%, #050505 100%)", glow: "rgba(0,32,159,0.28)" },
  { id: "flag-cu", label: "Cuba", category: "flags", emoji: "🇨🇺", gradient: "linear-gradient(160deg, #002A8F 0%, #CF142B 45%, #050505 100%)", glow: "rgba(207,20,43,0.28)" },
  { id: "flag-cu-star", label: "Lone Star", variantOf: "flag-cu", category: "flags", emoji: "🇨🇺", gradient: "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.9) 0 3%, transparent 3.5%), linear-gradient(160deg, #002A8F 0%, #CF142B 55%, #050505 100%)", glow: "rgba(207,20,43,0.25)" },
  { id: "flag-do", label: "Dominican Republic", category: "flags", emoji: "🇩🇴", gradient: "linear-gradient(160deg, #002D62 0%, #CE1126 40%, #050505 100%)", glow: "rgba(0,45,98,0.3)" },
  { id: "flag-do-cross", label: "Cross Field", variantOf: "flag-do", category: "flags", emoji: "🇩🇴", gradient: "linear-gradient(90deg, transparent 46%, #fff 46% 54%, transparent 54%), linear-gradient(0deg, transparent 46%, #fff 46% 54%, transparent 54%), linear-gradient(160deg, #002D62 0%, #CE1126 50%, #050505 100%)", glow: "rgba(206,17,38,0.25)" },
  { id: "flag-pr", label: "Puerto Rico", category: "flags", emoji: "🇵🇷", gradient: "linear-gradient(160deg, #ED0000 0%, #0050F0 45%, #050505 100%)", glow: "rgba(237,0,0,0.25)" },
  { id: "flag-pr-boricua", label: "Boricua Wave", variantOf: "flag-pr", category: "flags", emoji: "🇵🇷", gradient: "repeating-linear-gradient(180deg, #ED0000 0 14px, #fff 14px 28px), linear-gradient(160deg, #0050F0 0%, #050505 100%)", glow: "rgba(0,80,240,0.28)" },
  { id: "flag-br", label: "Brazil", category: "flags", emoji: "🇧🇷", gradient: "linear-gradient(160deg, #009C3B 0%, #FFDF00 35%, #050505 100%)", glow: "rgba(0,156,59,0.28)" },
  { id: "flag-br-samba", label: "Samba Glow", variantOf: "flag-br", category: "flags", emoji: "🇧🇷", gradient: "radial-gradient(circle at 50% 40%, rgba(255,223,0,0.45) 0%, transparent 50%), linear-gradient(160deg, #009C3B 0%, #050505 100%)", glow: "rgba(255,223,0,0.22)" },
  { id: "flag-mx", label: "Mexico", category: "flags", emoji: "🇲🇽", gradient: "linear-gradient(160deg, #006847 0%, #CE1126 50%, #050505 100%)", glow: "rgba(0,104,71,0.28)" },
  { id: "flag-mx-eagle", label: "Tricolor Depth", variantOf: "flag-mx", category: "flags", emoji: "🇲🇽", gradient: "linear-gradient(90deg, #006847 0%, #fff 33%, #CE1126 66%, #050505 100%)", glow: "rgba(206,17,38,0.22)" },
  { id: "flag-ng", label: "Nigeria", category: "flags", emoji: "🇳🇬", gradient: "linear-gradient(160deg, #008751 0%, #FFFFFF 30%, #008751 60%, #050505 100%)", glow: "rgba(0,135,81,0.25)" },
  { id: "flag-ng-pan", label: "Pan-African", variantOf: "flag-ng", category: "flags", emoji: "🇳🇬", gradient: "linear-gradient(90deg, #008751 0%, #fff 50%, #008751 100%), linear-gradient(180deg, transparent, #050505 90%)", glow: "rgba(0,135,81,0.22)" },
  { id: "flag-co", label: "Colombia", category: "flags", emoji: "🇨🇴", gradient: "linear-gradient(160deg, #FCD116 0%, #003893 40%, #CE1126 70%, #050505 100%)", glow: "rgba(252,209,22,0.22)" },
  { id: "flag-co-horizon", label: "Andes Horizon", variantOf: "flag-co", category: "flags", emoji: "🇨🇴", gradient: "linear-gradient(180deg, #FCD116 0%, #003893 38%, #CE1126 62%, #050505 100%)", glow: "rgba(0,56,147,0.25)" },

  // Identity lanes
  { id: "id-music-artist", label: "Music Artist", category: "identity", emoji: "🎤", gradient: "linear-gradient(145deg, #A855F7 0%, #FF4D6D 40%, #050505 100%)", glow: "rgba(168,85,247,0.35)", identities: ["music-artist", "dj"] },
  { id: "id-music-stage", label: "Stage Lights", variantOf: "id-music-artist", category: "identity", emoji: "🎤", gradient: "radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.55) 0%, transparent 55%), linear-gradient(180deg, #A855F7 0%, #050505 100%)", glow: "rgba(255,77,109,0.3)", identities: ["music-artist", "dj"] },
  { id: "id-athlete", label: "Athlete Arena", category: "identity", emoji: "🏟", gradient: "linear-gradient(145deg, #34D399 0%, #0099FF 45%, #050505 100%)", glow: "rgba(52,211,153,0.3)", identities: ["athlete", "fitness"] },
  { id: "id-athlete-stadium", label: "Stadium Flood", variantOf: "id-athlete", category: "identity", emoji: "🏟", gradient: "radial-gradient(ellipse at 50% 100%, rgba(52,211,153,0.4) 0%, transparent 60%), linear-gradient(180deg, #0099FF 0%, #050505 100%)", glow: "rgba(0,153,255,0.28)", identities: ["athlete", "fitness"] },
  { id: "id-restaurant", label: "Kitchen Glow", category: "identity", emoji: "🍽", gradient: "linear-gradient(145deg, #FFB020 0%, #FF4D6D 40%, #050505 100%)", glow: "rgba(255,176,32,0.28)", identities: ["restaurant", "food-creator"] },
  { id: "id-restaurant-warm", label: "Warm Hearth", variantOf: "id-restaurant", category: "identity", emoji: "🍽", gradient: "radial-gradient(circle at 50% 80%, rgba(255,176,32,0.45) 0%, transparent 55%), linear-gradient(180deg, #FF4D6D 0%, #050505 100%)", glow: "rgba(255,176,32,0.25)", identities: ["restaurant", "food-creator"] },
  { id: "id-nightclub", label: "Nightclub Pulse", category: "identity", emoji: "🪩", gradient: "linear-gradient(145deg, #FF4D6D 0%, #A855F7 50%, #050505 100%)", glow: "rgba(255,77,109,0.35)", identities: ["nightclub"] },
  { id: "id-nightclub-laser", label: "Laser Room", variantOf: "id-nightclub", category: "identity", emoji: "🪩", gradient: "repeating-linear-gradient(125deg, rgba(255,77,109,0.12) 0 6px, transparent 6px 12px), linear-gradient(145deg, #A855F7 0%, #050505 100%)", glow: "rgba(168,85,247,0.35)", identities: ["nightclub"] },
  { id: "id-creator", label: "Creator Studio", category: "identity", emoji: "📸", gradient: "linear-gradient(145deg, #00D4FF 0%, #A855F7 45%, #050505 100%)", glow: "rgba(0,212,255,0.28)", identities: ["content-creator", "photographer", "videographer"] },
  { id: "id-creator-ring", label: "Ring Light", variantOf: "id-creator", category: "identity", emoji: "📸", gradient: "radial-gradient(circle at 50% 35%, rgba(0,212,255,0.35) 0%, transparent 45%), linear-gradient(180deg, #A855F7 0%, #050505 100%)", glow: "rgba(0,212,255,0.32)", identities: ["content-creator", "photographer", "videographer"] },
  { id: "id-gamer", label: "Gamer Grid", category: "identity", emoji: "🎮", gradient: "linear-gradient(145deg, #7C3AED 0%, #00D4FF 40%, #050505 100%)", glow: "rgba(124,58,237,0.32)", identities: ["gamer"] },
  { id: "id-gamer-rgb", label: "RGB Pulse", variantOf: "id-gamer", category: "identity", emoji: "🎮", gradient: "linear-gradient(135deg, #ff0040 0%, #00ff88 28%, #0088ff 56%, #050505 100%)", glow: "rgba(0,136,255,0.35)", identities: ["gamer"] },
  { id: "id-gamer-retro", label: "Retro Arcade", variantOf: "id-gamer", category: "identity", emoji: "👾", gradient: "repeating-linear-gradient(0deg, rgba(124,58,237,0.15) 0 3px, transparent 3px 6px), linear-gradient(180deg, #1a0a2e 0%, #7c3aed 35%, #050505 100%)", glow: "rgba(124,58,237,0.38)", identities: ["gamer"] },
  { id: "id-gamer-esports", label: "Esports Arena", variantOf: "id-gamer", category: "identity", emoji: "🏆", gradient: "linear-gradient(160deg, #0a0a0a 0%, #1e3a5f 28%, #00d4ff 52%, #050505 100%)", glow: "rgba(0,212,255,0.32)", identities: ["gamer"] },
  { id: "id-gamer-cyber", label: "Cyber Glitch", variantOf: "id-gamer", category: "identity", emoji: "⚡", gradient: "linear-gradient(125deg, #050505 0%, #7c3aed 22%, #00d4ff 48%, #ff4d6d 72%, #050505 100%)", glow: "rgba(255,77,109,0.28)", identities: ["gamer"] },
  { id: "id-gamer-pixel", label: "Pixel World", variantOf: "id-gamer", category: "identity", emoji: "🕹", gradient: "repeating-linear-gradient(90deg, rgba(124,58,237,0.18) 0 10px, transparent 10px 20px), repeating-linear-gradient(0deg, rgba(0,212,255,0.14) 0 10px, transparent 10px 20px), linear-gradient(180deg, #0a0520, #050505)", glow: "rgba(124,58,237,0.3)", identities: ["gamer"] },
  { id: "id-business", label: "Business District", category: "identity", emoji: "💼", gradient: "linear-gradient(145deg, #64748B 0%, #00D4FF 35%, #050505 100%)", glow: "rgba(100,116,139,0.25)", identities: ["business", "entrepreneur"] },
  { id: "id-business-skyline", label: "Glass Tower", variantOf: "id-business", category: "identity", emoji: "💼", gradient: "linear-gradient(180deg, rgba(0,212,255,0.25) 0%, rgba(100,116,139,0.35) 40%, #050505 100%)", glow: "rgba(0,212,255,0.22)", identities: ["business", "entrepreneur"] },
  { id: "id-personal", label: "Personal City", category: "identity", emoji: "✨", gradient: "linear-gradient(145deg, #FF4D6D 0%, #00D4FF 50%, #050505 100%)", glow: "rgba(255,77,109,0.25)", identities: ["personal", "travel", "community"] },
  { id: "id-personal-dream", label: "Dreamscape", variantOf: "id-personal", category: "identity", emoji: "✨", gradient: "radial-gradient(ellipse at 30% 20%, rgba(255,77,109,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.28) 0%, transparent 50%), linear-gradient(180deg, #050505, #050505)", glow: "rgba(168,85,247,0.22)", identities: ["personal", "travel", "community"] },

  // City
  { id: "city-neon", label: "Neon Brickell", category: "city", emoji: "🌃", gradient: "linear-gradient(180deg, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.35) 35%, #050505 100%)", glow: "rgba(255,77,109,0.3)" },
  { id: "city-neon-rain", label: "Neon Rain", variantOf: "city-neon", category: "city", emoji: "🌃", gradient: "repeating-linear-gradient(180deg, rgba(0,212,255,0.08) 0 2px, transparent 2px 14px), linear-gradient(180deg, rgba(255,77,109,0.5) 0%, #050505 100%)", glow: "rgba(0,212,255,0.25)" },
  { id: "city-ocean", label: "Ocean Drive", category: "city", emoji: "🌊", gradient: "linear-gradient(180deg, rgba(0,212,255,0.45) 0%, rgba(0,80,120,0.35) 40%, #050505 100%)", glow: "rgba(0,212,255,0.28)" },
  { id: "city-ocean-dusk", label: "Ocean Dusk", variantOf: "city-ocean", category: "city", emoji: "🌊", gradient: "linear-gradient(180deg, rgba(255,140,60,0.35) 0%, rgba(0,212,255,0.35) 45%, #050505 100%)", glow: "rgba(255,140,60,0.22)" },
  { id: "city-wynwood", label: "Wynwood Murals", category: "city", emoji: "🎨", gradient: "linear-gradient(135deg, rgba(255,122,0,0.4) 0%, rgba(168,85,247,0.35) 50%, #050505 100%)", glow: "rgba(255,122,0,0.25)" },
  { id: "city-wynwood-spray", label: "Spray Paint", variantOf: "city-wynwood", category: "city", emoji: "🎨", gradient: "repeating-linear-gradient(45deg, rgba(255,122,0,0.12) 0 10px, rgba(168,85,247,0.1) 10px 20px), linear-gradient(135deg, #050505, #050505)", glow: "rgba(255,122,0,0.22)" },
  { id: "city-rooftop", label: "Rooftop Sunset", category: "city", emoji: "🌅", gradient: "linear-gradient(180deg, rgba(255,140,60,0.5) 0%, rgba(168,85,247,0.25) 45%, #050505 100%)", glow: "rgba(255,140,60,0.22)" },
  { id: "city-rooftop-gold", label: "Golden Hour", variantOf: "city-rooftop", category: "city", emoji: "🌅", gradient: "radial-gradient(ellipse at 50% 0%, rgba(255,215,100,0.45) 0%, transparent 55%), linear-gradient(180deg, rgba(255,140,60,0.35) 0%, #050505 100%)", glow: "rgba(255,215,100,0.2)" },
  { id: "city-late", label: "Late Night", category: "city", emoji: "🌙", gradient: "linear-gradient(180deg, rgba(30,20,80,0.7) 0%, rgba(5,5,5,0.95) 100%)", glow: "rgba(88,70,180,0.35)" },
  { id: "city-late-moon", label: "Midnight Moon", variantOf: "city-late", category: "city", emoji: "🌙", gradient: "radial-gradient(circle at 75% 18%, rgba(255,255,255,0.12) 0%, transparent 18%), linear-gradient(180deg, rgba(30,20,80,0.75) 0%, #050505 100%)", glow: "rgba(88,70,180,0.32)" },

  // Culture
  { id: "culture-pride", label: "City Pride", category: "culture", emoji: "🏳️‍🌈", gradient: "linear-gradient(90deg, #FF4D6D, #FF7A00, #FED100, #34D399, #00D4FF, #A855F7)", glow: "rgba(168,85,247,0.25)" },
  { id: "culture-pride-soft", label: "Soft Pride", variantOf: "culture-pride", category: "culture", emoji: "🏳️‍🌈", gradient: "linear-gradient(90deg, rgba(255,77,109,0.55), rgba(255,122,0,0.55), rgba(254,209,0,0.55), rgba(52,211,153,0.55), rgba(0,212,255,0.55), rgba(168,85,247,0.55)), linear-gradient(180deg, transparent, #050505 85%)", glow: "rgba(168,85,247,0.22)" },
  { id: "culture-gold", label: "Gold Hour", category: "culture", emoji: "✨", gradient: "linear-gradient(160deg, rgba(255,215,100,0.45) 0%, rgba(255,77,109,0.2) 50%, #050505 100%)", glow: "rgba(255,215,100,0.2)" },
  { id: "culture-gold-shimmer", label: "Gold Shimmer", variantOf: "culture-gold", category: "culture", emoji: "✨", gradient: "repeating-linear-gradient(110deg, rgba(255,215,100,0.12) 0 8px, transparent 8px 16px), linear-gradient(160deg, rgba(255,215,100,0.35) 0%, #050505 100%)", glow: "rgba(255,215,100,0.22)" },
  { id: "culture-heritage", label: "Heritage Pattern", category: "culture", emoji: "🪡", gradient: "repeating-linear-gradient(45deg, rgba(255,77,109,0.12) 0 8px, rgba(0,212,255,0.08) 8px 16px), linear-gradient(180deg, #0a0a12, #050505)", glow: "rgba(255,77,109,0.18)" },
  { id: "culture-heritage-weave", label: "Woven Threads", variantOf: "culture-heritage", category: "culture", emoji: "🪡", gradient: "repeating-linear-gradient(0deg, rgba(255,77,109,0.1) 0 4px, transparent 4px 8px), repeating-linear-gradient(90deg, rgba(0,212,255,0.08) 0 4px, transparent 4px 8px), linear-gradient(180deg, #0a0a12, #050505)", glow: "rgba(255,77,109,0.2)" },
  { id: "culture-island", label: "Island Vibes", category: "culture", emoji: "🌴", gradient: "linear-gradient(160deg, rgba(0,180,120,0.4) 0%, rgba(0,212,255,0.25) 40%, #050505 100%)", glow: "rgba(0,180,120,0.25)" },
  { id: "culture-island-breeze", label: "Palm Breeze", variantOf: "culture-island", category: "culture", emoji: "🌴", gradient: "radial-gradient(ellipse at 20% 80%, rgba(0,180,120,0.35) 0%, transparent 50%), linear-gradient(160deg, rgba(0,212,255,0.3) 0%, #050505 100%)", glow: "rgba(0,180,120,0.22)" },
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

export function backgroundVariantsOf(parentId: string): PlatformBackground[] {
  const parent = PLATFORM_BACKGROUNDS.find((b) => b.id === parentId);
  const children = PLATFORM_BACKGROUNDS.filter((b) => b.variantOf === parentId);
  if (!parent) return children;
  return [parent, ...children.filter((c) => c.id !== parentId)];
}

export function backgroundHasVariants(id: string): boolean {
  return PLATFORM_BACKGROUNDS.some((b) => b.variantOf === id);
}

export function backgroundsForCategory(
  category: BackgroundCategoryId,
  identity?: IdentityType
): PlatformBackground[] {
  const items = PLATFORM_BACKGROUNDS.filter((b) => b.category === category && !b.variantOf);
  if (category !== "identity" || !identity) return items;
  return items.filter(
    (b) => !b.identities?.length || b.identities.includes(identity)
  );
}

export function recommendedBackgrounds(identity: IdentityType): PlatformBackground[] {
  const identityMatch = PLATFORM_BACKGROUNDS.filter(
    (b) => b.identities?.includes(identity) && !b.variantOf
  );
  const cityPick = PLATFORM_BACKGROUNDS.filter((b) => b.category === "city" && !b.variantOf).slice(0, 2);
  return [...identityMatch.slice(0, 2), ...cityPick];
}
