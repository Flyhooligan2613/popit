import type { PopMarkTier } from "./types";

export type PopMarkVisualTier = "blue" | "green" | "gold" | "legend" | "icon" | "black-chrome";

/** Map legacy/alternate ids to mock-sheet visuals */
export function normalizePopMarkTier(tier: PopMarkTier): PopMarkVisualTier {
  if (tier === "diamond") return "legend";
  return tier;
}

/** Speech bubble — POP'IT verified mark container (mock F: POP MARK) */
export const POP_MARK_BUBBLE =
  "M7 9 C7 6.2 9.2 4.5 12 4.5 H36 C38.8 4.5 41 6.2 41 9 V28.5 C41 31.3 38.8 33 36 33 H22.5 L18.5 37 L19.8 33 H12 C9.2 33 7 31.3 7 28.5 Z";

/** Geometric P with open bowl for inner wave/check (logo language) */
export const POP_MARK_P =
  "M15.5 11.5 V32.5 H22.2 C27.2 32.5 30.2 29.8 30.2 26.2 C30.2 22.6 27.2 19.8 22.2 19.8 H19.2 V11.5 Z";

/** Wave-check inside P bowl — reads as verified, not a platform tick */
export const POP_MARK_WAVE =
  "M19.2 22.2 C21.2 24.8 23.4 27.2 25.8 25.4 C27.6 23.8 28.8 21.6 29.4 19.8";

export type PopMarkPalette = {
  bubble: [string, string, string];
  edge: [string, string];
  pFill: string;
  wave: string;
  glow: string;
};

export const POP_MARK_PALETTES: Record<PopMarkVisualTier, PopMarkPalette> = {
  blue: {
    bubble: ["#93c5fd", "#2563eb", "#1e3a8a"],
    edge: ["#bfdbfe", "#1d4ed8"],
    pFill: "#eff6ff",
    wave: "#dbeafe",
    glow: "rgba(37, 99, 235, 0.5)",
  },
  green: {
    bubble: ["#6ee7b7", "#059669", "#064e3b"],
    edge: ["#a7f3d0", "#047857"],
    pFill: "#ecfdf5",
    wave: "#d1fae5",
    glow: "rgba(5, 150, 105, 0.45)",
  },
  gold: {
    bubble: ["#fde68a", "#f59e0b", "#92400e"],
    edge: ["#fef3c7", "#b45309"],
    pFill: "#fffbeb",
    wave: "#fef08a",
    glow: "rgba(245, 158, 11, 0.48)",
  },
  legend: {
    bubble: ["#d8b4fe", "#9333ea", "#581c87"],
    edge: ["#e9d5ff", "#7e22ce"],
    pFill: "#faf5ff",
    wave: "#f3e8ff",
    glow: "rgba(147, 51, 234, 0.5)",
  },
  icon: {
    bubble: ["#ffffff", "#e2e8f0", "#94a3b8"],
    edge: ["#ffffff", "#64748b"],
    pFill: "#ffffff",
    wave: "#f1f5f9",
    glow: "rgba(255, 255, 255, 0.55)",
  },
  "black-chrome": {
    bubble: ["#71717a", "#27272a", "#09090b"],
    edge: ["#a78bfa", "#22d3ee"],
    pFill: "#fafafa",
    wave: "#e4e4e7",
    glow: "rgba(167, 139, 250, 0.4)",
  },
};
