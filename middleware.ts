import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin/auth";
import { getAdminConsoleSlug } from "@/lib/admin/constants";

const ADMIN_INTERNAL_PREFIX = "/console";

function isAdminPublicPath(pathname: string, slug: string): boolean {
  const prefixes = [`/${slug}/login`, `${ADMIN_INTERNAL_PREFIX}/login`, `/${slug}/setup`, `${ADMIN_INTERNAL_PREFIX}/setup`];
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isAdminProtectedPath(pathname: string, slug: string): boolean {
  return pathname.startsWith(`/${slug}`) || pathname.startsWith(ADMIN_INTERNAL_PREFIX);
}

function isAdminApiPublic(pathname: string): boolean {
  return pathname === "/api/admin/login" || pathname === "/api/admin/setup" || pathname === "/api/platform/config";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = getAdminConsoleSlug();

  if (isAdminProtectedPath(pathname, slug) && !isAdminPublicPath(pathname, slug)) {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      const loginPath = slug === "console" ? "/console/login" : `/${slug}/login`;
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/api/admin") && !isAdminApiPublic(pathname)) {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let response: NextResponse;

  if (slug !== "console" && pathname.startsWith(`/${slug}`)) {
    const rewritten = pathname.replace(`/${slug}`, ADMIN_INTERNAL_PREFIX);
    response = NextResponse.rewrite(new URL(rewritten + request.nextUrl.search, request.url));
  } else {
    response = NextResponse.next({ request });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
