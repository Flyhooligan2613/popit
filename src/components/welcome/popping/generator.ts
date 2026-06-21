import type { PoppingCard, PoppingCardKind } from "./types";
import { popScoreFromEngagement } from "@/lib/creator-economy/popScoreEngine";

const IMAGES = {
  creator: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
  ],
  business: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80&auto=format&fit=crop",
  ],
  event: [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=400&q=80&auto=format&fit=crop",
  ],
  nightlife: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80&auto=format&fit=crop",
  ],
  athlete: [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  ],
  music: [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop",
  ],
  live: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80&auto=format&fit=crop",
  ],
  photo: [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
  ],
  story: [
    "https://images.unsplash.com/photo-1529156069898-ec4995fe363f?w=400&q=80&auto=format&fit=crop",
  ],
  charity: [
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80&auto=format&fit=crop",
  ],
};

const KIND_ROTATION: PoppingCardKind[] = [
  "creator",
  "business",
  "event",
  "nightlife",
  "athlete",
  "music_artist",
  "live_video",
  "photographer",
  "local_story",
  "community",
  "charity",
  "creator",
  "business",
];

let idCounter = 0;

function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now().toString(36)}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function popScoreForRank(rank: number) {
  return Math.max(72, 99 - (rank - 1) * rand(1, 3));
}

function scoreCard(
  rank: number,
  engagement: {
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    followersToday?: number;
    viewers?: number;
    interested?: number;
    verified?: boolean;
  }
): number {
  const impactScore = popScoreFromEngagement(engagement);
  const rankScore = popScoreForRank(rank);
  return Math.min(99, Math.round(impactScore * 0.72 + rankScore * 0.28));
}

function assignPopScore(card: PoppingCard): PoppingCard {
  return {
    ...card,
    popScore: scoreCard(card.rank, {
      likes: card.likes,
      comments: card.comments,
      shares: card.shares,
      saves: card.savesToday,
      followersToday: card.followersToday,
      viewers: card.viewers,
      interested: card.interested,
      verified: card.verified,
    }),
  };
}

export function formatPoppingCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function rankMedal(rank: number): string {
  if (rank === 1) return "🥇 #1";
  if (rank === 2) return "🥈 #2";
  if (rank === 3) return "🥉 #3";
  return `#${rank}`;
}

