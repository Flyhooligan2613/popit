"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import CreatorEconomyCard from "@/components/creator-economy/CreatorEconomyCard";
import type { UserProfile } from "@/lib/identity/userProfile";

type CreatorProfileProps = { user: UserProfile };

function CreatorProfile({ user }: CreatorProfileProps) {
  return (
    <div className="min-h-screen bg-[#08080f] pb-24">
      <div className="border-b border-purple-500/20 px-4 pb-8 pt-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-purple-500/10 blur-2xl" />
            <PopitLens name={user.name} followers={user.followers} verified={user.verified} live={user.live} accent="#A855F7" size={92} />
          </div>
          <h1 className="text-poster mt-4 text-3xl uppercase text-white">{user.name}</h1>
          <p className="font-body text-sm text-purple-300/80">Creator Studio</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { k: "Subscribers", v: "42.1K" },
            { k: "Growth", v: "+18%" },
            { k: "POP Score", v: user.pulseScore },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-purple-500/20 bg-purple-900/10 py-3 text-center">
              <p className="text-poster text-xl text-white">{s.v}</p>
              <p className="font-body text-[0.55rem] uppercase text-white/40">{s.k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-6">
        <CreatorEconomyCard
          variant="creator"
          signals={{
            qualityReactions: user.followers * 0.55,
            meaningfulComments: user.following * 0.9,
            shares: user.followers * 0.14,
            saves: user.followers * 0.11,
            profileVisits: user.followers * 2.1,
            eventParticipationGenerated: Math.round(user.pulseScore * 1.4),
            restaurantVisitsInfluenced: Math.round(user.pulseScore * 0.8),
            liveStreamWatchTime: user.live ? 28000 : 14000,
            followerGrowth: Math.round(user.followers * 0.025),
            consistentPosting: 24,
            communityTrust: user.verified ? 0.92 : 0.7,
            accountAuthenticity: user.verified ? 0.95 : 0.75,
          }}
        />

        <section className="rounded-xl border border-white/10 bg-black/50 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Featured Videos</h3>
          <div className="space-y-2">
            {["City Night Vlog", "District Tour", "Behind the Lens"].map((v) => (
              <div key={v} className="flex gap-3 rounded-lg border border-white/8 p-2">
                <div className="aspect-video w-24 shrink-0 rounded bg-purple-900/30" />
                <div>
                  <p className="font-body text-sm font-semibold text-white/85">{v}</p>
                  <p className="font-body text-xs text-white/40">12K views</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Latest Posts</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-white/5" />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-purple-500/20 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">Livestream Schedule</h3>
          {["Tue 7PM — Q&A", "Thu 8PM — City Walk", "Sun 6PM — Collab Stream"].map((s) => (
            <p key={s} className="font-body border-b border-white/5 py-2 text-sm text-white/70 last:border-0">
              {s}
            </p>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Collaborations</h3>
          <div className="flex gap-3">
            {["Nova", "Kai", "Luna"].map((c) => (
              <div key={c} className="flex flex-col items-center">
                <PopitLens name={c} followers={8000} size={40} accent="#A855F7" />
                <span className="font-body text-[0.55rem] text-white/45">{c}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Equipment</h3>
          <p className="font-body text-sm text-white/60">Sony A7IV · DJI RS3 · Rode NTG · Elgato Key Light</p>
        </section>

        <section className="rounded-xl border border-purple-500/15 bg-purple-900/10 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">Creator Insights</h3>
          <p className="font-body text-sm text-white/65">Peak engagement: Fri 8–10PM · Top district: Wynwood</p>
        </section>
      </div>
    </div>
  );
}

export default memo(CreatorProfile);
