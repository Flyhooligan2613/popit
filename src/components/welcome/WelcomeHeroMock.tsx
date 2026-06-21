"use client";

import { motion, useReducedMotion } from "framer-motion";

type WelcomeHeroMockProps = {
  cityName: string | null;
};

export default function WelcomeHeroMock({ cityName }: WelcomeHeroMockProps) {
  const reducedMotion = useReducedMotion();
  const city = cityName ?? "your city";

  return (
    <div className="welcome-hero-mock-text">
      <motion.h1
        className="welcome-hero-mock-title font-display"
        initial={reducedMotion ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        THE CITY IS ALIVE
      </motion.h1>
      <motion.p
        className="welcome-hero-mock-sub font-body"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
      >
        Real people. Real places. Real-time energy.
      </motion.p>
      <p className="welcome-hero-mock-city font-body sr-only">Connected in {city}</p>
    </div>
  );
}
