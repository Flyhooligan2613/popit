export const ADMIN_SESSION_COOKIE = "popit_admin_session";
export const PLATFORM_CONFIG_COOKIE = "popit_platform_config";

/** Secret URL segment — set ADMIN_CONSOLE_SLUG in production (e.g. popit-ops-x7k2). */
export function getAdminConsoleSlug(): string {
  return process.env.ADMIN_CONSOLE_SLUG?.trim() || "console";
}

export function getAdminConsolePath(suffix = ""): string {
  const slug = getAdminConsoleSlug();
  const base = `/${slug}`;
  return suffix ? `${base}${suffix.startsWith("/") ? suffix : `/${suffix}`}` : base;
}

/** Client-side base path derived from current URL (supports custom ADMIN_CONSOLE_SLUG rewrites). */
export function getClientAdminBase(pathname: string): string {
  if (pathname.startsWith("/console")) return "/console";
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ? `/${segment}` : "/console";
}

export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export type AdminSessionPayload = {
  sub: string;
  role: "superadmin";
  iat: number;
  exp: number;
};
