import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PLATFORM_CONFIG_COOKIE } from "@/lib/admin/constants";
import { parsePlatformConfig } from "@/lib/admin/platformConfig";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PLATFORM_CONFIG_COOKIE)?.value;
  const config = parsePlatformConfig(raw);

  return NextResponse.json({
    maintenanceMode: config.maintenanceMode,
    maintenanceMessage: config.maintenanceMessage,
    signupsEnabled: config.signupsEnabled,
    liveStreamingEnabled: config.liveStreamingEnabled,
    commentsEnabled: config.commentsEnabled,
    monetizationEnabled: config.monetizationEnabled,
    reelsEnabled: config.reelsEnabled,
    exploreEnabled: config.exploreEnabled,
    mapEnabled: config.mapEnabled,
    announcementBanner: config.announcementBanner,
    announcementBannerType: config.announcementBannerType,
    updatedAt: config.updatedAt,
  });
}
