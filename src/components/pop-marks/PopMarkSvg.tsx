"use client";

import { useId } from "react";
import {
  normalizePopMarkTier,
  POP_MARK_BUBBLE,
  POP_MARK_P,
  POP_MARK_PALETTES,
  POP_MARK_WAVE,
} from "@/lib/pop-marks/popMarkArt";
import type { PopMarkTier } from "@/lib/pop-marks/types";

type PopMarkSvgProps = {
  tier: PopMarkTier;
  className?: string;
};

export default function PopMarkSvg({ tier, className = "" }: PopMarkSvgProps) {
  const visual = normalizePopMarkTier(tier);
  const palette = POP_MARK_PALETTES[visual];
  const uid = useId().replace(/:/g, "");
  const bubbleId = `pm-bubble-${uid}`;
  const edgeId = `pm-edge-${uid}`;
  const shineId = `pm-shine-${uid}`;

  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id={bubbleId} x1="10" y1="4" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.bubble[0]} />
          <stop offset="42%" stopColor={palette.bubble[1]} />
          <stop offset="100%" stopColor={palette.bubble[2]} />
        </linearGradient>
        <linearGradient id={edgeId} x1="6" y1="4" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.edge[0]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.edge[1]} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`pm-soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="pop-mark-bubble"
        d={POP_MARK_BUBBLE}
        fill={`url(#${bubbleId})`}
        stroke={`url(#${edgeId})`}
        strokeWidth="0.85"
      />

      <path className="pop-mark-p-letter" d={POP_MARK_P} fill={palette.pFill} opacity="0.96" />

      <path
        className="pop-mark-p-wave"
        d={POP_MARK_WAVE}
        stroke={palette.wave}
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.92"
        filter={`url(#pm-soft-${uid})`}
      />

      <path
        className="pop-mark-bubble-shine"
        d={POP_MARK_BUBBLE}
        fill={`url(#${shineId})`}
        opacity="0.22"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}
