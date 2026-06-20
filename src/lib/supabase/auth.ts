import { createClient, isSupabaseConfigured } from "./client";
import type { IdentityType } from "@/lib/identity/types";
import type { UserProfile } from "@/lib/identity/userProfile";
import { saveUserProfile, saveUserIdentity } from "@/lib/identity/userProfile";

type DbProfile = {
  username: string;
  name: string;
  city: string | null;
  identity: string;
  followers: number | null;
  following: number | null;
  pulse_score: number | null;
  energy: number | null;
  verified: boolean | null;
  live: boolean | null;
  current_vibe: string | null;
};

export function dbProfileToUser(row: DbProfile): UserProfile {
  return {
    username: row.username,
    name: row.name,
    city: row.city ?? "Miami",
    identity: row.identity as IdentityType,
    followers: row.followers ?? 0,
    following: row.following ?? 0,
    pulseScore: row.pulse_score ?? 50,
    energy: row.energy ?? 50,
    verified: row.verified ?? false,
    live: row.live ?? false,
    currentVibe: row.current_vibe ?? "Exploring the city",
  };
}

export async function signUpWithEmail({
  email,
  password,
  username,
  identity,
}: {
  email: string;
  password: string;
  username: string;
  identity: IdentityType;
}) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, name: username },
      emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/pulse` : undefined,
    },
  });

  if (error) throw error;

  const userId = data.user?.id;
  if (userId && data.session) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ identity, username, name: username })
      .eq("id", userId);

    if (profileError) throw profileError;

    const profile = await fetchProfileForUser(userId);
    if (profile) {
      saveUserIdentity(identity);
      saveUserProfile(profile);
    }
  } else if (data.user) {
    saveUserIdentity(identity);
    saveUserProfile({ username, name: username, identity });
  }

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  if (data.user) {
    const profile = await fetchProfileForUser(data.user.id);
    if (profile) {
      saveUserIdentity(profile.identity);
      saveUserProfile(profile);
    }
  }

  return data;
}

export async function signOut() {
  const supabase = createClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function fetchProfileForUser(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error || !data) return null;

  return dbProfileToUser(data as DbProfile);
}

export async function loadAuthenticatedProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const profile = await fetchProfileForUser(user.id);
  if (profile) {
    saveUserIdentity(profile.identity);
    saveUserProfile(profile);
  }

  return profile;
}

export { isSupabaseConfigured };
