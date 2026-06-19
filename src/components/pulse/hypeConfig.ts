export type HypeTier = "calm" | "building" | "active" | "surging" | "onFire" | "max";

export type HypeConfig = {
  tier: HypeTier;
  label: string;
  strokeWidth: number;
  glow: string;
  flowDuration: number;
  vibrate: boolean;
  showArcs: boolean;
  showSparks: boolean;
  showEmbers: boolean;
  showFlames: boolean;
  showBorderArcs: boolean;
  showPulse: boolean;
  showRadiate: boolean;
  livePulseDuration: number;
  gradient: [string, string, string];
  coreColor: string;
};

export function getHypeTier(energy: number): HypeTier {
  if (energy >= 100) return "max";
  if (energy >= 95) return "onFire";
  if (energy >= 85) return "surging";
  if (energy >= 60) return "active";
  if (energy >= 30) return "building";
  return "calm";
}

export function getHypeConfig(energy: number): HypeConfig {
  const tier = getHypeTier(energy);

  const configs: Record<HypeTier, Omit<HypeConfig, "tier">> = {
    calm: {
      label: "CALM",
      strokeWidth: 1.4,
      glow: "rgba(0,212,255,0.35)",
      flowDuration: 3.2,
      vibrate: false,
      showArcs: false,
      showSparks: false,
      showEmbers: false,
      showFlames: false,
      showBorderArcs: false,
      showPulse: false,
      showRadiate: false,
      livePulseDuration: 2.4,
      gradient: ["#0099FF", "#00D4FF", "#0099FF"],
      coreColor: "#00D4FF",
    },
    building: {
      label: "BUILDING",
      strokeWidth: 1.8,
      glow: "rgba(0,212,255,0.45)",
      flowDuration: 2.4,
      vibrate: false,
      showArcs: false,
      showSparks: false,
      showEmbers: false,
      showFlames: false,
      showBorderArcs: false,
      showPulse: false,
      showRadiate: false,
      livePulseDuration: 2,
      gradient: ["#00D4FF", "#A855F7", "#00D4FF"],
      coreColor: "#7DD3FC",
    },
    active: {
      label: "ACTIVE",
      strokeWidth: 2.2,
      glow: "rgba(168,85,247,0.5)",
      flowDuration: 1.6,
      vibrate: false,
      showArcs: true,
      showSparks: true,
      showEmbers: false,
      showFlames: false,
      showBorderArcs: false,
      showPulse: false,
      showRadiate: false,
      livePulseDuration: 1.5,
      gradient: ["#00D4FF", "#FF4D6D", "#A855F7"],
      coreColor: "#E879F9",
    },
    surging: {
      label: "SURGING",
      strokeWidth: 2.8,
      glow: "rgba(255,77,109,0.55)",
      flowDuration: 1,
      vibrate: true,
      showArcs: true,
      showSparks: true,
      showEmbers: false,
      showFlames: false,
      showBorderArcs: true,
      showPulse: false,
      showRadiate: false,
      livePulseDuration: 1.1,
      gradient: ["#00D4FF", "#FF4D6D", "#A855F7"],
      coreColor: "#FFFFFF",
    },
    onFire: {
      label: "ON FIRE",
      strokeWidth: 3.2,
      glow: "rgba(255,255,255,0.55)",
      flowDuration: 0.65,
      vibrate: true,
      showArcs: true,
      showSparks: true,
      showEmbers: true,
      showFlames: true,
      showBorderArcs: true,
      showPulse: false,
      showRadiate: false,
      livePulseDuration: 0.75,
      gradient: ["#00D4FF", "#FFFFFF", "#FF4D6D"],
      coreColor: "#FFFFFF",
    },
    max: {
      label: "ON FIRE",
      strokeWidth: 3.6,
      glow: "rgba(255,255,255,0.7)",
      flowDuration: 0.4,
      vibrate: true,
      showArcs: true,
      showSparks: true,
      showEmbers: true,
      showFlames: true,
      showBorderArcs: true,
      showPulse: true,
      showRadiate: true,
      livePulseDuration: 0.5,
      gradient: ["#FF7A00", "#FFFFFF", "#00D4FF"],
      coreColor: "#FFFFFF",
    },
  };

  return { tier, ...configs[tier] };
}

export function getBoltReach(energy: number): number {
  return Math.min(100, Math.max(8, energy)) / 100;
}
