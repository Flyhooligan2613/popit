"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type DJProfileProps = { user: UserProfile };

function DJProfile({ user }: DJProfileProps) {
  const accent = "#FF4D6D";

  return (
    <div className="min-h-screen bg-[#08060a] pb-24">
      {/* Deck-inspired header */}
      <div className="relative border-b border-[#FF4D6D]/20 px-4 pb-8 pt-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF4D6D]/10 via-purple-900/10 to-transparent" />

        <div className="relative flex flex-col items-center">
          <div className="relative w-full max-w-sm">
            {/* Deck platters */}
            <div className="mb-4 flex justify-center gap-6">
              {[0, 1].map((deck) => (
                <motion.div
                  key={deck}
                  className="relative h-20 w-20 rounded-full border-2 border-white/15 bg-black"
                  animate={{ rotate: deck === 0 ? 360 : -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-2 rounded-full border border-white/10 bg-gradient-to-br from-gray-800 to-black" />
                  <div className="absolute inset-[38%] rounded-full bg-[#FF4D6D]/80" />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <PopitLens name={user.name} followers={user.followers} verified live={user.live} accent={accent} size={84} />
            </div>
          </div>

          <h1 className="text-poster mt-4 text-3xl uppercase tracking-wider text-white">{user.name}</h1>
          <p className="font-body mt-1 text-sm uppercase tracking-[0.2em] text-[#FF4D6D]/80">
            {user.city} · House · Techno · Afro
          </p>

          <div className="mt-4 flex gap-4">
            {[
              { label: "BPM", value: "128" },
              { label: "Sets", value: "340" },
              { label: "Rating", value: "4.9" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-poster text-xl text-white">{s.value}</p>
                <p className="font-body text-[0.55rem] uppercase text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-6">
        <section className="rounded-2xl border border-[#FF4D6D]/25 bg-black/50 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-[#FF4D6D]">Now Spinning</h3>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF4D6D]/20"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF4D6D]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
            <div>
              <p className="font-body text-sm font-semibold text-white/90">Midnight Pulse — Live Mix</p>
              <p className="font-body text-xs text-white/40">Recorded at {user.name} · 47 min</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Upcoming Gigs</h3>
          {[
            { venue: "Neon Lounge", date: "Fri", city: user.city },
            { venue: "Skyline Club", date: "Sat", city: user.city },
            { venue: "District Block Party", date: "Next Thu", city: "Wynwood" },
          ].map((g) => (
            <div key={g.venue} className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
              <div>
                <p className="font-body text-sm font-semibold text-white/85">{g.venue}</p>
                <p className="font-body text-xs text-white/40">{g.city}</p>
              </div>
              <span className="font-body text-xs font-bold uppercase text-[#FF4D6D]">{g.date}</span>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-purple-500/20 bg-purple-950/15 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">Featured Mixes</h3>
          <div className="space-y-2">
            {["Summer Heat 2025", "Warehouse Session 04", "Sunrise Set — South Beach"].map((mix) => (
              <div key={mix} className="flex items-center gap-3 rounded-lg border border-white/8 px-3 py-2">
                <div className="h-10 w-10 shrink-0 rounded bg-gradient-to-br from-[#FF4D6D]/40 to-purple-900/40" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm text-white/80">{mix}</p>
                  <p className="font-body text-xs text-white/35">12.4K plays</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Crowd Energy</h3>
          <div className="flex h-16 items-end justify-center gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-t bg-gradient-to-t from-[#FF4D6D] to-purple-500"
                animate={{ height: ["20%", `${40 + Math.sin(i) * 30}%`, "20%"] }}
                transition={{ duration: 0.8, delay: i * 0.04, repeat: Infinity }}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Equipment</h3>
          <div className="flex flex-wrap gap-2">
            {["Pioneer CDJ-3000", "DJM-V10", "Rane Twelve", "Serato"].map((e) => (
              <span key={e} className="rounded border border-white/15 px-2 py-1 font-body text-xs text-white/55">
                {e}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Collaborations</h3>
          <div className="flex gap-4">
            {["Nova", "Kairo", "Luna"].map((c) => (
              <div key={c} className="flex flex-col items-center">
                <PopitLens name={c} followers={12000} size={44} accent="#A855F7" followersBeneath={false} />
                <span className="font-body text-[0.55rem] text-white/45">{c}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(DJProfile);
