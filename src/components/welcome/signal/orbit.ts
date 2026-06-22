import type { SignalBubble } from "./types";

export const HUB_CENTER = { x: 50, y: 40 };

export type OrbitalBubble = SignalBubble & {
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  wobblePhase: number;
  wobbleAmp: number;
  personalWeight: number;
};

export function orbitPosition(
  bubble: OrbitalBubble,
  hubMode: "invite" | "user",
  reorganizeT: number,
  discoveryPull = 0
): Pick<SignalBubble, "x" | "y" | "z" | "scale"> {
  const userPull = hubMode === "user" ? reorganizeT * bubble.personalWeight * 0.22 : 0;
  const pull = userPull + discoveryPull * 0.12;
  const radius = Math.max(12, (bubble.orbitRadius - pull * bubble.orbitRadius) + Math.sin(bubble.wobblePhase) * bubble.wobbleAmp * 0.55);
  const x = HUB_CENTER.x + Math.cos(bubble.orbitAngle) * radius * 0.92;
  const y = HUB_CENTER.y + Math.sin(bubble.orbitAngle) * radius * 0.68;
  const depthNorm = bubble.orbitRadius / 42;
  const z = bubble.z + Math.sin(bubble.wobblePhase * 0.7) * 4;
  const scale = bubble.scale * (hubMode === "user" && bubble.personalWeight > 0.6 ? 1 + reorganizeT * 0.06 : 1);

  return { x, y, z, scale: scale * (0.92 + (1 - depthNorm) * 0.12) };
}

export function tickOrbit(bubble: OrbitalBubble, dt = 1): OrbitalBubble {
  return {
    ...bubble,
    orbitAngle: bubble.orbitAngle + bubble.orbitSpeed * dt,
    wobblePhase: bubble.wobblePhase + 0.018 * dt * (0.6 + bubble.personalWeight),
  };
}

export function xyToOrbit(x: number, y: number): { orbitAngle: number; orbitRadius: number } {
  const dx = (x - HUB_CENTER.x) / 0.92;
  const dy = (y - HUB_CENTER.y) / 0.68;
  return {
    orbitAngle: Math.atan2(dy, dx),
    orbitRadius: Math.max(12, Math.min(46, Math.hypot(dx, dy))),
  };
}
