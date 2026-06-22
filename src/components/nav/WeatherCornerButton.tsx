"use client";

import { memo, useState } from "react";
import WeatherReportSheet from "@/components/welcome/WeatherReportSheet";
import { useTimeOfDay } from "@/components/welcome/useTimeOfDay";
import { useResolvedCity } from "@/hooks/useResolvedCity";

function WeatherCornerButton() {
  const [open, setOpen] = useState(false);
  const city = useResolvedCity();
  const timePeriod = useTimeOfDay();

  const temp = city?.toLowerCase().includes("miami") ? 82 : 74;

  return (
    <>
      <button
        type="button"
        className="app-weather-corner"
        aria-label="City weather"
        onClick={() => setOpen(true)}
      >
        <span className="app-weather-corner__icon" aria-hidden>
          🌤
        </span>
        <span className="app-weather-corner__temp">{temp}°</span>
      </button>
      <WeatherReportSheet open={open} city={city} period={timePeriod} onClose={() => setOpen(false)} />
    </>
  );
}

export default memo(WeatherCornerButton);
