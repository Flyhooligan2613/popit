import type { SignalCategory } from "./types";

const SIGNAL_ROUTES: Record<SignalCategory, string> = {
  restaurant: "/pulse",
  event: "/map",
  nightlife: "/map",
  sports: "/pulse",
  creator: "/explore",
  trending: "/explore",
  nearby: "/pulse",
  traffic: "/map",
  weather: "/pulse",
  video: "/feed",
  promotion: "/explore",
  alert: "/feed",
  news: "/feed",
};

export function signalBubbleRoute(category: SignalCategory): string {
  return SIGNAL_ROUTES[category] ?? "/pulse";
}
