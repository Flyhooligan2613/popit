"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";

type LiveNowBadgeProps = {
  exploringCount: number;
};

export default function LiveNowBadge({ exploringCount }: LiveNowBadgeProps) {
  const reducedMotion = useReducedMotion();
  const display = useAnimatedNumber(exploringCount, reducedMotion ? 0 : 650);

  return (
    <div className="live-now-badge live-now-badge-v3">
      <motion.span
        className="live-now-pill font-body"
        animate={reducedMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="live-now-dot" aria-hidden />
        <span className="live-now-pill-glow" aria-hidden />
        LIVE NOW
      </motion.span>
      <motion.span
        key={display}
        className="live-now-count font-display"
        initial={{ opacity: 0.7, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {display.toLocaleString()} Exploring
      </motion.span>
    </div>
  );
}
