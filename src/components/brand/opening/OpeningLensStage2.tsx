"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import OpeningCameraLens from "../OpeningCameraLens";
import MobileAmbientPulse from "./MobileAmbientPulse";
import { hapticFocusSnap, useOpeningMobile, useResponsiveLensSize } from "./effects";

export default function OpeningLensStage2() {
  const mobile = useOpeningMobile();
  const size = useResponsiveLensSize(200);

  useEffect(() => {
    const t = setTimeout(() => hapticFocusSnap(mobile), mobile ? 1200 : 1400);
    return () => clearTimeout(t);
  }, [mobile]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <MobileAmbientPulse intensity="mid" />
      {mobile && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(0,212,255,0.12) 25%, transparent 55%)",
          }}
        />
      )}
      <motion.div
        initial={{ filter: "blur(14px)", scale: mobile ? 1.12 : 1.08 }}
        animate={{ filter: "blur(0px)", scale: 1 }}
        transition={{ duration: mobile ? 1.2 : 1.4, ease: "easeOut" }}
      >
        <OpeningCameraLens
          size={size}
          aperture={0.25}
          glow
          glowIntensity={mobile ? 0.85 : 0.6}
        />
      </motion.div>
    </div>
  );
}
