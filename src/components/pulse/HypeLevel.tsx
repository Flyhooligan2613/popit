"use client";

import { memo, useId, useMemo } from "react";
import { motion } from "framer-motion";
import { getBoltReach, getHypeConfig } from "./hypeConfig";
import "./pulse.css";

const BOLT_PATH =
  "M 0 14 L 18 9 L 32 17 L 48 7 L 64 15 L 78 5 L 96 13 L 112 8 L 128 18 L 144 6 L 160 14 L 176 10 L 192 16 L 200 12";

type HypeLevelProps = {
  energy: number;
  seed?: string;
};

function seededRandom(seed: string, index: number) {
  let h = 0;
  const s = `${seed}-${index}`;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return ((h >>> 0) % 1000) / 1000;
}

function HypeLevel({ energy, seed = "hype" }: HypeLevelProps) {
  const uid = useId().replace(/:/g, "");
  const config = useMemo(() => getHypeConfig(energy), [energy]);
  const reach = getBoltReach(energy);

  const arcs = useMemo(
    () =>
      Array.from({ length: config.showArcs ? 3 : 0 }, (_, i) => ({
        id: i,
        x: 15 + seededRandom(seed, i) * 70,
        delay: seededRandom(seed, i + 10) * 2,
      })),
    [config.showArcs, seed]
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: config.showSparks ? 5 : 0 }, (_, i) => ({
        id: i,
        x: 10 + seededRandom(seed, i + 20) * 80,
        delay: seededRandom(seed, i + 30) * 1.5,
      })),
    [config.showSparks, seed]
  );

  const embers = useMemo(
    () =>
      Array.from({ length: config.showEmbers ? 6 : 0 }, (_, i) => ({
        id: i,
        x: 8 + seededRandom(seed, i + 40) * 84,
        delay: seededRandom(seed, i + 50) * 2.5,
      })),
    [config.showEmbers, seed]
  );

  const flames = useMemo(
    () =>
      Array.from({ length: config.showFlames ? 4 : 0 }, (_, i) => ({
        id: i,
        x: 12 + i * 22,
        delay: i * 0.35,
      })),
    [config.showFlames]
  );

  const radiate = useMemo(
    () =>
      Array.from({ length: config.showRadiate ? 8 : 0 }, (_, i) => ({
        id: i,
        angle: (i / 8) * 360,
        delay: i * 0.08,
      })),
    [config.showRadiate]
  );

  return (
    <div className="relative w-full" style={{ height: 36 }}>
      {config.showPulse && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${config.glow}, transparent 70%)` }}
          animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.98, 1.04, 0.98] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        className={`relative h-full w-full ${config.vibrate ? "hype-bolt-vibrate" : ""}`}
        style={{ filter: `drop-shadow(0 0 ${config.tier === "max" ? 14 : 8}px ${config.glow})` }}
      >
        <svg
          viewBox="0 0 200 24"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-base`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.gradient[0]} stopOpacity="0.5" />
              <stop offset="50%" stopColor={config.gradient[1]} stopOpacity="1" />
              <stop offset="100%" stopColor={config.gradient[2]} stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id={`${uid}-core`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor={config.coreColor} stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <clipPath id={`${uid}-clip`}>
              <rect x="0" y="0" width={200 * reach} height="24" />
            </clipPath>
          </defs>

          <path
            d={BOLT_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={config.strokeWidth + 1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g clipPath={`url(#${uid}-clip)`}>
            <path
              d={BOLT_PATH}
              fill="none"
              stroke={`url(#${uid}-base)`}
              strokeWidth={config.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={BOLT_PATH}
              fill="none"
              stroke={`url(#${uid}-core)`}
              strokeWidth={config.strokeWidth * 0.45}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={config.tier === "calm" ? 0.5 : 0.85}
            />

            <path
              d={BOLT_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={config.strokeWidth * 0.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 40"
              className="hype-flow-dash"
              style={{ animationDuration: `${config.flowDuration}s` }}
              opacity={0.7}
            />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${(1 - reach) * 100}% 0 0)` }}>
          <div
            className="hype-shimmer absolute top-1/2 h-3 w-16 -translate-y-1/2 rounded-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${config.coreColor}, #FFFFFF, transparent)`,
              animationDuration: `${config.flowDuration * 0.8}s`,
            }}
          />
        </div>

        {flames.map((f) => (
          <motion.div
            key={`flame-${f.id}`}
            className="pointer-events-none absolute top-1 h-2 w-1.5 rounded-full"
            style={{
              left: `${f.x}%`,
              background: "linear-gradient(180deg, #FF7A00, #FF4D6D, transparent)",
              boxShadow: "0 0 6px #FF7A00",
            }}
            animate={{ scaleY: [0.6, 1.2, 0.8, 1.1, 0.6], opacity: [0.5, 1, 0.7, 1, 0.5] }}
            transition={{ duration: 0.5 + f.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {arcs.map((a) => (
          <motion.span
            key={`arc-${a.id}`}
            className="pointer-events-none absolute top-1/2 h-3 w-px origin-bottom"
            style={{
              left: `${a.x}%`,
              background: `linear-gradient(180deg, ${config.coreColor}, transparent)`,
            }}
            animate={{ scaleY: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.6, delay: a.delay, repeat: Infinity, repeatDelay: 1.2 + a.delay }}
          />
        ))}

        {sparks.map((s) => (
          <motion.span
            key={`spark-${s.id}`}
            className="pointer-events-none absolute top-1/2 h-1 w-1 rounded-full bg-white"
            style={{ left: `${s.x}%`, boxShadow: `0 0 4px ${config.coreColor}` }}
            animate={{ x: [0, 6 + s.id * 2, 12], y: [-2, -6, -10], opacity: [1, 0.6, 0], scale: [1, 0.5, 0] }}
            transition={{ duration: 0.5, delay: s.delay, repeat: Infinity, repeatDelay: 0.8 }}
          />
        ))}

        {embers.map((e) => (
          <span
            key={`ember-${e.id}`}
            className="hype-ember pointer-events-none absolute top-0 h-1 w-1 rounded-full bg-[#FF7A00]"
            style={{
              left: `${e.x}%`,
              animationDuration: `${1.5 + e.delay}s`,
              animationDelay: `${e.delay}s`,
              boxShadow: "0 0 4px #FF7A00",
            }}
          />
        ))}
      </div>

      {config.showBorderArcs &&
        [0, 1].map((i) => (
          <motion.div
            key={`border-arc-${i}`}
            className="pointer-events-none absolute rounded-full border"
            style={{
              width: 20,
              height: 20,
              borderColor: config.coreColor,
              top: i === 0 ? -4 : "auto",
              bottom: i === 1 ? -4 : "auto",
              left: i === 0 ? "8%" : "auto",
              right: i === 1 ? "8%" : "auto",
              opacity: 0.4,
            }}
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, delay: i * 0.7, repeat: Infinity }}
          />
        ))}

      {radiate.map((r) => (
        <motion.span
          key={`rad-${r.id}`}
          className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
          style={{ background: config.coreColor }}
          animate={{
            x: [0, Math.cos((r.angle * Math.PI) / 180) * 28],
            y: [0, Math.sin((r.angle * Math.PI) / 180) * 12],
            opacity: [0.8, 0],
            scale: [1, 0.2],
          }}
          transition={{ duration: 1.2, delay: r.delay, repeat: Infinity, repeatDelay: 0.5 }}
        />
      ))}
    </div>
  );
}

export function HypeLabel({ energy }: { energy: number }) {
  const config = getHypeConfig(energy);
  return (
    <span
      className="font-body text-[0.58rem] font-bold uppercase tracking-[0.16em]"
      style={{
        color: config.tier === "calm" ? "rgba(0,212,255,0.7)" : config.tier === "max" || config.tier === "onFire" ? "#FF4D6D" : "rgba(255,255,255,0.55)",
        textShadow: config.tier === "max" ? "0 0 12px rgba(255,77,109,0.6)" : undefined,
      }}
    >
      {config.label}
    </span>
  );
}

export default memo(HypeLevel);
