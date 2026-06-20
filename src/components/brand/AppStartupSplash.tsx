"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpeningCameraLens from "./OpeningCameraLens";
import PopitBrandLogo from "./PopitBrandLogo";

const BURST = "#FF4D6D";
const ENERGY_COLORS = ["#FF4D6D", "#FF7A00", "#A855F7", "#00D4FF", "#7C3AED", "#0099FF"];

const SWIRLS = [
  { color: "#FF4D6D", d: "M -320 -200 C -200 -150 -100 -60 0 0 C 80 50 160 90 240 110", delay: 0 },
  { color: "#A855F7", d: "M -360 10 C -240 8 -120 4 0 0 C 120 -4 240 -10 360 -20", delay: 0.18 },
  { color: "#00D4FF", d: "M -280 230 C -190 170 -100 80 0 0 C 90 -70 180 -150 250 -210", delay: 0.34 },
];

const CONFETTI = Array.from({ length: 90 }, (_, i) => ({
  color: ENERGY_COLORS[i % ENERGY_COLORS.length],
  angle: (i * 41 + (i % 13) * 27) % 360,
  dist: 240 + (i % 20) * 32 + Math.floor(i / 20) * 48,
  fall: 100 + (i % 12) * 48,
  w: i % 4 === 0 ? 5 + (i % 3) : 3 + (i % 3),
  h: i % 4 === 0 ? 5 + (i % 3) : 8 + (i % 7) * 2,
  round: i % 4 === 1,
  streak: i % 6 === 0,
  delay: (i % 30) * 0.01,
  spin: -220 + (i % 19) * 28,
  duration: 1.7 + (i % 8) * 0.14,
}));

const BURST_PARTICLES = [
  { color: "#FF4D6D", angle: 0, dist: 160, size: 8 },
  { color: "#FF7A00", angle: 25, dist: 200, size: 5 },
  { color: "#A855F7", angle: 55, dist: 180, size: 10 },
  { color: "#00D4FF", angle: 85, dist: 220, size: 6 },
  { color: "#FF4D6D", angle: 115, dist: 190, size: 7 },
  { color: "#A855F7", angle: 145, dist: 160, size: 5 },
  { color: "#FF7A00", angle: 175, dist: 210, size: 9 },
  { color: "#00D4FF", angle: 205, dist: 185, size: 5 },
  { color: "#FF4D6D", angle: 235, dist: 200, size: 8 },
  { color: "#A855F7", angle: 265, dist: 155, size: 6 },
  { color: "#00D4FF", angle: 295, dist: 215, size: 10 },
  { color: "#FF7A00", angle: 325, dist: 175, size: 5 },
];

/** Stage 1 → lens fade · Stage 2 → lens focus · Stage 3 → lens + swirls · Stage 4 → logo burst */
type Stage = "black" | "lens1" | "lens2" | "lens3" | "logoBurst" | "tagline" | "exit";

const STAGE_MS: Record<Stage, number> = {
  black: 400,
  lens1: 2600,
  lens2: 2200,
  lens3: 2600,
  logoBurst: 3400,
  tagline: 1400,
  exit: 600,
};

type AppStartupSplashProps = {
  onComplete?: () => void;
  minimal?: boolean;
};

function AppStartupSplash({ onComplete, minimal = false }: AppStartupSplashProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [stage, setStage] = useState<Stage>("black");
  const [swirlProgress, setSwirlProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (minimal) {
      const t = setTimeout(() => setStage("lens1"), 80);
      return () => clearTimeout(t);
    }

    const sequence: Stage[] = ["black", "lens1", "lens2", "lens3", "logoBurst", "tagline", "exit"];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach((step, index) => {
      if (index === 0) return;
      elapsed += STAGE_MS[sequence[index - 1]];
      timers.push(
        setTimeout(() => {
          setStage(step);
          if (step === "logoBurst") {
            setTimeout(() => setBurst(true), 1500);
          }
          if (step === "exit") setExiting(true);
        }, elapsed)
      );
    });

    timers.push(setTimeout(() => onCompleteRef.current?.(), elapsed + STAGE_MS.exit));

    return () => timers.forEach(clearTimeout);
  }, [minimal]);

  useEffect(() => {
    if (stage !== "lens3") {
      setSwirlProgress(0);
      return;
    }

    const start = performance.now();
    const duration = 2200;
    let frame: number;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setSwirlProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stage]);

  useEffect(() => {
    if (stage !== "logoBurst") setBurst(false);
  }, [stage]);

  const showLens = stage === "lens1" || stage === "lens2" || stage === "lens3";
  const showLogo = stage === "logoBurst" || stage === "tagline";
  const opacity = exiting ? 0 : 1;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        {showLens && (
          <motion.div
            key="lens-stages"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center"
          >
            {stage === "lens1" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <OpeningCameraLens size={200} aperture={0.15} />
              </motion.div>
            )}

            {stage === "lens2" && (
              <motion.div
                initial={{ filter: "blur(14px)", scale: 1.08 }}
                animate={{ filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              >
                <OpeningCameraLens size={200} aperture={0.25} glow glowIntensity={0.6} />
              </motion.div>
            )}

            {stage === "lens3" && (
              <div className="relative flex h-[min(80vw,360px)] w-[min(80vw,360px)] items-center justify-center">
                <svg
                  className="absolute inset-0 overflow-visible"
                  viewBox="-300 -300 600 600"
                  style={{ width: "100%", height: "100%" }}
                >
                  <defs>
                    {SWIRLS.map(({ color }, i) => (
                      <filter key={i} id={`splash-glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  {SWIRLS.map(({ color, d, delay }, i) => {
                    const delayFraction = delay / 2;
                    const adjusted = Math.max(0, Math.min(1, (swirlProgress - delayFraction) / (1 - delayFraction)));
                    return (
                      <motion.path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        filter={`url(#splash-glow${i})`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: adjusted, opacity: adjusted > 0 ? 1 : 0 }}
                        transition={{ duration: 0.05 }}
                        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                      />
                    );
                  })}
                </svg>
                <div className="relative z-[2]">
                  <OpeningCameraLens size={150} aperture={0.35} glow glowIntensity={0.8} />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {showLogo && (
          <motion.div
            key="logo-burst"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center"
            style={{ isolation: "isolate" }}
          >
            {burst && (
              <>
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
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

            {burst && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                      transition={{ duration: piece.duration, delay: piece.delay, ease: [0.12, 0.88, 0.42, 1] }}
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
                {BURST_PARTICLES.map(({ color, angle, dist, size }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={`p-${i}`}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist,
                        opacity: 0,
                        scale: 0.1,
                      }}
                      transition={{ duration: 1.2, ease: [0.2, 0, 0.5, 1], delay: i * 0.022 }}
                      style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        boxShadow: `0 0 10px ${color}`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotate: -360 }}
              animate={{ opacity: 1, scale: burst ? [1, 1.08, 1] : 1, rotate: 0 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: burst ? 0.5 : 1.5, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 1.5, ease: [0.34, 1.15, 0.64, 1] },
              }}
              className="relative z-[3]"
            >
              <PopitBrandLogo markWidth={320} markHeight={460} showWordmark={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "tagline" && !exiting && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute text-center font-semibold tracking-[0.28em] text-white/75"
          style={{
            bottom: "22%",
            fontSize: "clamp(0.65rem, 2.8vw, 0.82rem)",
            textShadow: `0 0 20px ${BURST}44`,
          }}
        >
          SEE WHAT&apos;S POPPING.
        </motion.p>
      )}
    </div>
  );
}

export default memo(AppStartupSplash);
