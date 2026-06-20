"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpeningCameraLens from "./OpeningCameraLens";
import PopitBrandLogo from "./PopitBrandLogo";

const ENERGY_COLORS = ["#FF4D6D", "#FF7A00", "#A855F7", "#00D4FF", "#7C3AED", "#0099FF", "#FFFFFF"];

const SWIRLS = [
  { color: "#FF4D6D", d: "M -320 -200 C -200 -150 -100 -60 0 0 C 80 50 160 90 240 110", delay: 0 },
  { color: "#A855F7", d: "M -360 10 C -240 8 -120 4 0 0 C 120 -4 240 -10 360 -20", delay: 0.18 },
  { color: "#00D4FF", d: "M -280 230 C -190 170 -100 80 0 0 C 90 -70 180 -150 250 -210", delay: 0.34 },
];

const CONFETTI = Array.from({ length: 140 }, (_, i) => ({
  color: ENERGY_COLORS[i % ENERGY_COLORS.length],
  angle: (i * 37 + (i % 17) * 19) % 360,
  dist: 320 + (i % 28) * 42 + Math.floor(i / 28) * 56,
  fall: 120 + (i % 14) * 52,
  w: i % 5 === 0 ? 6 + (i % 4) : 3 + (i % 4),
  h: i % 5 === 0 ? 6 + (i % 4) : 10 + (i % 8) * 2,
  round: i % 4 === 1,
  streak: i % 5 === 0,
  delay: (i % 35) * 0.008,
  spin: -280 + (i % 23) * 32,
  duration: 1.9 + (i % 9) * 0.16,
}));

const BURST_PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  color: ENERGY_COLORS[i % ENERGY_COLORS.length],
  angle: (i * 10 + (i % 7) * 8) % 360,
  dist: 200 + (i % 12) * 38,
  size: 4 + (i % 6),
}));

const SHOCK_RINGS = [0, 0.12, 0.28, 0.45];

/** Stage 1 → lens · Stage 2 → focus · Stage 3 → swirls · Stage 4 → logo explosion */
type Stage = "black" | "lens1" | "lens2" | "lens3" | "logoBurst" | "exit";

const STAGE_MS: Record<Stage, number> = {
  black: 400,
  lens1: 2600,
  lens2: 2200,
  lens3: 2600,
  logoBurst: 4800,
  exit: 700,
};

