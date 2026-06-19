import type { LiveContentItem } from "@/components/pulse/data";
import type { VibeSignal } from "./vibeEngine";

export type BusinessUpdate = {
  id: string;
  text: string;
  minutesAgo: number;
};

export type BusinessEvent = {
  id: string;
  title: string;
  time: string;
};

export type VerifiedBusiness = {
  slug: string;
  name: string;
  districtId: string;
  districtName: string;
  tagline: string;
  description: string;
  verified: true;
  accentColor: string;
  energy: number;
  vibeSignals: VibeSignal[];
  mapPosition: { x: number; y: number };
  hours: string;
  waitTime?: string;
  coverCharge?: string;
  promotions?: string[];
  menuHighlight?: string;
  upcomingPerformers?: string[];
  friendsCheckedIn: string[];
  liveContent: LiveContentItem[];
  updates: BusinessUpdate[];
  todayEvents: BusinessEvent[];
  live: boolean;
};

const now = Date.now();

function sig(type: VibeSignal["type"], weight: number, minutesAgo: number): VibeSignal {
  return { type, weight, timestamp: now - minutesAgo * 60_000 };
}

export const VERIFIED_BUSINESSES: VerifiedBusiness[] = [
  {
    slug: "ultra-music-festival",
    name: "Ultra Music Festival",
    districtId: "music",
    districtName: "Music District",
    tagline: "Main stage is surging",
    description: "The city's heartbeat tonight. Main stage live, crowd momentum building across the festival grounds.",
    verified: true,
    accentColor: "#FF4D6D",
    energy: 94,
    mapPosition: { x: 72, y: 38 },
    hours: "Gates open · 6PM – 2AM",
    coverCharge: "From $89",
    upcomingPerformers: ["DJ Nova", "The Pulse Collective", "Maya K."],
    friendsCheckedIn: ["Marcus", "Ashley", "Jordan"],
    live: true,
    vibeSignals: [sig("live", 1.2, 2), sig("checkin", 0.9, 5), sig("momentum", 1.1, 8)],
    liveContent: [
      { id: "m1", type: "live", title: "Main stage set", user: "Maya K.", signals: [sig("live", 1.3, 1)], friendsThere: ["Marcus"] },
      { id: "m2", type: "video", title: "Crowd energy", user: "Jordan", signals: [sig("video", 1, 4)] },
    ],
    updates: [
      { id: "u1", text: "Main stage crowd at peak — next drop in 12 min", minutesAgo: 4 },
      { id: "u2", text: "VIP north entrance moving fast", minutesAgo: 18 },
    ],
    todayEvents: [
      { id: "e1", title: "Headliner Set", time: "11:30 PM" },
      { id: "e2", title: "Neon Afterparty", time: "1:00 AM" },
    ],
  },
  {
    slug: "kaseya-arena",
    name: "Kaseya Center",
    districtId: "arena",
    districtName: "Arena District",
    tagline: "Heat vs Knicks · tip-off soon",
    description: "Arena filling fast. Watch parties live across the district. The energy is building toward tip-off.",
    verified: true,
    accentColor: "#00D4FF",
    energy: 88,
    mapPosition: { x: 28, y: 42 },
    hours: "Doors · 6PM · Tip-off 7:30PM",
    waitTime: "~8 min at main entrance",
    friendsCheckedIn: ["Chris", "Nia", "Leo"],
    live: true,
    vibeSignals: [sig("checkin", 1, 3), sig("unique_posters", 0.95, 6), sig("momentum", 1, 10)],
    liveContent: [
      { id: "a1", type: "live", title: "Pre-game watch party", user: "Chris", signals: [sig("live", 1.2, 2)], friendsThere: ["Nia", "Leo"] },
      { id: "a2", type: "video", title: "Arena walk-in", user: "Nia", signals: [sig("video", 0.9, 8)] },
    ],
    updates: [
      { id: "u1", text: "Courtside club at 94% capacity", minutesAgo: 6 },
      { id: "u2", text: "Jersey drop available at section 112", minutesAgo: 22 },
    ],
    todayEvents: [
      { id: "e1", title: "Heat vs Knicks", time: "7:30 PM" },
      { id: "e2", title: "Post-game fan tunnel", time: "10:15 PM" },
    ],
    promotions: ["$12 craft beer until tip-off"],
  },
  {
    slug: "joes-pizza",
    name: "Joe's Pizza",
    districtId: "food",
    districtName: "Food District",
    tagline: "Wynwood's hottest slice tonight",
    description: "Lines moving, ovens firing. The Food District is exploding around Joe's tonight.",
    verified: true,
    accentColor: "#FF7A00",
    energy: 91,
    mapPosition: { x: 55, y: 58 },
    hours: "11AM – 1AM",
    waitTime: "~15 min",
    menuHighlight: "Spicy honey pepperoni · $4 slice",
    friendsCheckedIn: ["Devon", "Priya", "Sam"],
    live: true,
    vibeSignals: [sig("checkin", 1.1, 1), sig("verified_business", 1, 4), sig("momentum", 1.2, 7)],
    liveContent: [
      { id: "f1", type: "photo", title: "Fresh pies out", user: "Priya", signals: [sig("post", 1, 2)], friendsThere: ["Sam"] },
      { id: "f2", type: "video", title: "Line moving fast", user: "Devon", signals: [sig("video", 0.85, 6)] },
    ],
    updates: [
      { id: "u1", text: "Fresh batch out — spicy honey pepperoni selling fast", minutesAgo: 3 },
      { id: "u2", text: "Outdoor seating just opened", minutesAgo: 14 },
    ],
    todayEvents: [{ id: "e1", title: "Late-night slice rush", time: "11:00 PM" }],
    promotions: ["Free garlic knots with 2 slices after 10PM"],
  },
  {
    slug: "kai-studios",
    name: "Kai Studios",
    districtId: "creator",
    districtName: "Creator District",
    tagline: "@Kai is live right now",
    description: "Creator quarter pulsing. Live sets, studio sessions, and a photo walk starting soon.",
    verified: true,
    accentColor: "#A855F7",
    energy: 87,
    mapPosition: { x: 38, y: 72 },
    hours: "Studio hours · 10AM – 11PM",
    friendsCheckedIn: ["Maya", "Kai", "Zoe"],
    live: true,
    vibeSignals: [sig("live", 1.3, 1), sig("share", 0.9, 5), sig("unique_posters", 1, 9)],
    liveContent: [
      { id: "c1", type: "live", title: "Studio session", user: "Kai", signals: [sig("live", 1.4, 0)] },
      { id: "c2", type: "video", title: "Behind the lens", user: "Zoe", signals: [sig("video", 1, 3)] },
    ],
    updates: [
      { id: "u1", text: "Kai went live — 3.2K watching", minutesAgo: 2 },
      { id: "u2", text: "Photo walk meets at studio entrance in 25 min", minutesAgo: 10 },
    ],
    todayEvents: [
      { id: "e1", title: "Live studio session", time: "Now" },
      { id: "e2", title: "Downtown photo walk", time: "9:45 PM" },
    ],
  },
  {
    slug: "liv-miami",
    name: "LIV Miami",
    districtId: "nightlife",
    districtName: "Nightlife District",
    tagline: "MAX HYPE · VIP line moving",
    description: "The Nightlife District is electrically charged. LIV is at peak energy tonight.",
    verified: true,
    accentColor: "#A855F7",
    energy: 100,
    mapPosition: { x: 82, y: 65 },
    hours: "11PM – 5AM",
    waitTime: "~12 min",
    coverCharge: "$50 before midnight",
    upcomingPerformers: ["DJ Sable", "Guest: Nova"],
    friendsCheckedIn: ["Ava", "Jordan", "Nia"],
    live: true,
    vibeSignals: [sig("live", 1.4, 0), sig("checkin", 1.2, 2), sig("momentum", 1.3, 3), sig("verified_business", 1.1, 5)],
    liveContent: [
      { id: "n1", type: "live", title: "VIP room energy", user: "Ava", signals: [sig("live", 1.5, 0)], friendsThere: ["Jordan"] },
      { id: "n2", type: "video", title: "LED tunnel walk", user: "Nia", signals: [sig("video", 1.1, 4)] },
    ],
    updates: [
      { id: "u1", text: "VIP north line moving — 12 min wait", minutesAgo: 1 },
      { id: "u2", text: "Main room at capacity — energy MAX", minutesAgo: 8 },
    ],
    todayEvents: [
      { id: "e1", title: "DJ Sable", time: "1:00 AM" },
      { id: "e2", title: "LED tunnel experience", time: "2:30 AM" },
    ],
    promotions: ["Birthday table packages available"],
  },
  {
    slug: "lan-arena",
    name: "LAN Arena",
    districtId: "gaming",
    districtName: "Gaming District",
    tagline: "Finals live · 2.1K watching",
    description: "Gaming District finals night. Streams live, crowd energy climbing toward championship.",
    verified: true,
    accentColor: "#00D4FF",
    energy: 76,
    mapPosition: { x: 18, y: 68 },
    hours: "Open · 4PM – 12AM",
    friendsCheckedIn: ["Tyler", "Sam"],
    live: true,
    vibeSignals: [sig("live", 1.1, 3), sig("momentum", 0.9, 8)],
    liveContent: [
      { id: "g1", type: "live", title: "Finals stream", user: "Tyler", signals: [sig("live", 1.2, 1)] },
      { id: "g2", type: "video", title: "Team hype cam", user: "Sam", signals: [sig("video", 0.8, 7)] },
    ],
    updates: [{ id: "u1", text: "Grand finals — game 3 starting", minutesAgo: 5 }],
    todayEvents: [{ id: "e1", title: "Championship Finals", time: "9:00 PM" }],
  },
  {
    slug: "bayfront-park",
    name: "Bayfront Park",
    districtId: "travel",
    districtName: "Travel District",
    tagline: "Landmark lights coming alive",
    description: "Waterfront energy building as the city lights up. A calmer pulse with growing momentum.",
    verified: true,
    accentColor: "#00D4FF",
    energy: 68,
    mapPosition: { x: 48, y: 28 },
    hours: "Open 24 hours",
    friendsCheckedIn: ["Elena"],
    live: true,
    vibeSignals: [sig("checkin", 0.9, 6), sig("post", 0.7, 14)],
    liveContent: [
      { id: "t1", type: "photo", title: "Sunset at the pier", user: "Elena", signals: [sig("post", 0.85, 5)] },
    ],
    updates: [{ id: "u1", text: "Light installation activates at dusk", minutesAgo: 20 }],
    todayEvents: [{ id: "e1", title: "Bayfront light show", time: "8:30 PM" }],
  },
  {
    slug: "design-district-popup",
    name: "Design District Pop-Up",
    districtId: "fashion",
    districtName: "Fashion District",
    tagline: "Collection reveal tonight",
    description: "Fashion District drop night. Runway previews and street-style energy across the pop-up.",
    verified: true,
    accentColor: "#FF4D6D",
    energy: 82,
    mapPosition: { x: 62, y: 82 },
    hours: "6PM – 11PM",
    friendsCheckedIn: ["Zoe", "Ava"],
    live: true,
    vibeSignals: [sig("venue_update", 1, 4), sig("momentum", 1, 9)],
    liveContent: [
      { id: "fa1", type: "video", title: "Runway preview", user: "Zoe", signals: [sig("video", 1, 3)] },
      { id: "fa2", type: "photo", title: "Pop-up fit check", user: "Ava", signals: [sig("post", 0.9, 8)] },
    ],
    updates: [{ id: "u1", text: "First 50 guests get exclusive drop access", minutesAgo: 12 }],
    todayEvents: [{ id: "e1", title: "Collection reveal", time: "9:00 PM" }],
    promotions: ["Early access wristbands at door"],
  },
];

export function getBusinessBySlug(slug: string): VerifiedBusiness | undefined {
  return VERIFIED_BUSINESSES.find((b) => b.slug === slug);
}

export function getBusinessesByDistrict(districtId: string): VerifiedBusiness[] {
  return VERIFIED_BUSINESSES.filter((b) => b.districtId === districtId);
}

export const DISTRICT_MAP_ZONES = [
  { id: "music", x: 68, y: 32, radius: 14, color: "#FF4D6D" },
  { id: "arena", x: 24, y: 38, radius: 12, color: "#00D4FF" },
  { id: "food", x: 52, y: 54, radius: 11, color: "#FF7A00" },
  { id: "creator", x: 34, y: 68, radius: 11, color: "#A855F7" },
  { id: "nightlife", x: 78, y: 62, radius: 13, color: "#A855F7" },
  { id: "gaming", x: 14, y: 64, radius: 10, color: "#00D4FF" },
  { id: "travel", x: 44, y: 24, radius: 10, color: "#00D4FF" },
  { id: "fashion", x: 58, y: 78, radius: 10, color: "#FF4D6D" },
] as const;
