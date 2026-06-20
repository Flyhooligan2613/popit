"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";

const INTRO_MS = 1800;

type WelcomeBrandedIntroProps = {
  onComplete: () => void;
};

export default function WelcomeBrandedIntro({ onComplete }: WelcomeBrandedIntroProps) {
  const reducedMotion = useReducedMotion();
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  return (
    <motion.div
      className="welcome-branded-intro absolute inset-0 z-[60] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: reducedMotion ? 0.35 : INTRO_MS / 1000 - 0.35, duration: 0.35, ease: "easeInOut" }}
      onAnimationComplete={finish}
      aria-hidden
    >
      <div className="welcome-intro-stage relative flex items-center justify-center">
        <motion.div
          className="welcome-intro-pulse absolute rounded-full"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.6, 1.35, 1.55] }}
          transition={{
            duration: reducedMotion ? 0.4 : 1.1,
            delay: 0.25,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="welcome-intro-glow absolute rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.55] }}
          transition={{ duration: reducedMotion ? 0.3 : 0.9, delay: 0.15 }}
        />
        <motion.div
          className="welcome-intro-streak absolute overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: reducedMotion ? 0.25 : 0.65, delay: 0.55 }}
        >
          <motion.span
            className="welcome-intro-streak-line block"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: reducedMotion ? 0.3 : 0.55, delay: 0.55, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.25 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <PopitBrandLogo markWidth={96} markHeight={136} showWordmark={false} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export const WELCOME_INTRO_SESSION_KEY = "popit:welcomeIntroSeen";
