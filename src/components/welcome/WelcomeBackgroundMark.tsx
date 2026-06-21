"use client";

import { memo, useId } from "react";

/** Permanent bottom-screen P mark — embedded in the scene, visible but not on top of UI. */
function WelcomeBackgroundMark() {
  const uid = useId().replace(/:/g, "");
  const gradId = `popit-bg-mark-grad-${uid}`;
  const glowId = `popit-bg-mark-glow-${uid}`;

  return (
    <div className="popit-home-brand-watermark" aria-hidden>
      <div className="popit-home-brand-watermark__glow" />
      <svg
        className="popit-home-brand-watermark__svg"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099FF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#FF4D6D" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="45" r="44" fill={`url(#${glowId})`} />

        <circle
          cx="60"
          cy="45"
          r="38"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          opacity="0.85"
        />
        <circle
          cx="60"
          cy="45"
          r="32"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
        />

        <path
          d="M42 28 V62 H54 C66 62 74 54 74 45 C74 36 66 28 54 28 Z M54 36 C61 36 66 40 66 45 C66 50 61 54 54 54 H50 V36 Z"
          fill={`url(#${gradId})`}
        />

        <rect x="78" y="24" width="8" height="22" rx="2" fill={`url(#${gradId})`} />
      </svg>
    </div>
  );
}

export default memo(WelcomeBackgroundMark);
