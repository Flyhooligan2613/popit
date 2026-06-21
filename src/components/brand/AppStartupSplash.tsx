"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningLensStage3 from "./opening/OpeningLensStage3";
import LogoBurstStage from "./opening/LogoBurstStage";
import { detectMobileDevice, getLogoRocketImpactMs } from "./opening/effects";

/** Stage 3 → swirls · logo explosion → landing */
type Stage = "black" | "lens1" | "lens2" | "lens3" | "logoBurst" | "exit";

const STAGE_MS: Record<Stage, number> = {
  black: 0,
  lens1: 0,
  lens2: 0,
  lens3: 2000,
  logoBurst: 2600,
  exit: 350,
};

type AppStartupSplashProps = {
  onComplete?: () => void;
  minimal?: boolean;
};

function AppStartupSplash({ onComplete, minimal = false }: AppStartupSplashProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [stage, setStage] = useState<Stage>("lens3");
  const [burst, setBurst] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (minimal) {
      const t = setTimeout(() => setStage("lens1"), 80);
      return () => clearTimeout(t);
    }

    const sequence: Stage[] = ["lens3", "logoBurst", "exit"];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach((step, index) => {
      if (index === 0) return;
      elapsed += STAGE_MS[sequence[index - 1]];
      timers.push(
        setTimeout(() => {
          setStage(step);
          if (step === "logoBurst") {
            const impactMs = typeof window !== "undefined" ? getLogoRocketImpactMs(detectMobileDevice()) : 760;
            timers.push(setTimeout(() => setBurst(true), impactMs));
          }
          if (step === "exit") setExiting(true);
        }, elapsed)
      );
    });

    timers.push(setTimeout(() => onCompleteRef.current?.(), elapsed + STAGE_MS.exit));

    return () => timers.forEach(clearTimeout);
  }, [minimal]);

  useEffect(() => {
    if (stage !== "logoBurst") setBurst(false);
  }, [stage]);

  const opacity = exiting ? 0 : 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      style={{ minHeight: "100dvh", touchAction: "none" }}
    >
      <AnimatePresence mode="wait">
        {stage === "lens3" && (
          <motion.div
            key="lens-swirl"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-[2]"
          >
            <OpeningLensStage3 idPrefix="splash" swirlDuration={2000} />
          </motion.div>
        )}

        {stage === "logoBurst" && (
          <motion.div
            key="logo-burst"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[3]"
          >
            <LogoBurstStage burstAt={burst} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(AppStartupSplash);
