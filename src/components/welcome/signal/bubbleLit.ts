import type { SignalBubble } from "./types";

/** True when a bubble is hot enough to show electric shock FX */
export function isSignalBubbleLit(
  bubble: SignalBubble,
  illuminated: boolean,
  discovered: boolean
): boolean {
  if (illuminated || discovered) return true;
  if (bubble.badge === "LIVE" || bubble.badge === "Trending") return true;
  if (bubble.status.toUpperCase().includes("LIVE")) return true;
  if ((bubble.liveCount ?? 0) >= 400) return true;
  return false;
}
