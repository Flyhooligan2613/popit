import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL_MS, type AdminSessionPayload } from "./constants";
import { readAdminSessionFromCookie } from "./session";

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return readAdminSessionFromCookie(token);
}

export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getAdminSessionFromRequest(
  request: NextRequest
): Promise<AdminSessionPayload | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return readAdminSessionFromCookie(token);
}

export function adminSessionMaxAgeSeconds() {
  return Math.floor(ADMIN_SESSION_TTL_MS / 1000);
}
