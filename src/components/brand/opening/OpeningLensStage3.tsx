"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import OpeningCameraLens from "../OpeningCameraLens";
import MobileAmbientPulse from "./MobileAmbientPulse";
import { SWIRLS, hapticSwirlPeak, useOpeningMobile, useResponsiveLensSize } from "./effects";

type OpeningLensStage3Props = {
  swirlDuration?: number;
  idPrefix?: string;
};

export default function OpeningLensStage3({ swirlDuration = 2200, idPrefix = "opening" }: OpeningLensStage3Props) {
  const mobile = useOpeningMobile();
  const innerSize = useResponsiveLensSize(150);
  const [progress, setProgress] = useState(0);
  const hapticFiredRef = useRef(false);

  useEffect(() => {
    hapticFiredRef.current = false;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const p = Math.min((now - start) / swirlDuration, 1);
      setProgress(p);
      if (p >= 0.92 && !hapticFiredRef.current) {
        hapticFiredRef.current = true;
        hapticSwirlPeak(mobile);
      }
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [swirlDuration, mobile]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <MobileAmbientPulse intensity="high" />
      <div className="relative flex h-[min(82vw,360px)] w-[min(82vw,360px)] items-center justify-center">
        <svg
          className="absolute inset-0 overflow-visible"
          viewBox="-300 -300 600 600"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            {SWIRLS.map(({ color }, i) => (
              <filter key={i} id={`${idPrefix}-glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={mobile ? 4 : 3} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>
          {SWIRLS.map(({ color, d, delay }, i) => {
            const delayFraction = delay / 2;
            const adjusted = Math.max(0, Math.min(1, (progress - delayFraction) / (1 - delayFraction)));
            return (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={mobile ? 3.2 : 2.5}
                strokeLinecap="round"
                filter={`url(#${idPrefix}-glow${i})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: adjusted, opacity: adjusted > 0 ? 1 : 0 }}
                transition={{ duration: 0.05 }}
                style={{ filter: `drop-shadow(0 0 ${mobile ? 12 : 8}px ${color})` }}
              />
            );
          })}
        </svg>
        <div className="relative z-[2]">
          <OpeningCameraLens
            size={innerSize}
            aperture={0.35}
            glow
            glowIntensity={mobile ? 1 : 0.8}
          />
        </div>
      </div>
    </div>
  );
}
