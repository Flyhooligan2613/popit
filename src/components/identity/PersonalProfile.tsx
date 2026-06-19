"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";

type PersonalProfileProps = {
  user: UserProfile;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
      <h3 className="text-poster mb-3 text-lg uppercase tracking-wider text-white/90">{title}</h3>
      {children}
    </section>
  );
}

function PersonalProfile({ user }: PersonalProfileProps) {
  const accent = getIdentityAccent(user.identity);

  return (
    <div className="min-h-screen bg-[#050505] pb-24">
      {/* Passport header */}
      <div className="relative overflow-hidden border-b border-white/10 px-4 pb-8 pt-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accent}44 0%, transparent 60%)`,
          }}
        />
        <div className="relative flex flex-col items-center">
          <PopitLens
            name={user.name}
            followers={user.followers}
            influence={user.pulseScore}
            verified={user.verified}
            live={user.live}
            accent={accent}
            size={96}
          />
          <motion.h1
            className="text-poster mt-4 text-4xl uppercase tracking-wide text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {user.name}
          </motion.h1>
          <p className="font-body mt-1 text-sm uppercase tracking-[0.2em] text-white/45">{user.city}</p>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Following", value: user.following },
            { label: "Pulse Score", value: user.pulseScore },
            { label: "Energy", value: `${user.energy}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-black/40 py-3">
              <p className="text-poster text-2xl text-white">{stat.value}</p>
              <p className="font-body text-[0.6rem] uppercase tracking-widest text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-6">
        <Section title="Live Status">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${user.live ? "animate-pulse bg-[#FF4D6D]" : "bg-emerald-400"}`} />
            <span className="font-body text-sm text-white/80">
              {user.live ? "Broadcasting live in the city" : "Exploring the city"}
            </span>
          </div>
          <p className="font-body mt-2 text-sm italic text-white/55">{user.currentVibe}</p>
        </Section>

        <Section title="Favorite Districts">
          <div className="flex flex-wrap gap-2">
            {["Wynwood", "Brickell", "South Beach", "Design District"].map((d) => (
              <span key={d} className="rounded-full border border-white/15 px-3 py-1 font-body text-xs text-white/70">
                {d}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Moments">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02]" />
            ))}
          </div>
        </Section>

        <Section title="Pinned Memories">
          <div className="space-y-2">
            {["Sunset at Rooftop", "District Block Party", "First Live Stream"].map((m) => (
              <div key={m} className="flex items-center gap-3 rounded-lg border border-white/6 bg-black/30 px-3 py-2">
                <div className="h-8 w-8 rounded-lg bg-white/10" />
                <span className="font-body text-sm text-white/75">{m}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Friends">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {["Alex", "Jordan", "Sam", "Riley"].map((f) => (
              <div key={f} className="flex shrink-0 flex-col items-center gap-1">
                <PopitLens name={f} followers={1200 + f.length * 400} size={48} accent={accent} />
                <span className="font-body text-[0.55rem] text-white/50">{f}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Activity Timeline">
          {[
            { t: "2h ago", a: "Checked in at Neon Lounge" },
            { t: "5h ago", a: "Posted a moment in Wynwood" },
            { t: "1d ago", a: "Earned Night Owl achievement" },
          ].map((item) => (
            <div key={item.a} className="flex gap-3 border-b border-white/5 py-2 last:border-0">
              <span className="font-body text-[0.65rem] text-white/35">{item.t}</span>
              <span className="font-body text-sm text-white/70">{item.a}</span>
            </div>
          ))}
        </Section>

        <Section title="Favorite Venues">
          <div className="grid grid-cols-2 gap-2">
            {["Neon Lounge", "Pulse Kitchen", "Skyline Club"].map((v) => (
              <div key={v} className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
                <p className="font-body text-sm font-semibold text-white/85">{v}</p>
                <p className="font-body text-[0.65rem] text-white/40">12 visits</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Achievements">
          <div className="flex flex-wrap gap-2">
            {["City Explorer", "Night Owl", "Pulse 90+", "District VIP"].map((a) => (
              <span
                key={a}
                className="rounded-lg border px-3 py-1.5 font-body text-xs"
                style={{ borderColor: `${accent}55`, color: accent }}
              >
                {a}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Recent Check-ins">
          {["Neon Lounge · Tonight", "Art Walk · Yesterday", "Beach Club · 3d ago"].map((c) => (
            <p key={c} className="font-body border-b border-white/5 py-2 text-sm text-white/65 last:border-0">
              {c}
            </p>
          ))}
        </Section>
      </div>
    </div>
  );
}

export default memo(PersonalProfile);
