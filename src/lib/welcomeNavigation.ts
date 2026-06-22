import { isOnboardingComplete, EXPLORE_HOME_ROUTE, WELCOME_LOBBY_ROUTE } from "@/lib/session";
import type { CategoryKey } from "@/components/welcome/types";

export const PENDING_ROUTE_KEY = "popit:pendingRoute";

const CATEGORY_ROUTES: Record<CategoryKey, string> = {
  restaurants: "/pulse",
  events: "/map",
  trending: "/explore",
  nearby: "/pulse",
};

const PULSE_CHANNEL_ROUTES: Record<string, string> = {
  restaurants: "/pulse",
  events: "/map",
  nightlife: "/map",
  sports: "/pulse",
};

export function categoryRoute(key: CategoryKey): string {
  return CATEGORY_ROUTES[key];
}

export function pulseChannelRoute(key: string): string {
  return PULSE_CHANNEL_ROUTES[key] ?? "/pulse";
}

export function venueRoute(venueId: string): string {
  return `/map?venue=${venueId}`;
}

export function storePendingRoute(href: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_ROUTE_KEY, href);
}

export function consumePendingRoute(): string | null {
  if (typeof window === "undefined") return null;
  const href = sessionStorage.getItem(PENDING_ROUTE_KEY);
  if (href) sessionStorage.removeItem(PENDING_ROUTE_KEY);
  return href;
}

/** Navigate when onboarded; otherwise queue route and open signup. */
export function navigateFromWelcome(href: string, onJoin: () => void) {
  storePendingRoute(href);
  if (isOnboardingComplete()) {
    window.location.assign(href);
    return;
  }
  onJoin();
}

export const WELCOME_TAB_ROUTES = {
  home: WELCOME_LOBBY_ROUTE,
  explore: EXPLORE_HOME_ROUTE,
  create: "/pulse",
  inbox: "/messages",
  profile: "/settings",
  live: "/pulse",
  energy: "/pulse",
  popping: "/feed",
  career: "/pulse",
  signal: "/map",
} as const;
