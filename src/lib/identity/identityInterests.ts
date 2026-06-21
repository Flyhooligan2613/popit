import type { IdentityType } from "./types";

export type IdentityInterestOption = {
  id: string;
  label: string;
  icon:
    | "gamepad"
    | "trophy"
    | "music"
    | "plane"
    | "camera"
    | "food"
    | "car"
    | "cpu"
    | "business"
    | "clapperboard"
    | "dumbbell"
    | "shirt"
    | "film"
    | "moon"
    | "footprints"
    | "paw"
    | "mic"
    | "headphones"
    | "sparkles"
    | "scissors"
    | "palette"
    | "video"
    | "users"
    | "heart"
    | "star"
    | "map"
    | "store"
    | "chef"
    | "wine"
    | "party"
    | "radio"
    | "zap"
    | "globe"
    | "handshake"
    | "megaphone"
    | "book"
    | "wallet"
    | "wrench"
    | "sun";
};

export type IdentityInterestConfig = {
  title: string;
  subtitle: string;
  minSelect: number;
  interests: IdentityInterestOption[];
};

const pick = (
  interests: IdentityInterestOption[],
  minSelect = 5
): IdentityInterestConfig => ({
  title: "What Gets You Excited?",
  subtitle: "Choose at least 5. We'll tailor POP'IT to your lane.",
  minSelect: Math.min(minSelect, interests.length),
  interests,
});

