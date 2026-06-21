import type { OrbitalBubble } from "./orbit";
import type { SignalBubble, SignalCategory } from "./types";

type BubbleTemplate = Omit<SignalBubble, "id" | "x" | "y" | "z" | "scale">;

const ORBIT_SLOTS: { angle: number; radius: number; speed: number; wobble: number; weight: number }[] = [
  { angle: 0.4, radius: 38, speed: 0.0022, wobble: 3.5, weight: 0.3 },
  { angle: 1.8, radius: 32, speed: 0.0028, wobble: 2.8, weight: 0.7 },
  { angle: 3.1, radius: 42, speed: 0.0019, wobble: 4.2, weight: 0.2 },
  { angle: 4.5, radius: 28, speed: 0.0032, wobble: 2.2, weight: 0.85 },
  { angle: 5.6, radius: 36, speed: 0.0025, wobble: 3.8, weight: 0.5 },
  { angle: 0.9, radius: 44, speed: 0.0017, wobble: 4.5, weight: 0.15 },
  { angle: 2.4, radius: 30, speed: 0.003, wobble: 2.5, weight: 0.65 },
  { angle: 3.9, radius: 40, speed: 0.0021, wobble: 3.2, weight: 0.4 },
];

const POOL: BubbleTemplate[] = [
  {
    category: "restaurant",
    icon: "🍕",
    title: "Joe's Pizza",
    status: "+142 people there",
    badge: "Trending",
    distance: "1.3 mi",
    liveCount: 142,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "nightlife",
    icon: "🎵",
    title: "LIV Nightclub",
    status: "Almost Full",
    detail: "DJ starts in 18 min",
    distance: "2.1 mi",
    image: "https://images.unsplash.com/photo-1571266028243-e68f8570c9e2?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "sports",
    icon: "🏀",
    title: "Heat Watch Party",
    status: "1,842 Interested",
    liveCount: 1842,
    distance: "0.9 mi",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "event",
    icon: "🎤",
    title: "Downtown Festival",
    status: "Starts Soon",
    detail: "45 min away",
    distance: "3.2 mi",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "creator",
    icon: "👤",
    title: "@MiamiFoodie",
    status: "LIVE",
    detail: "1.4K Watching",
    badge: "LIVE",
    liveCount: 1400,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "trending",
    icon: "☕",
    title: "Panther Coffee",
    status: "Morning Rush",
    badge: "Trending",
    distance: "0.6 mi",
    liveCount: 86,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "nearby",
    icon: "🏖",
    title: "South Beach",
    status: "Busy right now",
    distance: "2.4 mi",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "video",
    icon: "🎬",
    title: "Wynwood Walkthrough",
    status: "Trending video",
    detail: "12.4K views",
    liveCount: 12400,
    image: "https://images.unsplash.com/photo-1529156069898-ec4995fe363f?w=400&q=80&auto=format&fit=crop",
  },
];

let idSeq = 0;

function nextId() {
  idSeq += 1;
  return `bubble-${idSeq}-${Date.now().toString(36)}`;
}

function pickAlt(category: SignalCategory, excludeTitle: string): BubbleTemplate {
  const matches = POOL.filter((p) => p.category === category && p.title !== excludeTitle);
  const pool = matches.length > 0 ? matches : POOL.filter((p) => p.title !== excludeTitle);
  return pool[Math.floor(Math.random() * pool.length)] ?? POOL[0];
}

function pickAny(excludeTitles: string[]): BubbleTemplate {
  const pool = POOL.filter((p) => !excludeTitles.includes(p.title));
  return pool[Math.floor(Math.random() * pool.length)] ?? POOL[0];
}

export function buildInitialField(): OrbitalBubble[] {
  return ORBIT_SLOTS.map((slot, i) => {
    const template = POOL[i % POOL.length];
    return {
      id: nextId(),
      ...template,
      x: 50,
      y: 50,
      z: -20 + slot.weight * 40,
      scale: 0.82 + slot.weight * 0.28,
      orbitAngle: slot.angle + Math.random() * 0.3,
      orbitRadius: slot.radius + (Math.random() - 0.5) * 4,
      orbitSpeed: slot.speed * (0.85 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1),
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleAmp: slot.wobble,
      personalWeight: slot.weight,
    };
  });
}

export function spawnBubble(slot: Partial<OrbitalBubble>, excludeTitles: string[]): OrbitalBubble {
  const template = pickAny(excludeTitles);
  const angle = Math.random() * Math.PI * 2;
  const radius = 28 + Math.random() * 16;
  return {
    id: nextId(),
    ...template,
    x: 50,
    y: 50,
    z: -15 + Math.random() * 30,
    scale: 0.85 + Math.random() * 0.2,
    orbitAngle: angle,
    orbitRadius: radius,
    orbitSpeed: 0.002 * (Math.random() > 0.5 ? 1 : -1),
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleAmp: 2 + Math.random() * 3,
    personalWeight: Math.random(),
    ...slot,
  };
}

export function rotateNodeActivity(bubble: OrbitalBubble): OrbitalBubble {
  const next = pickAlt(bubble.category, bubble.title);
  return {
    ...bubble,
    ...next,
    id: bubble.id,
    orbitAngle: bubble.orbitAngle,
    orbitRadius: bubble.orbitRadius,
    orbitSpeed: bubble.orbitSpeed,
    wobblePhase: bubble.wobblePhase,
    wobbleAmp: bubble.wobbleAmp,
    personalWeight: bubble.personalWeight,
  };
}

export function bumpBubbleStats(bubble: OrbitalBubble): OrbitalBubble {
  if (bubble.liveCount == null) return bubble;
  const bump = 1 + Math.floor(Math.random() * 5);
  const nextCount = bubble.liveCount + bump;

  if (bubble.badge === "LIVE") {
    return { ...bubble, liveCount: nextCount, detail: `${formatShort(nextCount)} Watching` };
  }
  if (bubble.status.includes("Interested")) {
    return { ...bubble, liveCount: nextCount, status: `${formatShort(nextCount)} Interested` };
  }
  if (bubble.status.includes("people there")) {
    return { ...bubble, liveCount: nextCount, status: `+${nextCount} people there` };
  }
  return { ...bubble, liveCount: nextCount };
}

function formatShort(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function bubbleDistanceFromHub(bubble: SignalBubble): number {
  const dx = bubble.x - 50;
  const dy = bubble.y - 40;
  return Math.sqrt(dx * dx + dy * dy);
}
