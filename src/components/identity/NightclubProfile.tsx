"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type NightclubProfileProps = { user: UserProfile };

function NightclubProfile({ user }: NightclubProfileProps) {
  const accent = "#7C3AED";

  return (
    <div className="min-h-screen bg-[#050208] pb-24">
      {/* Event flyer hero */}
      <div className="relative overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: "radial-gradient(ellipse at 50% 20%, #7C3AED 0%, #FF4D6D 40%, transparent 70%)",
          }}
        />
        <div className="relative px-4 pb-10 pt-8">
          <p className="text-poster text-center text-[0.65rem] uppercase tracking-[0.4em] text-purple-300/70">
            Tonight · {user.city}
          </p>
          <h1 className="text-poster mt-2 text-center text-[clamp(2.5rem,10vw,4rem)] uppercase leading-none text-white">
            {user.name}
          </h1>
          <p className="font-body mt-2 text-center text-sm uppercase tracking-[0.25em] text-[#FF4D6D]">
            Doors Open 10PM
          </p>

          <div className="mt-6 flex justify-center">
            <PopitLens name={user.name} followers={user.followers} verified live={user.live} accent={accent} size={88} />
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {["House", "Techno", "Afrobeat"].map((g) => (
              <span key={g} className="rounded border border-purple-500/40 bg-purple-900/20 px-3 py-1 font-body text-xs text-purple-200">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <section className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-poster text-lg uppercase text-purple-300">Hype Level</h3>
            <motion.span
              className="font-body text-sm font-bold text-[#FF4D6D]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ON FIRE
            </motion.span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/60">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-[#FF4D6D] to-purple-600"
              animate={{ width: ["70%", "92%", "70%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-4">
          <h3 className="text-poster mb-4 text-lg uppercase text-white/90">Lineup Tonight</h3>
          {[
            { time: "10PM", act: "DJ Nova — Opening Set", headliner: false },
            { time: "12AM", act: "KAIRO — Main Room", headliner: true },
            { time: "2AM", act: "Special Guest", headliner: true },
            { time: "4AM", act: "Afterhours", headliner: false },
          ].map((slot) => (
            <div
              key={slot.act}
              className={`mb-2 flex items-center gap-3 rounded-xl border px-3 py-3 ${
                slot.headliner ? "border-[#FF4D6D]/40 bg-[#FF4D6D]/10" : "border-white/8 bg-white/[0.02]"
              }`}
            >
              <span className="font-body text-xs tabular-nums text-white/40">{slot.time}</span>
              <span className={`font-body text-sm ${slot.headliner ? "font-bold text-white" : "text-white/70"}`}>
                {slot.act}
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-purple-500/20 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-purple-300">VIP Tables</h3>
          {[
            { tier: "Platinum", price: "$2,500", perks: "6 guests · bottle service · rooftop" },
            { tier: "Gold", price: "$1,200", perks: "4 guests · main floor" },
            { tier: "Silver", price: "$600", perks: "2 guests · lounge" },
          ].map((t) => (
            <div key={t.tier} className="mb-2 rounded-xl border border-white/8 p-3 last:mb-0">
              <div className="flex items-center justify-between">
                <span className="font-body font-bold text-white/90">{t.tier}</span>
                <span className="font-body text-sm text-purple-300">{t.price}</span>
              </div>
              <p className="font-body text-xs text-white/45">{t.perks}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-3">
          {[
            { label: "Dress Code", value: "Upscale nightlife" },
            { label: "Cover", value: "$25 before 12AM" },
            { label: "Capacity", value: "78% full" },
            { label: "Age", value: "21+" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
              <p className="font-body text-[0.6rem] uppercase text-white/35">{item.label}</p>
              <p className="font-body text-sm text-white/75">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Live From the Floor</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/50 to-[#FF4D6D]/20" />
            ))}
          </div>
        </section>

        <button
          type="button"
          className="rounded-xl py-4 font-body text-sm font-bold uppercase tracking-widest text-white"
          style={{ background: "linear-gradient(90deg, #7C3AED, #FF4D6D)" }}
        >
          Book VIP Table
        </button>
      </div>
    </div>
  );
}

export default memo(NightclubProfile);
