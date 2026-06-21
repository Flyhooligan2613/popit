"use client";

import { motion, useReducedMotion } from "framer-motion";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";

type WelcomeHeaderBrandProps = {
  variant?: "header" | "hero";
};

export default function WelcomeHeaderBrand({ variant = "header" }: WelcomeHeaderBrandProps) {
  const reducedMotion = useReducedMotion();
  const isHero = variant === "hero";

  if (isHero) {
    return (
      <motion.div
        className="hero-logo-v2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-logo-v2-stage">
          {!reducedMotion && (
            <>
              <span className="hero-logo-v2-glow" aria-hidden />
              <span className="hero-logo-v2-bloom" aria-hidden />
              <span className="hero-logo-v2-particle hero-logo-v2-particle-1" aria-hidden />
              <span className="hero-logo-v2-particle hero-logo-v2-particle-2" aria-hidden />
              <span className="hero-logo-v2-particle hero-logo-v2-particle-3" aria-hidden />
            </>
          )}
          <motion.div
            className="hero-logo-v2-mark"
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <PopitBrandLogo markWidth={48} markHeight={68} showWordmark={false} />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="welcome-header-brand">
      <PopitBrandLogo markWidth={52} markHeight={74} showWordmark wordmarkSize="lg" />
      <p className="welcome-header-tagline font-display">Discover What&apos;s Popping</p>
    </div>
  );
}
