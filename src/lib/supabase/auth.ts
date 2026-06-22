import { createClient, isSupabaseConfigured } from "./client";
import type { IdentityType } from "@/lib/identity/types";
import type { UserProfile } from "@/lib/identity/userProfile";
import { saveUserProfile, saveUserIdentity } from "@/lib/identity/userProfile";
import { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "@/lib/location/constants";
import { formatAuthError, isNetworkAuthError } from "@/lib/auth/formatAuthError";
import {
  normalizePhone,
  saveLocalCredentials,
  tryLocalSignIn,
  type LoginMethod,
} from "@/lib/auth/localAuth";
import {
  establishAuthSession,
  establishAuthSessionFromCredentials,
} from "@/lib/auth/appSession";

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

export type SignUpResult = {
  session: unknown;
  user: unknown;
  needsEmailConfirmation: boolean;
  emailSent: boolean;
  source: "supabase" | "local";
};

export function dbProfileToUser(row: DbProfile): UserProfile {
  return {
    username: row.username,
    name: row.name,
    city: row.city && row.city !== LEGACY_DEFAULT_CITY ? row.city : DEFAULT_CITY_LABEL,
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

async function upsertRemoteProfile(
  userId: string,
  payload: {
    identity: IdentityType;
    username: string;
    email: string;
    phone?: string;
    identityTopic?: string;
    identityTopicLabel?: string;
  }
) {
  const supabase = createClient();
  if (!supabase) return;

  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    identity: payload.identity,
    username: payload.username,
    name: payload.username,
    email: payload.email,
    phone: payload.phone ?? null,
    identity_topic: payload.identityTopic ?? null,
    identity_topic_label: payload.identityTopicLabel ?? null,
  });

  if (error) {
    console.warn("[auth] profile upsert failed:", error.message);
  }
}

export async function resendSignupConfirmationEmail(email: string): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/onboarding?skipIntro=1&explore=1`
            : undefined,
      },
    });
    return !error;
  } catch {
    return false;
  }
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
}): Promise<SignUpResult> {
  const normalizedEmail = email.trim();
  const normalizedUsername = username.trim();
  const normalizedPhone = phone ? normalizePhone(phone) : undefined;

  saveLocalCredentials({
    email: normalizedEmail,
    username: normalizedUsername,
    phone: normalizedPhone,
    password,
  });

  saveUserIdentity(identity);
  saveUserProfile({
    username: normalizedUsername,
    name: normalizedUsername,
    identity,
    identityTopic,
    identityTopicLabel,
  });

  establishAuthSession({
    email: normalizedEmail,
    username: normalizedUsername,
    phone: normalizedPhone,
    source: "local",
  });

  const supabase = createClient();
  if (!supabase) {
    return {
      session: null,
      user: null,
      needsEmailConfirmation: false,
      emailSent: false,
      source: "local",
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          username: normalizedUsername,
          name: normalizedUsername,
          identity,
          identity_topic: identityTopic,
          identity_topic_label: identityTopicLabel,
          phone: normalizedPhone,
        },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/onboarding?skipIntro=1&explore=1`
            : undefined,
      },
    });

    if (error) throw error;

    const userId = data.user?.id;
    const needsEmailConfirmation = Boolean(data.user && !data.session);

    if (userId) {
      await upsertRemoteProfile(userId, {
        identity,
        username: normalizedUsername,
        email: normalizedEmail,
        phone: normalizedPhone,
        identityTopic,
        identityTopicLabel,
      });

      if (data.session) {
        await persistSessionProfile(userId);
        establishAuthSession({
          email: normalizedEmail,
          username: normalizedUsername,
          phone: normalizedPhone,
          source: "supabase",
        });
      }
    }

    let emailSent = false;
    if (needsEmailConfirmation) {
      // Supabase sends the first confirmation email on signUp when confirm email is enabled.
      emailSent = true;
    }

    return {
      session: data.session,
      user: data.user,
      needsEmailConfirmation,
      emailSent,
      source: data.session ? "supabase" : "local",
    };
  } catch (err) {
    if (isNetworkAuthError(err)) {
      return {
        session: null,
        user: null,
        needsEmailConfirmation: false,
        emailSent: false,
        source: "local",
      };
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
      establishAuthSessionFromCredentials("local");
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
      if (data.user) {
        await persistSessionProfile(data.user.id);
        establishAuthSession({
          email: data.user.email ?? trimmed,
          username:
            (data.user.user_metadata?.username as string | undefined) ??
            trimmed.split("@")[0],
          source: "supabase",
        });
      }
      return { source: "supabase" as const, data };
    }

    if (method === "username") {
      const email = await lookupEmailByUsername(trimmed);
      if (!email) {
        if (tryLocalSignIn(method, trimmed, password)) {
          establishAuthSessionFromCredentials("local");
          return { source: "local" as const };
        }
        throw new Error("No account found with that username.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        await persistSessionProfile(data.user.id);
        establishAuthSession({
          email,
          username: trimmed,
          source: "supabase",
        });
      }
      return { source: "supabase" as const, data };
    }

    const phone = normalizePhone(trimmed);
    if (phone.length < 11) throw new Error("Enter a valid phone number.");

    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    if (error) throw error;
    if (data.user) {
      await persistSessionProfile(data.user.id);
      establishAuthSession({
        email: data.user.email ?? "",
        username:
          (data.user.user_metadata?.username as string | undefined) ?? "user",
        phone,
        source: "supabase",
      });
    }
    return { source: "supabase" as const, data };
  } catch (err) {
    if (tryLocalSignIn(method, trimmed, password)) {
      establishAuthSessionFromCredentials("local");
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
  clearAuthSessionOnSignOut();
  const supabase = createClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

async function clearAuthSessionOnSignOut() {
  const { clearAuthSession } = await import("@/lib/auth/appSession");
  clearAuthSession();
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

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const remote = await persistSessionProfile(user.id);
      if (remote) return remote;
    }
  }

  const { getAuthSession } = await import("@/lib/auth/appSession");
  const { getUserProfile } = await import("@/lib/identity/userProfile");
  const { getLocalCredentials } = await import("@/lib/auth/localAuth");

  if (getAuthSession() || getLocalCredentials()) {
    return getUserProfile();
  }

  return null;
}

export { isSupabaseConfigured };
