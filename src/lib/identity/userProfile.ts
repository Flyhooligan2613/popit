import type { IdentityType } from "./types";

const IDENTITY_KEY = "popit:identity";
const USER_KEY = "popit:user";

export type UserProfile = {
  username: string;
  name: string;
  city: string;
  identity: IdentityType;
  followers: number;
  following: number;
  pulseScore: number;
  energy: number;
  verified: boolean;
  live: boolean;
  currentVibe: string;
};

export const DEFAULT_USER: UserProfile = {
  username: "flygoon",
  name: "Marcus",
  city: "Miami",
  identity: "personal",
  followers: 18420,
  following: 892,
  pulseScore: 94,
  energy: 87,
  verified: true,
  live: false,
  currentVibe: "The city is buzzing tonight",
};

export function saveUserIdentity(identity: IdentityType) {
  if (typeof window === "undefined") return;
  localStorage.setItem(IDENTITY_KEY, identity);
}

export function getUserIdentity(): IdentityType {
  if (typeof window === "undefined") return "personal";
  return (localStorage.getItem(IDENTITY_KEY) as IdentityType) ?? "personal";
}

export function saveUserProfile(profile: Partial<UserProfile>) {
  if (typeof window === "undefined") return;
  const current = getUserProfile();
  localStorage.setItem(USER_KEY, JSON.stringify({ ...current, ...profile }));
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
