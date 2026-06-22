"use client";

import { memo } from "react";
import PopScoreRing from "@/components/welcome/PopScoreRing";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";

type ScoreEntry = {
  label: string;
  score: number;
  accent: string;
  isYou?: boolean;
};

const CITY_LEADERBOARD: Omit<ScoreEntry, "isYou">[] = [
  { label: "KAIRO", score: 96, accent: "#00D4FF" },
  { label: "Neon", score: 91, accent: "#FF4D6D" },
  { label: "Pulse", score: 88, accent: "#FFB020" },
  { label: "Marci", score: 84, accent: "#34D399" },
];

function ScoreStack({ entries, side }: { entries: ScoreEntry[]; side: "left" | "right" }) {
  return (
    <aside className={`pop-scores-dock pop-scores-dock--${side}`} aria-label={`POP scores ${side}`}>
      {entries.map((entry) => (
        <div
          key={`${side}-${entry.label}`}
          className={`pop-scores-dock__item ${entry.isYou ? "is-you" : ""}`}
          style={{ "--score-accent": entry.accent } as React.CSSProperties}
        >
          <PopScoreRing score={entry.score} />
          <span className="pop-scores-dock__label">{entry.isYou ? "You" : entry.label}</span>
        </div>
      ))}
    </aside>
  );
}

function SidePopScoresDock({ user }: { user: UserProfile }) {
  const accent = getIdentityAccent(user.identity);
  const you: ScoreEntry = { label: user.name.split(" ")[0], score: user.pulseScore, accent, isYou: true };
  const leftEntries: ScoreEntry[] = [you, ...CITY_LEADERBOARD.slice(0, 3)];
  const rightEntries: ScoreEntry[] = CITY_LEADERBOARD.map((e, i) => ({
    ...e,
    score: Math.max(70, e.score - i * 2),
  }));

  return (
    <>
      <ScoreStack side="left" entries={leftEntries} />
      <ScoreStack side="right" entries={rightEntries} />
    </>
  );
}

export default memo(SidePopScoresDock);
