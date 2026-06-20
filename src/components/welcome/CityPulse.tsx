"use client";

import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import type { PulseChannel } from "./types";

type CityPulseProps = {
  channels: PulseChannel[];
  reducedMotion: boolean;
};

function PulseRow({ channel, reducedMotion }: { channel: PulseChannel; reducedMotion: boolean }) {
  const value = useAnimatedNumber(Math.round(channel.value), reducedMotion ? 0 : 900);

  return (
    <div className={`city-pulse-row city-pulse-row-v2 ${channel.isHottest ? "is-hottest" : ""}`} data-channel={channel.key}>
      <div className="city-pulse-row-head">
        <span className="city-pulse-icon" aria-hidden>
          {channel.icon}
        </span>
        <span className="city-pulse-label font-body">{channel.label}</span>
        <span className="city-pulse-pct font-display">{value}%</span>
      </div>
      <div className="city-pulse-meta font-body">
        <span className="city-pulse-delta">▲ +{channel.delta}%</span>
        <span className="city-pulse-status">
          {channel.isHottest && <span className="city-pulse-hot-tag" aria-hidden>🔥 </span>}
          {channel.statusLabel}
        </span>
      </div>
      <div className="city-pulse-track">
        <motion.div
          className="city-pulse-fill"
          style={{ "--pulse-accent": channel.accent } as Record<string, string>}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: reducedMotion ? 0.15 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="city-pulse-glow" aria-hidden />
      </div>
    </div>
  );
}

export default function CityPulse({ channels, reducedMotion }: CityPulseProps) {
  return (
    <section className="city-pulse city-pulse-v2" aria-label="City pulse command center">
      <h2 className="city-pulse-title font-display">City Pulse</h2>
      <div className="city-pulse-grid">
        {channels.map((channel) => (
          <PulseRow key={channel.key} channel={channel} reducedMotion={reducedMotion} />
        ))}
      </div>
    </section>
  );
}
