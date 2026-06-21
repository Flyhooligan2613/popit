"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";

type LiveNowBadgeProps = {
  exploringCount: number;
  todayGain?: number;
  minuteGain?: number;
  avatarUrls?: string[];
  compact?: boolean;
};

export default function LiveNowBadge({
  exploringCount,
  todayGain = 342,
  minuteGain,
  avatarUrls = [],
  compact = false,
}: LiveNowBadgeProps) {
  const reducedMotion = useReducedMotion();
  const display = useAnimatedNumber(exploringCount, reducedMotion ? 0 : 720);
  const minute = useAnimatedNumber(minuteGain ?? todayGain, reducedMotion ? 0 : 850);

  return (
    <div className={`live-now-badge live-now-badge-mock live-now-badge-polish live-now-badge-v2 ${compact ? "is-compact" : ""}`}>
      <motion.span
        className="live-now-pill font-body"
        animate={reducedMotion ? undefined : { scale: [1, 1.018, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="live-now-dot" aria-hidden />
        <span className="live-now-pill-glow" aria-hidden />
        LIVE NOW
      </motion.span>
      <motion.span
        key={display}
        className="live-now-count font-display"
        initial={{ opacity: 0.88, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {display.toLocaleString()} Exploring
      </motion.span>
      <span className="live-now-minute font-body">
        +{minute.toLocaleString()} this minute
      </span>
      {!compact && avatarUrls.length > 0 && (
        <div className="live-now-avatars" aria-hidden>
          {avatarUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="" className="live-now-avatar" style={{ zIndex: 10 - i }} loading="lazy" />
          ))}
        </div>
      )}
    </div>
  );
}
