"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";

type BusinessProfileProps = { user: UserProfile };

function BusinessProfile({ user }: BusinessProfileProps) {
  const accent = getIdentityAccent(user.identity);

  return (
    <div className="min-h-screen bg-[#050505] pb-24">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
          <PopitLens name={user.name} followers={user.followers} verified live={user.live} accent={accent} size={72} />
          <div>
            <h1 className="text-poster text-3xl uppercase text-white">{user.name}</h1>
            <p className="font-body text-sm text-white/50">{user.city} · Open Now</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["Menu", "Events", "Reserve", "Gallery", "Promos"].map((tab) => (
            <button
              key={tab}
              type="button"
              className="shrink-0 rounded-full border border-white/15 px-4 py-1.5 font-body text-xs uppercase tracking-wider text-white/70"
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-poster text-lg uppercase text-white/90">Current Hype Level</h3>
            <span className="font-body text-sm font-bold" style={{ color: accent }}>
              SURGING
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full" style={{ background: accent }} />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Today&apos;s Specials</h3>
          {["Truffle Pasta — $28", "Chef's Tasting — $65", "Happy Hour 5–7PM"].map((s) => (
            <p key={s} className="font-body border-b border-white/5 py-2 text-sm text-white/75 last:border-0">
              {s}
            </p>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Events Tonight</h3>
          <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <p className="font-body font-semibold text-white/90">Live DJ Set — 10PM</p>
            <p className="font-body text-xs text-white/45">Rooftop · Limited capacity</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {[
            { label: "Hours", value: "11AM – 2AM" },
            { label: "Phone", value: "(305) 555-0142" },
            { label: "Wait Time", value: "~15 min" },
            { label: "Popular Time", value: "9PM" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/8 bg-black/30 p-3">
              <p className="font-body text-[0.6rem] uppercase text-white/40">{item.label}</p>
              <p className="font-body text-sm text-white/80">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Photo Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-white/8" />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Promotions</h3>
          <div className="rounded-xl border border-dashed p-4 text-center" style={{ borderColor: `${accent}55` }}>
            <p className="font-body text-sm font-semibold" style={{ color: accent }}>
              20% OFF — POPIT20
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Pulse Analytics</h3>
          <p className="font-body text-sm text-white/60">Foot traffic up 24% · 340 check-ins today</p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="rounded-xl py-3 font-body text-sm font-semibold text-black" style={{ background: accent }}>
            Reserve
          </button>
          <button type="button" className="rounded-xl border border-white/20 py-3 font-body text-sm text-white/80">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(BusinessProfile);
