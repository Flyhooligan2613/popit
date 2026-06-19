/**
 * POP'IT Vibe Engine™
 * Identifies momentum — not just popularity.
 */

export type VibeSignalType =
  | "post"
  | "video"
  | "live"
  | "checkin"
  | "venue_update"
  | "hashtag"
  | "mention"
  | "comment"
  | "share"
  | "save"
  | "location_cluster"
  | "unique_posters"
  | "momentum"
  | "verified_business";

export type VibeSignal = {
  type: VibeSignalType;
  weight: number;
  timestamp: number;
};

export type VibeRankable = {
  id: string;
  signals: VibeSignal[];
  baseEnergy?: number;
};

const SIGNAL_WEIGHTS: Record<VibeSignalType, number> = {
  live: 1.4,
  checkin: 1.1,
  video: 1.0,
  post: 0.85,
  venue_update: 1.2,
  verified_business: 1.15,
  momentum: 1.3,
  unique_posters: 1.05,
  location_cluster: 0.9,
  hashtag: 0.7,
  mention: 0.75,
  comment: 0.6,
  share: 0.8,
  save: 0.65,
};

const MOMENTUM_WINDOW_MS = 1000 * 60 * 45;

export function calculateMomentum(signals: VibeSignal[], now = Date.now()): number {
  if (signals.length === 0) return 0;

  let score = 0;
  let weightSum = 0;

  for (const signal of signals) {
    const age = now - signal.timestamp;
    if (age > MOMENTUM_WINDOW_MS) continue;

    const recency = 1 - age / MOMENTUM_WINDOW_MS;
    const typeWeight = SIGNAL_WEIGHTS[signal.type] ?? 0.5;
    const contribution = signal.weight * typeWeight * (0.4 + recency * 0.6);
    score += contribution;
    weightSum += typeWeight;
  }

  if (weightSum === 0) return 0;
  return Math.min(100, Math.round((score / weightSum) * 28 + signals.length * 2));
}

export function rankByVibe<T extends VibeRankable>(items: T[]): (T & { vibeScore: number })[] {
  return items
    .map((item) => ({
      ...item,
      vibeScore: Math.min(
        100,
        calculateMomentum(item.signals) + (item.baseEnergy ?? 0) * 0.35
      ),
    }))
    .sort((a, b) => b.vibeScore - a.vibeScore);
}

export function deriveDistrictEnergy(signals: VibeSignal[], baseEnergy: number): number {
  const momentum = calculateMomentum(signals);
  return Math.min(100, Math.round(baseEnergy * 0.55 + momentum * 0.45));
}
