"use client";

import { memo } from "react";
import { getHypeTier } from "@/components/pulse/hypeConfig";
import { getDistrictTheme } from "@/lib/city/districtIdentity";
import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import type { VerifiedBusiness } from "@/lib/city/businesses";
import type { WorldVenue } from "./livingWorldData";
import { IsoBlock } from "./IsoPrimitives";
import { isoCenter, pointsToPath, toIso } from "./isometric";

type LivingVenueProps = {
  venue: WorldVenue;
  business: VerifiedBusiness;
  selected: boolean;
  onSelect: (slug: string) => void;
};

function crowdCount(tier: ReturnType<typeof getHypeTier>) {
  if (tier === "max") return 14;
  if (tier === "onFire") return 11;
  if (tier === "surging") return 8;
  if (tier === "active" || tier === "building") return 5;
  return 2;
}

function venueColors(kind: WorldVenue["kind"], accent: string) {
  const base = { top: "#1A1A1A", left: "#111", right: "#0D0D0D" };
  switch (kind) {
    case "stadium":
      return { top: "#151820", left: "#0E1018", right: "#0A0C14" };
    case "nightclub":
      return { top: "#18101F", left: "#120A18", right: "#0E0814" };
    case "restaurant":
      return { top: "#1A1410", left: "#120E0A", right: "#0E0A08" };
    case "stage":
      return { top: "#1A1020", left: "#120818", right: "#0E0614" };
    case "pier":
      return { top: "#0A1820", left: "#081420", right: "#061018" };
    case "shopping":
      return { top: "#181418", left: "#100E12", right: "#0C0A0E" };
    default:
      return base;
  }
}

