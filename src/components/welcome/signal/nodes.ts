import type { SignalBubble, SignalCategory } from "./types";

type BubbleTemplate = Omit<SignalBubble, "id" | "x" | "y" | "z" | "scale">;

const SLOT_LAYOUT: { x: number; y: number; z: number; scale: number }[] = [
  { x: 14, y: 72, z: -50, scale: 0.82 },
  { x: 32, y: 64, z: 20, scale: 1.05 },
  { x: 54, y: 78, z: -30, scale: 0.9 },
  { x: 78, y: 66, z: 10, scale: 1 },
  { x: 62, y: 50, z: 35, scale: 1.12 },
  { x: 38, y: 48, z: -15, scale: 0.88 },
  { x: 22, y: 54, z: 25, scale: 0.95 },
  { x: 48, y: 38, z: -40, scale: 0.78 },
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
  {
    category: "promotion",
    icon: "🌮",
    title: "Wynwood Tacos",
    status: "Happy hour live",
    detail: "Ends in 1 hr",
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "event",
    icon: "🎉",
    title: "Bayfront Concert",
    status: "Filling fast",
    detail: "Doors in 30 min",
    image: "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=400&q=80&auto=format&fit=crop",
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

export function buildInitialField(): SignalBubble[] {
  return SLOT_LAYOUT.map((slot, i) => ({
    id: nextId(),
    ...POOL[i % POOL.length],
    ...slot,
  }));
}

export function spawnBubble(slot: { x: number; y: number; z: number; scale: number }, excludeTitles: string[]): SignalBubble {
  const template = pickAny(excludeTitles);
  return { id: nextId(), ...template, ...slot };
}

export function rotateBubbleContent(bubble: SignalBubble): SignalBubble {
  const next = pickAlt(bubble.category, bubble.title);
  return { ...bubble, ...next, id: bubble.id, x: bubble.x, y: bubble.y, z: bubble.z, scale: bubble.scale };
}

export function bumpBubbleStats(bubble: SignalBubble): SignalBubble {
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
  const dy = bubble.y - 35;
  return Math.sqrt(dx * dx + dy * dy);
}
