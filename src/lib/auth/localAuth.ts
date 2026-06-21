import { getUserProfile, saveUserProfile } from "@/lib/identity/userProfile";

const LOCAL_AUTH_KEY = "popit:credentials";

export type LoginMethod = "email" | "username" | "phone";

export type LocalCredentials = {
  email: string;
  username: string;
  phone?: string;
  password: string;
};

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (value.trim().startsWith("+")) return `+${digits}`;
  return digits.length > 0 ? `+${digits}` : "";
}

export function saveLocalCredentials(credentials: LocalCredentials) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(credentials));
}

export function getLocalCredentials(): LocalCredentials | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalCredentials;
  } catch {
    return null;
  }
}

function matchesIdentifier(
  method: LoginMethod,
  identifier: string,
  credentials: LocalCredentials
): boolean {
  const trimmed = identifier.trim();
  if (method === "email") {
    return credentials.email.toLowerCase() === trimmed.toLowerCase();
  }
  if (method === "username") {
    return credentials.username.toLowerCase() === trimmed.toLowerCase();
  }
  return normalizePhone(trimmed) === normalizePhone(credentials.phone ?? "");
}

export function tryLocalSignIn(
  method: LoginMethod,
  identifier: string,
  password: string
): boolean {
  const credentials = getLocalCredentials();
  if (!credentials) return false;
  if (credentials.password !== password) return false;
  if (!matchesIdentifier(method, identifier, credentials)) return false;

  const profile = getUserProfile();
  saveUserProfile({
    ...profile,
    username: credentials.username,
    name: credentials.username,
  });
  return true;
}
