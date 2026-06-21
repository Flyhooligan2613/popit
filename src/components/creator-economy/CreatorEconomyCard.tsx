"use client";

import PopStatusBadge from "@/components/creator-economy/PopStatusBadge";
import CityCareerTrack from "@/components/creator-economy/CityCareerTrack";
import PopScorePanel from "@/components/creator-economy/PopScorePanel";
import { buildCreatorEconomyProfile } from "@/lib/creator-economy/buildProfile";
import { getUpcomingChannels } from "@/lib/creator-economy";
import type { PopScoreSignals } from "@/lib/creator-economy/types";

type CreatorEconomyCardProps = {
  signals: Partial<PopScoreSignals>;
  variant?: "personal" | "creator";
};

export default function CreatorEconomyCard({ signals, variant = "personal" }: CreatorEconomyCardProps) {
  const economy = buildCreatorEconomyProfile(signals);
  const upcoming = getUpcomingChannels(economy.career.level.id, 2);

  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-poster text-lg uppercase tracking-wider text-white/90">POP Status</h3>
          <p className="font-body mt-0.5 text-[0.65rem] text-white/40">{economy.career.level.tagline}</p>
        </div>
        <PopStatusBadge level={economy.career.level} />
      </div>

      <PopScorePanel breakdown={economy.popScore} compact />

      <div className="mt-4">
        <CityCareerTrack career={economy.career} compact />
      </div>

      {variant === "creator" && (
        <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-900/10 p-3">
          <p className="font-body text-[0.65rem] uppercase tracking-widest text-white/40">Ways to earn</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {economy.eligibleChannels.slice(0, 4).map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-purple-500/25 px-2.5 py-1 font-body text-xs text-white/75"
              >
                {c.icon} {c.label}
              </span>
            ))}
          </div>
          {upcoming[0] && (
            <p className="font-body mt-2 text-xs text-white/45">
              Next: {upcoming[0].icon} {upcoming[0].label} at {economy.career.nextLevel?.label ?? "max level"}
            </p>
          )}
        </div>
      )}

      <p className="font-body mt-3 text-xs text-white/40">
        {economy.lifetimeImpact.toLocaleString()} community actions influenced · POP Score {economy.popScore.score}
      </p>
    </section>
  );
}
