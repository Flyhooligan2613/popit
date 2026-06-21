"use client";

import { useId } from "react";
import type { PopMarkTier } from "@/lib/pop-marks/types";

/** Geometric P letterform — POP'IT logo language, optimized for 16px+ */
const P_LETTER =
  "M13 8 V40 H21.5 C27.5 40 31.5 35.5 31.5 30 C31.5 24.5 27.5 20 21.5 20 H17 V8 Z M21.5 23.5 C24 23.5 25.5 25.2 25.5 27.5 C25.5 29.8 24 31.5 21.5 31.5 H17 V23.5 Z";

type PopMarkSvgProps = {
  tier: PopMarkTier;
  className?: string;
};

export default function PopMarkSvg({ tier, className = "" }: PopMarkSvgProps) {
  const uid = useId().replace(/:/g, "");
  const fillId = `popmark-fill-${tier}-${uid}`;
  const edgeId = `popmark-edge-${tier}-${uid}`;
  const shineId = `popmark-shine-${tier}-${uid}`;

  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        {tier === "blue" && (
          <>
            <linearGradient id={fillId} x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="35%" stopColor="#2563eb" />
              <stop offset="72%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <linearGradient id={edgeId} x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
            </linearGradient>
          </>
        )}
        {tier === "green" && (
          <>
            <linearGradient id={fillId} x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="40%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id={edgeId} x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.35" />
            </linearGradient>
          </>
        )}
        {tier === "gold" && (
          <>
            <linearGradient id={fillId} x1="14" y1="6" x2="34" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="68%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id={edgeId} x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.45" />
            </linearGradient>
          </>
        )}
        {tier === "diamond" && (
          <>
            <linearGradient id={fillId} x1="10" y1="6" x2="38" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="28%" stopColor="#e0f2fe" />
              <stop offset="55%" stopColor="#c4b5fd" />
              <stop offset="78%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
            <linearGradient id={edgeId} x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.4" />
            </linearGradient>
          </>
        )}
        {tier === "black-chrome" && (
          <>
            <linearGradient id={fillId} x1="12" y1="8" x2="36" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="45%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id={edgeId} x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
              <stop offset="33%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="66%" stopColor="#f472b6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
            </linearGradient>
          </>
        )}
        <linearGradient id={shineId} x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="pop-mark-p-body"
        d={P_LETTER}
        fill={`url(#${fillId})`}
        stroke={`url(#${edgeId})`}
        strokeWidth="0.65"
      />
      <path className="pop-mark-p-shine" d={P_LETTER} fill={`url(#${shineId})`} opacity="0.28" />
    </svg>
  );
}
