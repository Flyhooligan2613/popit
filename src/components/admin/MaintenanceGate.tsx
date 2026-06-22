"use client";

import { usePathname } from "next/navigation";
import { usePlatformConfig } from "@/components/admin/PlatformBanner";

type MaintenanceGateProps = {
  children: React.ReactNode;
};

const ADMIN_PATH_SEGMENTS = new Set(["login", "dashboard", "platform", "moderation", "security", "setup"]);

export default function MaintenanceGate({ children }: MaintenanceGateProps) {
  const pathname = usePathname();
  const { config, loaded } = usePlatformConfig();

  const parts = pathname.split("/").filter(Boolean);
  const isConsole = parts.some((part) => ADMIN_PATH_SEGMENTS.has(part));

  if (!loaded) return <>{children}</>;

  if (config.maintenanceMode && !isConsole) {
    return (
      <div className="platform-maintenance-screen">
        <div className="platform-maintenance-screen__inner">
          <p className="platform-maintenance-screen__eyebrow">POP&apos;IT</p>
          <h1>We&apos;ll be back soon</h1>
          <p>{config.maintenanceMessage}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
