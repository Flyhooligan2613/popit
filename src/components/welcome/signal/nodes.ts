import type { SignalCategory, SignalNode } from "./types";

type ActivityTemplate = Omit<SignalNode, "id" | "x" | "y" | "depth">;

const LAYOUT: { x: number; y: number; depth: number }[] = [
  { x: 20, y: 76, depth: 0.85 },
  { x: 38, y: 68, depth: 0.92 },
  { x: 58, y: 74, depth: 0.78 },
  { x: 76, y: 62, depth: 0.88 },
  { x: 52, y: 54, depth: 0.95 },
  { x: 28, y: 52, depth: 0.82 },
  { x: 66, y: 48, depth: 0.9 },
  { x: 44, y: 42, depth: 0.86 },
];

const POOL: ActivityTemplate[] = [
  {
    category: "restaurant",
    icon: "🍕",
    title: "Joe's Pizza",
    status: "+128 check-ins",
    distance: "1.3 mi",
    liveCount: 128,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "nightlife",
    icon: "🎵",
    title: "LIV Nightclub",
    status: "Almost Full",
    distance: "2.1 mi",
    image: "https://images.unsplash.com/photo-1571266028243-e68f8570c9e2?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "sports",
    icon: "🏀",
    title: "Heat Watch Party",
    status: "1.8K Interested",
    liveCount: 1800,
    distance: "0.9 mi",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "event",
    icon: "🎤",
    title: "Concert Tonight",
    status: "Starts in 45 min",
    distance: "3.2 mi",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "creator",
    icon: "👤",
    title: "@MiamiFoodie",
    status: "LIVE · 1.2K Watching",
    liveCount: 1200,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "trending",
    icon: "☕",
    title: "Panther Coffee",
    status: "Trending",
    distance: "0.6 mi",
    liveCount: 72,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "nearby",
    icon: "🏖",
    title: "South Beach",
    status: "Busy",
    distance: "2.4 mi",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=400&q=80&auto=format&fit=crop",
  },
  {
    category: "restaurant",
    icon: "🌮",
    title: "Wynwood Tacos",
    status: "+89 saves today",
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80&auto=format&fit=crop",
  },
];

export const SIGNAL_EDGES: [number, number][] = [
  [0, 1],
  [1, 4],
  [4, 3],
  [3, 6],
  [6, 7],
  [7, 4],
  [1, 5],
  [5, 0],
  [4, 2],
  [2, 3],
  [5, 7],
];

function pickAlt(category: SignalCategory, excludeTitle: string): ActivityTemplate {
  const matches = POOL.filter((p) => p.category === category && p.title !== excludeTitle);
  const pool = matches.length > 0 ? matches : POOL.filter((p) => p.title !== excludeTitle);
  return pool[Math.floor(Math.random() * pool.length)] ?? POOL[0];
}

export function buildInitialNetwork(): SignalNode[] {
  return LAYOUT.map((pos, i) => ({
    id: `sig-${i}`,
    ...POOL[i % POOL.length],
    ...pos,
  }));
}

export function rotateNodeActivity(node: SignalNode): SignalNode {
  const next = pickAlt(node.category, node.title);
  return { ...node, ...next, id: node.id, x: node.x, y: node.y, depth: node.depth };
}

export function bumpNodeStat(node: SignalNode): SignalNode {
  if (node.liveCount == null) return node;
  const bump = 1 + Math.floor(Math.random() * 4);
  const status =
    node.category === "creator"
      ? `LIVE · ${formatShort(node.liveCount + bump)} Watching`
      : node.status.includes("Interested")
        ? `${formatShort(node.liveCount + bump)} Interested`
        : node.status.includes("check-ins")
          ? `+${node.liveCount + bump} check-ins`
          : node.status;
  return { ...node, liveCount: node.liveCount + bump, status };
}

function formatShort(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}
