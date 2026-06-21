import type { IdentityType } from "./types";

export type IdentityTopic = {
  id: string;
  label: string;
};

export type IdentityTopicGroup = {
  label: string;
  topics: IdentityTopic[];
};

export type IdentityTopicConfig = {
  prompt: string;
  groups: IdentityTopicGroup[];
};

const artistGenres = (prefix: string): IdentityTopic[] => [
  { id: `${prefix}-rap`, label: `${prefix} Rap Artist` },
  { id: `${prefix}-rb`, label: `${prefix} R&B Artist` },
  { id: `${prefix}-pop`, label: `${prefix} Pop Artist` },
  { id: `${prefix}-country`, label: `${prefix} Country Artist` },
  { id: `${prefix}-rock`, label: `${prefix} Rock Artist` },
  { id: `${prefix}-latin`, label: `${prefix} Latin Artist` },
  { id: `${prefix}-gospel`, label: `${prefix} Gospel Artist` },
  { id: `${prefix}-edm`, label: `${prefix} EDM / Dance Artist` },
];

export const IDENTITY_TOPIC_MAP: Record<IdentityType, IdentityTopicConfig> = {
  personal: {
    prompt: "What's your city vibe?",
    groups: [
      {
        label: "City Lifestyle",
        topics: [
          { id: "night-owl", label: "Night Owl" },
          { id: "foodie", label: "Foodie Explorer" },
          { id: "culture-lover", label: "Culture & Art Lover" },
          { id: "beach-life", label: "Beach & Outdoor Life" },
          { id: "connector", label: "Community Connector" },
          { id: "builder", label: "City Builder" },
        ],
      },
    ],
  },
  business: {
    prompt: "What kind of business are you?",
    groups: [
      {
        label: "Business Type",
        topics: [
          { id: "retail", label: "Retail & Shop" },
          { id: "professional", label: "Professional Services" },
          { id: "tech", label: "Tech & Digital" },
          { id: "wellness-biz", label: "Health & Wellness" },
          { id: "creative-studio", label: "Creative Studio" },
          { id: "hospitality-biz", label: "Hospitality & Events" },
        ],
      },
    ],
  },
  restaurant: {
    prompt: "What kind of restaurant?",
    groups: [
      {
        label: "Dining Style",
        topics: [
          { id: "fine-dining", label: "Fine Dining" },
          { id: "fast-casual", label: "Fast Casual" },
          { id: "cafe", label: "Café & Coffee" },
          { id: "bar-grill", label: "Bar & Grill" },
          { id: "food-truck", label: "Food Truck" },
          { id: "supper-club", label: "Supper Club" },
          { id: "bakery", label: "Bakery & Pastry" },
        ],
      },
    ],
  },
  nightclub: {
    prompt: "What kind of nightlife venue?",
    groups: [
      {
        label: "Venue Style",
        topics: [
          { id: "mega-club", label: "Mega Club" },
          { id: "lounge", label: "VIP Lounge" },
          { id: "rooftop", label: "Rooftop Party" },
          { id: "day-party", label: "Day Party" },
          { id: "underground", label: "Underground" },
          { id: "hotel-club", label: "Hotel Nightlife" },
        ],
      },
    ],
  },
  "music-artist": {
    prompt: "What kind of artist are you?",
    groups: [
      { label: "Female Artists", topics: artistGenres("Female") },
      { label: "Male Artists", topics: artistGenres("Male") },
      {
        label: "All Voices",
        topics: [
          { id: "singer-songwriter", label: "Singer-Songwriter" },
          { id: "indie-artist", label: "Indie Artist" },
          { id: "afrobeats", label: "Afrobeats Artist" },
          { id: "k-pop", label: "K-Pop / Global Pop" },
          { id: "jazz-soul", label: "Jazz & Soul" },
        ],
      },
    ],
  },
  dj: {
    prompt: "What's your DJ lane?",
    groups: [
      {
        label: "Sound & Scene",
        topics: [
          { id: "hip-hop-dj", label: "Hip-Hop & Rap" },
          { id: "house-dj", label: "House & Deep House" },
          { id: "edm-dj", label: "EDM & Festival" },
          { id: "latin-dj", label: "Latin & Reggaeton" },
          { id: "open-format", label: "Open Format" },
          { id: "techno", label: "Techno & Underground" },
          { id: "wedding-events", label: "Weddings & Events" },
        ],
      },
    ],
  },
  gamer: {
    prompt: "What's your gaming identity?",
    groups: [
      {
        label: "Player Type",
        topics: [
          { id: "fps", label: "FPS & Shooter" },
          { id: "rpg", label: "RPG & Adventure" },
          { id: "sports-games", label: "Sports & Racing" },
          { id: "fighting", label: "Fighting & Competitive" },
          { id: "streamer", label: "Streaming Creator" },
          { id: "mobile-gamer", label: "Mobile Gamer" },
          { id: "pc-master", label: "PC Master Race" },
          { id: "console", label: "Console Main" },
        ],
      },
    ],
  },
  athlete: {
    prompt: "What sport defines you?",
    groups: [
      {
        label: "Sport",
        topics: [
          { id: "basketball", label: "Basketball" },
          { id: "football", label: "Football" },
          { id: "soccer", label: "Soccer" },
          { id: "tennis", label: "Tennis" },
          { id: "track", label: "Track & Field" },
          { id: "combat", label: "Boxing / MMA / Combat" },
          { id: "golf", label: "Golf" },
          { id: "swim", label: "Swimming & Aquatics" },
        ],
      },
    ],
  },
  fitness: {
    prompt: "What's your training lane?",
    groups: [
      {
        label: "Fitness Focus",
        topics: [
          { id: "personal-trainer", label: "Personal Trainer" },
          { id: "crossfit", label: "CrossFit & Strength" },
          { id: "yoga", label: "Yoga & Mind-Body" },
          { id: "bodybuilding", label: "Bodybuilding" },
          { id: "pilates", label: "Pilates" },
          { id: "bootcamp", label: "Bootcamp & HIIT" },
          { id: "nutrition", label: "Nutrition Coach" },
        ],
      },
    ],
  },
  fashion: {
    prompt: "What's your fashion lane?",
    groups: [
      {
        label: "Style World",
        topics: [
          { id: "streetwear", label: "Streetwear" },
          { id: "luxury-fashion", label: "Luxury Fashion" },
          { id: "vintage", label: "Vintage & Thrift" },
          { id: "designer", label: "Designer / Brand" },
          { id: "sustainable", label: "Sustainable Fashion" },
          { id: "accessories", label: "Accessories & Jewelry" },
          { id: "model", label: "Model" },
        ],
      },
    ],
  },
  beautician: {
    prompt: "What's your beauty specialty?",
    groups: [
      {
        label: "Beauty Lane",
        topics: [
          { id: "hair-stylist", label: "Hair Stylist" },
          { id: "nail-artist", label: "Nail Artist" },
          { id: "mua", label: "Makeup Artist (MUA)" },
          { id: "esthetician", label: "Esthetician / Skincare" },
          { id: "lash-tech", label: "Lash Technician" },
          { id: "brow-specialist", label: "Brow Specialist" },
          { id: "salon-owner", label: "Salon Owner" },
        ],
      },
    ],
  },
  stylist: {
    prompt: "What kind of stylist are you?",
    groups: [
      {
        label: "Styling Lane",
        topics: [
          { id: "personal-stylist", label: "Personal Stylist" },
          { id: "wardrobe", label: "Wardrobe Stylist" },
          { id: "editorial-style", label: "Editorial & Runway" },
          { id: "celebrity-style", label: "Celebrity Stylist" },
          { id: "mens-style", label: "Men's Style Specialist" },
          { id: "commercial-style", label: "Commercial & Brand" },
        ],
      },
    ],
  },
  photographer: {
    prompt: "What's your photography lane?",
    groups: [
      {
        label: "Lens Focus",
        topics: [
          { id: "portrait-photo", label: "Portrait" },
          { id: "event-photo", label: "Events & Nightlife" },
          { id: "fashion-photo", label: "Fashion" },
          { id: "wedding-photo", label: "Wedding" },
          { id: "street-photo", label: "Street Photography" },
          { id: "product-photo", label: "Product & Commercial" },
          { id: "real-estate-photo", label: "Real Estate" },
        ],
      },
    ],
  },
  videographer: {
    prompt: "What's your video lane?",
    groups: [
      {
        label: "Production Focus",
        topics: [
          { id: "music-video", label: "Music Videos" },
          { id: "wedding-video", label: "Weddings & Events" },
          { id: "documentary", label: "Documentary" },
          { id: "commercial-video", label: "Commercial & Ads" },
          { id: "content-video", label: "Social Content" },
          { id: "live-events", label: "Live Events" },
          { id: "real-estate-video", label: "Real Estate & Drone" },
        ],
      },
    ],
  },
  "content-creator": {
    prompt: "What kind of creator are you?",
    groups: [
      {
        label: "Creator Lane",
        topics: [
          { id: "lifestyle-creator", label: "Lifestyle" },
          { id: "comedy-creator", label: "Comedy & Skits" },
          { id: "education-creator", label: "Education & Tips" },
          { id: "beauty-creator", label: "Beauty & Glam" },
          { id: "fitness-creator", label: "Fitness & Wellness" },
          { id: "tech-creator", label: "Tech & Reviews" },
          { id: "food-creator-content", label: "Food & Dining" },
          { id: "travel-creator", label: "Travel & City Vlogs" },
        ],
      },
    ],
  },
  entrepreneur: {
    prompt: "What kind of entrepreneur?",
    groups: [
      {
        label: "Build Lane",
        topics: [
          { id: "startup-founder", label: "Startup Founder" },
          { id: "small-business", label: "Small Business Owner" },
          { id: "ecommerce", label: "E-Commerce Brand" },
          { id: "creator-business", label: "Creator Business" },
          { id: "franchise", label: "Franchise & Multi-Location" },
          { id: "investor-builder", label: "Investor & Operator" },
        ],
      },
    ],
  },
  automotive: {
    prompt: "What's your car culture lane?",
    groups: [
      {
        label: "Automotive World",
        topics: [
          { id: "mechanic", label: "Mechanic & Repair" },
          { id: "detailer", label: "Detailer" },
          { id: "dealer", label: "Dealer & Sales" },
          { id: "custom-shop", label: "Custom Shop" },
          { id: "car-meets", label: "Car Meets & Culture" },
          { id: "racing", label: "Racing & Performance" },
          { id: "classics", label: "Classic & Exotic" },
        ],
      },
    ],
  },
  "food-creator": {
    prompt: "What's your food lane?",
    groups: [
      {
        label: "Culinary Focus",
        topics: [
          { id: "recipe-creator", label: "Recipe Creator" },
          { id: "food-reviewer", label: "Food Reviewer" },
          { id: "chef-content", label: "Chef Content" },
          { id: "street-food", label: "Street Food Hunter" },
          { id: "healthy-eats", label: "Healthy Eating" },
          { id: "dessert-creator", label: "Dessert & Baking" },
        ],
      },
    ],
  },
  travel: {
    prompt: "What kind of traveler are you?",
    groups: [
      {
        label: "Travel Lane",
        topics: [
          { id: "local-guide", label: "Local City Guide" },
          { id: "adventure-travel", label: "Adventure Travel" },
          { id: "luxury-travel", label: "Luxury Travel" },
          { id: "budget-explorer", label: "Budget Explorer" },
          { id: "food-tourism", label: "Food Tourism" },
          { id: "digital-nomad", label: "Digital Nomad" },
        ],
      },
    ],
  },
  community: {
    prompt: "What kind of community org?",
    groups: [
      {
        label: "Community Focus",
        topics: [
          { id: "nonprofit", label: "Nonprofit" },
          { id: "neighborhood", label: "Neighborhood Group" },
          { id: "youth-program", label: "Youth Program" },
          { id: "cultural-org", label: "Cultural Organization" },
          { id: "activist", label: "Activist & Advocacy" },
          { id: "faith-community", label: "Faith Community" },
        ],
      },
    ],
  },
};

export function getIdentityTopicConfig(identity: IdentityType): IdentityTopicConfig {
  return IDENTITY_TOPIC_MAP[identity];
}

export function getAllTopicsForIdentity(identity: IdentityType): IdentityTopic[] {
  return IDENTITY_TOPIC_MAP[identity].groups.flatMap((g) => g.topics);
}

export function getIdentityTopicLabel(identity: IdentityType, topicId: string): string | null {
  const topic = getAllTopicsForIdentity(identity).find((t) => t.id === topicId);
  return topic?.label ?? null;
}

export function isValidIdentityTopic(identity: IdentityType, topicId: string): boolean {
  return getAllTopicsForIdentity(identity).some((t) => t.id === topicId);
}
