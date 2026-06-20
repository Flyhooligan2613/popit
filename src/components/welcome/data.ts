import type { ActivityItem, PulseChannel, SceneSlide } from "./types";

/** Modular data layer — swap for API hooks later */
export const SCENE_SLIDES: SceneSlide[] = [
  {
    id: "restaurants",
    category: "Restaurant",
    chipKey: "restaurants",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop",
    alt: "Premium restaurant dining atmosphere",
    headlineTop: "Discover What's",
    headlineAccent: "Popping",
    subtitle: "From hidden gems to the hottest tables everyone's talking about.",
    overlay: 0.62,
    ambientHue: "#ff6b35",
    ticker: [
      { id: "r1", icon: "🔥", text: "Blue Martini is trending", time: "2m ago" },
      { id: "r2", icon: "🍕", text: "Joe's Pizza gaining popularity", time: "4m ago" },
      { id: "r3", icon: "🍔", text: "New kitchen just went live", time: "6m ago" },
    ],
  },
  {
    id: "nightlife",
    category: "Nightlife",
    chipKey: "trending",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
    alt: "Nightlife club energy",
    headlineTop: "Own The",
    headlineAccent: "Night",
    subtitle: "Rooftops, clubs, and late-night spots lighting up tonight.",
    overlay: 0.66,
    ambientHue: "#a855f7",
    ticker: [
      { id: "n1", icon: "🍹", text: "LIV Nightclub almost full", time: "1m ago" },
      { id: "n2", icon: "🎵", text: "Surprise DJ announced", time: "3m ago" },
      { id: "n3", icon: "🌃", text: "Rooftop hour heating up", time: "5m ago" },
    ],
  },
  {
    id: "concerts",
    category: "Concert",
    chipKey: "events",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop",
    alt: "Live concert crowd",
    headlineTop: "Feel The",
    headlineAccent: "Energy",
    subtitle: "Concerts, festivals, and live shows happening around you.",
    overlay: 0.64,
    ambientHue: "#6366f1",
    ticker: [
      { id: "c1", icon: "🎵", text: "Live DJ announced tonight", time: "2m ago" },
      { id: "c2", icon: "🎉", text: "Festival begins in 30 minutes", time: "4m ago" },
      { id: "c3", icon: "🎤", text: "Sold-out show added nearby", time: "7m ago" },
    ],
  },
  {
    id: "sports",
    category: "Sports",
    chipKey: "trending",
    src: "https://images.unsplash.com/photo-1574629810360-1df083e8ee88?w=1400&q=80&auto=format&fit=crop",
    alt: "Sports bar atmosphere",
    headlineTop: "Catch The",
    headlineAccent: "Action",
    subtitle: "Sports bars, watch parties, and game-day energy nearby.",
    overlay: 0.65,
    ambientHue: "#f97316",
    ticker: [
      { id: "s1", icon: "🏀", text: "Heat Watch Party filling fast", time: "3m ago" },
      { id: "s2", icon: "🏈", text: "Game day reservations spiking", time: "5m ago" },
      { id: "s3", icon: "📺", text: "Big screen spots trending", time: "8m ago" },
    ],
  },
  {
    id: "festival",
    category: "Festival",
    chipKey: "events",
    src: "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=1400&q=80&auto=format&fit=crop",
    alt: "Outdoor festival",
    headlineTop: "Live The",
    headlineAccent: "Moment",
    subtitle: "Pop-up markets, street fairs, and can't-miss moments.",
    overlay: 0.63,
    ambientHue: "#ec4899",
    ticker: [
      { id: "f1", icon: "🎉", text: "Street fair crowd building fast", time: "2m ago" },
      { id: "f2", icon: "🎪", text: "Pop-up market just went live", time: "5m ago" },
      { id: "f3", icon: "✨", text: "VIP passes almost gone", time: "9m ago" },
    ],
  },
  {
    id: "beach",
    category: "Beach",
    chipKey: "nearby",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1400&q=80&auto=format&fit=crop",
    alt: "Beach club scene",
    headlineTop: "Find Hidden",
    headlineAccent: "Gems",
    subtitle: "Coastal hangs, beach clubs, and sunny-day discoveries.",
    overlay: 0.6,
    ambientHue: "#22d3a0",
    ticker: [
      { id: "b1", icon: "🏖️", text: "South Beach is trending", time: "2m ago" },
      { id: "b2", icon: "🌊", text: "Beach club reservations rising", time: "4m ago" },
      { id: "b3", icon: "☀️", text: "Coastal spots heating up", time: "6m ago" },
    ],
  },
  {
    id: "coffee",
    category: "Coffee Shop",
    chipKey: "restaurants",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop",
    alt: "Coffee shop interior",
    headlineTop: "Find Your Next",
    headlineAccent: "Spot",
    subtitle: "Cafes, brunch spots, and your next go-to morning stop.",
    overlay: 0.58,
    ambientHue: "#d97706",
    ticker: [
      { id: "co1", icon: "☕", text: "Panther Coffee buzzing", time: "3m ago" },
      { id: "co2", icon: "🥐", text: "New brunch spot gaining saves", time: "5m ago" },
      { id: "co3", icon: "🍵", text: "Hidden cafe trending nearby", time: "7m ago" },
    ],
  },
  {
    id: "rooftop",
    category: "Luxury Rooftop",
    chipKey: "nearby",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80&auto=format&fit=crop",
    alt: "City skyline at night",
    headlineTop: "The City Is",
    headlineAccent: "Waiting",
    subtitle: "Trending restaurants, nightlife, events, and local favorites—all in one place.",
    overlay: 0.64,
    ambientHue: "#00d4ff",
    ticker: [
      { id: "rt1", icon: "🔥", text: "Rooftop hour is peaking", time: "1m ago" },
      { id: "rt2", icon: "🍸", text: "Sky lounge nearly full", time: "4m ago" },
      { id: "rt3", icon: "📍", text: "Downtown energy surging", time: "6m ago" },
    ],
  },
];

