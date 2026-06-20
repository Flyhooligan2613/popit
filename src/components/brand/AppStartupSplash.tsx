"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopitBrandLogo from "./PopitBrandLogo";

const BURST = "#FF4D6D";
const VOLT = "#A855F7";
const IGNITE = "#FF7A00";
const BURST_BLUE = "#00D4FF";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  color: [BURST, VOLT, IGNITE, BURST_BLUE][i % 4],
  angle: (i * 20 + (i % 5) * 11) % 360,
  dist: 120 + (i % 6) * 28,
  size: 4 + (i % 4),
  delay: i * 0.03,
}));

type Phase = "black" | "logo" | "glow" | "particles" | "pulse" | "hold" | "exit";

const PHASE_MS: Record<Phase, number> = {
  black: 400,
  logo: 1400,
  glow: 1500,
  particles: 1600,
  pulse: 900,
  hold: 1800,
  exit: 700,
};

type AppStartupSplashProps = {
  onComplete?: () => void;
  /** Minimal loader — P logo only, no tagline */
  minimal?: boolean;
};

function AppStartupSplash({ onComplete, minimal = false }: AppStartupSplashProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [phase, setPhase] = useState<Phase>("black");
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [logoPulse, setLogoPulse] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (minimal) {
      const t = setTimeout(() => setPhase("logo"), 80);
      return () => clearTimeout(t);
    }

    const sequence: Phase[] = ["black", "logo", "glow", "particles", "pulse", "hold", "exit"];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach((step, index) => {
      if (index === 0) return;
      elapsed += PHASE_MS[sequence[index - 1]];
      timers.push(
        setTimeout(() => {
          setPhase(step);
          if (step === "glow") setGlowIntensity(1);
          if (step === "particles") setShowParticles(true);
          if (step === "pulse") {
            setLogoPulse(true);
            setTimeout(() => setLogoPulse(false), 420);
          }
          if (step === "exit") setExiting(true);
        }, elapsed)
      );
    });

    const completeAt = elapsed + PHASE_MS.exit;
    timers.push(
      setTimeout(() => {
        onCompleteRef.current?.();
      }, completeAt)
    );

    return () => timers.forEach(clearTimeout);
  }, [minimal]);

  const logoVisible = phase !== "black";
  const logoOpacity = logoVisible ? (exiting ? 0 : 1) : 0;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]">
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            key="logo-wrap"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: logoOpacity, scale: exiting ? 1.04 : logoPulse ? 1.08 : 1 }}
            transition={{
              opacity: { duration: exiting ? 0.65 : 1.2, ease: "easeInOut" },
              scale: { duration: exiting ? 0.65 : logoPulse ? 0.42 : 1.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative flex flex-col items-center"
          >
            {glowIntensity > 0 && (
              <>
                <motion.div
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 340,
                    height: 340,
                    marginLeft: -170,
                    marginTop: -170,
                    left: "50%",
                    top: "50%",
                    background: `radial-gradient(circle, ${BURST}55 0%, ${VOLT}33 35%, ${IGNITE}22 55%, transparent 72%)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.4, 0.85, 0.55], scale: [0.85, 1.15, 1] }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 280,
                    height: 280,
                    marginLeft: -140,
                    marginTop: -140,
                    left: "50%",
                    top: "50%",
                    boxShadow: `0 0 60px ${BURST}88, 0 0 100px ${VOLT}55, 0 0 140px ${BURST_BLUE}33`,
                  }}
                  animate={{ opacity: [0.5, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}

            {showParticles && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {PARTICLES.map(({ color, angle, dist, size, delay }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                      animate={{
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist,
                        opacity: 0,
                        scale: 0.15,
                      }}
                      transition={{ duration: 1.4, ease: [0.2, 0, 0.5, 1], delay }}
                      style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}88`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            <PopitBrandLogo markWidth={340} markHeight={480} showWordmark={false} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default memo(AppStartupSplash);