export const IDENTITY_INTEREST_MAP: Record<IdentityType, IdentityInterestConfig> = {
  personal: pick([
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "music", label: "Music", icon: "music" },
    { id: "food", label: "Food", icon: "food" },
    { id: "travel", label: "Travel", icon: "plane" },
    { id: "fitness", label: "Fitness", icon: "dumbbell" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
    { id: "gaming", label: "Gaming", icon: "gamepad" },
    { id: "sports", label: "Sports", icon: "trophy" },
    { id: "photography", label: "Photography", icon: "camera" },
    { id: "movies", label: "Movies", icon: "film" },
    { id: "entertainment", label: "Entertainment", icon: "clapperboard" },
    { id: "technology", label: "Technology", icon: "cpu" },
    { id: "sneakers", label: "Sneakers", icon: "footprints" },
    { id: "pets", label: "Pets", icon: "paw" },
    { id: "cars", label: "Cars", icon: "car" },
    { id: "business", label: "Business", icon: "business" },
  ]),

  "music-artist": pick([
    { id: "live-shows", label: "Live Shows", icon: "mic" },
    { id: "studio-sessions", label: "Studio Sessions", icon: "headphones" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "songwriting", label: "Songwriting", icon: "music" },
    { id: "music-videos", label: "Music Videos", icon: "video" },
    { id: "festivals", label: "Festivals", icon: "party" },
    { id: "fan-engagement", label: "Fan Engagement", icon: "heart" },
    { id: "streaming", label: "Streaming", icon: "radio" },
    { id: "touring", label: "Touring", icon: "plane" },
    { id: "brand-deals", label: "Brand Deals", icon: "star" },
    { id: "open-mics", label: "Open Mics", icon: "mic" },
    { id: "beat-making", label: "Beat Making", icon: "zap" },
    { id: "performances", label: "Performances", icon: "sparkles" },
    { id: "networking", label: "Networking", icon: "handshake" },
    { id: "content-clips", label: "Content Clips", icon: "clapperboard" },
    { id: "merch", label: "Merch Drops", icon: "shirt" },
  ]),

  dj: pick([
    { id: "club-sets", label: "Club Sets", icon: "moon" },
    { id: "festivals", label: "Festivals", icon: "party" },
    { id: "hip-hop-sets", label: "Hip-Hop Sets", icon: "music" },
    { id: "house-music", label: "House Music", icon: "headphones" },
    { id: "latin-sets", label: "Latin Sets", icon: "sparkles" },
    { id: "open-format", label: "Open Format", icon: "zap" },
    { id: "live-remixes", label: "Live Remixes", icon: "radio" },
    { id: "private-events", label: "Private Events", icon: "star" },
    { id: "radio-mixes", label: "Radio Mixes", icon: "radio" },
    { id: "vinyl-digging", label: "Vinyl Digging", icon: "music" },
    { id: "crowd-energy", label: "Crowd Energy", icon: "heart" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "content-clips", label: "Set Recaps", icon: "video" },
    { id: "collabs", label: "DJ Collabs", icon: "users" },
    { id: "touring", label: "Tour Life", icon: "plane" },
    { id: "brand-deals", label: "Brand Deals", icon: "business" },
  ]),

  gamer: pick([
    { id: "fps", label: "FPS", icon: "gamepad" },
    { id: "rpg", label: "RPG", icon: "book" },
    { id: "esports", label: "Esports", icon: "trophy" },
    { id: "streaming", label: "Streaming", icon: "video" },
    { id: "mobile-games", label: "Mobile Games", icon: "cpu" },
    { id: "pc-gaming", label: "PC Gaming", icon: "cpu" },
    { id: "console", label: "Console", icon: "gamepad" },
    { id: "fighting-games", label: "Fighting Games", icon: "zap" },
    { id: "speedruns", label: "Speedruns", icon: "star" },
    { id: "co-op", label: "Co-op", icon: "users" },
    { id: "tournaments", label: "Tournaments", icon: "trophy" },
    { id: "game-dev", label: "Game Dev", icon: "cpu" },
    { id: "clans", label: "Clans & Teams", icon: "users" },
    { id: "content-clips", label: "Highlight Clips", icon: "clapperboard" },
    { id: "vr", label: "VR Gaming", icon: "sparkles" },
    { id: "retro", label: "Retro Games", icon: "gamepad" },
  ]),

  athlete: pick([
    { id: "basketball", label: "Basketball", icon: "trophy" },
    { id: "football", label: "Football", icon: "trophy" },
    { id: "soccer", label: "Soccer", icon: "trophy" },
    { id: "training", label: "Training", icon: "dumbbell" },
    { id: "game-day", label: "Game Day", icon: "star" },
    { id: "recovery", label: "Recovery", icon: "heart" },
    { id: "nutrition", label: "Nutrition", icon: "food" },
    { id: "highlights", label: "Highlights", icon: "video" },
    { id: "sponsorships", label: "Sponsorships", icon: "business" },
    { id: "fan-base", label: "Fan Base", icon: "users" },
    { id: "competitions", label: "Competitions", icon: "trophy" },
    { id: "travel", label: "Travel", icon: "plane" },
    { id: "fitness", label: "Fitness", icon: "dumbbell" },
    { id: "mindset", label: "Mindset", icon: "sparkles" },
    { id: "community", label: "Community", icon: "handshake" },
    { id: "gear", label: "Gear & Style", icon: "shirt" },
  ]),

  fitness: pick([
    { id: "personal-training", label: "Personal Training", icon: "dumbbell" },
    { id: "strength", label: "Strength", icon: "trophy" },
    { id: "yoga", label: "Yoga", icon: "heart" },
    { id: "hiit", label: "HIIT", icon: "zap" },
    { id: "nutrition", label: "Nutrition", icon: "food" },
    { id: "transformation", label: "Transformations", icon: "star" },
    { id: "group-classes", label: "Group Classes", icon: "users" },
    { id: "wellness", label: "Wellness", icon: "sparkles" },
    { id: "athlete-prep", label: "Athlete Prep", icon: "trophy" },
    { id: "content-tips", label: "Fitness Tips", icon: "video" },
    { id: "gym-culture", label: "Gym Culture", icon: "dumbbell" },
    { id: "mobility", label: "Mobility", icon: "heart" },
    { id: "supplements", label: "Supplements", icon: "star" },
    { id: "outdoor-runs", label: "Outdoor Runs", icon: "sun" },
    { id: "client-wins", label: "Client Wins", icon: "handshake" },
    { id: "brand-deals", label: "Brand Deals", icon: "business" },
  ]),

  fashion: pick([
    { id: "streetwear", label: "Streetwear", icon: "shirt" },
    { id: "luxury", label: "Luxury", icon: "star" },
    { id: "runway", label: "Runway", icon: "sparkles" },
    { id: "sneakers", label: "Sneakers", icon: "footprints" },
    { id: "styling", label: "Styling", icon: "palette" },
    { id: "editorial", label: "Editorial", icon: "camera" },
    { id: "vintage", label: "Vintage", icon: "shirt" },
    { id: "designer", label: "Designer", icon: "star" },
    { id: "lookbooks", label: "Lookbooks", icon: "film" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "pop-ups", label: "Pop-ups", icon: "store" },
    { id: "content-clips", label: "Fit Checks", icon: "video" },
    { id: "accessories", label: "Accessories", icon: "sparkles" },
    { id: "sustainable", label: "Sustainable", icon: "globe" },
    { id: "modeling", label: "Modeling", icon: "camera" },
    { id: "nightlife-fit", label: "Night Fits", icon: "moon" },
  ]),

  beautician: pick([
    { id: "hair", label: "Hair", icon: "scissors" },
    { id: "nails", label: "Nails", icon: "sparkles" },
    { id: "makeup", label: "Makeup", icon: "palette" },
    { id: "skincare", label: "Skincare", icon: "heart" },
    { id: "lashes", label: "Lashes", icon: "star" },
    { id: "brows", label: "Brows", icon: "sparkles" },
    { id: "bridal", label: "Bridal Glam", icon: "heart" },
    { id: "editorial", label: "Editorial", icon: "camera" },
    { id: "salon-life", label: "Salon Life", icon: "store" },
    { id: "transformations", label: "Transformations", icon: "video" },
    { id: "product-reviews", label: "Product Reviews", icon: "star" },
    { id: "classes", label: "Beauty Classes", icon: "book" },
    { id: "client-care", label: "Client Care", icon: "handshake" },
    { id: "content-clips", label: "Glam Content", icon: "clapperboard" },
    { id: "wellness", label: "Wellness", icon: "heart" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
  ]),

  stylist: pick([
    { id: "personal-styling", label: "Personal Styling", icon: "shirt" },
    { id: "wardrobe", label: "Wardrobe", icon: "palette" },
    { id: "celebrity", label: "Celebrity", icon: "star" },
    { id: "editorial", label: "Editorial", icon: "camera" },
    { id: "menswear", label: "Menswear", icon: "shirt" },
    { id: "commercial", label: "Commercial", icon: "business" },
    { id: "lookbooks", label: "Lookbooks", icon: "film" },
    { id: "shopping", label: "Shopping Trips", icon: "store" },
    { id: "red-carpet", label: "Red Carpet", icon: "sparkles" },
    { id: "closet-edits", label: "Closet Edits", icon: "scissors" },
    { id: "brand-deals", label: "Brand Deals", icon: "handshake" },
    { id: "content-clips", label: "Style Content", icon: "video" },
    { id: "fashion-week", label: "Fashion Week", icon: "plane" },
    { id: "sneakers", label: "Sneakers", icon: "footprints" },
    { id: "nightlife-fit", label: "Night Looks", icon: "moon" },
    { id: "client-wins", label: "Client Wins", icon: "heart" },
  ]),

  photographer: pick([
    { id: "portraits", label: "Portraits", icon: "camera" },
    { id: "events", label: "Events", icon: "party" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
    { id: "street", label: "Street", icon: "map" },
    { id: "weddings", label: "Weddings", icon: "heart" },
    { id: "product", label: "Product", icon: "store" },
    { id: "real-estate", label: "Real Estate", icon: "globe" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "editorial", label: "Editorial", icon: "film" },
    { id: "travel", label: "Travel", icon: "plane" },
    { id: "content-clips", label: "BTS Content", icon: "video" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "lighting", label: "Lighting", icon: "sparkles" },
    { id: "drone", label: "Drone", icon: "plane" },
    { id: "brand-deals", label: "Brand Deals", icon: "business" },
    { id: "prints", label: "Prints", icon: "star" },
  ]),

  videographer: pick([
    { id: "music-videos", label: "Music Videos", icon: "music" },
    { id: "weddings", label: "Weddings", icon: "heart" },
    { id: "documentary", label: "Documentary", icon: "film" },
    { id: "commercials", label: "Commercials", icon: "business" },
    { id: "social-content", label: "Social Content", icon: "clapperboard" },
    { id: "live-events", label: "Live Events", icon: "party" },
    { id: "real-estate", label: "Real Estate", icon: "globe" },
    { id: "drone", label: "Drone Shots", icon: "plane" },
    { id: "color-grading", label: "Color Grading", icon: "palette" },
    { id: "storytelling", label: "Storytelling", icon: "book" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
    { id: "travel", label: "Travel", icon: "map" },
    { id: "brand-deals", label: "Brand Deals", icon: "star" },
    { id: "bts", label: "BTS", icon: "video" },
  ]),

  "content-creator": pick([
    { id: "lifestyle", label: "Lifestyle", icon: "sparkles" },
    { id: "comedy", label: "Comedy", icon: "clapperboard" },
    { id: "education", label: "Education", icon: "book" },
    { id: "beauty", label: "Beauty", icon: "palette" },
    { id: "fitness", label: "Fitness", icon: "dumbbell" },
    { id: "tech", label: "Tech", icon: "cpu" },
    { id: "food", label: "Food", icon: "food" },
    { id: "travel", label: "Travel", icon: "plane" },
    { id: "vlogs", label: "Vlogs", icon: "video" },
    { id: "short-form", label: "Short Form", icon: "zap" },
    { id: "live-streams", label: "Live Streams", icon: "radio" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "brand-deals", label: "Brand Deals", icon: "business" },
    { id: "community", label: "Community", icon: "heart" },
    { id: "trending", label: "Trending", icon: "star" },
    { id: "monetization", label: "Monetization", icon: "wallet" },
  ]),

  entrepreneur: pick([
    { id: "startups", label: "Startups", icon: "zap" },
    { id: "ecommerce", label: "E-Commerce", icon: "store" },
    { id: "networking", label: "Networking", icon: "handshake" },
    { id: "investing", label: "Investing", icon: "wallet" },
    { id: "marketing", label: "Marketing", icon: "megaphone" },
    { id: "branding", label: "Branding", icon: "star" },
    { id: "tech", label: "Tech", icon: "cpu" },
    { id: "hospitality", label: "Hospitality", icon: "wine" },
    { id: "real-estate", label: "Real Estate", icon: "globe" },
    { id: "franchise", label: "Franchise", icon: "business" },
    { id: "content-clips", label: "Founder Content", icon: "video" },
    { id: "team-building", label: "Team Building", icon: "users" },
    { id: "partnerships", label: "Partnerships", icon: "handshake" },
    { id: "product-launches", label: "Launches", icon: "party" },
    { id: "finance", label: "Finance", icon: "wallet" },
    { id: "community", label: "Community", icon: "heart" },
  ]),

  business: pick([
    { id: "retail", label: "Retail", icon: "store" },
    { id: "services", label: "Services", icon: "handshake" },
    { id: "tech", label: "Tech", icon: "cpu" },
    { id: "wellness", label: "Wellness", icon: "heart" },
    { id: "creative", label: "Creative Studio", icon: "palette" },
    { id: "hospitality", label: "Hospitality", icon: "wine" },
    { id: "marketing", label: "Marketing", icon: "megaphone" },
    { id: "local-community", label: "Local Community", icon: "users" },
    { id: "events", label: "Events", icon: "party" },
    { id: "customer-care", label: "Customer Care", icon: "heart" },
    { id: "growth", label: "Growth", icon: "business" },
    { id: "partnerships", label: "Partnerships", icon: "handshake" },
    { id: "content-clips", label: "Business Content", icon: "video" },
    { id: "food", label: "Food & Drink", icon: "food" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
  ]),

  restaurant: pick([
    { id: "fine-dining", label: "Fine Dining", icon: "wine" },
    { id: "fast-casual", label: "Fast Casual", icon: "food" },
    { id: "cafe", label: "Café", icon: "chef" },
    { id: "bar-grill", label: "Bar & Grill", icon: "moon" },
    { id: "food-truck", label: "Food Truck", icon: "car" },
    { id: "supper-club", label: "Supper Club", icon: "party" },
    { id: "brunch", label: "Brunch", icon: "sun" },
    { id: "chef-specials", label: "Chef Specials", icon: "chef" },
    { id: "local-ingredients", label: "Local Ingredients", icon: "globe" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "events", label: "Private Events", icon: "star" },
    { id: "content-clips", label: "Food Content", icon: "video" },
    { id: "reviews", label: "Reviews", icon: "heart" },
    { id: "community", label: "Community", icon: "users" },
    { id: "catering", label: "Catering", icon: "handshake" },
    { id: "seasonal-menu", label: "Seasonal Menu", icon: "sparkles" },
  ]),

  nightclub: pick([
    { id: "mega-club", label: "Mega Club", icon: "party" },
    { id: "vip-lounge", label: "VIP Lounge", icon: "star" },
    { id: "rooftop", label: "Rooftop", icon: "sun" },
    { id: "day-party", label: "Day Party", icon: "sparkles" },
    { id: "underground", label: "Underground", icon: "moon" },
    { id: "bottle-service", label: "Bottle Service", icon: "wine" },
    { id: "live-djs", label: "Live DJs", icon: "headphones" },
    { id: "theme-nights", label: "Theme Nights", icon: "clapperboard" },
    { id: "guest-list", label: "Guest List", icon: "users" },
    { id: "security", label: "Security", icon: "star" },
    { id: "promotions", label: "Promotions", icon: "megaphone" },
    { id: "content-clips", label: "Night Recaps", icon: "video" },
    { id: "music", label: "Music", icon: "music" },
    { id: "fashion", label: "Fashion", icon: "shirt" },
    { id: "collabs", label: "Collabs", icon: "handshake" },
    { id: "city-events", label: "City Events", icon: "globe" },
  ]),

  automotive: pick([
    { id: "mechanic", label: "Mechanic", icon: "wrench" },
    { id: "detailing", label: "Detailing", icon: "sparkles" },
    { id: "dealership", label: "Dealership", icon: "store" },
    { id: "custom-builds", label: "Custom Builds", icon: "wrench" },
    { id: "car-meets", label: "Car Meets", icon: "users" },
    { id: "racing", label: "Racing", icon: "trophy" },
    { id: "classics", label: "Classics", icon: "star" },
    { id: "exotics", label: "Exotics", icon: "car" },
    { id: "content-clips", label: "Car Content", icon: "video" },
    { id: "restoration", label: "Restoration", icon: "wrench" },
    { id: "wraps", label: "Wraps", icon: "palette" },
    { id: "track-days", label: "Track Days", icon: "zap" },
    { id: "community", label: "Community", icon: "handshake" },
    { id: "sponsorships", label: "Sponsorships", icon: "business" },
    { id: "travel", label: "Road Trips", icon: "plane" },
    { id: "nightlife", label: "Night Cruises", icon: "moon" },
  ]),

  "food-creator": pick([
    { id: "recipes", label: "Recipes", icon: "chef" },
    { id: "reviews", label: "Reviews", icon: "star" },
    { id: "chef-content", label: "Chef Content", icon: "video" },
    { id: "street-food", label: "Street Food", icon: "map" },
    { id: "healthy-eats", label: "Healthy Eats", icon: "heart" },
    { id: "desserts", label: "Desserts", icon: "sparkles" },
    { id: "pop-ups", label: "Pop-ups", icon: "party" },
    { id: "collabs", label: "Collabs", icon: "users" },
    { id: "local-spots", label: "Local Spots", icon: "globe" },
    { id: "home-cooking", label: "Home Cooking", icon: "food" },
    { id: "food-travel", label: "Food Travel", icon: "plane" },
    { id: "brand-deals", label: "Brand Deals", icon: "business" },
    { id: "live-cooking", label: "Live Cooking", icon: "radio" },
    { id: "nightlife", label: "Late Night Eats", icon: "moon" },
    { id: "culture", label: "Food Culture", icon: "book" },
    { id: "community", label: "Community", icon: "handshake" },
  ]),

  travel: pick([
    { id: "city-guides", label: "City Guides", icon: "map" },
    { id: "adventure", label: "Adventure", icon: "zap" },
    { id: "luxury", label: "Luxury", icon: "star" },
    { id: "budget", label: "Budget Travel", icon: "wallet" },
    { id: "food-travel", label: "Food Travel", icon: "food" },
    { id: "digital-nomad", label: "Digital Nomad", icon: "cpu" },
    { id: "beach", label: "Beach", icon: "sun" },
    { id: "nightlife", label: "Nightlife", icon: "moon" },
    { id: "photography", label: "Photography", icon: "camera" },
    { id: "culture", label: "Culture", icon: "book" },
    { id: "content-clips", label: "Travel Vlogs", icon: "video" },
    { id: "hidden-gems", label: "Hidden Gems", icon: "sparkles" },
    { id: "solo-travel", label: "Solo Travel", icon: "plane" },
    { id: "group-trips", label: "Group Trips", icon: "users" },
    { id: "local-events", label: "Local Events", icon: "party" },
    { id: "community", label: "Community", icon: "heart" },
  ]),

  community: pick([
    { id: "nonprofit", label: "Nonprofit", icon: "heart" },
    { id: "neighborhood", label: "Neighborhood", icon: "map" },
    { id: "youth", label: "Youth Programs", icon: "users" },
    { id: "culture", label: "Culture", icon: "book" },
    { id: "activism", label: "Activism", icon: "megaphone" },
    { id: "faith", label: "Faith", icon: "sparkles" },
    { id: "volunteering", label: "Volunteering", icon: "handshake" },
    { id: "events", label: "Events", icon: "party" },
    { id: "fundraising", label: "Fundraising", icon: "wallet" },
    { id: "education", label: "Education", icon: "book" },
    { id: "local-business", label: "Local Business", icon: "store" },
    { id: "food-drives", label: "Food Drives", icon: "food" },
    { id: "sports", label: "Sports", icon: "trophy" },
    { id: "arts", label: "Arts", icon: "palette" },
    { id: "content-clips", label: "Community Stories", icon: "video" },
    { id: "partnerships", label: "Partnerships", icon: "handshake" },
  ]),
};

const IDENTITY_INTEREST_TITLES: Partial<Record<IdentityType, { title: string; subtitle: string }>> = {
  "music-artist": {
    title: "What Fuels Your Artist World?",
    subtitle: "Pick at least 5 lanes. We'll tune POP'IT to your sound.",
  },
  gamer: {
    title: "What's Your Gaming Vibe?",
    subtitle: "Pick at least 5. We'll build your player feed around it.",
  },
  beautician: {
    title: "What Beauty Lanes Excite You?",
    subtitle: "Pick at least 5 specialties. We'll glam your POP'IT experience.",
  },
  restaurant: {
    title: "What Defines Your Dining Scene?",
    subtitle: "Pick at least 5. We'll flavor your city feed.",
  },
  nightclub: {
    title: "What Powers Your Nightlife?",
    subtitle: "Pick at least 5. We'll turn up your POP'IT experience.",
  },
};

export function getIdentityInterestConfig(identity: IdentityType): IdentityInterestConfig {
  const base = IDENTITY_INTEREST_MAP[identity];
  const copy = IDENTITY_INTEREST_TITLES[identity];
  if (!copy) return base;
  return {
    ...base,
    title: copy.title,
    subtitle: copy.subtitle,
  };
}

/** Map identity-specific picks to city scene tags when possible */
const CITY_TAG_FALLBACK: Record<string, string[]> = {
  nightlife: ["nightlife"],
  music: ["music"],
  food: ["food"],
  travel: ["travel"],
  fitness: ["fitness"],
  fashion: ["fashion"],
  gaming: ["gaming"],
  sports: ["sports"],
  photography: ["photography"],
  movies: ["movies"],
  entertainment: ["entertainment"],
  technology: ["technology"],
  sneakers: ["sneakers"],
  pets: ["pets"],
  cars: ["cars"],
  business: ["business"],
  "content-clips": ["entertainment", "technology"],
  collabs: ["entertainment"],
  festivals: ["music", "nightlife"],
  "brand-deals": ["business", "fashion"],
  streaming: ["gaming", "entertainment"],
  "live-shows": ["music", "nightlife"],
  esports: ["gaming", "sports"],
  "street-food": ["food", "travel"],
  "car-meets": ["cars", "nightlife"],
};

export function mapInterestsToCityTags(selected: string[]): string[] {
  const tags = selected.flatMap((id) => CITY_TAG_FALLBACK[id] ?? [id]);
  return [...new Set(tags)];
}

const CORE_INTEREST_IDS = new Set([
  "gaming",
  "sports",
  "music",
  "travel",
  "photography",
  "food",
  "cars",
  "technology",
  "business",
  "entertainment",
  "fitness",
  "fashion",
  "movies",
  "nightlife",
  "sneakers",
  "pets",
]);

export function isCoreInterestId(id: string): boolean {
  return CORE_INTEREST_IDS.has(id);
}

const IDENTITY_CITY_DEFAULTS: Record<IdentityType, string[]> = {
  personal: ["nightlife", "music", "food", "travel", "entertainment"],
  business: ["business", "technology", "food", "nightlife"],
  restaurant: ["food", "nightlife", "travel", "entertainment"],
  nightclub: ["nightlife", "music", "entertainment", "fashion"],
  "music-artist": ["music", "entertainment", "nightlife", "fashion"],
  dj: ["music", "nightlife", "entertainment"],
  gamer: ["gaming", "technology", "entertainment"],
  athlete: ["sports", "fitness", "entertainment"],
  fitness: ["fitness", "sports", "food"],
  fashion: ["fashion", "sneakers", "photography"],
  beautician: ["fashion", "entertainment", "photography"],
  stylist: ["fashion", "sneakers", "photography"],
  photographer: ["photography", "fashion", "travel"],
  videographer: ["photography", "movies", "entertainment"],
  "content-creator": ["entertainment", "technology", "fashion"],
  entrepreneur: ["business", "technology", "entertainment"],
  automotive: ["cars", "technology", "sports"],
  "food-creator": ["food", "travel", "entertainment"],
  travel: ["travel", "food", "photography"],
  community: ["entertainment", "food", "sports"],
};

export function resolveInterestsForCity(identity: IdentityType, selected: string[]): string[] {
  const mapped = mapInterestsToCityTags(selected).filter(isCoreInterestId);
  const direct = selected.filter(isCoreInterestId);
  const combined = [...new Set([...direct, ...mapped])];
  if (combined.length >= 3) return combined;
  return [...new Set([...combined, ...IDENTITY_CITY_DEFAULTS[identity]])];
}
