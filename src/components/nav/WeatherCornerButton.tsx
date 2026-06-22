"use client";

import { memo, useEffect, useState } from "react";
import WeatherReportSheet from "@/components/welcome/WeatherReportSheet";
import { loadUserProfile } from "@/lib/identity/userProfile";
import { useTimeOfDay } from "@/components/welcome/useTimeOfDay";

function WeatherCornerButton() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState<string | null>("Miami");
  const timePeriod = useTimeOfDay();

  useEffect(() => {
    loadUserProfile().then((user) => setCity(user.city));
  }, []);

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
