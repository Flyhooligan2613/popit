export type InterestId =
  | "gaming"
  | "sports"
  | "music"
  | "travel"
  | "photography"
  | "food"
  | "cars"
  | "technology"
  | "business"
  | "entertainment"
  | "fitness"
  | "fashion"
  | "movies"
  | "nightlife"
  | "sneakers"
  | "pets";

export type CityScene = {
  id: string;
  label: string;
  src: string;
  tint: string;
  interests: InterestId[];
};

export const INTEREST_SCENES: CityScene[] = [
  {
    id: "nightlife-rooftop",
    label: "Rooftop Lounges",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(168,85,247,0.2)",
    interests: ["nightlife", "entertainment", "music"],
  },
  {
    id: "arena",
    label: "Arena District",
    src: "https://images.unsplash.com/photo-1504450758481-733eedeba32d?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(0,212,255,0.18)",
    interests: ["sports", "fitness", "gaming"],
  },
  {
    id: "food-district",
    label: "Food District",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(255,122,0,0.2)",
    interests: ["food", "travel"],
  },
  {
    id: "murals",
    label: "Street Murals",
    src: "https://images.unsplash.com/photo-1561214071-7a6bc135e8c0?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(255,77,109,0.22)",
    interests: ["photography", "fashion", "sneakers"],
  },
  {
    id: "creator-studio",
    label: "Creator Studios",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(168,85,247,0.18)",
    interests: ["photography", "technology", "entertainment", "movies"],
  },
  {
    id: "travel-landmarks",
    label: "City Landmarks",
    src: "https://images.unsplash.com/photo-1477959858617-67f85e4d0440?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(0,212,255,0.16)",
    interests: ["travel", "cars"],
  },
  {
    id: "festival",
    label: "Festival Grounds",
    src: "https://images.unsplash.com/photo-1459749411175-04bf52924cef?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(255,77,109,0.2)",
    interests: ["music", "entertainment"],
  },
  {
    id: "fashion",
    label: "Fashion District",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(255,77,109,0.16)",
    interests: ["fashion", "sneakers"],
  },
  {
    id: "neon-streets",
    label: "Neon Streets",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80&auto=format&fit=crop",
    tint: "rgba(255,77,109,0.2)",
    interests: ["nightlife", "music", "food", "sports", "gaming"],
  },
];

const STORAGE_KEY = "popit:interests";

export function saveUserInterests(interests: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
}

export function getUserInterests(): InterestId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as InterestId[]) : [];
  } catch {
    return [];
  }
}

export function getPersonalizedScenes(interests: InterestId[]): CityScene[] {
  if (interests.length === 0) {
    return INTEREST_SCENES.filter((s) =>
      ["neon-streets", "murals", "nightlife-rooftop", "arena", "creator-studio"].includes(s.id)
    );
  }

  const scored = INTEREST_SCENES.map((scene) => {
    const overlap = scene.interests.filter((i) => interests.includes(i)).length;
    return { scene, score: overlap };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = scored.map((s) => s.scene);
  if (picked.length < 4) {
    const fallback = INTEREST_SCENES.filter((s) => !picked.find((p) => p.id === s.id));
    return [...picked, ...fallback].slice(0, 6);
  }
  return picked.slice(0, 6);
}
