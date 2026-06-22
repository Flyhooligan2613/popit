"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  PERMISSIONS_UPDATED_EVENT,
  disablePlatformPermission,
  getAllStoredPermissions,
  getStoredPermissionStatus,
  isPermissionGranted,
  permissionStatusLabel,
  requestPlatformPermission,
  skipPhotosSharing,
  syncPermissionsFromBrowser,
  togglePlatformPermission,
  type PlatformPermissionId,
  type PlatformPermissionStatus,
  type StoredPermissions,
} from "@/lib/permissions/platformPermissions";

export type PermissionCardConfig = {
  id: PlatformPermissionId;
  label: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  glow: string;
  photos?: boolean;
};

type PermissionSettingsPanelProps = {
  permissions: PermissionCardConfig[];
  variant?: "onboarding" | "settings";
  disabled?: boolean;
};

export default function PermissionSettingsPanel({
  permissions,
  variant = "settings",
  disabled = false,
}: PermissionSettingsPanelProps) {
  const [statuses, setStatuses] = useState<StoredPermissions>({});
  const [activeId, setActiveId] = useState<PlatformPermissionId | null>(null);

  const refresh = useCallback(async () => {
    await syncPermissionsFromBrowser();
    setStatuses(getAllStoredPermissions());
  }, []);

  useEffect(() => {
    void refresh();
    window.addEventListener(PERMISSIONS_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(PERMISSIONS_UPDATED_EVENT, refresh);
  }, [refresh]);

  const applyStatus = (id: PlatformPermissionId, status: PlatformPermissionStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleToggle = async (id: PlatformPermissionId) => {
    if (disabled) return;
    setActiveId(id);
    try {
      const current = statuses[id] ?? getStoredPermissionStatus(id);
      const granted = isPermissionGranted(current);
      const next = await togglePlatformPermission(id, granted);
      applyStatus(id, next);
      if (id === "camera") {
        const mic = getStoredPermissionStatus("microphone");
        if (mic) applyStatus("microphone", mic);
      }
    } finally {
      setActiveId(null);
    }
  };

  const handlePhotosAllow = async () => {
    if (disabled) return;
    setActiveId("photos");
    try {
      const status = await requestPlatformPermission("photos");
      applyStatus("photos", status);
    } finally {
      setActiveId(null);
    }
  };

  const handlePhotosSkip = () => {
    if (disabled) return;
    skipPhotosSharing();
    applyStatus("photos", "deferred");
  };

  const motionProps =
    variant === "onboarding"
      ? {
          initial: { opacity: 0, y: 16 } as const,
          animate: { opacity: 1, y: 0 } as const,
        }
      : {};

  return (
    <div className={`permission-panel permission-panel--${variant}`}>
      {permissions.map(({ id, label, title, description, Icon, accent, glow, photos }, i) => {
        const status = statuses[id];
        const enabled = isPermissionGranted(status);
        const loading = activeId === id;
        const isPhotos = id === "photos" || photos;

        return (
          <motion.div
            key={id}
            {...motionProps}
            transition={variant === "onboarding" ? { delay: 0.1 + i * 0.08, duration: 0.5 } : undefined}
            className={`permission-card ${enabled ? "is-on" : ""}`}
          >
            <div className={`permission-card__inner bg-gradient-to-br ${accent}`}>
              <div className="permission-card__body">
                <div className="permission-card__icon" style={{ boxShadow: `0 0 24px ${glow}` }}>
                  <Icon size={20} strokeWidth={1.7} className="text-white/80" />
                </div>
                <div className="permission-card__copy">
                  <div className="permission-card__head">
                    <p className="permission-card__label">{label}</p>
                    {!isPhotos && (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`${label} ${enabled ? "on" : "off"}`}
                        disabled={disabled || loading}
                        className={`permission-toggle ${enabled ? "is-on" : ""}`}
                        onClick={() => void handleToggle(id)}
                      >
                        <span className="permission-toggle__knob" />
                      </button>
                    )}
                  </div>
                  <h3 className="permission-card__title">{title}</h3>
                  <p className="permission-card__desc">{description}</p>
                  <p className="permission-card__status">
                    {loading ? "Updating…" : permissionStatusLabel(status)}
                    {status === "denied" && " — check browser site settings to re-enable"}
                  </p>

                  {isPhotos && (
                    <div className="permission-card__photos-actions">
                      <button
                        type="button"
                        className={`permission-card__choice ${enabled ? "is-active" : ""}`}
                        disabled={disabled || loading}
                        onClick={() => void handlePhotosAllow()}
                      >
                        Share from gallery
                      </button>
                      <button
                        type="button"
                        className={`permission-card__choice ${!enabled ? "is-active" : ""}`}
                        disabled={disabled || loading}
                        onClick={handlePhotosSkip}
                      >
                        Don&apos;t share photos
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function disableAllPlatformPermissions() {
  (["location", "camera", "microphone", "photos", "notifications"] as PlatformPermissionId[]).forEach(
    (id) => disablePlatformPermission(id)
  );
}
