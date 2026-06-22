import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSessionMaxAgeSeconds, getAdminSession } from "@/lib/admin/auth";
import { verifyAdminCredentials } from "@/lib/admin/credentials";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { adminSessionCookieOptions, createAdminSessionToken } from "@/lib/admin/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const check = verifyAdminCredentials(username, password);
    if (!check.ok || !check.username) {
      return NextResponse.json({ error: check.reason ?? "Invalid credentials." }, { status: 401 });
    }

    const token = await createAdminSessionToken(check.username);
    if (!token) {
      return NextResponse.json(
        { error: "Admin session secret is not configured. Set ADMIN_SESSION_SECRET." },
        { status: 503 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, adminSessionCookieOptions(adminSessionMaxAgeSeconds()));

    return NextResponse.json({
      ok: true,
      username: check.username,
      expiresIn: adminSessionMaxAgeSeconds(),
    });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: session.sub,
    expiresAt: session.exp,
  });
}