export const LIVE_ACTIVITY_FEED: ActivityItem[] = [
  { id: "a1", icon: "🔥", text: "LIV Nightclub almost full", time: "1m" },
  { id: "a2", icon: "🍕", text: "Joe's Pizza gaining popularity", time: "2m" },
  { id: "a3", icon: "🎉", text: "Festival begins in 30 minutes", time: "3m" },
  { id: "a4", icon: "🏀", text: "Heat Watch Party filling fast", time: "4m" },
  { id: "a5", icon: "🌮", text: "Taco truck exploding on TikTok", time: "5m" },
  { id: "a6", icon: "☕", text: "Panther Coffee buzzing", time: "6m" },
  { id: "a7", icon: "🍺", text: "Happy Hour ending soon", time: "7m" },
  { id: "a8", icon: "🎵", text: "Surprise DJ announced", time: "8m" },
];

export const PULSE_CHANNELS: PulseChannel[] = [
  { key: "restaurants", icon: "🍔", label: "Restaurants", value: 91, accent: "#ff6b35" },
  { key: "events", icon: "🎉", label: "Events", value: 74, accent: "#a855f7" },
  { key: "nightlife", icon: "🌃", label: "Nightlife", value: 99, accent: "#6366f1" },
  { key: "sports", icon: "🏀", label: "Sports", value: 68, accent: "#f97316" },
];

export const CATEGORY_CARDS = [
  { key: "restaurants" as const, icon: "🍽", label: "Restaurants", stat: "2.4K+ Hot Spots", theme: "card-restaurants" },
  { key: "events" as const, icon: "🎉", label: "Events", stat: "340+ Tonight", theme: "card-events" },
  { key: "trending" as const, icon: "🔥", label: "Trending", stat: "128+ Now", theme: "card-trending" },
  { key: "nearby" as const, icon: "📍", label: "Nearby", stat: "12 Cities", theme: "card-nearby" },
];

export function energyTierFromValue(energy: number) {
  if (energy >= 88) return "overdrive" as const;
  if (energy >= 65) return "hot" as const;
  if (energy >= 40) return "warm" as const;
  return "cool" as const;
}

export function energyLabelFromTier(tier: ReturnType<typeof energyTierFromValue>) {
  switch (tier) {
    case "overdrive":
      return "ON FIRE";
    case "hot":
      return "VERY ACTIVE";
    case "warm":
      return "ACTIVE";
    default:
      return "WAKING UP";
  }
}
