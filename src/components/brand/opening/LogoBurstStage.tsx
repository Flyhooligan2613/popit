"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PopitBrandLogo from "../PopitBrandLogo";
import LogoBurstExplosion from "./LogoBurstExplosion";
import MobileAmbientPulse from "./MobileAmbientPulse";
import {
  buildBurstParticles,
  buildConfetti,
  getAftershockKeyframes,
  getLogoRocketImpactMs,
  getLogoRocketStartY,
  getShakeKeyframes,
  hapticBurstAftershock,
  hapticBurstImpact,
  hapticRocketLaunch,
  useOpeningMobile,
  useResponsiveLogoWidth,
} from "./effects";

type LogoBurstStageProps = {
  /** When omitted, burst fires when the logo rocket slams into frame */
  burstDelay?: number;
  burstAt?: boolean;
  className?: string;
};

export default function LogoBurstStage({
  burstDelay,
  burstAt,
  className = "",
}: LogoBurstStageProps) {
  const mobile = useOpeningMobile();
  const logoWidth = useResponsiveLogoWidth(320);
  const logoHeight = Math.round(logoWidth * 1.4375);
  const confetti = buildConfetti(mobile ? 180 : 140);
  const particles = buildBurstParticles(mobile ? 44 : 36);

  const impactMs = getLogoRocketImpactMs(mobile);
  const rocketMs = impactMs / 1000;
  const startY = getLogoRocketStartY(mobile);
  const faceScale = mobile ? 1.38 : 1.32;

  const [burst, setBurst] = useState(false);
  const [shake, setShake] = useState(0);
  const [rocketing, setRocketing] = useState(true);
  const firedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    hapticRocketLaunch(mobile);
    setRocketing(true);
  }, [mobile]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (burstAt !== undefined) {
      if (!burstAt) {
        firedRef.current = false;
        setBurst(false);
        setShake(0);
        setRocketing(true);
        return;
      }
      if (firedRef.current) return;
      firedRef.current = true;
      fireBurst();
      return;
    }

    const delay = burstDelay ?? impactMs;
    const timer = setTimeout(() => {
      if (firedRef.current) return;
      firedRef.current = true;
      fireBurst();
    }, delay);
    timersRef.current.push(timer);
  }, [burstAt, burstDelay, impactMs]);

  function fireBurst() {
    setRocketing(false);
    setBurst(true);
    setShake(1);
    hapticBurstImpact(mobile);

    const primaryMs = mobile ? 820 : 720;
    const aftershockDelay = mobile ? 760 : 850;
    const aftershockMs = mobile ? 520 : 480;

    timersRef.current.push(setTimeout(() => setShake(0), primaryMs));
    timersRef.current.push(
      setTimeout(() => {
        setShake(2);
        hapticBurstAftershock(mobile);
        timersRef.current.push(setTimeout(() => setShake(0), aftershockMs));
      }, aftershockDelay)
    );
  }

  const shakeKeyframes =
    shake === 1 ? getShakeKeyframes(mobile) : shake === 2 ? getAftershockKeyframes(mobile) : { x: 0, y: 0, rotate: 0 };

  return (
    <motion.div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      animate={shakeKeyframes}
      transition={
        shake ? { duration: shake === 1 ? (mobile ? 0.82 : 0.72) : mobile ? 0.52 : 0.48, ease: "easeOut" } : { duration: 0.2 }
      }
      style={{ isolation: "isolate", perspective: 1100 }}
    >
      <MobileAmbientPulse active={!burst} intensity="high" />

      {/* Bottom emergence glow — rises from inside the screen */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={
          burst
            ? { opacity: 0, scaleY: 1.2 }
            : { opacity: [0, 0.75, 0.45, 0.2], scaleY: [0.4, 1, 1.15, 0.9] }
        }
        transition={{ duration: burst ? 0.25 : rocketMs, ease: "easeOut" }}
        style={{
          height: mobile ? "48vh" : "38vh",
          transformOrigin: "bottom center",
          background:
            "linear-gradient(to top, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.28) 35%, rgba(0,212,255,0.12) 60%, transparent 100%)",
        }}
      />

      {burst && <LogoBurstExplosion mobile={mobile} />}

      <div className="relative z-[3] flex items-center justify-center">
        {burst && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {confetti.map((piece, i) => {
              const rad = (piece.angle * Math.PI) / 180;
              const spread = mobile ? 1.15 : 1;
              const endX = Math.cos(rad) * piece.dist * spread;
              const endY = Math.sin(rad) * piece.dist * 0.6 * spread + piece.fall;
              return (
                <motion.div
                  key={`c-${i}`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.1, rotate: 0 }}
                  animate={{
                    x: endX,
                    y: endY,
                    opacity: [0, 1, 1, 0.7, 0],
                    scale: [0.1, mobile ? 1.45 : 1.3, 1.1, 0.9, 0.2],
                    rotate: piece.spin,
                  }}
                  transition={{ duration: piece.duration, delay: piece.delay, ease: [0.1, 0.85, 0.35, 1] }}
                  style={{
                    position: "absolute",
                    width: piece.streak ? (mobile ? 4 : 3) : piece.w,
                    height: piece.streak ? piece.h + (mobile ? 28 : 20) : piece.round ? piece.w : piece.h,
                    borderRadius: piece.round ? "50%" : piece.streak ? 99 : 2,
                    background: piece.streak
                      ? `linear-gradient(180deg, transparent, ${piece.color}, transparent)`
                      : piece.color,
                    boxShadow: piece.streak ? "none" : `0 0 14px ${piece.color}, 0 0 28px ${piece.color}88`,
                  }}
                />
              );
            })}
            {particles.map(({ color, angle, dist, size }, i) => {
              const rad = (angle * Math.PI) / 180;
              const spread = mobile ? 1.2 : 1;
              return (
                <motion.div
                  key={`p-${i}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
                  animate={{
                    x: Math.cos(rad) * dist * spread,
                    y: Math.sin(rad) * dist * spread,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.4, ease: [0.15, 0, 0.45, 1], delay: i * 0.015 }}
                  style={{
                    position: "absolute",
                    width: size + (mobile ? 1 : 0),
                    height: size + (mobile ? 1 : 0),
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
          initial={{
            opacity: 0,
            y: startY,
            scale: 0.18,
            rotate: -780,
            rotateX: mobile ? 34 : 22,
            filter: "blur(10px)",
          }}
          animate={
            burst
              ? {
                  opacity: 1,
                  y: [0, mobile ? -18 : -12, 5, 0],
                  scale: [faceScale, mobile ? 1.44 : 1.38, 0.96, 1.03, 1],
                  rotate: [0, -8, 5, 0],
                  rotateX: [0, -10, 2, 0],
                  filter: "blur(0px)",
                }
              : rocketing
                ? {
                    opacity: [0, 0.5, 1, 1],
                    y: 0,
                    scale: [0.18, 0.55, 0.95, faceScale],
                    rotate: 0,
                    rotateX: 0,
                    filter: ["blur(10px)", "blur(4px)", "blur(1px)", "blur(0px)"],
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: faceScale,
                    rotate: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }
          }
          transition={{
            opacity: { duration: rocketing ? 0.22 : 0.15 },
            y: burst
              ? { duration: 0.42, ease: "easeOut" }
              : { duration: rocketMs, ease: [0.22, 0.98, 0.32, 1] },
            scale: burst
              ? { duration: 0.75, times: [0, 0.18, 0.45, 0.72, 1], ease: "easeOut" }
              : { duration: rocketMs, ease: [0.1, 0.95, 0.25, 1] },
            rotate: burst
              ? { duration: 0.45, ease: "easeOut" }
              : { duration: rocketMs * 0.94, ease: [0.35, 0.01, 0.14, 1] },
            rotateX: { duration: rocketMs, ease: [0.2, 0.9, 0.3, 1] },
            filter: { duration: rocketMs * 0.85 },
          }}
          className="relative z-[4]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Speed trail while rocketing up */}
          {rocketing && !burst && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[88%] -translate-x-1/2"
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: [0, 0.85, 0.5], scaleY: [0.2, 2.2, 1.4] }}
              transition={{ duration: rocketMs, ease: "easeOut" }}
              style={{
                width: logoWidth * 0.55,
                height: logoHeight * 1.4,
                background:
                  "linear-gradient(to top, transparent 0%, rgba(255,77,109,0.65) 25%, rgba(168,85,247,0.45) 55%, rgba(0,212,255,0.2) 80%, transparent 100%)",
                filter: "blur(10px)",
                borderRadius: "50%",
              }}
            />
          )}

          <PopitBrandLogo markWidth={logoWidth} markHeight={logoHeight} showWordmark={false} />
        </motion.div>
      </div>
    </motion.div>
  );
}
