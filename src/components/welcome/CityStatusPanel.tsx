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

function shortCityName(city: string | null): string {
  if (!city) return "Your City";
  return city;
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

  const cityShort = shortCityName(city);
  const temp = tempForPeriod(period, city);

  return (
    <motion.div
      className="connection-card connection-card-mock connection-card-polish"
      aria-label={`Connected to ${cityShort}`}
      animate={{ boxShadow: ["0 4px 24px rgba(0,0,0,0.25)", "0 6px 32px rgba(0,212,255,0.12)", "0 4px 24px rgba(0,0,0,0.25)"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="connection-card-scan" aria-hidden />
      <p className="connection-card-pin font-display">
        <span aria-hidden>📍 </span>
        {cityShort}
      </p>
      <p className="connection-card-time font-body">{time}</p>
      <p className="connection-card-temp font-body">{temp}</p>
      {connected && (
        <div className="connection-card-linked font-body">
          <span className="connection-card-linked-dot" aria-hidden />
          Connected
        </div>
      )}
    </motion.div>
  );
}