function LivingVenue({ venue, business, selected, onSelect }: LivingVenueProps) {
  const energy = deriveDistrictEnergy(business.vibeSignals, business.energy);
  const tier = getHypeTier(energy);
  const theme = getDistrictTheme(venue.district);
  const color = theme.primary;
  const colors = venueColors(venue.kind, color);
  const center = isoCenter(venue.gx, venue.gy, venue.w, venue.d, venue.h);
  const crowd = crowdCount(tier);

  const isCalm = tier === "calm";
  const isBuilding = tier === "building" || tier === "active";
  const isSurging = tier === "surging";
  const isOnFire = tier === "onFire" || tier === "max";

  const signBrightness = isCalm ? 0.25 : isBuilding ? 0.55 : isSurging ? 0.8 : 1;

  return (
    <g
      className="cursor-pointer"
      onClick={() => onSelect(business.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(business.slug)}
      style={{ filter: selected ? `drop-shadow(0 0 12px ${color})` : undefined }}
    >
      <IsoBlock
        gx={venue.gx}
        gy={venue.gy}
        w={venue.w}
        d={venue.d}
        h={venue.h}
        {...colors}
        stroke={selected ? color : "rgba(255,255,255,0.08)"}
      />

      {/* Signage / neon strip on roof edge */}
      <path
        d={`M ${toIso(venue.gx, venue.gy, venue.h).x},${toIso(venue.gx, venue.gy, venue.h).y} L ${toIso(venue.gx + venue.w, venue.gy, venue.h).x},${toIso(venue.gx + venue.w, venue.gy, venue.h).y}`}
        stroke={color}
        strokeWidth={isOnFire ? 3 : 2}
        opacity={signBrightness}
        className={isSurging || isOnFire ? "venue-neon-pulse" : undefined}
      />

      {/* Stadium arch */}
      {venue.kind === "stadium" && (
        <path
          d={`M ${toIso(venue.gx, venue.gy, venue.h).x},${toIso(venue.gx, venue.gy, venue.h).y} Q ${center.x},${center.y - 30} ${toIso(venue.gx + venue.w, venue.gy, venue.h).x},${toIso(venue.gx + venue.w, venue.gy, venue.h).y}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity={signBrightness * 0.7}
        />
      )}

      {/* Nightclub LED facade */}
      {venue.kind === "nightclub" && (
        <rect
          x={toIso(venue.gx + 0.3, venue.gy + venue.d * 0.3, venue.h * 0.5).x - 8}
          y={toIso(venue.gx + 0.3, venue.gy + venue.d * 0.3, venue.h * 0.5).y - 6}
          width={16}
          height={8}
          fill={color}
          opacity={signBrightness * 0.4}
          className="venue-neon-pulse"
        />
      )}

      {/* Restaurant awning */}
      {venue.kind === "restaurant" && (
        <path
          d={pointsToPath([
            toIso(venue.gx - 0.1, venue.gy, venue.h + 0.15),
            toIso(venue.gx + venue.w / 2, venue.gy - 0.2, venue.h + 0.35),
            toIso(venue.gx + venue.w + 0.1, venue.gy, venue.h + 0.15),
          ])}
          fill={color}
          opacity={signBrightness * 0.5}
        />
      )}

      {/* Visitors / crowd at base */}
      {Array.from({ length: crowd }).map((_, i) => {
        const angle = (i / crowd) * Math.PI * 2;
        const bx = center.x + Math.cos(angle) * (12 + (i % 3) * 4);
        const by = center.y + 8 + Math.sin(angle) * 4;
        return (
          <circle
            key={i}
            cx={bx}
            cy={by}
            r={isOnFire ? 2.2 : 1.6}
            fill={i % 2 === 0 ? "rgba(255,255,255,0.5)" : color}
            opacity={0.6 + (i % 3) * 0.1}
            className={isSurging || isOnFire ? "world-crowd-bob" : undefined}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        );
      })}

      {/* Low — heat shimmer */}
      {[0, 1, 2].map((i) => (
        <ellipse
          key={`heat-${i}`}
          cx={center.x}
          cy={center.y - 10 - i * 8}
          rx={8 + i * 2}
          ry={2}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          opacity={isCalm ? 0.15 : 0.35}
          className="heat-wave-rise"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      {/* Building+ — vertical energy rays */}
      {(isBuilding || isSurging || isOnFire) &&
        [-1, 0, 1].map((o, i) => (
          <line
            key={`ray-${i}`}
            x1={center.x + o * 6}
            y1={center.y - 4}
            x2={center.x + o * 3}
            y2={center.y - 40 - (isSurging || isOnFire ? 20 : 0)}
            stroke={color}
            strokeWidth={isOnFire ? 2 : 1.2}
            className="energy-ray-rise"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

      {/* Surging — spotlights */}
      {(isSurging || isOnFire) &&
        [-1, 1].map((side, i) => (
          <g key={`spot-${i}`} className="world-spotlight" style={{ animationDelay: `${i * 0.5}s` }}>
            <line
              x1={center.x + side * 20}
              y1={center.y - venue.h * 18}
              x2={center.x}
              y2={center.y - 60}
              stroke={color}
              strokeWidth="1"
              opacity="0.4"
            />
            <ellipse cx={center.x} cy={center.y - 55} rx={18} ry={4} fill={color} opacity="0.15" />
          </g>
        ))}

      {/* Surging+ — electric particles */}
      {(isSurging || isOnFire) &&
        Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={`spark-${i}`}
            cx={center.x + (i - 4) * 4}
            cy={center.y - 20 - (i % 4) * 6}
            r={1.5}
            fill={i % 2 === 0 ? color : "#FFF"}
            className="electric-spark"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

      {/* On Fire — fireworks, flashes, confetti */}
      {isOnFire && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={`fw-${i}`} className="firework-pop" style={{ animationDelay: `${i * 0.5}s` }}>
              <line x1={center.x} y1={center.y - 35} x2={center.x - 10} y2={center.y - 55} stroke={color} strokeWidth="1" />
              <line x1={center.x} y1={center.y - 35} x2={center.x + 10} y2={center.y - 55} stroke="#FFF" strokeWidth="0.8" />
            </g>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={`conf-${i}`}
              x={center.x + (i - 5) * 5}
              y={center.y - 30 - (i % 5) * 8}
              width={2}
              height={2}
              fill={["#FF4D6D", "#00D4FF", "#FFD700", "#A855F7"][i % 4]}
              className="world-confetti"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
          <circle cx={center.x + 12} cy={center.y - 15} r={10} fill="#FFF" className="camera-flash-pop" opacity="0" />
          <ellipse cx={center.x - 10} cy={center.y - 25} rx={14} ry={3} fill="rgba(255,255,255,0.4)" className="lens-flare-sweep" />
        </>
      )}

      {/* MAX — city beacon */}
      {tier === "max" && (
        <>
          <rect
            x={center.x - 4}
            y={20}
            width={8}
            height={center.y - 30}
            fill={color}
            opacity="0.35"
            className="city-beacon"
          />
          <circle cx={center.x} cy={center.y - 8} r={6} fill="#FFF" style={{ filter: `drop-shadow(0 0 16px ${color})` }} />
        </>
      )}

      {/* Label */}
      <text
        x={center.x}
        y={center.y + 22}
        textAnchor="middle"
        fill={selected ? color : "rgba(255,255,255,0.55)"}
        fontSize="9"
        fontFamily="var(--font-display)"
        letterSpacing="0.08em"
      >
        {venue.label.toUpperCase()}
      </text>
    </g>
  );
}

export default memo(LivingVenue);
