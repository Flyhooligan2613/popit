"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Camera, ImageIcon, Mic, Bell } from "lucide-react";
import BackNavButton from "@/components/nav/BackNavButton";
import PermissionSettingsPanel, {
  type PermissionCardConfig,
} from "@/components/settings/PermissionSettingsPanel";
import {
  markLocationPromptSeen,
  requestAllPlatformPermissions,
  skipLocationPermissionFallback,
} from "@/lib/permissions/platformPermissions";

const PERMISSIONS: PermissionCardConfig[] = [
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
    description: "Choose whether uploads come from your gallery.",
    Icon: ImageIcon,
    accent: "from-[#00D4FF]/20 to-[#0099FF]/10",
    glow: "rgba(0,212,255,0.22)",
    photos: true,
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

export default function Frame9({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const [busy, setBusy] = useState(false);

  const handleAllowAll = async () => {
    setBusy(true);
    try {
      await requestAllPlatformPermissions();
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

      <div className="relative z-[1] mx-auto max-w-[520px] px-5 pb-[calc(11rem+env(safe-area-inset-bottom,0px))] pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#FF4D6D]">
            Step 4 of 4
          </p>
          <h2 className="mb-3 font-sans text-[clamp(1.8rem,5vw,2.4rem)] font-extrabold tracking-tight text-white">
            Make POP&apos;IT Yours
          </h2>
          <p className="font-sans text-[0.95rem] text-white/40">
            Toggle each permission on or off — change anytime in Settings.
          </p>
        </motion.div>

        <PermissionSettingsPanel permissions={PERMISSIONS} variant="onboarding" disabled={busy} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-3 bg-gradient-to-t from-[#050505] via-[#050505]/98 to-transparent px-6 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-4">
        <div className="w-full max-w-[320px]">
          <motion.button
            onClick={() => void handleAllowAll()}
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
