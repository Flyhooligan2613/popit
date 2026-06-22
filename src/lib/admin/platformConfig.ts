export type PlatformConfig = {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  signupsEnabled: boolean;
  liveStreamingEnabled: boolean;
  commentsEnabled: boolean;
  monetizationEnabled: boolean;
  reelsEnabled: boolean;
  exploreEnabled: boolean;
  mapEnabled: boolean;
  announcementBanner: string | null;
  announcementBannerType: "info" | "warning" | "critical";
  updatedAt: number;
  updatedBy: string | null;
};

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  maintenanceMode: false,
  maintenanceMessage: "POP'IT is undergoing scheduled maintenance. We'll be back shortly.",
  signupsEnabled: true,
  liveStreamingEnabled: true,
  commentsEnabled: true,
  monetizationEnabled: true,
  reelsEnabled: true,
  exploreEnabled: true,
  mapEnabled: true,
  announcementBanner: null,
  announcementBannerType: "info",
  updatedAt: 0,
  updatedBy: null,
};

export function mergePlatformConfig(partial: Partial<PlatformConfig> | null | undefined): PlatformConfig {
  return {
    ...DEFAULT_PLATFORM_CONFIG,
    ...partial,
  };
}

export function parsePlatformConfig(raw: string | null | undefined): PlatformConfig {
  if (!raw) return DEFAULT_PLATFORM_CONFIG;
  try {
    const parsed = JSON.parse(raw) as Partial<PlatformConfig>;
    return mergePlatformConfig(parsed);
  } catch {
    return DEFAULT_PLATFORM_CONFIG;
  }
}
