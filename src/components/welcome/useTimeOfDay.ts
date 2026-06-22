"use client";

import { useEffect, useState } from "react";
import type { TimePeriod } from "@/components/welcome/types";
import { hourInTimezone } from "@/lib/location/zipLocation";
import { usePopitLocation } from "@/hooks/usePopitLocation";

function periodFromHour(hour: number): TimePeriod {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "sunset";
  if (hour >= 20 && hour < 24) return "night";
  return "late-night";
}

/** Local time-of-day for the user's ZIP timezone */
export function useTimeOfDay() {
  const { timezone } = usePopitLocation();
  const [period, setPeriod] = useState<TimePeriod>("night");

  useEffect(() => {
    const update = () => setPeriod(periodFromHour(hourInTimezone(timezone)));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, [timezone]);

  return period;
}
