"use client";

import { useEffect, useMemo, useState } from "react";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import { energyLabelFromTier, energyTierFromValue, PULSE_CHANNELS } from "./data";
import type { CityEnergyState, PulseChannel } from "./types";

type UseCityEnergyOptions = {
  reducedMotion: boolean;
  initialEnergy?: number;
  initialExploring?: number;
};

export function useCityEnergy({
  reducedMotion,
  initialEnergy = 100,
  initialExploring = 3590,
}: UseCityEnergyOptions) {
  const [energy, setEnergy] = useState(initialEnergy);
  const [exploringCount, setExploringCount] = useState(initialExploring);
  const [minuteGain, setMinuteGain] = useState(18);
  const [pulse, setPulse] = useState<PulseChannel[]>(PULSE_CHANNELS);

  const tier = energyTierFromValue(energy);
  const isOverdrive = tier === "overdrive";
  const isOnFire = tier === "on-fire" || isOverdrive;
  const displayEnergy = useAnimatedNumber(energy, reducedMotion ? 0 : 800);
  const displayExploring = useAnimatedNumber(exploringCount, reducedMotion ? 0 : 700);

  const state: CityEnergyState = useMemo(
    () => ({
      energy,
      tier,
      label: energyLabelFromTier(tier),
      exploringCount,
      isOverdrive,
      isOnFire,
    }),
    [energy, tier, exploringCount, isOverdrive, isOnFire]
  );

  useEffect(() => {
    if (reducedMotion) return;

    const energyTimer = setInterval(() => {
      setEnergy((prev) => {
        // Bias downward so the meter opens blazing, then cools over time
        const drift = (Math.random() - 0.58) * 4.5;
        return Math.max(48, Math.min(100, prev + drift));
      });
    }, 6000);

    const exploreTimer = setInterval(() => {
      setExploringCount((c) => c + 1 + Math.floor(Math.random() * 3));
      setMinuteGain((m) => m + 1 + Math.floor(Math.random() * 2));
    }, 6000);

    const pulseTimer = setInterval(() => {
      setPulse((channels) =>
        channels.map((ch) => {
          const deltaDrift = Math.round((Math.random() - 0.35) * 3);
          const nextVal = Math.max(45, Math.min(100, ch.value + (Math.random() - 0.45) * 5));
          return {
            ...ch,
            value: nextVal,
            delta: Math.max(0, ch.delta + deltaDrift),
            isHottest: ch.key === "nightlife",
          };
        })
      );
    }, 7500);

    const minuteReset = setInterval(() => {
      setMinuteGain(8 + Math.floor(Math.random() * 14));
    }, 60_000);

    return () => {
      clearInterval(energyTimer);
      clearInterval(exploreTimer);
      clearInterval(pulseTimer);
      clearInterval(minuteReset);
    };
  }, [reducedMotion]);

  return {
    state,
    pulse,
    displayEnergy,
    displayExploring,
    minuteGain,
    energyNorm: energy / 100,
  };
}
