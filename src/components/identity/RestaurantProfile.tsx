"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type RestaurantProfileProps = { user: UserProfile };

const MENU = {
  starters: [
    { name: "Burrata & Heirloom Tomato", price: 18 },
    { name: "Tuna Tartare", price: 22 },
    { name: "Truffle Arancini", price: 16 },
  ],
  mains: [
    { name: "Dry-Aged Ribeye 14oz", price: 68 },
    { name: "Lobster Risotto", price: 54 },
    { name: "Pan-Seared Branzino", price: 42 },
  ],
  desserts: [
    { name: "Dark Chocolate Soufflé", price: 14 },
    { name: "Tiramisu", price: 12 },
  ],
};

function RestaurantProfile({ user }: RestaurantProfileProps) {
  const accent = "#FF7A00";

  return (
    <div className="min-h-screen bg-[#0a0806] pb-24">
      {/* Luxury menu hero */}
      <div className="relative overflow-hidden border-b border-amber-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/60 via-[#0a0806] to-[#0a0806]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #FF7A00 0%, transparent 55%)" }}
        />
        <div className="relative px-4 pb-8 pt-8 text-center">
          <p className="font-body text-[0.6rem] uppercase tracking-[0.35em] text-amber-500/70">Fine Dining</p>
          <div className="mt-4 flex justify-center">
            <PopitLens name={user.name} followers={user.followers} verified live={user.live} accent={accent} size={80} />
          </div>
          <h1 className="text-poster mt-4 text-4xl uppercase tracking-wide text-amber-50">{user.name}</h1>
          <p className="font-body mt-1 text-sm italic text-amber-200/50">{user.city} · Est. 2019</p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-6">
        <section className="rounded-2xl border border-amber-900/25 bg-amber-950/15 p-4">
          <h3 className="text-poster mb-1 text-lg uppercase tracking-widest text-amber-400">Tonight&apos;s Specials</h3>
          <p className="font-body mb-3 text-xs text-white/40">Chef&apos;s selection · changes daily</p>
          {["Wagyu Carpaccio — $32", "Seasonal Tasting Menu — $95", "Sommelier Pairing — +$45"].map((s) => (
            <p key={s} className="font-body border-b border-amber-900/20 py-2.5 text-sm text-amber-50/85 last:border-0">
              {s}
            </p>
          ))}
        </section>

        {(["starters", "mains", "desserts"] as const).map((section) => (
          <section key={section} className="rounded-2xl border border-white/8 bg-black/30 p-4">
            <h3 className="text-poster mb-4 text-lg uppercase tracking-[0.2em] text-white/90">{section}</h3>
            <div className="space-y-0">
              {MENU[section].map((item) => (
                <div key={item.name} className="flex items-baseline justify-between border-b border-white/5 py-3 last:border-0">
                  <span className="font-body text-sm text-white/80">{item.name}</span>
                  <span className="font-body text-sm tabular-nums text-amber-400/90">${item.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="grid grid-cols-2 gap-3">
          {[
            { label: "Hours", value: "5PM – 11PM" },
            { label: "Reservations", value: "Required Fri–Sat" },
            { label: "Wine List", value: "240 labels" },
            { label: "Private Dining", value: "12 seats" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-amber-900/20 bg-amber-950/10 p-3">
              <p className="font-body text-[0.6rem] uppercase tracking-widest text-amber-500/50">{item.label}</p>
              <p className="font-body text-sm text-amber-50/80">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/8 bg-black/40 p-4">
          <h3 className="text-poster mb-3 text-lg uppercase text-white/90">Ambiance</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-amber-900/40 to-black" />
            ))}
          </div>
        </section>

        <button
          type="button"
          className="rounded-xl py-4 font-body text-sm font-bold uppercase tracking-widest text-black"
          style={{ background: "linear-gradient(90deg, #FF7A00, #FFB347)" }}
        >
          Reserve a Table
        </button>
      </div>
    </div>
  );
}

export default memo(RestaurantProfile);
