import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_MS,
  type AdminSessionPayload,
} from "./constants";

const encoder = new TextEncoder();

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeString(value: string): string {
  return base64UrlEncodeBytes(encoder.encode(value));
}

function base64UrlDecodeToString(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export function getAdminSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "development") {
    return "popit-dev-admin-session-secret-change-in-production";
  }
  return null;
}

export async function createAdminSessionToken(username: string): Promise<string | null> {
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const now = Date.now();
  const payload: AdminSessionPayload = {
    sub: username,
    role: "superadmin",
    iat: now,
    exp: now + ADMIN_SESSION_TTL_MS,
  };

  const body = base64UrlEncodeString(JSON.stringify(payload));
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(
  token: string | null | undefined
): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  try {
    const key = await importHmacKey(secret);
    const sigBytes = Uint8Array.from(
      atob(sig.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (sig.length % 4)) % 4)),
      (c) => c.charCodeAt(0)
    );
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(body));
    if (!valid) return null;

    const payload = JSON.parse(base64UrlDecodeToString(body)) as AdminSessionPayload;
    if (!payload.sub || payload.role !== "superadmin") return null;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function readAdminSessionFromCookie(
  cookieValue: string | null | undefined
): Promise<AdminSessionPayload | null> {
  return verifyAdminSessionToken(cookieValue);
}

export function adminSessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export { ADMIN_SESSION_COOKIE };
