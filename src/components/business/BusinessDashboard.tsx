"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassPanel from "@/components/pulse/GlassPanel";
import HypeLevel, { HypeLabel } from "@/components/pulse/HypeLevel";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import type { VerifiedBusiness } from "@/lib/city/businesses";

type PulseMetric = { label: string; value: string; trend: string };

function buildMetrics(business: VerifiedBusiness, energy: number): PulseMetric[] {
  return [
    { label: "Check-ins", value: String(120 + energy * 3), trend: energy >= 70 ? "+18%" : "+4%" },
    { label: "Live Views", value: energy >= 85 ? "3.2K" : `${800 + energy * 12}`, trend: "+22%" },
    { label: "Momentum", value: `${energy}%`, trend: energy >= 90 ? "Surging" : "Building" },
    { label: "Community", value: String(business.friendsCheckedIn.length * 40 + 200), trend: "+9%" },
  ];
}

function BusinessDashboard({ business }: { business: VerifiedBusiness }) {
  const energy = deriveDistrictEnergy(business.vibeSignals, business.energy);
  const theme = getDistrictTheme(business.districtId);
  const metrics = buildMetrics(business, energy);

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="relative z-[1] mx-auto max-w-[680px] px-4 pb-28 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/business/${business.slug}`} className="font-body text-xs text-white/45">
            ← Destination
          </Link>
          <span className="text-poster text-[0.65rem] text-[#FF4D6D]/70">Owner Dashboard</span>
        </div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <h1 className="text-poster mb-1 text-2xl text-white">{business.name}</h1>
          <p className="font-body text-sm text-white/45">Understand your community momentum · Respond in real time</p>
        </motion.header>

        <GlassPanel weight="light" accent={theme.primary} className="mb-4 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-poster text-xs text-white/50">Community Pulse</span>
            <HypeLabel energy={energy} />
          </div>
          <HypeLevel energy={energy} seed={`dash-${business.slug}`} />
        </GlassPanel>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <GlassPanel key={m.label} hover={false} weight="light" powered={false} className="p-3">
              <p className="mb-1 font-body text-[0.55rem] uppercase tracking-wider text-white/30">{m.label}</p>
              <p className="text-poster text-xl text-white/90">{m.value}</p>
              <p className="font-body text-[0.6rem]" style={{ color: theme.primary }}>{m.trend}</p>
            </GlassPanel>
          ))}
        </div>

        <section className="mb-4">
          <h2 className="text-poster mb-2 text-sm text-white/45">Post Live Update</h2>
          <GlassPanel weight="light" accent={theme.primary} className="p-4">
            <textarea
              placeholder="Tell your community what's happening right now..."
              className="mb-3 w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 font-body text-sm text-white/80 placeholder:text-white/25 outline-none"
              rows={3}
            />
            <button
              type="button"
              className="w-full rounded-full py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: `linear-gradient(90deg, ${theme.primary}99, #A855F788)` }}
            >
              Publish to City
            </button>
          </GlassPanel>
        </section>

        <section className="mb-4">
          <h2 className="text-poster mb-2 text-sm text-white/45">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {["Post Special", "Add Event", "Update Wait", "Community Post"].map((action) => (
              <GlassPanel key={action} weight="light" accent={theme.primary} className="p-3 text-center">
                <span className="font-body text-xs font-semibold text-white/60">{action}</span>
              </GlassPanel>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(BusinessDashboard);
