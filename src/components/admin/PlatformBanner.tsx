"use client";

import { useEffect, useState } from "react";
import type { PlatformConfig } from "@/lib/admin/platformConfig";
import { DEFAULT_PLATFORM_CONFIG } from "@/lib/admin/platformConfig";

export default function PlatformBanner() {
  const [config, setConfig] = useState<PlatformConfig>(DEFAULT_PLATFORM_CONFIG);

  useEffect(() => {
    void fetch("/api/platform/config")
      .then((r) => r.json())
      .then((data) => setConfig({ ...DEFAULT_PLATFORM_CONFIG, ...data }))
      .catch(() => undefined);
  }, []);

  if (config.maintenanceMode) {
    return (
      <div className="platform-banner platform-banner--maintenance" role="alert">
        <p>{config.maintenanceMessage}</p>
      </div>
    );
  }

  if (!config.announcementBanner) return null;

  return (
    <div className={`platform-banner platform-banner--${config.announcementBannerType}`} role="status">
      <p>{config.announcementBanner}</p>
    </div>
  );
}

export function usePlatformConfig() {
  const [config, setConfig] = useState<PlatformConfig>(DEFAULT_PLATFORM_CONFIG);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void fetch("/api/platform/config")
      .then((r) => r.json())
      .then((data) => {
        setConfig({ ...DEFAULT_PLATFORM_CONFIG, ...data });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return { config, loaded };
}
