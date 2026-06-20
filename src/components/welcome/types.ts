export type CategoryKey = "restaurants" | "events" | "trending" | "nearby";

export type EnergyTier = "cool" | "warm" | "hot" | "overdrive";

export type ActivityItem = {
  id: string;
  icon: string;
  text: string;
  time: string;
};

export type PulseChannel = {
  key: string;
  icon: string;
  label: string;
  /** 0–100, future: from popularity engine */
  value: number;
  accent: string;
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
  /** 0–100 */
  energy: number;
  tier: EnergyTier;
  label: string;
  exploringCount: number;
  isOverdrive: boolean;
};

export type WelcomeHomeProps = {
  onJoin: () => void;
  onSignIn: () => void;
};