const SHAKE_KEYFRAMES = {
  x: [0, -18, 22, -16, 14, -12, 10, -8, 6, -4, 2, 0],
  y: [0, 14, -18, 12, -14, 10, -8, 6, -4, 3, -2, 0],
  rotate: [0, -1.2, 1.4, -1, 0.8, -0.5, 0.3, 0],
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
  const [shake, setShake] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (minimal) {
      const t = setTimeout(() => setStage("lens1"), 80);
      return () => clearTimeout(t);
    }

    const sequence: Stage[] = ["black", "lens1", "lens2", "lens3", "logoBurst", "exit"];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach((step, index) => {
      if (index === 0) return;
      elapsed += STAGE_MS[sequence[index - 1]];
      timers.push(
        setTimeout(() => {
          setStage(step);
          if (step === "logoBurst") {
            setTimeout(() => {
              setBurst(true);
              setShake(true);
              setTimeout(() => setShake(false), 720);
            }, 1400);
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
    if (stage !== "logoBurst") {
      setBurst(false);
      setShake(false);
    }
  }, [stage]);

  const showLens = stage === "lens1" || stage === "lens2" || stage === "lens3";
  const showLogo = stage === "logoBurst";
  const opacity = exiting ? 0 : 1;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      animate={shake ? SHAKE_KEYFRAMES : { x: 0, y: 0, rotate: 0 }}
      transition={shake ? { duration: 0.72, ease: "easeOut" } : { duration: 0.2 }}
    >
      {/* Full-screen mega explosion */}
      {burst && (
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.4, 0] }}
            transition={{ duration: 0.55, times: [0, 0.08, 0.35, 1] }}
            style={{ background: "radial-gradient(circle at 50% 42%, #fff 0%, rgba(255,255,255,0.6) 8%, transparent 45%)" }}
          />

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.1, delay: 0.05 }}
            style={{
              background:
                "radial-gradient(ellipse 180% 160% at 50% 42%, rgba(255,77,109,0.75) 0%, rgba(168,85,247,0.45) 30%, rgba(0,212,255,0.2) 55%, transparent 80%)",
            }}
          />

          {SHOCK_RINGS.map((delay, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5 + i * 1.2, 5.5 + i * 1.8], opacity: [0, 0.85, 0] }}
              transition={{ duration: 1.6 + i * 0.2, delay, ease: [0.08, 0.82, 0.2, 1] }}
              style={{
                width: "50vmax",
                height: "50vmax",
                border: `3px solid ${ENERGY_COLORS[i % ENERGY_COLORS.length]}`,
                boxShadow: `0 0 40px ${ENERGY_COLORS[i % ENERGY_COLORS.length]}, inset 0 0 60px rgba(255,255,255,0.15)`,
              }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 6], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, ease: [0.1, 0.9, 0.15, 1] }}
            style={{
              width: "200vmax",
              height: "200vmax",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,77,109,0.8) 6%, rgba(168,85,247,0.55) 18%, rgba(0,212,255,0.3) 35%, transparent 58%)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 3.5, 7], opacity: [0, 0.65, 0] }}
            transition={{ duration: 2, ease: [0.12, 0.88, 0.22, 1] }}
            style={{
              width: "160vmax",
              height: "160vmax",
              borderRadius: "50%",
              boxShadow:
                "0 0 200px rgba(255,77,109,0.9), 0 0 400px rgba(168,85,247,0.6), 0 0 600px rgba(0,212,255,0.35), inset 0 0 120px rgba(255,122,0,0.4)",
              background:
                "radial-gradient(circle, transparent 38%, rgba(255,77,109,0.4) 44%, rgba(168,85,247,0.25) 50%, transparent 56%)",
            }}
          />

          {/* Radial energy streaks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) % 360;
            return (
              <motion.div
                key={`streak-${i}`}
                className="absolute left-1/2 top-[42%] origin-bottom"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.2, 0], opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.9, delay: i * 0.02, ease: "easeOut" }}
                style={{
                  width: 4,
                  height: "55vmax",
                  marginLeft: -2,
                  transform: `rotate(${angle}deg)`,
                  background: `linear-gradient(to top, transparent, ${ENERGY_COLORS[i % ENERGY_COLORS.length]}, transparent)`,
                  filter: `drop-shadow(0 0 12px ${ENERGY_COLORS[i % ENERGY_COLORS.length]})`,
                }}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {showLens && (
          <motion.div
            key="lens-stages"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-[2] flex items-center justify-center"
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
            className="relative z-[3] flex items-center justify-center"
            style={{ isolation: "isolate" }}
          >
            {burst && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {CONFETTI.map((piece, i) => {
                  const rad = (piece.angle * Math.PI) / 180;
                  const endX = Math.cos(rad) * piece.dist;
                  const endY = Math.sin(rad) * piece.dist * 0.6 + piece.fall;
                  return (
                    <motion.div
                      key={`c-${i}`}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.1, rotate: 0 }}
                      animate={{
                        x: endX,
                        y: endY,
                        opacity: [0, 1, 1, 0.7, 0],
                        scale: [0.1, 1.3, 1.1, 0.9, 0.2],
                        rotate: piece.spin,
                      }}
                      transition={{ duration: piece.duration, delay: piece.delay, ease: [0.1, 0.85, 0.35, 1] }}
                      style={{
                        position: "absolute",
                        width: piece.streak ? 3 : piece.w,
                        height: piece.streak ? piece.h + 20 : piece.round ? piece.w : piece.h,
                        borderRadius: piece.round ? "50%" : piece.streak ? 99 : 2,
                        background: piece.streak
                          ? `linear-gradient(180deg, transparent, ${piece.color}, transparent)`
                          : piece.color,
                        boxShadow: piece.streak ? "none" : `0 0 14px ${piece.color}, 0 0 28px ${piece.color}88`,
                      }}
                    />
                  );
                })}
                {BURST_PARTICLES.map(({ color, angle, dist, size }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={`p-${i}`}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
                      animate={{
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 1.4, ease: [0.15, 0, 0.45, 1], delay: i * 0.015 }}
                      style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        boxShadow: `0 0 16px ${color}, 0 0 32px ${color}`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.15, rotate: -420 }}
              animate={{
                opacity: 1,
                scale: burst ? [1, 1.18, 0.98, 1.04, 1] : 1,
                rotate: 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: burst
                  ? { duration: 0.85, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeOut" }
                  : { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 1.6, ease: [0.34, 1.2, 0.55, 1] },
              }}
              className="relative z-[4]"
            >
              <PopitBrandLogo markWidth={320} markHeight={460} showWordmark={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(AppStartupSplash);
