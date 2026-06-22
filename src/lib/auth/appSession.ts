import { getLocalCredentials } from "@/lib/auth/localAuth";
import { getUserProfile, saveUserProfile } from "@/lib/identity/userProfile";

export const AUTH_SESSION_KEY = "popit:authSession";

export type AuthSessionSource = "local" | "supabase";

export type AppAuthSession = {
  email: string;
  username: string;
  phone?: string;
  source: AuthSessionSource;
  loggedInAt: number;
};

export function establishAuthSession(input: {
  email: string;
  username: string;
  phone?: string;
  source: AuthSessionSource;
}): void {
  if (typeof window === "undefined") return;

  const session: AppAuthSession = {
    ...input,
    loggedInAt: Date.now(),
  };

  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));

  const profile = getUserProfile();
  saveUserProfile({
    ...profile,
    username: input.username,
    name: profile.name || input.username,
  });
}

export function establishAuthSessionFromCredentials(source: AuthSessionSource = "local"): boolean {
  const credentials = getLocalCredentials();
  if (!credentials) return false;

  establishAuthSession({
    email: credentials.email,
    username: credentials.username,
    phone: credentials.phone,
    source,
  });
  return true;
}

export function getAuthSession(): AppAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppAuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_SESSION_KEY);
}

/** User has saved credentials and an active session flag (or finished onboarding). */
export function hasActiveAuthSession(): boolean {
  if (typeof window === "undefined") return false;
  if (getAuthSession()) return true;
  return getLocalCredentials() != null;
}

export function syncAuthSessionFromCredentials(): void {
  if (getAuthSession()) return;
  establishAuthSessionFromCredentials("local");
}
