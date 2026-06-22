"use client";

import { motion } from "framer-motion";
import PopitLens from "@/components/profile/PopitLens";
import GlassPanel from "./GlassPanel";
import LiveDot from "./LiveDot";
import { LIVE_STATS } from "./data";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { useLiveClock } from "./useTimeOfDay";
import { usePersonalizedCity } from "./usePersonalizedCity";
import type { UserProfile } from "@/lib/identity/userProfile";
import { IDENTITY_OPTIONS, getIdentityAccent } from "@/lib/identity/types";
import Link from "next/link";
import { useResolvedCity } from "@/hooks/useResolvedCity";
import { formatLifetimePopScore, buildUserReputation } from "@/lib/reputation/reputationEngine";

function StatPill({ label, value, href }: { label: string; value: number | string; href?: string }) {
  const numeric = typeof value === "number";
  const animated = useAnimatedNumber(numeric ? value : 0);

  const content = (
    <>
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
    </>
  );

  const className =
    "flex flex-1 flex-col items-center gap-0.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-2 py-2 backdrop-blur-sm";

  if (href) {
    return (
      <Link href={href} className={`${className} transition hover:border-white/15`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

type CityProfileHeroProps = {
  user: UserProfile;
};

export default function CityProfileHero({ user }: CityProfileHeroProps) {
  const { greeting, subGreeting, formatted } = useLiveClock();
  const { isPersonalized } = usePersonalizedCity();
  const resolvedCity = useResolvedCity();
  const displayCity = resolvedCity !== "Your City" ? resolvedCity : user.city;
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
        className="mb-3 font-body text-[0.62rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: `${accent}e6` }}
      >
        {isPersonalized ? `${identityLabel} · Your City` : "Your City · Living Platform"}
      </p>

      <div className="city-profile-identity mb-4">
        <PopitLens
          name={user.name}
          followers={user.followers}
          verified={user.verified}
          live={user.live}
          accent={accent}
          size={64}
          followersBeneath={false}
        />
        <div className="city-profile-identity__text min-w-0">
          <p className="city-profile-identity__name">{user.name}</p>
          <p className="city-profile-identity__handle">@{user.username}</p>
          <p className="city-profile-identity__bio">{user.currentVibe}</p>
        </div>
      </div>

      <h1 className="text-poster mb-1 text-[clamp(1.75rem,6vw,2.75rem)] uppercase text-white">
        {displayCity}
      </h1>
      <p className="mb-1 font-body text-sm font-semibold text-white/65">{greeting}</p>
      <p className="mb-3 font-body text-sm font-medium text-white/40">{subGreeting}</p>

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
        <StatPill label="POP Score" value={formatLifetimePopScore(reputation.lifetimePopScore)} href="/help/pop-scores" />
        <StatPill label="Moments" value={LIVE_STATS.moments} />
        <StatPill label="Events" value={LIVE_STATS.liveEvents} />
      </div>
    </motion.header>
  );
}
