"use client";

import { memo, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import CardAmbient from "./CardAmbient";
import DistrictLiveContent from "./DistrictLiveContent";
import GlassPanel from "./GlassPanel";
import HypeLevel, { HypeLabel } from "./HypeLevel";
import { HypeLiveBadge } from "./LiveDot";
import PopitIcon, { FriendAvatars } from "./PopitIcon";
import { getHypeConfig } from "./hypeConfig";
import type { CityDistrict } from "./data";
import { CITY_DISTRICTS } from "./data";
import { useCountdown } from "./useCountdown";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import { usePersonalizedCity } from "./usePersonalizedCity";

function DistrictCountdown({ minutes, accent }: { minutes: number; accent: string }) {
  const countdown = useCountdown(minutes);
  return (
    <span className="font-body text-xs font-semibold tabular-nums" style={{ color: accent }}>
      {countdown}
    </span>
  );
}

type RankedDistrict = CityDistrict & { vibeEnergy: number; interestScore: number };

function DistrictCard({ district, delay }: { district: RankedDistrict; delay: number }) {
  const router = useRouter();
  const theme = getDistrictTheme(district.id);
  const hype = getHypeConfig(district.vibeEnergy);
  const intensifiedGlow =
    hype.tier === "max" || hype.tier === "onFire"
      ? "rgba(255,77,109,0.28)"
      : hype.tier === "surging"
        ? "rgba(168,85,247,0.2)"
        : theme.glow;

  return (
    <GlassPanel
      as="button"
      delay={delay}
      weight="light"
      glow={intensifiedGlow}
      accent={theme.primary}
      className="w-full overflow-hidden text-left"
      onClick={() => router.push(`/business/${district.businessSlug}`)}
    >
      {theme.rgb && (
        <div className="district-rgb absolute left-0 right-0 top-0 h-0.5 opacity-80" />
      )}
      <div className={`relative bg-gradient-to-br ${theme.innerGradient} px-4 py-3.5`}>
        {hype.showPulse && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(255,77,109,0.12), transparent 65%)",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <CardAmbient accent={theme.primary} variant={district.ambientVariant} />

        <div className="relative mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <PopitIcon type={district.icon} size={34} color={theme.primary} />
            <div>
              <span className="text-poster text-[0.6rem] tracking-[0.15em]" style={{ color: theme.secondary }}>
                {theme.label}
              </span>
              <p className="text-poster text-sm text-white/70">{district.name}</p>
            </div>
          </div>
          {district.live && <HypeLiveBadge energy={district.vibeEnergy} />}
        </div>

        <div className="relative mb-2">
          <p className="text-poster text-[clamp(1.25rem,4vw,1.6rem)] text-white/95">{district.moment}</p>
          <p className="mt-1 font-body text-xs text-white/45">{district.detail}</p>
        </div>

        <div className="relative mb-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg width="10" height="12" viewBox="0 0 10 12" className="shrink-0" aria-hidden>
                <path
                  d="M6 0 L2 7 H5 L4 12 L9 4 H6 Z"
                  fill="#FF4D6D"
                  style={{ filter: "drop-shadow(0 0 4px rgba(255,77,109,0.8))" }}
                />
              </svg>
              <span className="text-poster text-[0.7rem] tracking-wider text-white/55">Hype Level</span>
              <HypeLabel energy={district.vibeEnergy} />
            </div>
            {district.countdownMinutes != null && (
              <DistrictCountdown minutes={district.countdownMinutes} accent={theme.primary} />
            )}
          </div>
          <HypeLevel energy={district.vibeEnergy} seed={district.id} />
        </div>

        <DistrictLiveContent items={district.liveContent} accent={theme.primary} />

        <div className="relative mt-2.5 flex items-center justify-between gap-2 border-t border-white/[0.05] pt-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-[0.7rem] text-white/40">{district.friendActivity}</p>
            <div className="mt-1.5">
              <FriendAvatars names={district.friends} accent={theme.primary} />
            </div>
          </div>
          {district.metric && (
            <span className="shrink-0 font-body text-[0.65rem] font-medium text-white/35">
              {district.metric}
            </span>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}

function CityDistricts() {
  const { interests } = usePersonalizedCity();
  const router = useRouter();

  const districts = useMemo<RankedDistrict[]>(() => {
    return CITY_DISTRICTS.map((district) => ({
      ...district,
      vibeEnergy: deriveDistrictEnergy(district.vibeSignals, district.energy),
      interestScore: district.interests.filter((i) => interests.includes(i)).length,
    })).sort((a, b) => {
      if (b.interestScore !== a.interestScore) return b.interestScore - a.interestScore;
      return b.vibeEnergy - a.vibeEnergy;
    });
  }, [interests]);

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between px-0.5">
        <h2 className="text-poster text-sm text-white/45">Districts</h2>
        <button
          type="button"
          onClick={() => router.push("/map")}
          className="font-body text-[0.65rem] text-[#00D4FF]/70"
        >
          Open POP WORLD →
        </button>
      </div>

      <div className="flex flex-col gap-3.5">
        {districts.map((district, i) => (
          <DistrictCard key={district.id} district={district} delay={0.15 + i * 0.06} />
        ))}
      </div>
    </section>
  );
}

export default memo(CityDistricts);
