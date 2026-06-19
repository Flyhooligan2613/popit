import type { PopitIconType } from "./PopitIcon";
import type { VibeSignal } from "@/lib/city/vibeEngine";
import type { InterestId } from "@/lib/city/personalizedCity";

export type { PopitIconType };

export type LiveContentItem = {
  id: string;
  type: "video" | "photo" | "live";
  title: string;
  user: string;
  signals: VibeSignal[];
  friendsThere?: string[];
};

export const LIVE_STATS = {
  moments: 23,
  friendsNearby: 7,
  liveEvents: 4,
};

export type CityDistrict = {
  id: string;
  name: string;
  icon: PopitIconType;
  moment: string;
  detail: string;
  energy: number;
  friends: string[];
  friendActivity: string;
  live: boolean;
  accentColor: string;
  glow: string;
  innerGradient: string;
  ambientVariant?: "waves" | "streaks" | "pulse";
  countdownMinutes?: number;
  metric?: string;
  interests: InterestId[];
  liveContent: LiveContentItem[];
  vibeSignals: VibeSignal[];
  businessSlug: string;
};

const now = Date.now();

function sig(type: VibeSignal["type"], weight: number, minutesAgo: number): VibeSignal {
  return { type, weight, timestamp: now - minutesAgo * 60_000 };
}

