import type { ActivityItem, GlobeHotspot, PulseChannel, SceneSlide, TrendingCreator } from "./types";

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
    heroSupport: "See what's happening before everyone else.",
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
    headlineTop: "Feel The",
    headlineAccent: "Vibes",
    heroSupport: "Real people. Real places. Real-time energy.",
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
    heroSupport: "Live moments unfolding around you right now.",
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
    heroSupport: "Game-day energy you can feel from anywhere.",
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
    headlineAccent: "Experiences",
    heroSupport: "Real people. Real places. Real-time energy.",
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
    headlineTop: "Catch What's",
    headlineAccent: "Trending",
    heroSupport: "See what's happening before everyone else.",
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
    heroSupport: "Your next go-to, discovered in real time.",
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
    headlineAccent: "Alive",
    heroSupport: "Real people. Real places. Real-time energy.",
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

export const LIVE_VENUE_CARDS: import("./types").VenueCard[] = [
  {
    id: "v1",
    icon: "🍕",
    name: "Joe's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80&auto=format&fit=crop",
    rating: "★★★★★",
    distance: "1.3 mi",
    stat: "+540 saves today",
    badge: "Trending",
    updatedMin: 2,
  },
  {
    id: "v2",
    icon: "🎉",
    name: "LIV Nightclub",
    image: "https://images.unsplash.com/photo-1571266028243-e68f8570c9e2?w=400&q=80&auto=format&fit=crop",
    stat: "Almost Full",
    detail: "12 min wait · DJ 9:30 PM",
    badge: "Hot",
    updatedMin: 1,
  },
  {
    id: "v3",
    icon: "☕",
    name: "Panther Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop",
    stat: "Buzzing",
    detail: "72 check-ins",
    badge: "Live",
    updatedMin: 2,
  },
  {
    id: "v4",
    icon: "🏀",
    name: "Heat Watch Party",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80&auto=format&fit=crop",
    stat: "Starts in 25 min",
    detail: "Filling fast",
    badge: "Hot",
  },
  {
    id: "v5",
    icon: "🌮",
    name: "Wynwood Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80&auto=format&fit=crop",
    rating: "★★★★☆",
    distance: "0.8 mi",
    stat: "Exploding on TikTok",
    badge: "Trending",
  },
  {
    id: "v6",
    icon: "🎤",
    name: "Bayfront Concert",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80&auto=format&fit=crop",
    stat: "Starts in 45 min",
    detail: "GA tickets moving fast",
    badge: "Hot",
  },
];

export const PULSE_CHANNELS: import("./types").PulseChannel[] = [
  {
    key: "restaurants",
    icon: "🍔",
    label: "Restaurants",
    value: 100,
    delta: 8,
    statusLabel: "Most Active",
    accent: "#ff6b35",
  },
  {
    key: "events",
    icon: "🎉",
    label: "Events",
    value: 85,
    delta: 5,
    statusLabel: "Concert Night",
    accent: "#a855f7",
  },
  {
    key: "nightlife",
    icon: "🌃",
    label: "Nightlife",
    value: 97,
    delta: 9,
    statusLabel: "Hottest Category",
    accent: "#6366f1",
    isHottest: true,
  },
  {
    key: "sports",
    icon: "🏀",
    label: "Sports",
    value: 74,
    delta: 4,
    statusLabel: "Game Night",
    accent: "#22c55e",
  },
];

export const CATEGORY_CARDS = [
  { key: "restaurants" as const, icon: "🍽", label: "Restaurants", stat: "2.4K+ Hot Spots", theme: "card-restaurants" },
  { key: "events" as const, icon: "🎉", label: "Events", stat: "340+ Tonight", theme: "card-events" },
  { key: "trending" as const, icon: "🔥", label: "Trending", stat: "128+ Now", theme: "card-trending" },
  { key: "nearby" as const, icon: "📍", label: "Nearby", stat: "12 Cities", theme: "card-nearby" },
];

/** Globe hotspot positions — future zoom targets (Miami, Atlanta, NYC, etc.) */
export const GLOBE_HOTSPOTS: GlobeHotspot[] = [
  { id: "miami", city: "Miami", code: "MIA", count: 3600, x: 68, y: 62 },
  { id: "atlanta", city: "Atlanta", code: "ATL", count: 2100, x: 62, y: 48 },
  { id: "nyc", city: "New York", code: "NYC", count: 5200, x: 72, y: 42 },
  { id: "la", city: "Los Angeles", code: "LA", count: 4100, x: 22, y: 50 },
  { id: "houston", city: "Houston", code: "HOU", count: 1800, x: 52, y: 56 },
];

export const TRENDING_CREATORS: TrendingCreator[] = [
  {
    id: "t1",
    username: "@miamifoodie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    verified: true,
    category: "Food",
    likes: 12400,
    comments: 842,
    shares: 2100,
    saves: 3200,
    followersToday: 540,
    trending: true,
  },
  {
    id: "t2",
    username: "@nightshift.mia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    verified: true,
    category: "Nightlife",
    likes: 9800,
    comments: 612,
    shares: 1800,
    saves: 2100,
    followersToday: 420,
    trending: true,
  },
  {
    id: "t3",
    username: "@atl.events",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    verified: false,
    category: "Events",
    likes: 7600,
    comments: 489,
    shares: 1200,
    saves: 1800,
    followersToday: 310,
    trending: true,
  },
  {
    id: "t4",
    username: "@heatwatch",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    verified: true,
    category: "Sports",
    likes: 11200,
    comments: 920,
    shares: 2400,
    saves: 2900,
    followersToday: 680,
    trending: true,
  },
  {
    id: "t5",
    username: "@popit.creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
    verified: true,
    category: "Creator",
    likes: 18500,
    comments: 1240,
    shares: 4200,
    saves: 4500,
    followersToday: 890,
    trending: true,
  },
];

export const LIVE_AVATAR_STACK = TRENDING_CREATORS.slice(0, 5).map((c) => c.avatar);

export function formatHotspotCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function energyTierFromValue(energy: number) {
  if (energy >= 92) return "overdrive" as const;
  if (energy >= 78) return "on-fire" as const;
  if (energy >= 62) return "hot" as const;
  if (energy >= 42) return "busy" as const;
  if (energy >= 22) return "active" as const;
  return "calm" as const;
}

export function energyLabelFromTier(tier: ReturnType<typeof energyTierFromValue>) {
  switch (tier) {
    case "overdrive":
      return "OVERDRIVE";
    case "on-fire":
      return "ON FIRE";
    case "hot":
      return "HOT";
    case "busy":
      return "BUSY";
    case "active":
      return "ACTIVE";
    case "busy":
      return "ACTIVE";
    default:
      return "NORMAL";
  }
}
