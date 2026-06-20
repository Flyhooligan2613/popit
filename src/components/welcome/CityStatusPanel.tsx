"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { TimePeriod } from "./types";

type CityStatusPanelProps = {
  city: string | null;
  connected?: boolean;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function tempForPeriod(period: TimePeriod, city: string | null): string {
  const base = city?.toLowerCase().includes("miami") ? 82 : 74;
  const offset =
    period === "morning" ? -4 : period === "afternoon" ? 2 : period === "sunset" ? 0 : period === "night" ? -6 : -2;
  return `${base + offset}°`;
}

export default function CityStatusPanel({ city, connected = true }: CityStatusPanelProps) {
  const [time, setTime] = useState("--:--");
  const [period, setPeriod] = useState<TimePeriod>("night");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(formatTime(now));
      const h = now.getHours();
      if (h >= 5 && h < 11) setPeriod("morning");
      else if (h >= 11 && h < 17) setPeriod("afternoon");
      else if (h >= 17 && h < 20) setPeriod("sunset");
      else if (h >= 20) setPeriod("night");
      else setPeriod("late-night");
    };
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  const cityLabel = city ?? "Your City";
  const temp = tempForPeriod(period, city);

  return (
    <motion.div
      className="connection-card"
      aria-label={`Connected to ${cityLabel}`}
      animate={{ boxShadow: ["0 4px 24px rgba(0,0,0,0.25)", "0 6px 32px rgba(0,212,255,0.08)", "0 4px 24px rgba(0,0,0,0.25)"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="connection-card-scan" aria-hidden />
      <div className="connection-card-row connection-card-city font-body">
        <span aria-hidden>📍</span>
        <span>{cityLabel}</span>
      </div>
      <div className="connection-card-row connection-card-meta font-body">
        <span>{time}</span>
        <span className="connection-card-sep" aria-hidden>
          ·
        </span>
        <span>{temp}</span>
      </div>
      {connected && (
        <div className="connection-card-linked font-body">
          <span className="connection-card-pulse" aria-hidden />
          <span className="connection-card-linked-dot" aria-hidden />
          Connected to City
        </div>
      )}
    </motion.div>
  );
}
