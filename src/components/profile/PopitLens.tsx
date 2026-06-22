"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

export type PopitLensProps = {
  name: string;
  followers: number;
  influence?: number;
  creatorLevel?: number;
  verified?: boolean;
  live?: boolean;
  accent?: string;
  size?: number;
  interactive?: boolean;
  onTap?: () => void;
  followSegments?: number;
  achievementFlash?: boolean;
  /** Sprint 8: followers always beneath lens when true */
  followersBeneath?: boolean;
  avatarUrl?: string | null;
  /** Show + badge when user has no profile photo */
  showPhotoPlus?: boolean;
  /** Animate aperture open on tap (disable for photo picker taps) */
  openApertureOnTap?: boolean;
};

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function PopitLens({
  name,
  followers,
  influence = 70,
  creatorLevel = 5,
  verified = false,
  live = false,
  accent = "#FF4D6D",
  size = 72,
  interactive = false,
  onTap,
  followSegments = 0,
  achievementFlash = false,
  followersBeneath = true,
  avatarUrl = null,
  showPhotoPlus = false,
  openApertureOnTap = true,
}: PopitLensProps) {
  const [apertureOpen, setApertureOpen] = useState(live);
  const initial = name[0]?.toUpperCase() ?? "?";
  const r = size / 2;
  const circumference = 2 * Math.PI * (r - 4);
  const influenceOffset = circumference - (circumference * influence) / 100;
  const bladeOpen = apertureOpen || live ? 32 : 10;
  const liveAccent = live ? "#FF4D6D" : accent;

  useEffect(() => {
    setApertureOpen(live);
  }, [live]);

  const handleClick = () => {
    if (!interactive) return;
    if (openApertureOnTap) setApertureOpen(true);
    onTap?.();
  };

  const lens = (
    <motion.div
      className={`relative shrink-0 ${interactive ? "cursor-pointer" : ""}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
      animate={
        live
          ? { boxShadow: [`0 0 20px ${liveAccent}44`, `0 0 36px ${liveAccent}88`, `0 0 20px ${liveAccent}44`] }
          : achievementFlash
            ? { filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"] }
            : undefined
      }
      transition={{ duration: live ? 1.2 : 0.6, repeat: live ? Infinity : 0 }}
    >
      {/* Outer metal ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(145deg, #4a4a4a 0%, #1a1a1a 35%, #2a2a2a 65%, #0a0a0a 100%)",
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.7), 0 0 24px ${liveAccent}33`,
        }}
      />

      {/* Verification — illuminated ring accent (not floating badge) */}
      {verified && (
        <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={r}
            cy={r}
            r={r - 2}
            fill="none"
            stroke="#00D4FF"
            strokeWidth="2.5"
            strokeDasharray={`${circumference * 0.15} ${circumference * 0.85}`}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px #00D4FF)" }}
          />
        </svg>
      )}

      {/* Follow segments — light up when following */}
      {followSegments > 0 && (
        <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {Array.from({ length: followSegments }).map((_, i) => (
            <circle
              key={i}
              cx={r}
              cy={r}
              r={r - 3}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeDasharray={`${circumference / 12} ${circumference}`}
              strokeDashoffset={-((circumference / 12) * i)}
              opacity="0.8"
            />
          ))}
        </svg>
      )}

      {/* Influence ring */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={r - 5} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        <motion.circle
          cx={r}
          cy={r}
          r={r - 5}
          fill="none"
          stroke={liveAccent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: influenceOffset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 4px ${liveAccent})` }}
        />
      </svg>

      {/* Rotating focus ring */}
      <motion.div
        className="absolute inset-[6px] rounded-full border border-dashed border-white/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Glass chamber */}
      <div
        className="absolute inset-[11px] overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(140,190,255,0.18) 0%, rgba(8,8,18,0.95) 55%, #000 100%)",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.95)",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom transition-all duration-500"
            style={{
              width: "20%",
              height: `${bladeOpen}%`,
              marginLeft: "-10%",
              marginTop: `-${bladeOpen}%`,
              background: "rgba(0,0,0,0.8)",
              clipPath: "polygon(28% 100%, 72% 100%, 50% 0)",
              transform: `rotate(${i * 60}deg)`,
            }}
          />
        ))}

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(125deg, transparent 35%, rgba(255,255,255,0.25) 48%, transparent 58%)",
          }}
          animate={{ x: ["-130%", "130%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: avatarUrl || (apertureOpen && interactive && openApertureOnTap) ? 0 : 1, scale: apertureOpen && interactive && openApertureOnTap ? 1.3 : 1 }}
        >
          <span className="text-poster text-white/95" style={{ fontSize: size * 0.24 }}>
            {initial}
          </span>
        </motion.div>

        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {showPhotoPlus && (
        <div
          className="absolute bottom-0 left-1/2 flex h-5 w-5 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-black/80 bg-[#FF4D6D] text-white shadow-lg"
          aria-hidden
        >
          <span className="font-body text-sm font-bold leading-none">+</span>
        </div>
      )}

      {/* REC when live */}
      {live && (
        <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/80 px-2 py-0.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-[#FF4D6D]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="font-body text-[0.45rem] font-bold uppercase tracking-widest text-[#FF4D6D]">Rec</span>
        </div>
      )}
    </motion.div>
  );

  if (followersBeneath) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        {lens}
        <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/50">
          {formatFollowers(followers)} Followers
        </p>
      </div>
    );
  }

  return lens;
}

export default memo(PopitLens);
