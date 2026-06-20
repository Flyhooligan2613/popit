"use client";

import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import type { PulseChannel } from "./types";

type CityPulseProps = {
  channels: PulseChannel[];
  reducedMotion: boolean;
};

function PulseBar({ channel, reducedMotion }: { channel: PulseChannel; reducedMotion: boolean }) {
  const value = useAnimatedNumber(Math.round(channel.value), reducedMotion ? 0 : 900);

  return (
    <div className="city-pulse-row" data-channel={channel.key}>
      <div className="city-pulse-row-head">
        <span className="city-pulse-icon" aria-hidden>
          {channel.icon}
        </span>
        <span className="city-pulse-label font-body">{channel.label}</span>
        <span className="city-pulse-pct font-display">{value}%</span>
      </div>
      <div className="city-pulse-track">
        <motion.div
          className="city-pulse-fill"
          style={{ "--pulse-accent": channel.accent } as Record<string, string>}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: reducedMotion ? 0.15 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function CityPulse({ channels, reducedMotion }: CityPulseProps) {
  return (
    <section className="city-pulse" aria-label="City pulse by category">
      <h2 className="city-pulse-title font-display">City Pulse</h2>
      <div className="city-pulse-grid">
        {channels.map((channel) => (
          <PulseBar key={channel.key} channel={channel} reducedMotion={reducedMotion} />
        ))}
      </div>
    </section>
  );
}
