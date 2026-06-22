"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { TimePeriod } from "./types";

type WeatherReportSheetProps = {
  open: boolean;
  city: string | null;
  period: TimePeriod;
  onClose: () => void;
};

function tempForPeriod(period: TimePeriod, city: string | null): number {
  const base = city?.toLowerCase().includes("miami") ? 82 : 74;
  const offset =
    period === "morning" ? -4 : period === "afternoon" ? 2 : period === "sunset" ? 0 : period === "night" ? -6 : -2;
  return base + offset;
}

function conditionForPeriod(period: TimePeriod): { label: string; icon: string; detail: string } {
  switch (period) {
    case "morning":
      return { label: "Partly Sunny", icon: "🌤", detail: "Light breeze · great for brunch spots" };
    case "afternoon":
      return { label: "Warm & Bright", icon: "☀️", detail: "UV moderate · stay hydrated out there" };
    case "sunset":
      return { label: "Golden Hour", icon: "🌅", detail: "Rooftops and waterfront are peaking" };
    case "night":
      return { label: "Clear Night", icon: "🌙", detail: "Perfect nightlife conditions" };
    default:
      return { label: "Clear Skies", icon: "✨", detail: "Late-night spots still active" };
  }
}

export default function WeatherReportSheet({ open, city, period, onClose }: WeatherReportSheetProps) {
  const [mounted, setMounted] = useState(false);
  const cityLabel = city ?? "Your City";
  const temp = tempForPeriod(period, city);
  const condition = conditionForPeriod(period);
  const feelsLike = temp + (period === "afternoon" ? 3 : period === "night" ? -2 : 0);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="weather-sheet-portal">
          <motion.button
            type="button"
            className="weather-sheet-backdrop"
            aria-label="Close weather report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="weather-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="weather-sheet-title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="weather-sheet-handle" aria-hidden />
            <header className="weather-sheet-header">
              <p className="weather-sheet-kicker font-body">Current conditions</p>
              <h2 id="weather-sheet-title" className="weather-sheet-city font-display">
                {cityLabel}
              </h2>
            </header>

            <div className="weather-sheet-hero">
              <span className="weather-sheet-icon" aria-hidden>
                {condition.icon}
              </span>
              <p className="weather-sheet-temp font-display">{temp}°</p>
              <p className="weather-sheet-condition font-body">{condition.label}</p>
            </div>

            <ul className="weather-sheet-stats font-body">
              <li>
                <span>Feels like</span>
                <strong>{feelsLike}°</strong>
              </li>
              <li>
                <span>Wind</span>
                <strong>8 mph NE</strong>
              </li>
              <li>
                <span>Humidity</span>
                <strong>{period === "afternoon" ? "68%" : "72%"}</strong>
              </li>
              <li>
                <span>City vibe</span>
                <strong>{period === "night" ? "Nightlife peak" : "Building energy"}</strong>
              </li>
            </ul>

            <p className="weather-sheet-detail font-body">{condition.detail}</p>

            <button type="button" className="weather-sheet-close font-body" onClick={onClose}>
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
