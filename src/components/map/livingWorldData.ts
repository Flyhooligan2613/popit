export type VenueKind =
  | "stadium"
  | "nightclub"
  | "restaurant"
  | "stage"
  | "studio"
  | "shopping"
  | "pier"
  | "park";

export type WorldVenue = {
  id: string;
  businessSlug: string;
  kind: VenueKind;
  gx: number;
  gy: number;
  w: number;
  d: number;
  h: number;
  label: string;
  district: string;
};

export type WorldStreet = {
  gx: number;
  gy: number;
  w: number;
  d: number;
  major?: boolean;
};

export type WorldDistrict = {
  id: string;
  label: string;
  gx: number;
  gy: number;
  w: number;
  d: number;
  color: string;
};

export const WORLD_DISTRICTS: WorldDistrict[] = [
  { id: "arena", label: "Arena District", gx: 0, gy: 3, w: 5, d: 4, color: "#00D4FF" },
  { id: "music", label: "Music Quarter", gx: 8, gy: 1, w: 5, d: 4, color: "#A855F7" },
  { id: "food", label: "Wynwood Eats", gx: 5, gy: 5, w: 4, d: 3, color: "#FF7A00" },
  { id: "nightlife", label: "South Beach", gx: 9, gy: 6, w: 4, d: 4, color: "#7C3AED" },
  { id: "gaming", label: "LAN District", gx: 0, gy: 7, w: 4, d: 3, color: "#00D4FF" },
  { id: "creator", label: "Creator Row", gx: 3, gy: 8, w: 4, d: 3, color: "#E9D5FF" },
  { id: "fashion", label: "Design Row", gx: 6, gy: 9, w: 4, d: 3, color: "#E8B4B8" },
  { id: "travel", label: "Bayfront", gx: 6, gy: 0, w: 5, d: 3, color: "#0099FF" },
];

export const WORLD_STREETS: WorldStreet[] = [
  { gx: 0, gy: 6, w: 13, d: 1, major: true },
  { gx: 0, gy: 9, w: 13, d: 1, major: true },
  { gx: 6, gy: 0, w: 1, d: 13, major: true },
  { gx: 3, gy: 0, w: 1, d: 13 },
  { gx: 9, gy: 0, w: 1, d: 13 },
];

export const WORLD_PARKS = [
  { gx: 7, gy: 1, w: 3, d: 2, label: "Bayfront Park" },
  { gx: 1, gy: 10, w: 2, d: 2, label: "Creator Green" },
];

/** Water tiles along east edge */
export const WORLD_WATER = { gx: 12, gy: 0, w: 2, d: 13 };

export const WORLD_VENUES: WorldVenue[] = [
  { id: "bayfront", businessSlug: "bayfront-park", kind: "pier", gx: 7, gy: 0, w: 3, d: 2, h: 0.4, label: "Bayfront Pier", district: "travel" },
  { id: "kaseya", businessSlug: "kaseya-arena", kind: "stadium", gx: 1, gy: 3, w: 4, d: 3, h: 2.2, label: "Kaseya Center", district: "arena" },
  { id: "ultra", businessSlug: "ultra-music-festival", kind: "stage", gx: 9, gy: 2, w: 3, d: 2, h: 1.6, label: "Ultra Stage", district: "music" },
  { id: "joes", businessSlug: "joes-pizza", kind: "restaurant", gx: 6, gy: 5, w: 2, d: 2, h: 0.9, label: "Joe's Pizza", district: "food" },
  { id: "liv", businessSlug: "liv-miami", kind: "nightclub", gx: 10, gy: 7, w: 3, d: 2, h: 1.4, label: "LIV Miami", district: "nightlife" },
  { id: "lan", businessSlug: "lan-arena", kind: "stadium", gx: 1, gy: 7, w: 3, d: 2, h: 1.5, label: "LAN Arena", district: "gaming" },
  { id: "kai", businessSlug: "kai-studios", kind: "studio", gx: 4, gy: 8, w: 2, d: 2, h: 1.2, label: "Kai Studios", district: "creator" },
  { id: "design", businessSlug: "design-district-popup", kind: "shopping", gx: 7, gy: 9, w: 3, d: 2, h: 1, label: "Design Pop-Up", district: "fashion" },
];

export const AMBIENT_BLOCKS = [
  { gx: 5, gy: 3, w: 2, d: 1, h: 1.1 },
  { gx: 8, gy: 5, w: 1, d: 2, h: 0.8 },
  { gx: 3, gy: 5, w: 2, d: 1, h: 0.7 },
  { gx: 11, gy: 4, w: 1, d: 2, h: 1.3 },
  { gx: 5, gy: 8, w: 1, d: 1, h: 0.6 },
  { gx: 9, gy: 10, w: 2, d: 1, h: 0.9 },
];

export function getVenueBySlug(slug: string) {
  return WORLD_VENUES.find((v) => v.businessSlug === slug);
}

export function getVenueCameraTarget(slug: string) {
  const v = getVenueBySlug(slug);
  if (!v) return { x: 0, y: 0, scale: 1 };
  const cx = (v.gx + v.w / 2 - (v.gy + v.d / 2)) * 14;
  const cy = (v.gx + v.w / 2 + v.gy + v.d / 2) * 7 - v.h * 18;
  return { x: -cx * 0.85, y: -cy * 0.65 + 40, scale: 2.8 };
}
