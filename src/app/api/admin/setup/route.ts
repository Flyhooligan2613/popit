import { NextResponse } from "next/server";
import { getConfiguredAdminCredentials, isAdminSetupKeyValid } from "@/lib/admin/credentials";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const configured = getConfiguredAdminCredentials();

  return NextResponse.json({
    credentialsConfigured: Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD),
    devFallback: process.env.NODE_ENV === "development" && !process.env.ADMIN_USERNAME,
    setupKeyValid: isAdminSetupKeyValid(key),
    sessionSecretConfigured: Boolean(
      process.env.ADMIN_SESSION_SECRET ||
        (process.env.NODE_ENV === "development" && !process.env.ADMIN_SESSION_SECRET)
    ),
    consoleSlug: process.env.ADMIN_CONSOLE_SLUG?.trim() || "console",
    configuredUsername: configured?.username ?? null,
  });
}
