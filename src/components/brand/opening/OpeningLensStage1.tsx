"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import OpeningCameraLens from "../OpeningCameraLens";
import MobileAmbientPulse from "./MobileAmbientPulse";
import { hapticLensAppear, useOpeningMobile, useResponsiveLensSize } from "./effects";

export default function OpeningLensStage1() {
  const mobile = useOpeningMobile();
  const size = useResponsiveLensSize(200);

  useEffect(() => {
    hapticLensAppear(mobile);
  }, [mobile]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <MobileAmbientPulse intensity="low" />
      <motion.div
        initial={{ opacity: 0, scale: mobile ? 0.5 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: mobile ? 1.6 : 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <OpeningCameraLens size={size} aperture={0.15} glow={mobile} glowIntensity={mobile ? 0.35 : 0} />
      </motion.div>
    </div>
  );
}