export const CITY_DISTRICTS: CityDistrict[] = [
  {
    id: "music",
    name: "Music District",
    icon: "music",
    moment: "Ultra Music Festival",
    detail: "18,421 people in the district",
    energy: 94,
    friends: ["Marcus", "Ashley", "Jordan"],
    friendActivity: "Marcus just entered the main stage",
    live: true,
    accentColor: "#FF4D6D",
    glow: "rgba(255,77,109,0.14)",
    innerGradient: "from-[#FF4D6D]/10 via-transparent to-[#FF7A00]/8",
    ambientVariant: "waves",
    interests: ["music", "entertainment", "nightlife"],
    vibeSignals: [sig("live", 1.2, 2), sig("checkin", 0.9, 5), sig("momentum", 1.1, 8)],
    businessSlug: "ultra-music-festival",
    liveContent: [
      { id: "m1", type: "live", title: "Main stage set", user: "Maya K.", signals: [sig("live", 1.3, 1)], friendsThere: ["Marcus"] },
      { id: "m2", type: "video", title: "Crowd energy", user: "Jordan", signals: [sig("video", 1, 4)] },
      { id: "m3", type: "photo", title: "Neon entrance", user: "Ashley", signals: [sig("post", 0.8, 12)] },
    ],
  },
  {
    id: "arena",
    name: "Arena District",
    icon: "sports",
    moment: "Heat vs Knicks",
    detail: "Tip-off approaching · arena filling",
    energy: 88,
    friends: ["Chris", "Nia", "Leo"],
    friendActivity: "Chris joined the watch party",
    live: true,
    accentColor: "#00D4FF",
    glow: "rgba(0,212,255,0.12)",
    innerGradient: "from-[#00D4FF]/10 via-transparent to-[#0099FF]/8",
    ambientVariant: "streaks",
    countdownMinutes: 18,
    metric: "Join Watch Party",
    interests: ["sports", "fitness"],
    vibeSignals: [sig("checkin", 1, 3), sig("unique_posters", 0.95, 6), sig("momentum", 1, 10)],
    businessSlug: "kaseya-arena",
    liveContent: [
      { id: "a1", type: "live", title: "Pre-game watch party", user: "Chris", signals: [sig("live", 1.2, 2)], friendsThere: ["Nia", "Leo"] },
      { id: "a2", type: "video", title: "Arena walk-in", user: "Nia", signals: [sig("video", 0.9, 8)] },
    ],
  },
  {
    id: "food",
    name: "Food District",
    icon: "food",
    moment: "Joe's Pizza",
    detail: "Exploding tonight across Wynwood",
    energy: 91,
    friends: ["Devon", "Priya", "Sam"],
    friendActivity: "Priya just checked in",
    live: true,
    accentColor: "#FF7A00",
    glow: "rgba(255,122,0,0.12)",
    innerGradient: "from-[#FF7A00]/10 via-transparent to-[#FF4D6D]/6",
    ambientVariant: "pulse",
    interests: ["food", "travel"],
    vibeSignals: [sig("checkin", 1.1, 1), sig("verified_business", 1, 4), sig("momentum", 1.2, 7)],
    businessSlug: "joes-pizza",
    liveContent: [
      { id: "f1", type: "photo", title: "Fresh pies out", user: "Priya", signals: [sig("post", 1, 2)], friendsThere: ["Sam"] },
      { id: "f2", type: "video", title: "Line moving fast", user: "Devon", signals: [sig("video", 0.85, 6)] },
    ],
  },
  {
    id: "creator",
    name: "Creator District",
    icon: "creator",
    moment: "@Kai · Live Set",
    detail: "3.2K watching in the creator quarter",
    energy: 87,
    friends: ["Maya", "Kai", "Zoe"],
    friendActivity: "Maya went live downtown",
    live: true,
    accentColor: "#A855F7",
    glow: "rgba(168,85,247,0.12)",
    innerGradient: "from-[#A855F7]/10 via-transparent to-[#00D4FF]/6",
    ambientVariant: "streaks",
    countdownMinutes: 25,
    metric: "Photo walk starts soon",
    interests: ["photography", "technology", "entertainment", "movies"],
    vibeSignals: [sig("live", 1.3, 1), sig("share", 0.9, 5), sig("unique_posters", 1, 9)],
    businessSlug: "kai-studios",
    liveContent: [
      { id: "c1", type: "live", title: "Studio session", user: "Kai", signals: [sig("live", 1.4, 0)] },
      { id: "c2", type: "video", title: "Behind the lens", user: "Zoe", signals: [sig("video", 1, 3)] },
    ],
  },
  {
    id: "nightlife",
    name: "Nightlife District",
    icon: "nightlife",
    moment: "LIV Miami",
    detail: "Current wait · 12 minutes",
    energy: 100,
    friends: ["Ava", "Jordan", "Nia"],
    friendActivity: "Ava is in the VIP line",
    live: true,
    accentColor: "#A855F7",
    glow: "rgba(168,85,247,0.14)",
    innerGradient: "from-[#A855F7]/10 via-transparent to-[#7C3AED]/8",
    ambientVariant: "waves",
    metric: "Crowd at peak energy",
    interests: ["nightlife", "music", "fashion"],
    vibeSignals: [sig("live", 1.4, 0), sig("checkin", 1.2, 2), sig("momentum", 1.3, 3), sig("verified_business", 1.1, 5)],
    businessSlug: "liv-miami",
    liveContent: [
      { id: "n1", type: "live", title: "VIP room energy", user: "Ava", signals: [sig("live", 1.5, 0)], friendsThere: ["Jordan"] },
      { id: "n2", type: "video", title: "LED tunnel walk", user: "Nia", signals: [sig("video", 1.1, 4)] },
    ],
  },
  {
    id: "gaming",
    name: "Gaming District",
    icon: "gaming",
    moment: "LAN Arena Finals",
    detail: "2.1K watching · finals tonight",
    energy: 76,
    friends: ["Tyler", "Sam"],
    friendActivity: "Tyler joined the stream",
    live: true,
    accentColor: "#00D4FF",
    glow: "rgba(0,212,255,0.1)",
    innerGradient: "from-[#00D4FF]/8 via-transparent to-[#A855F7]/6",
    ambientVariant: "streaks",
    interests: ["gaming", "technology", "entertainment"],
    vibeSignals: [sig("live", 1.1, 3), sig("momentum", 0.9, 8)],
    businessSlug: "lan-arena",
    liveContent: [
      { id: "g1", type: "live", title: "Finals stream", user: "Tyler", signals: [sig("live", 1.2, 1)] },
      { id: "g2", type: "video", title: "Team hype cam", user: "Sam", signals: [sig("video", 0.8, 7)] },
    ],
  },
  {
    id: "travel",
    name: "Travel District",
    icon: "travel",
    moment: "Bayfront Lights",
    detail: "Landmark lighting up tonight",
    energy: 68,
    friends: ["Elena"],
    friendActivity: "Elena checked in at the pier",
    live: true,
    accentColor: "#00D4FF",
    glow: "rgba(0,212,255,0.1)",
    innerGradient: "from-[#00D4FF]/8 via-transparent to-[#0099FF]/6",
    ambientVariant: "waves",
    interests: ["travel", "photography"],
    vibeSignals: [sig("checkin", 0.9, 6), sig("post", 0.7, 14)],
    businessSlug: "bayfront-park",
    liveContent: [
      { id: "t1", type: "photo", title: "Sunset at the pier", user: "Elena", signals: [sig("post", 0.85, 5)] },
    ],
  },
  {
    id: "fashion",
    name: "Fashion District",
    icon: "creator",
    moment: "Design District Drop",
    detail: "New collection reveal tonight",
    energy: 82,
    friends: ["Zoe", "Ava"],
    friendActivity: "Zoe is at the pop-up",
    live: true,
    accentColor: "#FF4D6D",
    glow: "rgba(255,77,109,0.12)",
    innerGradient: "from-[#FF4D6D]/8 via-transparent to-[#A855F7]/6",
    ambientVariant: "pulse",
    interests: ["fashion", "sneakers"],
    vibeSignals: [sig("venue_update", 1, 4), sig("momentum", 1, 9)],
    businessSlug: "design-district-popup",
    liveContent: [
      { id: "fa1", type: "video", title: "Runway preview", user: "Zoe", signals: [sig("video", 1, 3)] },
      { id: "fa2", type: "photo", title: "Pop-up fit check", user: "Ava", signals: [sig("post", 0.9, 8)] },
    ],
  },
];

export const FAB_ACTIONS = [
  { id: "photo", label: "Photo", angle: -90, icon: "camera" as PopitIconType },
  { id: "video", label: "Video", angle: -45, icon: "creator" as PopitIconType },
  { id: "live", label: "Go Live", angle: 0, icon: "nightlife" as PopitIconType },
  { id: "checkin", label: "Check In", angle: 45, icon: "travel" as PopitIconType },
  { id: "event", label: "Create Event", angle: 90, icon: "music" as PopitIconType },
] as const;
