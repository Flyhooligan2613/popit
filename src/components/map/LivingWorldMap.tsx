"use client";

import { memo, useMemo } from "react";
import type { VerifiedBusiness } from "@/lib/city/businesses";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import {
  AMBIENT_BLOCKS,
  WORLD_DISTRICTS,
  WORLD_PARKS,
  WORLD_STREETS,
  WORLD_VENUES,
  WORLD_WATER,
} from "./livingWorldData";
import { IsoBlock, IsoGroundTile, IsoTree } from "./IsoPrimitives";
import { pointsToPath, toIso } from "./isometric";
import LivingVenue from "./LivingVenue";

type LivingWorldMapProps = {
  businesses: VerifiedBusiness[];
  selectedSlug: string | null;
  onSelectVenue: (slug: string) => void;
};

function LivingWorldMap({ businesses, selectedSlug, onSelectVenue }: LivingWorldMapProps) {
  const businessBySlug = useMemo(() => new Map(businesses.map((b) => [b.slug, b])), [businesses]);

  const sortedVenues = useMemo(
    () =>
      [...WORLD_VENUES]
        .filter((v) => businessBySlug.has(v.businessSlug))
        .sort((a, b) => a.gx + a.gy - (b.gx + b.gy)),
    [businessBySlug]
  );

  return (
    <div className="world-sky relative h-full w-full overflow-hidden">
      {/* Atmospheric sky gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0618 0%, #12081a 25%, #050505 70%, #030303 100%)",
        }}
      />

      <svg viewBox="0 0 640 480" className="relative h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="worldGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#1a0828" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waterIso" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004466" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="worldNeon">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="640" height="480" fill="url(#worldGlow)" />

        {/* District ground personality washes */}
        {WORLD_DISTRICTS.map((d) => (
          <IsoGroundTile
            key={d.id}
            gx={d.gx}
            gy={d.gy}
            w={d.w}
            d={d.d}
            fill={d.color + "18"}
          />
        ))}

        {/* Water — Biscayne Bay waterfront */}
        <IsoGroundTile
          gx={WORLD_WATER.gx}
          gy={WORLD_WATER.gy}
          w={WORLD_WATER.w}
          d={WORLD_WATER.d}
          fill="url(#waterIso)"
        />
        <path
          d={pointsToPath([
            toIso(WORLD_WATER.gx, WORLD_WATER.gy, 0.03),
            toIso(WORLD_WATER.gx + WORLD_WATER.w, WORLD_WATER.gy, 0.03),
            toIso(WORLD_WATER.gx + WORLD_WATER.w, WORLD_WATER.gy + WORLD_WATER.d, 0.03),
            toIso(WORLD_WATER.gx, WORLD_WATER.gy + WORLD_WATER.d, 0.03),
          ])}
          fill="none"
          stroke="rgba(0,212,255,0.25)"
          strokeWidth="0.8"
          className="cinematic-water"
        />

        {/* Parks */}
        {WORLD_PARKS.map((park) => (
          <g key={park.label}>
            <IsoGroundTile gx={park.gx} gy={park.gy} w={park.w} d={park.d} fill="#0F2818" />
            {Array.from({ length: park.w * park.d }).map((_, i) => (
              <IsoTree key={i} gx={park.gx + (i % park.w) * 0.8 + 0.2} gy={park.gy + Math.floor(i / park.w) * 0.8 + 0.2} />
            ))}
          </g>
        ))}

        {/* Streets & intersections */}
        {WORLD_STREETS.map((street, i) => (
          <IsoGroundTile
            key={i}
            gx={street.gx}
            gy={street.gy}
            w={street.w}
            d={street.d}
            fill={street.major ? "#1E1E1E" : "#161616"}
          />
        ))}
        {/* Intersection highlights */}
        {[6, 9].map((gy) =>
          [3, 6, 9].map((gx) => {
            const p = toIso(gx, gy, 0.04);
            return <circle key={`${gx}-${gy}`} cx={p.x} cy={p.y} r={4} fill="rgba(255,200,80,0.08)" />;
          })
        )}

        {/* Ambient city blocks */}
        {AMBIENT_BLOCKS.map((b, i) => (
          <IsoBlock
            key={i}
            gx={b.gx}
            gy={b.gy}
            w={b.w}
            d={b.d}
            h={b.h}
            top="#161616"
            left="#101010"
            right="#0C0C0C"
          />
        ))}

        {/* Living verified venues — painter's order */}
        {sortedVenues.map((venue) => {
          const business = businessBySlug.get(venue.businessSlug)!;
          return (
            <LivingVenue
              key={venue.id}
              venue={venue}
              business={business}
              selected={selectedSlug === venue.businessSlug}
              onSelect={onSelectVenue}
            />
          );
        })}

        {/* District labels — subtle, not blueprint */}
        {WORLD_DISTRICTS.map((d) => {
          const p = toIso(d.gx + d.w / 2, d.gy, 0.5);
          return (
            <text
              key={d.id}
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fill={d.color}
              fontSize="8"
              fontFamily="var(--font-display)"
              opacity="0.3"
              letterSpacing="0.12em"
            >
              {d.label.toUpperCase()}
            </text>
          );
        })}

        {/* Cinematic vignette */}
        <rect
          width="640"
          height="480"
          fill="url(#worldGlow)"
          opacity="0.6"
          pointerEvents="none"
        />
      </svg>

      {/* Spider-Verse chromatic edge + HUD */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,77,109,0.2), transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.15), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between border-t border-white/[0.05] pt-2 font-body text-[0.5rem] uppercase tracking-[0.2em] text-white/20">
        <span>Miami · Live World</span>
        <span className="text-[#00D4FF]/40">Tap venue to fly in</span>
      </div>
    </div>
  );
}

export default memo(LivingWorldMap);
