"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type PopitMarkProps = {
  size?: number;
  glow?: boolean;
  className?: string;
};

function PopitMark({ size = 120, glow = true, className = "" }: PopitMarkProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 0.75 }}
      animate={glow ? { filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"] } : undefined}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-[-20%] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.35) 35%, rgba(0,212,255,0.15) 55%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      )}

      <svg
        viewBox="0 0 120 90"
        width={size}
        height={size * 0.75}
        className="relative z-[1]"
        aria-hidden
      >
        <defs>
          <linearGradient id="popit-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099FF" />
            <stop offset="35%" stopColor="#A855F7" />
            <stop offset="65%" stopColor="#FF4D6D" />
            <stop offset="100%" stopColor="#FF7A00" />
          </linearGradient>
          <filter id="popit-mark-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lens ring */}
        <circle
          cx="60"
          cy="45"
          r="38"
          fill="none"
          stroke="url(#popit-mark-gradient)"
          strokeWidth="3"
          opacity="0.9"
        />
        <circle cx="60" cy="45" r="32" fill="#050505" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* P letterform */}
        <path
          d="M42 28 V62 H54 C66 62 74 54 74 45 C74 36 66 28 54 28 Z M54 36 C61 36 66 40 66 45 C66 50 61 54 54 54 H50 V36 Z"
          fill="url(#popit-mark-gradient)"
          filter="url(#popit-mark-glow)"
        />

        {/* Apostrophe bolt */}
        <rect x="78" y="24" width="8" height="22" rx="2" fill="url(#popit-mark-gradient)" />
      </svg>
    </motion.div>
  );
}

export default memo(PopitMark);
