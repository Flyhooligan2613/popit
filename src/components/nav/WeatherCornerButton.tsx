"use client";

import { memo, useState } from "react";
import WeatherReportSheet from "@/components/welcome/WeatherReportSheet";
import { useTimeOfDay } from "@/components/welcome/useTimeOfDay";
import { usePopitLocation } from "@/hooks/usePopitLocation";
import { estimateTempFromLocation, hourInTimezone } from "@/lib/location/zipLocation";

function WeatherCornerButton() {
  const [open, setOpen] = useState(false);
  const { city, label, location, timezone } = usePopitLocation();
  const timePeriod = useTimeOfDay();
  const hour = hourInTimezone(timezone);
  const temp = estimateTempFromLocation(location, hour);

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
      <WeatherReportSheet
        open={open}
        city={city}
        locationLabel={label}
        zipCode={location?.zipCode}
        period={timePeriod}
        temp={temp}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default memo(WeatherCornerButton);
