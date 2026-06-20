export type CategoryKey = "restaurants" | "events" | "trending" | "nearby";

export type EnergyTier = "calm" | "active" | "busy" | "hot" | "on-fire" | "overdrive";

export type TimePeriod = "morning" | "afternoon" | "sunset" | "night" | "late-night";

export type ActivityItem = {
  id: string;
  icon: string;
  text: string;
  time: string;
};

export type VenueCard = {
  id: string;
  icon: string;
  name: string;
  rating?: string;
  distance?: string;
  stat: string;
  badge?: string;
  detail?: string;
};

export type PulseChannel = {
  key: string;
  icon: string;
  label: string;
  value: number;
  delta: number;
  statusLabel: string;
  accent: string;
  isHottest?: boolean;
};

export type SceneSlide = {
  id: string;
  category: string;
  chipKey: CategoryKey;
  src: string;
  alt: string;
  headlineTop: string;
  headlineAccent: string;
  subtitle: string;
  overlay: number;
  ambientHue: string;
  ticker: ActivityItem[];
};

export type CityEnergyState = {
  energy: number;
  tier: EnergyTier;
  label: string;
  exploringCount: number;
  isOverdrive: boolean;
  isOnFire: boolean;
};

export type TrendingCreator = {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
  category: string;
  likes: number;
  comments: number;
  saves: number;
  followersToday: number;
  trending: boolean;
};

export type GlobeHotspot = {
  id: string;
  city: string;
  /** 0–100 position on globe projection */
  x: number;
  y: number;
};

export type WelcomeHomeProps = {
  onJoin: () => void;
  onSignIn: () => void;
};
