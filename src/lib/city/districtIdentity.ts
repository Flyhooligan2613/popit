export type DistrictId =
  | "music"
  | "arena"
  | "food"
  | "gaming"
  | "fashion"
  | "creator"
  | "nightlife"
  | "travel";

export type DistrictTheme = {
  id: DistrictId;
  label: string;
  primary: string;
  secondary: string;
  glow: string;
  innerGradient: string;
  mapZone: string;
  rgb?: boolean;
};

export const DISTRICT_IDENTITY: Record<DistrictId, DistrictTheme> = {
  music: {
    id: "music",
    label: "MUSIC",
    primary: "#FF4D6D",
    secondary: "#A855F7",
    glow: "rgba(168,85,247,0.18)",
    innerGradient: "from-[#A855F7]/14 via-[#FF4D6D]/8 to-transparent",
    mapZone: "rgba(168,85,247,0.1)",
  },
  arena: {
    id: "arena",
    label: "SPORTS",
    primary: "#00D4FF",
    secondary: "#0099FF",
    glow: "rgba(0,212,255,0.16)",
    innerGradient: "from-[#00D4FF]/14 via-[#0099FF]/8 to-transparent",
    mapZone: "rgba(0,212,255,0.09)",
  },
  food: {
    id: "food",
    label: "FOOD",
    primary: "#FF7A00",
    secondary: "#FF4D6D",
    glow: "rgba(255,122,0,0.16)",
    innerGradient: "from-[#FF7A00]/14 via-[#FF4D6D]/6 to-transparent",
    mapZone: "rgba(255,122,0,0.09)",
  },
  gaming: {
    id: "gaming",
    label: "GAMING",
    primary: "#00D4FF",
    secondary: "#FF4D6D",
    glow: "rgba(0,212,255,0.14)",
    innerGradient: "from-[#00D4FF]/10 via-[#A855F7]/8 to-transparent",
    mapZone: "rgba(0,212,255,0.08)",
    rgb: true,
  },
  fashion: {
    id: "fashion",
    label: "FASHION",
    primary: "#E8B4B8",
    secondary: "#B76E79",
    glow: "rgba(232,180,184,0.16)",
    innerGradient: "from-[#E8B4B8]/12 via-[#B76E79]/8 to-transparent",
    mapZone: "rgba(183,110,121,0.09)",
  },
  creator: {
    id: "creator",
    label: "CREATOR",
    primary: "#FFFFFF",
    secondary: "#A855F7",
    glow: "rgba(168,85,247,0.14)",
    innerGradient: "from-white/10 via-[#A855F7]/10 to-transparent",
    mapZone: "rgba(168,85,247,0.08)",
  },
  nightlife: {
    id: "nightlife",
    label: "NIGHTLIFE",
    primary: "#7C3AED",
    secondary: "#4C1D95",
    glow: "rgba(124,58,237,0.2)",
    innerGradient: "from-[#7C3AED]/14 via-[#4C1D95]/10 to-transparent",
    mapZone: "rgba(124,58,237,0.11)",
  },
  travel: {
    id: "travel",
    label: "TRAVEL",
    primary: "#00D4FF",
    secondary: "#0099FF",
    glow: "rgba(0,212,255,0.12)",
    innerGradient: "from-[#00D4FF]/10 via-[#0099FF]/6 to-transparent",
    mapZone: "rgba(0,212,255,0.07)",
  },
};

export function getDistrictTheme(id: string): DistrictTheme {
  return DISTRICT_IDENTITY[id as DistrictId] ?? DISTRICT_IDENTITY.music;
}
