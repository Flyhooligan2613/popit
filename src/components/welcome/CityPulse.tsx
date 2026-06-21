"use client";

import { motion } from "framer-motion";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import type { PulseChannel } from "./types";

type CityPulseProps = {
  channels: PulseChannel[];
  reducedMotion: boolean;
  onChannelClick?: (channel: PulseChannel) => void;
  onSectionClick?: () => void;
};

function PulseRow({
  channel,
  reducedMotion,
  onClick,
}: {
  channel: PulseChannel;
  reducedMotion: boolean;
  onClick?: () => void;
}) {
  const value = useAnimatedNumber(Math.round(channel.value), reducedMotion ? 0 : 900);
  const delta = useAnimatedNumber(channel.delta, reducedMotion ? 0 : 700);

  return (
    <button
      type="button"
      className={`city-pulse-row city-pulse-row-v3 popit-tap-target ${channel.isHottest ? "is-hottest" : ""}`}
      data-channel={channel.key}
      onClick={onClick}
    >
      <div className="city-pulse-row-head">
        <span className="city-pulse-icon" aria-hidden>
          {channel.icon}
        </span>
        <span className="city-pulse-label font-body">{channel.label}</span>
        <motion.span
          key={value}
          className="city-pulse-pct font-display"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="city-pulse-meta font-body">
        <span className="city-pulse-delta">▲ +{delta}%</span>
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
        <div className="city-pulse-stream" aria-hidden />
        {!reducedMotion && <span className="city-pulse-spark" aria-hidden />}
      </div>
    </button>
  );
}

export default function CityPulse({ channels, reducedMotion, onChannelClick, onSectionClick }: CityPulseProps) {
  return (
    <section className="city-pulse city-pulse-v3 city-pulse-polish" aria-label="City pulse command center">
      <button type="button" className="city-pulse-title-wrap popit-tap-target" onClick={onSectionClick}>
        <h2 className="city-pulse-title font-display">
          <span className="city-pulse-title-dot" aria-hidden />
          City Pulse
        </h2>
      </button>
      <div className="city-pulse-grid">
        {channels.map((channel) => (
          <PulseRow
            key={channel.key}
            channel={channel}
            reducedMotion={reducedMotion}
            onClick={() => onChannelClick?.(channel)}
          />
        ))}
      </div>
    </section>
  );
}
