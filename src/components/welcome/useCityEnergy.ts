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
  initialEnergy = 92,
  initialExploring = 3482,
}: UseCityEnergyOptions) {
  const [energy, setEnergy] = useState(initialEnergy);
  const [exploringCount, setExploringCount] = useState(initialExploring);
  const [pulse, setPulse] = useState<PulseChannel[]>(PULSE_CHANNELS);

  const tier = energyTierFromValue(energy);
  const isOverdrive = tier === "overdrive";
  const displayEnergy = useAnimatedNumber(energy, reducedMotion ? 0 : 800);
  const displayExploring = useAnimatedNumber(exploringCount, reducedMotion ? 0 : 700);

  const state: CityEnergyState = useMemo(
    () => ({
      energy,
      tier,
      label: energyLabelFromTier(tier),
      exploringCount,
      isOverdrive,
    }),
    [energy, tier, exploringCount, isOverdrive]
  );

  useEffect(() => {
    if (reducedMotion) return;

    const energyTimer = setInterval(() => {
      setEnergy((prev) => {
        const drift = (Math.random() - 0.42) * 4;
        return Math.max(55, Math.min(100, prev + drift));
      });
    }, 4500);

    const exploreTimer = setInterval(() => {
      setExploringCount((c) => c + Math.floor(Math.random() * 6) + 2);
    }, 3200);

    const pulseTimer = setInterval(() => {
      setPulse((channels) =>
        channels.map((ch) => ({
          ...ch,
          value: Math.max(45, Math.min(100, ch.value + (Math.random() - 0.45) * 6)),
        }))
      );
    }, 5500);

    return () => {
      clearInterval(energyTimer);
      clearInterval(exploreTimer);
      clearInterval(pulseTimer);
    };
  }, [reducedMotion]);

  return {
    state,
    pulse,
    displayEnergy,
    displayExploring,
    energyNorm: energy / 100,
  };
}
