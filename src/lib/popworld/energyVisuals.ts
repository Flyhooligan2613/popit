import type { EnergyTier, EnergyVisualConfig } from "./types";

export function energyToTier(energy: number): EnergyTier {
  if (energy >= 90) return "legendary";
  if (energy >= 80) return "electric";
  if (energy >= 60) return "surge";
  if (energy >= 40) return "pulse";
  if (energy >= 20) return "warm";
  return "dim";
}

export const ENERGY_VISUALS: Record<EnergyTier, EnergyVisualConfig> = {
  dim: {
    tier: "dim",
    buildingOpacity: 0.35,
    emissiveIntensity: 0.08,
    windowGlow: 0.1,
    neonIntensity: 0,
    pulseSpeed: 0,
    particleCount: 0,
    searchlights: false,
    crowdGlow: false,
    heatShimmer: false,
    fireworks: false,
    roofLasers: false,
    lightning: false,
    districtReaction: false,
  },
  warm: {
    tier: "warm",
    buildingOpacity: 0.5,
    emissiveIntensity: 0.22,
    windowGlow: 0.35,
    neonIntensity: 0.2,
    pulseSpeed: 0.4,
    particleCount: 4,
    searchlights: false,
    crowdGlow: false,
    heatShimmer: false,
    fireworks: false,
    roofLasers: false,
    lightning: false,
    districtReaction: false,
  },
  pulse: {
    tier: "pulse",
    buildingOpacity: 0.65,
    emissiveIntensity: 0.4,
    windowGlow: 0.55,
    neonIntensity: 0.45,
    pulseSpeed: 0.8,
    particleCount: 10,
    searchlights: false,
    crowdGlow: false,
    heatShimmer: false,
    fireworks: false,
    roofLasers: false,
    lightning: false,
    districtReaction: false,
  },
  surge: {
    tier: "surge",
    buildingOpacity: 0.78,
    emissiveIntensity: 0.62,
    windowGlow: 0.72,
    neonIntensity: 0.65,
    pulseSpeed: 1.2,
    particleCount: 18,
    searchlights: true,
    crowdGlow: true,
    heatShimmer: false,
    fireworks: false,
    roofLasers: false,
    lightning: false,
    districtReaction: false,
  },
  electric: {
    tier: "electric",
    buildingOpacity: 0.88,
    emissiveIntensity: 0.82,
    windowGlow: 0.85,
    neonIntensity: 0.8,
    pulseSpeed: 1.6,
    particleCount: 28,
    searchlights: true,
    crowdGlow: true,
    heatShimmer: true,
    fireworks: false,
    roofLasers: false,
    lightning: false,
    districtReaction: true,
  },
  legendary: {
    tier: "legendary",
    buildingOpacity: 1,
    emissiveIntensity: 1,
    windowGlow: 1,
    neonIntensity: 1,
    pulseSpeed: 2.2,
    particleCount: 42,
    searchlights: true,
    crowdGlow: true,
    heatShimmer: true,
    fireworks: true,
    roofLasers: true,
    lightning: true,
    districtReaction: true,
  },
};

export function getEnergyVisuals(energy: number): EnergyVisualConfig {
  return ENERGY_VISUALS[energyToTier(energy)];
}

/** Blend accent color with energy for building extrusion */
export function energyColor(accent: string, energy: number): string {
  const tier = energyToTier(energy);
  const visuals = ENERGY_VISUALS[tier];
  const alpha = Math.round(visuals.emissiveIntensity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${accent}${alpha}`;
}
