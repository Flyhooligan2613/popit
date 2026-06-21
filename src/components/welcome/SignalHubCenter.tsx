"use client";

import { motion, AnimatePresence } from "framer-motion";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import type { SignalHubPhase } from "./signal/types";

type SignalHubCenterProps = {
  phase: SignalHubPhase;
  city?: string | null;
  userAvatar?: string | null;
  reducedMotion: boolean;
};

export default function SignalHubCenter({ phase, city, userAvatar, reducedMotion }: SignalHubCenterProps) {
  const showAvatar = userAvatar && phase !== "inviting" && phase !== "pulsing";
  const showConnected = phase === "connected";
  const cityLabel = city ?? "Your City";

  return (
    <div
      className={`signal-hub signal-hub-${phase}`}
      aria-label={showAvatar ? "Your POP'IT network hub" : "POP'IT city connection hub"}
    >
      <span className="signal-hub-glow" aria-hidden />
      {!reducedMotion && (phase === "pulsing" || phase === "transforming") && (
        <>
          <span key={`pulse-${phase}`} className="signal-hub-energy-pulse" aria-hidden />
          <span className="signal-hub-energy-pulse signal-hub-energy-pulse-2" aria-hidden />
        </>
      )}
      {!reducedMotion && (
        <>
          <span className="signal-hub-ring signal-hub-ring-1" aria-hidden />
          <span className="signal-hub-ring signal-hub-ring-2" aria-hidden />
        </>
      )}

      <div className="signal-hub-core">
        <AnimatePresence mode="wait">
          {showAvatar ? (
            <motion.div
              key="avatar"
              className="signal-hub-avatar-wrap"
              initial={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={userAvatar} alt="" className="signal-hub-avatar" />
              <span className="signal-hub-avatar-ring" aria-hidden />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              className="signal-hub-logo-wrap"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
              transition={{ duration: reducedMotion ? 0.15 : 0.5 }}
            >
              <PopitBrandLogo markWidth={44} markHeight={62} showWordmark={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showConnected && (
          <motion.p
            className="signal-hub-connected font-body"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            ✓ Connected to {cityLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
