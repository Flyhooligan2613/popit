"use client";

import { memo, useEffect, useState } from "react";
import type { TimePeriod } from "./types";

type CityStatusPanelProps = {
  city: string | null;
  connected?: boolean;
  onClick?: () => void;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function periodFromHour(h: number): TimePeriod {
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 20) return "sunset";
  if (h >= 20) return "night";
  return "late-night";
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

function CityStatusPanel({ city, connected = true, onClick }: CityStatusPanelProps) {
  const [time, setTime] = useState("--:--");
  const [period, setPeriod] = useState<TimePeriod>(() => periodFromHour(new Date().getHours()));

  useEffect(() => {
    let timeoutId = 0;

    const tick = () => {
      const now = new Date();
      setTime(formatTime(now));
      setPeriod((prev) => {
        const next = periodFromHour(now.getHours());
        return prev === next ? prev : next;
      });

      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;
      timeoutId = window.setTimeout(tick, msUntilNextMinute);
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, []);

  const cityShort = shortCityName(city);
  const temp = tempForPeriod(period, city);

  return (
    <button
      type="button"
      className="connection-card connection-card-mock connection-card-polish connection-card-stable popit-tap-target"
      aria-label={`Weather and connection for ${cityShort}. Tap for full report.`}
      onClick={onClick}
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
    </button>
  );
}

export default memo(CityStatusPanel);
