export type IdentityType =
  | "personal"
  | "business"
  | "restaurant"
  | "nightclub"
  | "music-artist"
  | "dj"
  | "gamer"
  | "athlete"
  | "fitness"
  | "fashion"
  | "photographer"
  | "videographer"
  | "content-creator"
  | "entrepreneur"
  | "automotive"
  | "food-creator"
  | "travel"
  | "community";

export type ProfileTemplate =
  | "personal"
  | "business"
  | "gamer"
  | "athlete"
  | "creator"
  | "restaurant"
  | "nightclub"
  | "dj";

export type IdentityOption = {
  id: IdentityType;
  label: string;
  description: string;
  accent: string;
};

export const IDENTITY_OPTIONS: IdentityOption[] = [
  { id: "personal", label: "Personal", description: "Your digital passport", accent: "#FF4D6D" },
  { id: "business", label: "Business", description: "Digital storefront", accent: "#00D4FF" },
  { id: "restaurant", label: "Restaurant", description: "Luxury menu experience", accent: "#FF7A00" },
  { id: "nightclub", label: "Nightclub", description: "Premium nightlife venue", accent: "#7C3AED" },
  { id: "music-artist", label: "Music Artist", description: "Stage identity", accent: "#A855F7" },
  { id: "dj", label: "DJ", description: "Night energy identity", accent: "#FF4D6D" },
  { id: "gamer", label: "Gamer", description: "Player card", accent: "#00D4FF" },
  { id: "athlete", label: "Athlete", description: "Sports trading card", accent: "#00D4FF" },
  { id: "fitness", label: "Fitness", description: "Training identity", accent: "#FF7A00" },
  { id: "fashion", label: "Fashion", description: "Style identity", accent: "#E8B4B8" },
  { id: "photographer", label: "Photographer", description: "Visual storyteller", accent: "#FFFFFF" },
  { id: "videographer", label: "Videographer", description: "Cinema identity", accent: "#A855F7" },
  { id: "content-creator", label: "Content Creator", description: "Creator studio", accent: "#A855F7" },
  { id: "entrepreneur", label: "Entrepreneur", description: "Brand builder", accent: "#00D4FF" },
  { id: "automotive", label: "Automotive", description: "Car culture", accent: "#FF4D6D" },
  { id: "food-creator", label: "Food Creator", description: "Culinary identity", accent: "#FF7A00" },
  { id: "travel", label: "Travel", description: "City explorer", accent: "#0099FF" },
  { id: "community", label: "Community Org", description: "Neighborhood pulse", accent: "#A855F7" },
];

export function getProfileTemplate(identity: IdentityType): ProfileTemplate {
  if (identity === "gamer") return "gamer";
  if (identity === "athlete") return "athlete";
  if (identity === "restaurant") return "restaurant";
  if (identity === "nightclub") return "nightclub";
  if (identity === "dj") return "dj";
  if (
    ["content-creator", "photographer", "videographer", "music-artist", "food-creator"].includes(identity)
  )
    return "creator";
  if (["business", "entrepreneur"].includes(identity)) return "business";
  return "personal";
}

export function getIdentityAccent(identity: IdentityType): string {
  return IDENTITY_OPTIONS.find((o) => o.id === identity)?.accent ?? "#FF4D6D";
}
