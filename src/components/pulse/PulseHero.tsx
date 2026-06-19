"use client";

import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import LiveDot from "./LiveDot";
import { LIVE_STATS } from "./data";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { useLiveClock } from "./useTimeOfDay";
import { usePersonalizedCity } from "./usePersonalizedCity";

function StatPill({ label, value }: { label: string; value: number }) {
  const animated = useAnimatedNumber(value);

  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-2 py-2 backdrop-blur-sm">
      <motion.span
        key={animated}
        initial={{ opacity: 0.6, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-poster text-xl text-white/90"
      >
        {animated}
      </motion.span>
      <span className="font-body text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/30">
        {label}
      </span>
    </div>
  );
}

export default function PulseHero() {
  const { greeting, subGreeting, formatted } = useLiveClock();
  const { isPersonalized } = usePersonalizedCity();

  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-5"
    >
      <p className="mb-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#FF4D6D]/90">
        {isPersonalized ? "Your City · Personalized" : "Living City Platform"}
      </p>

      <h1 className="text-poster mb-1.5 text-[clamp(2.6rem,8.5vw,3.6rem)] text-white">
        YOUR CITY
      </h1>
      <p className="mb-1 font-body text-sm font-semibold text-white/65">{greeting}</p>
      <p className="mb-4 font-body text-sm font-medium text-white/40">{subGreeting}</p>

      <GlassPanel hover={false} powered weight="light" accent="#A855F7" glow="rgba(168,85,247,0.08)" className="mb-3 px-3 py-2">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-xs text-white/40">
          <span>{formatted}</span>
          <span className="text-white/15">·</span>
          <div className="flex items-center gap-1.5">
            <LiveDot size={5} />
            <span>City breathing</span>
          </div>
        </div>
      </GlassPanel>

      <div className="flex gap-1.5">
        <StatPill label="Moments" value={LIVE_STATS.moments} />
        <StatPill label="Friends" value={LIVE_STATS.friendsNearby} />
        <StatPill label="Events" value={LIVE_STATS.liveEvents} />
      </div>
    </motion.header>
  );
}
