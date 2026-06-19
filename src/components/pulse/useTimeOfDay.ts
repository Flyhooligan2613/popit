"use client";

import { useEffect, useMemo, useState } from "react";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "lateNight";

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "lateNight";
}

const GREETINGS: Record<TimeOfDay, string> = {
  morning: "Something's Starting Near You.",
  afternoon: "Your City Is Buzzing.",
  evening: "Tonight Is Going To Be Unforgettable.",
  lateNight: "The Night Is Still Alive.",
};

const SUB_GREETINGS: Record<TimeOfDay, string> = {
  morning: "Where life is starting to happen near you.",
  afternoon: "Step into your city's heartbeat.",
  evening: "See where the night is coming alive.",
  lateNight: "The city hasn't slowed down yet.",
};

export function useLiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeOfDay = getTimeOfDay(now.getHours());

  const formatted = useMemo(() => {
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${day} · ${time}`;
  }, [now]);

  return {
    greeting: GREETINGS[timeOfDay],
    subGreeting: SUB_GREETINGS[timeOfDay],
    formatted,
    timeOfDay,
  };
}
