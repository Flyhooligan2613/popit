import { DISTRICT_IDENTITY } from "@/lib/city/districtIdentity";
import type { PopWorldDistrict } from "./types";

/** Real Miami neighborhood boundaries (approximate) for cinematic district zones */
export const POP_WORLD_DISTRICTS: PopWorldDistrict[] = [
  {
    id: "music",
    label: "MUSIC DISTRICT",
    boundary: [
      [-80.196, 25.768], [-80.178, 25.768], [-80.178, 25.778], [-80.196, 25.778], [-80.196, 25.768],
    ],
    primary: DISTRICT_IDENTITY.music.primary,
    secondary: DISTRICT_IDENTITY.music.secondary,
    glow: DISTRICT_IDENTITY.music.glow,
    particleColor: "#A855F7",
    ambientStyle: "neon",
  },
  {
    id: "arena",
    label: "SPORTS DISTRICT",
    boundary: [
      [-80.198, 25.778], [-80.182, 25.778], [-80.182, 25.788], [-80.198, 25.788], [-80.198, 25.778],
    ],
    primary: DISTRICT_IDENTITY.arena.primary,
    secondary: DISTRICT_IDENTITY.arena.secondary,
    glow: DISTRICT_IDENTITY.arena.glow,
    particleColor: "#00D4FF",
    ambientStyle: "cool",
  },
  {
    id: "food",
    label: "FOOD DISTRICT",
    boundary: [
      [-80.142, 25.762], [-80.124, 25.762], [-80.124, 25.774], [-80.142, 25.774], [-80.142, 25.762],
    ],
    primary: DISTRICT_IDENTITY.food.primary,
    secondary: DISTRICT_IDENTITY.food.secondary,
    glow: DISTRICT_IDENTITY.food.glow,
    particleColor: "#FF7A00",
    ambientStyle: "warm",
  },
  {
    id: "gaming",
    label: "GAMING DISTRICT",
    boundary: [
      [-80.204, 25.762], [-80.188, 25.762], [-80.188, 25.772], [-80.204, 25.772], [-80.204, 25.762],
    ],
    primary: DISTRICT_IDENTITY.gaming.primary,
    secondary: DISTRICT_IDENTITY.gaming.secondary,
    glow: DISTRICT_IDENTITY.gaming.glow,
    particleColor: "#00D4FF",
    ambientStyle: "rgb",
  },
  {
    id: "fashion",
    label: "FASHION DISTRICT",
    boundary: [
      [-80.202, 25.808], [-80.186, 25.808], [-80.186, 25.818], [-80.202, 25.818], [-80.202, 25.808],
    ],
    primary: DISTRICT_IDENTITY.fashion.primary,
    secondary: DISTRICT_IDENTITY.fashion.secondary,
    glow: DISTRICT_IDENTITY.fashion.glow,
    particleColor: "#E8B4B8",
    ambientStyle: "elegant",
  },
  {
    id: "creator",
    label: "CREATOR DISTRICT",
    boundary: [
      [-80.208, 25.796], [-80.192, 25.796], [-80.192, 25.806], [-80.208, 25.806], [-80.208, 25.796],
    ],
    primary: DISTRICT_IDENTITY.creator.primary,
    secondary: DISTRICT_IDENTITY.creator.secondary,
    glow: DISTRICT_IDENTITY.creator.glow,
    particleColor: "#FFFFFF",
    ambientStyle: "pulse",
  },
  {
    id: "nightlife",
    label: "NIGHTLIFE DISTRICT",
    boundary: [
      [-80.134, 25.808], [-80.116, 25.808], [-80.116, 25.822], [-80.134, 25.822], [-80.134, 25.808],
    ],
    primary: DISTRICT_IDENTITY.nightlife.primary,
    secondary: DISTRICT_IDENTITY.nightlife.secondary,
    glow: DISTRICT_IDENTITY.nightlife.glow,
    particleColor: "#7C3AED",
    ambientStyle: "neon",
  },
  {
    id: "travel",
    label: "BAYFRONT",
    boundary: [
      [-80.192, 25.768], [-80.178, 25.768], [-80.178, 25.778], [-80.192, 25.778], [-80.192, 25.768],
    ],
    primary: DISTRICT_IDENTITY.travel.primary,
    secondary: DISTRICT_IDENTITY.travel.secondary,
    glow: DISTRICT_IDENTITY.travel.glow,
    particleColor: "#0099FF",
    ambientStyle: "cool",
  },
];

export function getDistrictById(id: string): PopWorldDistrict | undefined {
  return POP_WORLD_DISTRICTS.find((d) => d.id === id);
}
