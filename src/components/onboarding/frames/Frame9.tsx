"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MapPin, Camera, ImageIcon, Mic, Bell, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BackNavButton from "@/components/nav/BackNavButton";
import {
  getStoredPermissionStatus,
  markLocationPromptSeen,
  requestAllPlatformPermissions,
  requestPlatformPermission,
  skipLocationPermissionFallback,
  type PlatformPermissionId,
  type PlatformPermissionStatus,
  type StoredPermissions,
} from "@/lib/permissions/platformPermissions";

const PERMISSIONS: {
  id: PlatformPermissionId;
  label: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  glow: string;
}[] = [
  {
    id: "location",
    label: "Location",
    title: "Never miss what's happening nearby.",
    description: "Find events, creators and communities around you.",
    Icon: MapPin,
    accent: "from-[#FF4D6D]/20 to-[#FF7A00]/10",
    glow: "rgba(255,77,109,0.25)",
  },
  {
    id: "camera",
    label: "Camera",
    title: "Capture moments instantly.",
    description: "Post photos and videos without missing the moment.",
    Icon: Camera,
    accent: "from-[#A855F7]/20 to-[#7C3AED]/10",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    id: "photos",
    label: "Photos",
    title: "Share your memories.",
    description: "Upload your favorite moments directly from your gallery.",
    Icon: ImageIcon,
    accent: "from-[#00D4FF]/20 to-[#0099FF]/10",
    glow: "rgba(0,212,255,0.22)",
  },
  {
    id: "microphone",
    label: "Microphone",
    title: "Go Live.",
    description: "Create videos, livestreams and voice content.",
    Icon: Mic,
    accent: "from-[#FF7A00]/20 to-[#FF4D6D]/10",
    glow: "rgba(255,122,0,0.22)",
  },
  {
    id: "notifications",
    label: "Notifications",
    title: "Stay in the loop.",
    description: "Know what's popping before everyone else.",
    Icon: Bell,
    accent: "from-[#A855F7]/20 to-[#00D4FF]/10",
    glow: "rgba(168,85,247,0.22)",
  },
];

function statusLabel(status: PlatformPermissionStatus | null | undefined): string {
  if (status === "granted") return "Enabled";
  if (status === "denied") return "Denied";
  if (status === "deferred") return "Optional";
  if (status === "unsupported") return "N/A";
  return "Enable";
}

function isEnabled(status: PlatformPermissionStatus | null | undefined): boolean {
  return status === "granted";
}

export default function Frame9({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const [busy, setBusy] = useState(false);
  const [activeId, setActiveId] = useState<PlatformPermissionId | null>(null);
  const [statuses, setStatuses] = useState<StoredPermissions>({});

  useEffect(() => {
    const initial: StoredPermissions = {};
    for (const { id } of PERMISSIONS) {
      const stored = getStoredPermissionStatus(id);
      if (stored) initial[id] = stored;
    }
    setStatuses(initial);
  }, []);

  const applyStatus = useCallback((id: PlatformPermissionId, status: PlatformPermissionStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }, []);

  const requestOne = async (id: PlatformPermissionId) => {
    setActiveId(id);
    try {
      const status = await requestPlatformPermission(id);
      applyStatus(id, status);
      if (id === "camera") {
        const mic = getStoredPermissionStatus("microphone");
        if (mic) applyStatus("microphone", mic);
      }
    } finally {
      setActiveId(null);
    }
  };

  const handleAllowAll = async () => {
    setBusy(true);
    try {
      const result = await requestAllPlatformPermissions();
      setStatuses((prev) => ({ ...prev, ...result }));
      onNext();
    } finally {
      setBusy(false);
    }
  };

  const handleSkip = () => {
    markLocationPromptSeen();
    skipLocationPermissionFallback();
    onNext();
  };

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#050505]">
      {onBack && (
        <div
          className="fixed z-20"
          style={{
            top: "max(0.75rem, env(safe-area-inset-top, 0px))",
            left: "max(1rem, env(safe-area-inset-left, 0px))",
          }}
        >
          <BackNavButton onClick={onBack} />
        </div>
      )}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[520px] px-5 pb-[220px] pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#FF4D6D]">
            Step 4 of 4
          </p>
          <h2 className="mb-3 font-sans text-[clamp(1.8rem,5vw,2.4rem)] font-extrabold tracking-tight text-white">
            Make POP&apos;IT Yours
          </h2>
          <p className="font-sans text-[0.95rem] text-white/40">
            Enable camera, mic, location &amp; alerts — you stay in control.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {PERMISSIONS.map(({ id, label, title, description, Icon, accent, glow }, i) => {
            const status = statuses[id];
            const enabled = isEnabled(status);
            const loading = activeId === id;

            return (
              <motion.button
                key={id}
                type="button"
                disabled={busy || loading}
                onClick={() => requestOne(id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-gradient-to-br ${accent} p-[1px] text-left disabled:opacity-80`}
              >
                <div className="relative rounded-[21px] bg-[#0A0A0A]/90 px-5 py-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
                      style={{ boxShadow: `0 0 24px ${glow}` }}
                    >
                      <Icon size={20} strokeWidth={1.7} className="text-white/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/35">
                          {label}
                        </p>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-wide ${
                            enabled
                              ? "bg-[#FF4D6D]/20 text-[#FF8FA3]"
                              : "bg-white/[0.06] text-white/40"
                          }`}
                        >
                          {enabled && <Check size={12} strokeWidth={2.5} />}
                          {loading ? "…" : statusLabel(status)}
                        </span>
                      </div>
                      <h3 className="mb-1.5 font-sans text-[1.02rem] font-bold leading-snug text-white">
                        {title}
                      </h3>
                      <p className="font-sans text-[0.88rem] leading-relaxed text-white/45">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-3 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent px-6 pb-9 pt-6">
        <div className="w-full max-w-[320px]">
          <motion.button
            onClick={handleAllowAll}
            disabled={busy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer rounded-full border-none px-4 py-[17px] font-sans text-base font-bold text-white disabled:opacity-70"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 0 32px rgba(255,77,109,0.35)",
            }}
          >
            {busy ? "Requesting permissions…" : "Enable All & Continue"}
          </motion.button>
        </div>
        <button
          onClick={handleSkip}
          disabled={busy}
          className="w-full max-w-[320px] cursor-pointer border-none bg-transparent px-2 py-2 font-sans text-[0.875rem] text-white/30 disabled:opacity-50"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
