"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type AthleteProfileProps = { user: UserProfile };

function AthleteProfile({ user }: AthleteProfileProps) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] pb-24">
      <div className="mx-4 mt-6 overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-black shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="relative flex flex-col items-center border-b border-amber-500/20 px-4 py-8">
          <div className="absolute left-4 top-4 font-body text-[0.55rem] uppercase tracking-widest text-amber-500/60">
            Official Card
          </div>
          <PopitLens name={user.name} followers={user.followers} verified={user.verified} accent="#F59E0B" size={100} />
          <h1 className="text-poster mt-4 text-4xl uppercase text-white">{user.name}</h1>
          <p className="font-body mt-1 text-sm uppercase tracking-[0.25em] text-amber-400">Point Guard · Basketball</p>
          <p className="font-body text-xs text-white/40">{user.city}</p>
        </div>

        <div className="grid grid-cols-4 gap-px bg-amber-500/10 p-px">
          {[
            { k: "PPG", v: "24.3" },
            { k: "APG", v: "8.1" },
            { k: "RPG", v: "5.2" },
            { k: "FG%", v: "47%" },
          ].map((s) => (
            <div key={s.k} className="bg-black/80 py-4 text-center">
              <p className="text-poster text-2xl text-amber-300">{s.v}</p>
              <p className="font-body text-[0.55rem] uppercase text-white/40">{s.k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-6">
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Highlights</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-amber-900/40 to-black" />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-amber-500/20 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-amber-400">Awards</h3>
          {["All-Star 2025", "MVP Finals", "City Champion"].map((a) => (
            <p key={a} className="font-body border-b border-white/5 py-2 text-sm text-white/75 last:border-0">
              🏆 {a}
            </p>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Upcoming Games</h3>
          {["vs Heat — Fri 7PM", "vs Lakers — Sun 5PM", "Playoffs R1 — Next Week"].map((g) => (
            <p key={g} className="font-body border-b border-white/5 py-2 text-sm text-white/70 last:border-0">
              {g}
            </p>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Season Performance</h3>
          <div className="h-24 rounded-lg bg-gradient-to-r from-amber-900/30 via-amber-600/20 to-transparent" />
          <p className="font-body mt-2 text-center text-xs text-white/45">+12% improvement vs last season</p>
        </section>
      </div>
    </div>
  );
}

export default memo(AthleteProfile);
