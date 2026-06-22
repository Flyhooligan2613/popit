import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdminSession } from "@/lib/admin/auth";
import { PLATFORM_CONFIG_COOKIE } from "@/lib/admin/constants";
import { mergePlatformConfig, parsePlatformConfig, type PlatformConfig } from "@/lib/admin/platformConfig";

export async function GET() {
  try {
    await requireAdminSession();
    const cookieStore = await cookies();
    const raw = cookieStore.get(PLATFORM_CONFIG_COOKIE)?.value;
    return NextResponse.json(parsePlatformConfig(raw));
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminSession();
    const body = (await request.json()) as Partial<PlatformConfig>;

    const cookieStore = await cookies();
    const current = parsePlatformConfig(cookieStore.get(PLATFORM_CONFIG_COOKIE)?.value);

    const next: PlatformConfig = mergePlatformConfig({
      ...current,
      ...body,
      updatedAt: Date.now(),
      updatedBy: session.sub,
    });

    cookieStore.set(PLATFORM_CONFIG_COOKIE, JSON.stringify(next), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.json(next);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
