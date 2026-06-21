import type { Comment } from "@/lib/identity/commentsData";
import type { RankedCommentMeta } from "./types";
import { buildUserReputation } from "./reputationEngine";

const MAX_REPUTATION_BOOST = 0.12;

function parseMinutesAgo(time: string, fallback?: number): number {
  if (fallback != null) return fallback;
  const m = time.match(/(\d+)\s*(m|h|d)\s*ago/i);
  if (!m) return 60;
  const n = parseInt(m[1], 10);
  if (m[2].toLowerCase() === "m") return n;
  if (m[2].toLowerCase() === "h") return n * 60;
  return n * 24 * 60;
}

function recencyScore(minutesAgo: number): number {
  if (minutesAgo <= 5) return 1;
  if (minutesAgo <= 30) return 0.85;
  if (minutesAgo <= 120) return 0.65;
  if (minutesAgo <= 720) return 0.45;
  return 0.25;
}

function engagementScore(likes: number, replies: number): number {
  const likeNorm = Math.log10(Math.max(1, likes + 1)) / 3;
  const replyNorm = Math.log10(Math.max(1, replies + 1)) / 2.5;
  return Math.min(1, likeNorm * 0.65 + replyNorm * 0.35);
}

function reputationBoost(comment: Comment): number {
  const rep = buildUserReputation({
    followers: comment.followers,
    popScoreRating: comment.popScoreRating,
    verified: comment.verified,
    identity: comment.identity,
    lifetimePopScore: comment.lifetimePopScore,
    popMark: comment.popMark,
  });
  const normalized = Math.min(1, rep.lifetimePopScore / 120_000);
  return normalized * MAX_REPUTATION_BOOST;
}

export function computeCommentRank(comment: Comment, relevance = 1): RankedCommentMeta & { rankScore: number } {
  const minutesAgo = parseMinutesAgo(comment.time, comment.minutesAgo);
  const recency = recencyScore(minutesAgo);
  const engagement = engagementScore(comment.likes, comment.replies ?? 0);
  const repBoost = reputationBoost(comment);

  const rankScore =
    relevance * 0.28 + engagement * 0.32 + recency * 0.22 + repBoost + (comment.verified ? 0.06 : 0.02);

  return {
    rankScore,
    recencyScore: recency,
    engagementScore: engagement,
    reputationBoost: repBoost,
  };
}

export function rankComments(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => computeCommentRank(b).rankScore - computeCommentRank(a).rankScore);
}
