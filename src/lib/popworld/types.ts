import type { DistrictId } from "@/lib/city/districtIdentity";
import type { VibeSignal } from "@/lib/city/vibeEngine";

/** Energy visual tier — drives building glow, particles, district reaction */
export type EnergyTier =
  | "dim"        // 0–20
  | "warm"       // 20–40
  | "pulse"      // 40–60
  | "surge"      // 60–80
  | "electric"   // 80–90
  | "legendary"; // 90+

export type BuildingKind =
  | "stadium"
  | "nightclub"
  | "restaurant"
  | "stage"
  | "studio"
  | "shopping"
  | "pier"
  | "park"
  | "gym"
  | "cafe"
  | "gallery";

export type PopWorldVenue = {
  id: string;
  businessSlug: string;
  name: string;
  districtId: DistrictId;
  kind: BuildingKind;
  /** [lng, lat] */
  coordinates: [number, number];
  /** Building footprint as GeoJSON polygon ring */
  footprint: [number, number][];
  baseHeight: number;
  maxHeight: number;
  baseEnergy: number;
  signals: VibeSignal[];
  accentColor: string;
  verified: boolean;
  live: boolean;
};

export type PopWorldDistrict = {
  id: DistrictId;
  label: string;
  /** District boundary polygon ring [lng, lat][] */
  boundary: [number, number][];
  primary: string;
  secondary: string;
  glow: string;
  particleColor: string;
  ambientStyle: "neon" | "warm" | "cool" | "rgb" | "elegant" | "pulse";
};

export type EnergyVisualConfig = {
  tier: EnergyTier;
  buildingOpacity: number;
  emissiveIntensity: number;
  windowGlow: number;
  neonIntensity: number;
  pulseSpeed: number;
  particleCount: number;
  searchlights: boolean;
  crowdGlow: boolean;
  heatShimmer: boolean;
  fireworks: boolean;
  roofLasers: boolean;
  lightning: boolean;
  districtReaction: boolean;
};

export type PopWorldCameraPhase =
  | "satellite"
  | "descent"
  | "buildings-rise"
  | "lights-on"
  | "districts"
  | "venues-glow"
  | "alive";

export type PopWorldState = {
  phase: PopWorldCameraPhase;
  selectedVenueId: string | null;
  openingComplete: boolean;
};
