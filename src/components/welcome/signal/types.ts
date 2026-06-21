export type SignalCategory =
  | "restaurant"
  | "event"
  | "nightlife"
  | "sports"
  | "creator"
  | "trending"
  | "nearby";

export type SignalNode = {
  id: string;
  category: SignalCategory;
  icon: string;
  title: string;
  status: string;
  x: number;
  y: number;
  depth: number;
  distance?: string;
  liveCount?: number;
  image?: string;
};

export const SIGNAL_CATEGORY_COLOR: Record<SignalCategory, string> = {
  restaurant: "#ff8a00",
  event: "#a855f7",
  nightlife: "#ff4d6d",
  sports: "#3b82f6",
  creator: "#00d4ff",
  trending: "#ef4444",
  nearby: "#22c55e",
};
