"use client";

import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import LiveDot from "./LiveDot";
import { LIVE_STATS } from "./data";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { useLiveClock } from "./useTimeOfDay";
import { usePersonalizedCity } from "./usePersonalizedCity";
import type { UserProfile } from "@/lib/identity/userProfile";
import { IDENTITY_OPTIONS, getIdentityAccent } from "@/lib/identity/types";
import { formatLifetimePopScore, buildUserReputation } from "@/lib/reputation/reputationEngine";

function StatPill({ label, value }: { label: string; value: number | string }) {
  const numeric = typeof value === "number";
  const animated = useAnimatedNumber(numeric ? value : 0);

  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-2 py-2 backdrop-blur-sm">
      <motion.span
        key={String(value)}
        initial={{ opacity: 0.6, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-poster text-xl text-white/90"
      >
        {numeric ? animated : value}
      </motion.span>
      <span className="font-body text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/30">
        {label}
      </span>
    </div>
  );
}

type CityProfileHeroProps = {
  user: UserProfile;
};

export default function CityProfileHero({ user }: CityProfileHeroProps) {
  const { greeting, subGreeting, formatted } = useLiveClock();
  const { isPersonalized } = usePersonalizedCity();
  const accent = getIdentityAccent(user.identity);
  const identityLabel = IDENTITY_OPTIONS.find((option) => option.id === user.identity)?.label ?? "Personal";
  const reputation = buildUserReputation({
    followers: user.followers,
    following: user.following,
    popScoreRating: user.pulseScore,
    verified: user.verified,
    identity: user.identity,
    communitySince: 2024,
  });

  return (
    <motion.header
      id="profile"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-5"
    >
      <p
        className="mb-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: `${accent}e6` }}
      >
        {isPersonalized ? `${identityLabel} · Your City` : "Your City · Living Platform"}
      </p>

      <h1 className="text-poster mb-1 text-[clamp(2rem,7vw,3rem)] uppercase text-white">
        {user.city}
      </h1>
      <p className="mb-1 font-body text-lg font-bold text-white/88">@{user.username}</p>
      <p className="mb-1 font-body text-sm font-semibold text-white/65">{greeting}</p>
      <p className="mb-3 font-body text-sm font-medium text-white/40">{subGreeting}</p>
      <p className="mb-4 font-body text-sm italic text-white/55">{user.currentVibe}</p>

      <GlassPanel
        hover={false}
        powered
        weight="light"
        accent="#A855F7"
        glow="rgba(168,85,247,0.08)"
        className="mb-3 px-3 py-2"
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-xs text-white/40">
          <span>{formatted}</span>
          <span className="text-white/15">·</span>
          <div className="flex items-center gap-1.5">
            <LiveDot size={5} />
            <span>{user.live ? "You're live in the city" : "City breathing"}</span>
          </div>
          {user.identityTopicLabel && (
            <>
              <span className="text-white/15">·</span>
              <span>{user.identityTopicLabel}</span>
            </>
          )}
        </div>
      </GlassPanel>

      <div className="flex gap-1.5">
        <StatPill label="POP Score" value={formatLifetimePopScore(reputation.lifetimePopScore)} />
        <StatPill label="Moments" value={LIVE_STATS.moments} />
        <StatPill label="Events" value={LIVE_STATS.liveEvents} />
      </div>
    </motion.header>
  );
}
