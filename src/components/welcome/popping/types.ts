import type { PopMarkTier } from "@/lib/pop-marks/types";

export type PoppingCardKind =
  | "creator"
  | "business"
  | "event"
  | "nightlife"
  | "athlete"
  | "music_artist"
  | "local_story"
  | "live_video"
  | "photographer"
  | "community"
  | "charity";

export type PoppingTapTarget = "profile" | "business" | "event" | "video";

export type PoppingCard = {
  id: string;
  kind: PoppingCardKind;
  rank: number;
  popScore: number;
  title: string;
  category: string;
  image: string;
  trending: boolean;
  tapTarget: PoppingTapTarget;
  verified?: boolean;
  /** POP Mark tier when earned — replaces generic verification checkmarks */
  popMark?: PopMarkTier | null;
  city?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  followersToday?: number;
  rating?: number;
  distance?: string;
  savesToday?: number;
  countdown?: string;
  interested?: number;
  viewers?: number;
};
