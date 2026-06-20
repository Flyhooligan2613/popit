"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpeningCameraLens from "./OpeningCameraLens";

const BURST = "#FF4D6D";
const VOLT = "#A855F7";
const IGNITE = "#FF7A00";
const BURST_BLUE = "#00D4FF";
const ENERGY_COLORS = [BURST, IGNITE, VOLT, BURST_BLUE, "#7C3AED", "#0099FF"];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  color: [BURST, VOLT, IGNITE, BURST_BLUE][i % 4],
  angle: (i * 20 + (i % 5) * 11) % 360,
  dist: 120 + (i % 6) * 28,
  size: 4 + (i % 4),
  delay: i * 0.03,
}));

const CONFETTI = Array.from({ length: 72 }, (_, i) => ({
  color: ENERGY_COLORS[i % ENERGY_COLORS.length],
  angle: (i * 41 + (i % 13) * 27) % 360,
  dist: 180 + (i % 16) * 24,
  fall: 60 + (i % 10) * 36,
  w: i % 4 === 0 ? 5 + (i % 3) : 3 + (i % 3),
  h: i % 4 === 0 ? 5 + (i % 3) : 8 + (i % 7) * 2,
  round: i % 4 === 1,
  streak: i % 6 === 0,
  delay: (i % 24) * 0.012,
  spin: -220 + (i % 19) * 28,
  duration: 1.5 + (i % 8) * 0.12,
}));

type Phase = "black" | "lens" | "glow" | "particles" | "shutter" | "burst" | "tagline" | "exit";

const PHASE_MS: Record<Phase, number> = {
  black: 400,
  lens: 1600,
  glow: 1400,
  particles: 1200,
  shutter: 700,
  burst: 1800,
  tagline: 1600,
  exit: 700,
};

type AppStartupSplashProps = {
  onComplete?: () => void;
  minimal?: boolean;
};

function AppStartupSplash({ onComplete, minimal = false }: AppStartupSplashProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [phase, setPhase] = useState<Phase>("black");
  const [aperture, setAperture] = useState(0.1);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [burst, setBurst] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (minimal) {
      const t = setTimeout(() => setPhase("lens"), 80);
      return () => clearTimeout(t);
    }

    const sequence: Phase[] = [
      "black", "lens", "glow", "particles", "shutter", "burst", "tagline", "exit",
    ];
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
          if (step === "shutter") {
            setAperture(0.85);
            setTimeout(() => setAperture(0.3), 380);
          }
          if (step === "burst") setBurst(true);
          if (step === "tagline") setShowTagline(true);
          if (step === "exit") setExiting(true);
        }, elapsed)
      );
    });

    const completeAt = elapsed + PHASE_MS.exit;
    timers.push(setTimeout(() => onCompleteRef.current?.(), completeAt));

    return () => timers.forEach(clearTimeout);
  }, [minimal]);

  const lensVisible = phase !== "black";
  const lensOpacity = lensVisible ? (exiting ? 0 : 1) : 0;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Burst shockwave */}
      {burst && (
        <>
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 3.2], opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.4, ease: [0.12, 0.9, 0.25, 1] }}
            style={{
              width: "120vmax",
              height: "120vmax",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,77,109,0.75) 8%, rgba(168,85,247,0.5) 28%, rgba(0,212,255,0.25) 48%, transparent 68%)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.9 }}
            style={{
              background:
                "radial-gradient(ellipse 140% 120% at 50% 42%, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.3) 35%, rgba(0,212,255,0.12) 55%, transparent 75%)",
            }}
          />
        </>
      )}

      <AnimatePresence>
        {lensVisible && (
          <motion.div
            key="lens-wrap"
            initial={{ opacity: 0, scale: 0.3, rotate: -360 }}
            animate={{
              opacity: lensOpacity,
              scale: exiting ? 1.06 : burst ? [1, 1.1, 1] : 1,
              rotate: 0,
            }}
            transition={{
              opacity: { duration: exiting ? 0.65 : 0.5, ease: "easeInOut" },
              scale: {
                duration: burst ? 0.5 : exiting ? 0.65 : 1.5,
                ease: [0.16, 1, 0.3, 1],
              },
              rotate: { duration: 1.5, ease: [0.34, 1.15, 0.64, 1] },
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

            {(showParticles || burst) && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {PARTICLES.map(({ color, angle, dist, size, delay }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={`p-${i}`}
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
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            {burst && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {CONFETTI.map((piece, i) => {
                  const rad = (piece.angle * Math.PI) / 180;
                  const endX = Math.cos(rad) * piece.dist;
                  const endY = Math.sin(rad) * piece.dist * 0.55 + piece.fall;
                  return (
                    <motion.div
                      key={`c-${i}`}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
                      animate={{
                        x: endX,
                        y: endY,
                        opacity: [0, 1, 1, 0.6, 0],
                        scale: [0.2, 1.1, 1, 0.8, 0.3],
                        rotate: piece.spin,
                      }}
                      transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: [0.12, 0.88, 0.42, 1],
                      }}
                      style={{
                        position: "absolute",
                        width: piece.streak ? 2 : piece.w,
                        height: piece.streak ? piece.h + 12 : piece.round ? piece.w : piece.h,
                        borderRadius: piece.round ? "50%" : piece.streak ? 99 : 1,
                        background: piece.streak
                          ? `linear-gradient(180deg, transparent, ${piece.color}, transparent)`
                          : piece.color,
                        boxShadow: piece.streak ? "none" : `0 0 10px ${piece.color}`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            <OpeningCameraLens
              size={200}
              aperture={aperture}
              glow={glowIntensity > 0}
              glowIntensity={glowIntensity}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!minimal && (
        <AnimatePresence>
          {showTagline && !exiting && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="pointer-events-none absolute text-center font-semibold tracking-[0.28em] text-white/80"
              style={{
                bottom: "28%",
                fontSize: "clamp(0.65rem, 2.8vw, 0.82rem)",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow: `0 0 24px ${BURST}44`,
              }}
            >
              SEE WHAT&apos;S POPPING.
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default memo(AppStartupSplash);
