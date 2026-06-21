export type SignalHubPhase =
  | "inviting"
  | "pulsing"
  | "transforming"
  | "reorganizing"
  | "connected";

export type SignalHubMode = "invite" | "user";

/** Live activity categories — extensible for future API feeds */
export type SignalCategory =
  | "restaurant"
  | "event"
  | "nightlife"
  | "sports"
  | "creator"
  | "trending"
  | "nearby"
  | "traffic"
  | "weather"
  | "video"
  | "promotion"
  | "alert"
  | "news";

export type SignalBubble = {
  id: string;
  category: SignalCategory;
  icon: string;
  title: string;
  status: string;
  detail?: string;
  badge?: string;
  x: number;
  y: number;
  /** translateZ in px — closer = larger, negative = farther */
  z: number;
  scale: number;
  distance?: string;
  liveCount?: number;
  image?: string;
};

export type SignalBeam = {
  key: number;
  toBubbleId: string;
  toX: number;
  toY: number;
};

export type SignalBroadcast = {
  key: number;
  illuminatedIds: string[];
  beam: SignalBeam | null;
};

export const SIGNAL_CATEGORY_COLOR: Record<string, string> = {
  restaurant: "#ff8a00",
  event: "#a855f7",
  nightlife: "#ff4d6d",
  sports: "#3b82f6",
  creator: "#00d4ff",
  trending: "#ef4444",
  nearby: "#22c55e",
  traffic: "#fbbf24",
  weather: "#38bdf8",
  video: "#f472b6",
  promotion: "#c084fc",
  alert: "#fb923c",
  news: "#94a3b8",
};

/** @deprecated use SignalBubble */
export type SignalNode = SignalBubble & { depth: number };
