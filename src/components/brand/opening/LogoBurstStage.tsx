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
  getShakeKeyframes,
  hapticBurstAftershock,
  hapticBurstImpact,
  useOpeningMobile,
  useResponsiveLogoWidth,
} from "./effects";

type LogoBurstStageProps = {
  burstDelay?: number;
  burstAt?: boolean;
  className?: string;
};

export default function LogoBurstStage({
  burstDelay = 1400,
  burstAt,
  className = "",
}: LogoBurstStageProps) {
  const mobile = useOpeningMobile();
  const logoWidth = useResponsiveLogoWidth(320);
  const logoHeight = Math.round(logoWidth * 1.4375);
  const confetti = buildConfetti(mobile ? 180 : 140);
  const particles = buildBurstParticles(mobile ? 44 : 36);

  const [burst, setBurst] = useState(false);
  const [shake, setShake] = useState(0);
  const firedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (burstAt !== undefined) {
      if (!burstAt) {
        firedRef.current = false;
        setBurst(false);
        setShake(0);
        return;
      }
      if (firedRef.current) return;
      firedRef.current = true;
      fireBurst();
      return;
    }

    const timer = setTimeout(() => {
      if (firedRef.current) return;
      firedRef.current = true;
      fireBurst();
    }, burstDelay);
    timersRef.current.push(timer);
  }, [burstAt, burstDelay]);

  function fireBurst() {
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
      className={`relative flex h-full w-full items-center justify-center ${className}`}
      animate={shakeKeyframes}
      transition={
        shake ? { duration: shake === 1 ? (mobile ? 0.82 : 0.72) : mobile ? 0.52 : 0.48, ease: "easeOut" } : { duration: 0.2 }
      }
      style={{ isolation: "isolate" }}
    >
      <MobileAmbientPulse active={!burst} intensity="high" />

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
          initial={{ opacity: 0, scale: 0.15, rotate: -420 }}
          animate={{
            opacity: 1,
            scale: burst ? [1, mobile ? 1.22 : 1.18, 0.98, 1.04, 1] : 1,
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
          <PopitBrandLogo markWidth={logoWidth} markHeight={logoHeight} showWordmark={false} />
        </motion.div>
      </div>
    </motion.div>
  );
}
