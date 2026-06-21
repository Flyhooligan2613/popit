/** POP Mark visual tiers — matches POP'IT Verified Mark mock system */
export type PopMarkTier = "blue" | "green" | "gold" | "legend" | "icon" | "diamond" | "black-chrome";

export type PopMarkSize = 16 | 20 | 24 | 32 | 64;

export type PopMarkRequirement = {
  label: string;
  met?: boolean;
};

export type PopMarkConfig = {
  tier: PopMarkTier;
  title: string;
  subtitle: string;
  philosophy: string;
  requirements: PopMarkRequirement[];
  whyEarned: string[];
  nextTier: PopMarkTier | null;
  nextTitle: string | null;
};

export const POP_MARK_ORDER: PopMarkTier[] = ["blue", "green", "gold", "legend", "icon"];

export const POP_MARK_CONFIG: Record<PopMarkTier, Omit<PopMarkConfig, "nextTier" | "nextTitle">> = {
  blue: {
    tier: "blue",
    title: "Blue POP Mark",
    subtitle: "Verified Creator",
    philosophy: "Trust, authenticity, and positive community standing.",
    requirements: [
      { label: "25,000 followers" },
      { label: "100,000 likes" },
      { label: "Authentic account" },
      { label: "Community guidelines respected" },
    ],
    whyEarned: [
      "Earned through real traction — not purchased popularity.",
      "POP Score and account trust confirm authentic growth.",
    ],
  },
  green: {
    tier: "green",
    title: "Green POP Mark",
    subtitle: "Rising Creator",
    philosophy: "Trusted community growth and positive engagement.",
    requirements: [
      { label: "100,000 followers" },
      { label: "250,000 likes" },
      { label: "Positive engagement" },
      { label: "Helpful contributor" },
      { label: "Strong community reputation" },
    ],
    whyEarned: [
      "Recognized for impact beyond views — people trust your voice.",
      "Consistent, positive presence in your city.",
    ],
  },
  gold: {
    tier: "gold",
    title: "Gold POP Mark",
    subtitle: "Elite Business / Creator",
    philosophy: "Prestigious recognition for major creators and premium businesses.",
    requirements: [
      { label: "500,000 followers or verified business" },
      { label: "1,000,000 likes" },
      { label: "Recognized public figure or premium business" },
      { label: "Outstanding POP Score & reputation" },
    ],
    whyEarned: [
      "Among the most influential voices on POP'IT in your city.",
      "Gold represents earned prestige — never given lightly.",
    ],
  },
  legend: {
    tier: "legend",
    title: "Legend POP Mark",
    subtitle: "POP Legend",
    philosophy: "Ultra-rare. Invitation or exceptional long-term platform impact.",
    requirements: [
      { label: "Platform invitation only" },
      { label: "Sustained cultural influence" },
      { label: "Exemplary trust & community impact" },
    ],
    whyEarned: [
      "Reserved for creators who define what POP'IT means in their city.",
      "Extremely limited — never awarded from follower count alone.",
    ],
  },
  icon: {
    tier: "icon",
    title: "ICON POP Mark",
    subtitle: "Highest Recognition",
    philosophy: "The pinnacle of POP'IT achievement and cultural impact.",
    requirements: [
      { label: "Extraordinary long-term contribution" },
      { label: "Defines culture within your city" },
      { label: "Platform designation only" },
    ],
    whyEarned: [
      "The rarest mark on POP'IT — earned, never expected.",
      "Reserved for those who shape the platform itself.",
    ],
  },
  diamond: {
    tier: "diamond",
    title: "Legend POP Mark",
    subtitle: "POP Legend",
    philosophy: "Ultra-rare. Invitation or exceptional long-term platform impact.",
    requirements: [
      { label: "Platform invitation or exceptional achievement" },
      { label: "Sustained cultural influence" },
      { label: "Exemplary trust & community impact" },
    ],
    whyEarned: [
      "Reserved for creators who define what POP'IT means in their city.",
      "Extremely limited — never awarded from follower count alone.",
    ],
  },
  "black-chrome": {
    tier: "black-chrome",
    title: "Black Chrome POP Mark",
    subtitle: "Founder Recognition",
    philosophy: "Reserved for founders and special platform recognition.",
    requirements: [{ label: "Exclusive platform designation" }],
    whyEarned: ["Hyper-rare recognition for those who built POP'IT culture."],
  },
};

export function getPopMarkConfig(tier: PopMarkTier): PopMarkConfig {
  const key = tier === "diamond" ? "legend" : tier;
  const idx = POP_MARK_ORDER.indexOf(key as (typeof POP_MARK_ORDER)[number]);
  const base = POP_MARK_CONFIG[tier === "diamond" ? "legend" : tier];
  const nextTier = idx >= 0 && idx < POP_MARK_ORDER.length - 1 ? POP_MARK_ORDER[idx + 1] : null;
  return {
    ...base,
    nextTier,
    nextTitle: nextTier ? POP_MARK_CONFIG[nextTier].title : null,
  };
}
