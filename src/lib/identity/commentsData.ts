import type { IdentityType } from "./types";
import { getIdentityAccent } from "./types";

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
};

export const CITY_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "KAIRO",
    username: "dj-kairo",
    identity: "dj",
    followers: 41200,
    verified: true,
    live: true,
    text: "Main room is absolutely electric right now. Who's pulling up?",
    time: "2m ago",
    likes: 84,
  },
  {
    id: "2",
    author: "Nova",
    username: "nova-games",
    identity: "gamer",
    followers: 18900,
    verified: false,
    live: false,
    text: "Just checked into the arcade district. Squad night.",
    time: "8m ago",
    likes: 31,
  },
  {
    id: "3",
    author: "Pulse Kitchen",
    username: "pulse-kitchen",
    identity: "restaurant",
    followers: 28400,
    verified: true,
    live: false,
    text: "Chef's tasting menu drops at 7. Two tables left.",
    time: "15m ago",
    likes: 56,
  },
  {
    id: "4",
    author: "Luna",
    username: "luna-creates",
    identity: "content-creator",
    followers: 94000,
    verified: true,
    live: false,
    text: "Filming a Wynwood walk tonight. Drop your favorite spots below.",
    time: "22m ago",
    likes: 127,
  },
  {
    id: "5",
    author: "Neon Lounge",
    username: "neon-lounge",
    identity: "nightclub",
    followers: 52100,
    verified: true,
    live: true,
    text: "VIP tables 80% gone. Doors at 10.",
    time: "34m ago",
    likes: 203,
  },
];

export function getCommentAccent(comment: Comment): string {
  return getIdentityAccent(comment.identity);
}