export function generateCard(kind: PoppingCardKind, rank: number, city: string): PoppingCard {
  const base = {
    id: nextId(kind),
    kind,
    rank,
    popScore: 0,
    trending: rank <= 5,
    city,
  };

  switch (kind) {
    case "creator":
      return assignPopScore({
        ...base,
        title: pick(["@miamifoodie", "@wynwood.eats", "@305creator", "@southbeachvibes", "@popit.creator"]),
        category: pick(["Food Creator", "Lifestyle Creator", "City Creator"]),
        image: pick(IMAGES.creator),
        tapTarget: "profile",
        verified: Math.random() > 0.35,
        likes: rand(6200, 22000),
        comments: rand(420, 2400),
        shares: rand(380, 1200),
        followersToday: rand(180, 890),
      });
    case "athlete":
      return assignPopScore({
        ...base,
        title: pick(["@heatwatch", "@305runs", "@beachathlete", "@miami.fitness"]),
        category: "Athlete",
        image: pick(IMAGES.athlete),
        tapTarget: "profile",
        verified: true,
        likes: rand(4800, 16000),
        comments: rand(320, 1800),
        shares: rand(240, 980),
        followersToday: rand(120, 620),
      });
    case "music_artist":
      return assignPopScore({
        ...base,
        title: pick(["@djpulse.mia", "@luna.live", "@basscoast", "@ultra.after"]),
        category: "Music Artist",
        image: pick(IMAGES.music),
        tapTarget: "profile",
        verified: Math.random() > 0.4,
        likes: rand(8200, 28000),
        comments: rand(520, 3100),
        shares: rand(600, 2100),
        followersToday: rand(200, 1100),
      });
    case "photographer":
      return assignPopScore({
        ...base,
        title: pick(["@lens305", "@golden.hour.mia", "@streetframe"]),
        category: "Photographer",
        image: pick(IMAGES.photo),
        tapTarget: "profile",
        verified: Math.random() > 0.5,
        likes: rand(3200, 12000),
        comments: rand(180, 920),
        shares: rand(140, 640),
        followersToday: rand(80, 420),
      });
    case "community":
      return assignPopScore({
        ...base,
        title: pick(["@wynwood.crew", "@305.community", "@locals.only.mia"]),
        category: "Community Member",
        image: pick(IMAGES.creator),
        tapTarget: "profile",
        likes: rand(1800, 7600),
        comments: rand(120, 680),
        shares: rand(90, 420),
        followersToday: rand(45, 280),
      });
    case "business":
      return assignPopScore({
        ...base,
        title: pick(["🍕 Joe's Pizza", "☕ Panther Coffee", "🌮 Wynwood Tacos", "🍔 LoKal Burger", "🍣 Zuma Miami"]),
        category: pick(["Restaurant", "Cafe", "Local Business"]),
        image: pick(IMAGES.business),
        tapTarget: "business",
        rating: 4.2 + Math.random() * 0.7,
        distance: `${(0.4 + Math.random() * 2.2).toFixed(1)} mi`,
        savesToday: rand(180, 720),
      });
    case "event":
      return assignPopScore({
        ...base,
        title: pick(["🎵 Ultra After Party", "🏀 Heat Watch Party", "🎪 Wynwood Art Walk", "🎤 Bayfront Concert"]),
        category: pick(["Concert", "Sports Event", "Festival"]),
        image: pick(IMAGES.event),
        tapTarget: "event",
        countdown: pick(["45 Min", "2 Hours", "Tonight", "Tomorrow"]),
        interested: rand(420, 2800),
      });
    case "nightlife":
      return assignPopScore({
        ...base,
        title: pick(["🎉 LIV Nightclub", "🍸 Rooftop at E11EVEN", "🌃 Sky Lounge", "🎵 Club Space"]),
        category: "Nightlife",
        image: pick(IMAGES.nightlife),
        tapTarget: "event",
        countdown: pick(["Doors Open", "In 1 Hour", "Tonight"]),
        interested: rand(680, 3200),
      });
    case "charity":
      return assignPopScore({
        ...base,
        title: pick(["💙 Beach Cleanup", "🤝 Feed Miami", "❤️ Community Drive", "🌴 Park Restoration"]),
        category: "Charity Event",
        image: pick(IMAGES.charity),
        tapTarget: "event",
        countdown: pick(["This Weekend", "Saturday", "Sunday AM"]),
        interested: rand(120, 980),
      });
    case "live_video":
      return assignPopScore({
        ...base,
        title: pick(["Beach Workout", "Kitchen Live", "Rooftop Set", "Game Day Live"]),
        category: "Live Stream",
        image: pick(IMAGES.live),
        tapTarget: "video",
        viewers: rand(380, 2400),
      });
    case "local_story":
      return assignPopScore({
        ...base,
        title: pick(["South Beach Sunrise", "Hidden Alley Mural", "Street Fair Moment", "Neon Rain Night"]),
        category: "Local Story",
        image: pick(IMAGES.story),
        tapTarget: "profile",
        likes: rand(2400, 9800),
        comments: rand(180, 840),
      });
    default:
      return generateCard("creator", rank, city);
  }
}

export function generateDeck(city: string, count: number, avoidKind?: PoppingCardKind | null): PoppingCard[] {
  const cards: PoppingCard[] = [];
  let lastKind = avoidKind ?? null;
  let kindIdx = 0;

  for (let rank = 1; rank <= count; rank++) {
    let kind = KIND_ROTATION[kindIdx % KIND_ROTATION.length];
    kindIdx += 1;
    if (kind === lastKind) {
      kind = KIND_ROTATION[kindIdx % KIND_ROTATION.length];
      kindIdx += 1;
    }
    lastKind = kind;
    cards.push(generateCard(kind, rank, city));
  }

  return cards;
}

export function bumpCardStats(card: PoppingCard): PoppingCard {
  const drift = () => rand(0, 2);
  const next: PoppingCard = { ...card };

  if (next.likes != null) next.likes += drift();
  if (next.comments != null && Math.random() > 0.55) next.comments += 1;
  if (next.shares != null && Math.random() > 0.7) next.shares += 1;
  if (next.followersToday != null && Math.random() > 0.45) next.followersToday += 1;
  if (next.savesToday != null && Math.random() > 0.5) next.savesToday += rand(1, 3);
  if (next.viewers != null) next.viewers += rand(0, 4);
  if (next.interested != null && Math.random() > 0.6) next.interested += rand(1, 2);

  return assignPopScore(next);
}

export function nextRotatedCard(deck: PoppingCard[], city: string): PoppingCard {
  const lastKind = deck[deck.length - 1]?.kind ?? null;
  const maxRank = Math.max(...deck.map((c) => c.rank), 0);
  let kind = pick(KIND_ROTATION.filter((k) => k !== lastKind));
  return generateCard(kind, maxRank + 1, city);
}
