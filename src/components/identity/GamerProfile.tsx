"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type GamerProfileProps = { user: UserProfile };

function GamerProfile({ user }: GamerProfileProps) {
  return (
    <div className="min-h-screen bg-[#0a0a12] pb-24">
      <div
        className="relative border-b border-cyan-500/20 px-4 pb-8 pt-6"
        style={{
          background: "linear-gradient(180deg, rgba(0,212,255,0.12) 0%, transparent 100%)",
          boxShadow: "inset 0 -1px 0 rgba(0,212,255,0.3)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-purple-600 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="rounded-2xl border border-cyan-400/30 bg-black/60 p-4 shadow-[0_0_40px_rgba(0,212,255,0.15)]">
            <PopitLens name={user.name} followers={user.followers} verified={user.verified} live={user.live} accent="#00D4FF" size={88} />
          </div>
          <h1 className="text-poster mt-4 text-3xl uppercase tracking-wider text-white">{user.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-cyan-300">
              Level 47
            </span>
            <span className="font-body text-xs text-white/40">{user.city}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 px-4 pt-6">
        <section className="rounded-xl border border-purple-500/25 bg-gradient-to-br from-purple-900/20 to-black p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">Stats</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { k: "K/D", v: "2.4" },
              { k: "Wins", v: "1,204" },
              { k: "Rank", v: "Diamond" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-white/10 bg-black/50 py-3">
                <p className="text-poster text-xl text-white">{s.v}</p>
                <p className="font-body text-[0.6rem] uppercase text-white/40">{s.k}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-cyan-500/20 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-cyan-300">Games</h3>
          {["Valorant", "Fortnite", "Apex Legends", "Call of Duty"].map((g) => (
            <div key={g} className="mb-2 flex items-center justify-between rounded-lg border border-white/8 px-3 py-2">
              <span className="font-body text-sm text-white/80">{g}</span>
              <span className="font-body text-xs text-cyan-400">Active</span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {["Clutch King", "100 Wins", "Streamer", "Squad MVP"].map((a) => (
              <span key={a} className="rounded border border-cyan-400/40 bg-cyan-400/10 px-2 py-1 font-body text-xs text-cyan-200">
                {a}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-purple-500/20 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">Streaming Schedule</h3>
          {["Mon 8PM — Valorant", "Wed 9PM — Community Night", "Sat 7PM — Tournament"].map((s) => (
            <p key={s} className="font-body border-b border-white/5 py-2 text-sm text-white/70 last:border-0">
              {s}
            </p>
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Featured Clips</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-900/30 to-purple-900/30" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(GamerProfile);
