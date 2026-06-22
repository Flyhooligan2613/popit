import { createClient, isSupabaseConfigured } from "./client";
import type { IdentityType } from "@/lib/identity/types";
import type { UserProfile } from "@/lib/identity/userProfile";
import { saveUserProfile, saveUserIdentity } from "@/lib/identity/userProfile";
import { formatAuthError, isNetworkAuthError } from "@/lib/auth/formatAuthError";
import {
  normalizePhone,
  saveLocalCredentials,
  tryLocalSignIn,
  type LoginMethod,
} from "@/lib/auth/localAuth";

type DbProfile = {
  username: string;
  name: string;
  city: string | null;
  identity: string;
  email?: string | null;
  phone?: string | null;
  identity_topic?: string | null;
  identity_topic_label?: string | null;
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
    identityTopic: row.identity_topic ?? undefined,
    identityTopicLabel: row.identity_topic_label ?? undefined,
    followers: row.followers ?? 0,
    following: row.following ?? 0,
    pulseScore: row.pulse_score ?? 50,
    energy: row.energy ?? 50,
    verified: row.verified ?? false,
    live: row.live ?? false,
    currentVibe: row.current_vibe ?? "Exploring the city",
  };
}

async function lookupEmailByUsername(username: string): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .ilike("username", username.trim())
    .maybeSingle();

  if (error || !data?.email) return null;
  return data.email;
}

async function persistSessionProfile(userId: string) {
  const profile = await fetchProfileForUser(userId);
  if (profile) {
    saveUserIdentity(profile.identity);
    saveUserProfile(profile);
  }
  return profile;
}

export async function signUpWithEmail({
  email,
  password,
  username,
  identity,
  identityTopic,
  identityTopicLabel,
  phone,
}: {
  email: string;
  password: string;
  username: string;
  identity: IdentityType;
  identityTopic?: string;
  identityTopicLabel?: string;
  phone?: string;
}) {
  const normalizedPhone = phone ? normalizePhone(phone) : undefined;

  saveLocalCredentials({
    email: email.trim(),
    username: username.trim(),
    phone: normalizedPhone,
    password,
  });

  saveUserIdentity(identity);
  saveUserProfile({
    username,
    name: username,
    identity,
    identityTopic,
    identityTopicLabel,
  });

  const supabase = createClient();
  if (!supabase) return { session: null, user: null, needsEmailConfirmation: false };

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username,
          name: username,
          identity,
          identity_topic: identityTopic,
          identity_topic_label: identityTopicLabel,
          phone: normalizedPhone,
        },
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/onboarding?skipIntro=1&explore=1` : undefined,
      },
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (userId && data.session) {
      const profilePayload = {
        id: userId,
        identity,
        username,
        name: username,
        email: email.trim(),
        phone: normalizedPhone ?? null,
        identity_topic: identityTopic ?? null,
        identity_topic_label: identityTopicLabel ?? null,
      };

      const { error: profileError } = await supabase.from("profiles").upsert(profilePayload);
      if (profileError) {
        console.warn("[auth] profile upsert failed:", profileError.message);
      }

      await persistSessionProfile(userId);
    }

    return {
      session: data.session,
      user: data.user,
      needsEmailConfirmation: Boolean(data.user && !data.session),
    };
  } catch (err) {
    if (isNetworkAuthError(err)) {
      return { session: null, user: null, needsEmailConfirmation: false };
    }
    throw formatAuthError(err);
  }
}

export async function signInWithIdentifier({
  method,
  identifier,
  password,
}: {
  method: LoginMethod;
  identifier: string;
  password: string;
}) {
  const trimmed = identifier.trim();
  if (!trimmed) {
    throw new Error(
      method === "email"
        ? "Enter your email."
        : method === "username"
          ? "Enter your username."
          : "Enter your phone number."
    );
  }

  const supabase = createClient();

  if (!supabase) {
    if (tryLocalSignIn(method, trimmed, password)) {
      return { source: "local" as const };
    }
    throw new Error("Sign in is unavailable. Create an account first.");
  }

  try {
    if (method === "email") {
      if (!trimmed.includes("@")) throw new Error("Enter a valid email.");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmed,
        password,
      });
      if (error) throw error;
      if (data.user) await persistSessionProfile(data.user.id);
      return { source: "supabase" as const, data };
    }

    if (method === "username") {
      const email = await lookupEmailByUsername(trimmed);
      if (!email) {
        if (tryLocalSignIn(method, trimmed, password)) {
          return { source: "local" as const };
        }
        throw new Error("No account found with that username.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) await persistSessionProfile(data.user.id);
      return { source: "supabase" as const, data };
    }

    const phone = normalizePhone(trimmed);
    if (phone.length < 11) throw new Error("Enter a valid phone number.");

    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    if (error) throw error;
    if (data.user) await persistSessionProfile(data.user.id);
    return { source: "supabase" as const, data };
  } catch (err) {
    if (tryLocalSignIn(method, trimmed, password)) {
      return { source: "local" as const };
    }
    throw formatAuthError(err);
  }
}

/** @deprecated Use signInWithIdentifier */
export async function signInWithEmail(email: string, password: string) {
  return signInWithIdentifier({ method: "email", identifier: email, password });
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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return persistSessionProfile(user.id);
}

export { isSupabaseConfigured };
