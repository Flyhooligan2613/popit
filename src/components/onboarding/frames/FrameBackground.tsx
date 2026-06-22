"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BackNavButton from "@/components/nav/BackNavButton";
import BackgroundPicker from "@/components/onboarding/BackgroundPicker";
import {
  DEFAULT_PLATFORM_BACKGROUND_ID,
  savePlatformBackground,
} from "@/lib/identity/platformBackgrounds";
import { getPlatformBackgroundId } from "@/lib/identity/platformBackgrounds";
import { getUserIdentity, saveUserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";

export default function FrameBackground({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack?: () => void;
}) {
  const identity = getUserIdentity();
  const accent = getIdentityAccent(identity);
  const identityLabel = IDENTITY_OPTIONS.find((option) => option.id === identity)?.label ?? "Your";
  const [selected, setSelected] = useState<string | null>(() => {
    if (typeof window === "undefined") return DEFAULT_PLATFORM_BACKGROUND_ID;
    return getPlatformBackgroundId();
  });

  const proceed = () => {
    const id = selected ?? DEFAULT_PLATFORM_BACKGROUND_ID;
    savePlatformBackground(id);
    saveUserProfile({ platformBackgroundId: id });
    onNext();
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", overflowY: "auto" }}>
      {onBack && (
        <div
          style={{
            position: "fixed",
            top: "max(0.75rem, env(safe-area-inset-top, 0px))",
            left: "max(1rem, env(safe-area-inset-left, 0px))",
            zIndex: 20,
          }}
        >
          <BackNavButton onClick={onBack} />
        </div>
      )}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${accent} 18%, transparent) 0%, transparent 55%)`,
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "56px 20px 220px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          <p
            style={{
              color: accent,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Step 3 of 4 · {identityLabel}
          </p>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              margin: "0 0 12px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Choose Your Background
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.95rem",
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Flags, identity vibes, and city energy — profile background only. Tap a style for more options.
          </p>
        </motion.div>

        <BackgroundPicker selected={selected} onSelect={setSelected} accent={accent} identity={identity} />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: "linear-gradient(to top, #050505 60%, transparent)",
          padding: "20px 24px max(36px, env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ width: "100%", maxWidth: 320 }}>
          <motion.button
            onClick={proceed}
            disabled={!selected}
            animate={{ opacity: selected ? 1 : 0.35 }}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: 99,
              border: "none",
              background: `linear-gradient(90deg, ${accent}, #A855F7, #00D4FF)`,
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: selected ? "pointer" : "not-allowed",
              boxShadow: selected
                ? `0 0 32px color-mix(in srgb, ${accent} 35%, transparent)`
                : "none",
            }}
          >
            Set Background
          </motion.button>
        </div>
        <button
          type="button"
          onClick={proceed}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.28)",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.875rem",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          Skip for Now
        </button>
      </div>
    </div>
  );
}
