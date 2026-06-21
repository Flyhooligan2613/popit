import type { IdentityType } from "./types";
import { getIdentityAccent } from "./types";
import type { PopMarkTier } from "@/lib/pop-marks/types";

export type Comment = {
  id: string;
  author: string;
  username: string;
  identity: IdentityType;
  followers: number;
  verified: boolean;
  live: boolean;
  text: string;
  time: string;
  likes: number;
  replies?: number;
  minutesAgo?: number;
  /** Engine rating 1–99 */
  popScoreRating: number;
  communitySince?: number;
  /** Optional display override for demo heroes */
  lifetimePopScore?: number;
  popMark?: PopMarkTier | null;
};

export const CITY_COMMENTS: Comment[] = [
  {
    id: "0",
    author: "MiamiFoodie",
    username: "MiamiFoodie",
    identity: "content-creator",
    followers: 186_000,
    verified: true,
    live: false,
    text: "This place has the best tacos in the city.",
    time: "4m ago",
    minutesAgo: 4,
    likes: 4200,
    replies: 128,
    popScoreRating: 88,
    communitySince: 2024,
    lifetimePopScore: 84_320,
    popMark: "gold",
  },
  {
    id: "1",
    author: "KAIRO",
    username: "dj-kairo",
    identity: "dj",
    followers: 41_200,
    verified: true,
    live: true,
    text: "Main room is absolutely electric right now. Who's pulling up?",
    time: "2m ago",
    minutesAgo: 2,
    likes: 84,
    replies: 19,
    popScoreRating: 76,
    communitySince: 2025,
  },
  {
    id: "2",
    author: "Nova",
    username: "nova-games",
    identity: "gamer",
    followers: 18_900,
    verified: false,
    live: false,
    text: "Just checked into the arcade district. Squad night.",
    time: "8m ago",
    minutesAgo: 8,
    likes: 31,
    replies: 4,
    popScoreRating: 58,
    communitySince: 2025,
  },
  {
    id: "3",
    author: "Pulse Kitchen",
    username: "pulse-kitchen",
    identity: "restaurant",
    followers: 28_400,
    verified: true,
    live: false,
    text: "Chef's tasting menu drops at 7. Two tables left.",
    time: "15m ago",
    minutesAgo: 15,
    likes: 56,
    replies: 8,
    popScoreRating: 72,
    communitySince: 2023,
  },
  {
    id: "4",
    author: "Luna",
    username: "luna-creates",
    identity: "content-creator",
    followers: 94_000,
    verified: true,
    live: false,
    text: "Filming a Wynwood walk tonight. Drop your favorite spots below.",
    time: "22m ago",
    minutesAgo: 22,
    likes: 127,
    replies: 34,
    popScoreRating: 82,
    communitySince: 2024,
  },
  {
    id: "5",
    author: "Neon Lounge",
    username: "neon-lounge",
    identity: "nightclub",
    followers: 52_100,
    verified: true,
    live: true,
    text: "VIP tables 80% gone. Doors at 10.",
    time: "34m ago",
    minutesAgo: 34,
    likes: 203,
    replies: 41,
    popScoreRating: 79,
    communitySince: 2023,
  },
];

export function getCommentAccent(comment: Comment): string {
  return getIdentityAccent(comment.identity);
}
