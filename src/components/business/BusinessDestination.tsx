"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassPanel from "@/components/pulse/GlassPanel";
import HypeLevel, { HypeLabel } from "@/components/pulse/HypeLevel";
import { HypeLiveBadge } from "@/components/pulse/LiveDot";
import DistrictLiveContent from "@/components/pulse/DistrictLiveContent";
import PopitLens from "@/components/profile/PopitLens";
import { PopitLensRow } from "@/components/profile/PopitLensRow";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import LivingCityBackground from "@/components/pulse/LivingCityBackground";
import VerifiedBadge from "./VerifiedBadge";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import type { VerifiedBusiness } from "@/lib/city/businesses";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.04] py-2.5 last:border-0">
      <span className="font-body text-xs text-white/35">{label}</span>
      <span className="font-body text-xs font-medium text-white/75">{value}</span>
    </div>
  );
}

function BusinessDestination({ business }: { business: VerifiedBusiness }) {
  const energy = deriveDistrictEnergy(business.vibeSignals, business.energy);
  const theme = getDistrictTheme(business.districtId);
  const accent = theme.primary;

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <LivingCityBackground />

      <div className="relative z-[1] mx-auto max-w-[680px] px-4 pb-28 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/map"
            className="rounded-full border border-white/10 px-3 py-1.5 font-body text-xs text-white/50"
          >
            ← POP WORLD
          </Link>
          <Link
            href="/pulse"
            className="font-body text-xs text-white/35"
          >
            Your City
          </Link>
        </div>

        <GlassPanel weight="light" accent={accent} glow={theme.glow} className="mb-4 p-4">
          <PopitLens
            name={business.name}
            followers={18400 + energy * 120}
            creatorLevel={7 + Math.floor(energy / 15)}
            influence={energy}
            verified
            live={business.live}
            accent={accent}
            size={88}
          />
        </GlassPanel>

        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <p className="mb-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#FF4D6D]/90">
            Live Destination
          </p>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="text-poster text-[clamp(2.2rem,7.5vw,3.2rem)] text-white">{business.name}</h1>
            <VerifiedBadge size="md" />
            {business.live && <HypeLiveBadge energy={energy} />}
          </div>
          <p className="mb-1 font-body text-sm font-semibold text-white/60">{business.tagline}</p>
          <p className="font-body text-sm text-white/40">{business.description}</p>
          <p className="mt-2 font-body text-xs text-white/30">{business.districtName}</p>
        </motion.header>

        <GlassPanel weight="light" accent={accent} glow={accent + "22"} className="mb-4 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-poster text-[0.7rem] tracking-wider text-white/50">Current Hype Level</span>
            <HypeLabel energy={energy} />
          </div>
          <HypeLevel energy={energy} seed={business.slug} />
        </GlassPanel>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <GlassPanel hover={false} weight="light" powered={false} className="p-3">
            <p className="mb-1 font-body text-[0.58rem] uppercase tracking-wider text-white/30">Check-ins Now</p>
            <p className="text-poster text-lg text-white/90">{business.friendsCheckedIn.length * 40 + 180}</p>
          </GlassPanel>
          <GlassPanel hover={false} weight="light" powered={false} className="p-3">
            <p className="mb-1 font-body text-[0.58rem] uppercase tracking-wider text-white/30">Live Momentum</p>
            <p className="text-poster text-lg" style={{ color: accent }}>{energy}%</p>
          </GlassPanel>
        </div>

        <section className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-poster text-sm text-white/45">Community Announcements</h2>
            <Link href={`/business/${business.slug}/dashboard`} className="font-body text-[0.62rem] text-[#00D4FF]/60">
              Owner Dashboard →
            </Link>
          </div>
          <GlassPanel weight="light" accent={accent} className="p-4">
            {business.updates.slice(0, 1).map((update) => (
              <div key={update.id}>
                <p className="font-body text-sm font-medium text-white/80">{update.text}</p>
                <p className="mt-1 font-body text-[0.65rem] text-white/30">Posted {update.minutesAgo}m ago · Visible across the city</p>
              </div>
            ))}
          </GlassPanel>
        </section>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <GlassPanel hover={false} weight="light" powered={false} className="p-3">
            <p className="mb-1 font-body text-[0.58rem] uppercase tracking-wider text-white/30">Hours</p>
            <p className="font-body text-xs font-medium text-white/70">{business.hours}</p>
          </GlassPanel>
          {business.waitTime && (
            <GlassPanel hover={false} weight="light" powered={false} className="p-3">
              <p className="mb-1 font-body text-[0.58rem] uppercase tracking-wider text-white/30">Wait Time</p>
              <p className="font-body text-xs font-medium" style={{ color: accent }}>
                {business.waitTime}
              </p>
            </GlassPanel>
          )}
        </div>

        {business.updates.length > 0 && (
          <section className="mb-4">
            <h2 className="text-poster mb-2 text-sm text-white/45">Live Updates</h2>
            <GlassPanel weight="light" accent={accent} className="p-4">
              <div className="flex flex-col gap-3">
                {business.updates.map((update) => (
                  <div key={update.id} className="border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <p className="font-body text-sm text-white/75">{update.text}</p>
                    <p className="mt-1 font-body text-[0.65rem] text-white/30">{update.minutesAgo}m ago</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </section>
        )}

        {business.todayEvents.length > 0 && (
          <section className="mb-4">
            <h2 className="text-poster mb-2 text-sm text-white/45">Today&apos;s Events</h2>
            <GlassPanel weight="light" accent={accent} className="p-4">
              {business.todayEvents.map((event) => (
                <InfoRow key={event.id} label={event.title} value={event.time} />
              ))}
            </GlassPanel>
          </section>
        )}

        <section className="mb-4">
          <h2 className="text-poster mb-2 text-sm text-white/45">Venue Details</h2>
          <GlassPanel weight="light" accent={accent} className="p-4">
            {business.coverCharge && <InfoRow label="Cover" value={business.coverCharge} />}
            {business.menuHighlight && <InfoRow label="Menu Highlight" value={business.menuHighlight} />}
            {business.upcomingPerformers && business.upcomingPerformers.length > 0 && (
              <InfoRow label="Performers" value={business.upcomingPerformers.join(" · ")} />
            )}
            {business.promotions && business.promotions.length > 0 && (
              <InfoRow label="Promotions" value={business.promotions[0]} />
            )}
          </GlassPanel>
        </section>

        <section className="mb-4">
          <h2 className="text-poster mb-2 text-sm text-white/45">Live Content</h2>
          <GlassPanel weight="light" accent={accent} className="p-4">
            <DistrictLiveContent items={business.liveContent} accent={accent} />
          </GlassPanel>
        </section>

        <section className="mb-4">
          <h2 className="text-poster mb-2 text-sm text-white/45">Friends Here Now</h2>
          <GlassPanel weight="light" accent={accent} className="p-4">
            <PopitLensRow names={business.friendsCheckedIn} accent={accent} />
            <p className="mt-2 font-body text-xs text-white/40">
              {business.friendsCheckedIn.length} friends checked in
            </p>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}

export default memo(BusinessDestination);
