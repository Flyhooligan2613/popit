"use client";

import { useEffect, useState } from "react";
import type { TimePeriod } from "./types";

function periodFromHour(hour: number): TimePeriod {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "sunset";
  if (hour >= 20 && hour < 24) return "night";
  return "late-night";
}

/** Future: merge with weather API, holidays, etc. */
export function useTimeOfDay() {
  const [period, setPeriod] = useState<TimePeriod>("night");

  useEffect(() => {
    const update = () => setPeriod(periodFromHour(new Date().getHours()));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return period;
}
