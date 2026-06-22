import type { IdentityType } from "./types";
import { DEFAULT_CITY_LABEL } from "@/lib/location/constants";

const IDENTITY_KEY = "popit:identity";
const USER_KEY = "popit:user";

export const PROFILE_UPDATE_EVENT = "popit:profile:update";

export type UserProfile = {
  username: string;
  name: string;
  city: string;
  identity: IdentityType;
  identities?: IdentityType[];
  identityTopic?: string;
  identityTopicLabel?: string;
  followers: number;
  following: number;
  pulseScore: number;
  energy: number;
  verified: boolean;
  live: boolean;
  currentVibe: string;
  avatarMediaId?: string;
  platformBackgroundId?: string;
  zipCode?: string;
  state?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
};

export const DEFAULT_USER: UserProfile = {
  username: "newuser",
  name: "New User",
  city: DEFAULT_CITY_LABEL,
  identity: "personal",
  followers: 0,
  following: 0,
  pulseScore: 50,
  energy: 50,
  verified: false,
  live: false,
  currentVibe: "Exploring the city",
};

export function saveUserIdentity(identity: IdentityType) {
  if (typeof window === "undefined") return;
  localStorage.setItem(IDENTITY_KEY, identity);
}

export function getUserIdentity(): IdentityType {
  if (typeof window === "undefined") return "personal";
  return (localStorage.getItem(IDENTITY_KEY) as IdentityType) ?? "personal";
}

function emitProfileUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROFILE_UPDATE_EVENT));
  }
}

export function saveUserProfile(profile: Partial<UserProfile>) {
  if (typeof window === "undefined") return;
  const current = getUserProfile();
  localStorage.setItem(USER_KEY, JSON.stringify({ ...current, ...profile }));
  emitProfileUpdate();
}

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    const identity = getUserIdentity();
    if (!raw) return { ...DEFAULT_USER, identity };
    return { ...DEFAULT_USER, ...JSON.parse(raw), identity };
  } catch {
    return { ...DEFAULT_USER, identity: getUserIdentity() };
  }
}

export async function loadUserProfile(): Promise<UserProfile> {
  if (typeof window === "undefined") return DEFAULT_USER;

  const { loadAuthenticatedProfile, isSupabaseConfigured } = await import("@/lib/supabase/auth");

  if (isSupabaseConfigured()) {
    const remote = await loadAuthenticatedProfile();
    if (remote) return remote;
  }

  return getUserProfile();
}
