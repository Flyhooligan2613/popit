"use client";

import Link from "next/link";
import { memo } from "react";
import PopScoreRing from "@/components/welcome/PopScoreRing";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";

type ScoreEntry = {
  label: string;
  score: number;
  accent: string;
  isYou?: boolean;
  href?: string;
};

const CITY_LEADERBOARD: Omit<ScoreEntry, "isYou">[] = [
  { label: "KAIRO", score: 96, accent: "#00D4FF", href: "/help/pop-scores" },
  { label: "Neon", score: 91, accent: "#FF4D6D", href: "/help/pop-scores" },
  { label: "Pulse", score: 88, accent: "#FFB020", href: "/help/pop-scores" },
  { label: "Marci", score: 84, accent: "#34D399", href: "/help/pop-scores" },
];

function ScoreStack({ entries, side }: { entries: ScoreEntry[]; side: "left" | "right" }) {
  return (
    <aside className={`pop-scores-dock pop-scores-dock--${side}`} aria-label={`POP scores ${side}`}>
      {entries.map((entry) => {
        const inner = (
          <>
            <PopScoreRing score={entry.score} />
            <span className="pop-scores-dock__label">{entry.isYou ? "You" : entry.label}</span>
          </>
        );

        return entry.href ? (
          <Link
            key={`${side}-${entry.label}`}
            href={entry.href}
            className={`pop-scores-dock__item pop-scores-dock__item--link ${entry.isYou ? "is-you" : ""}`}
            style={{ "--score-accent": entry.accent } as React.CSSProperties}
          >
            {inner}
          </Link>
        ) : (
          <div
            key={`${side}-${entry.label}`}
            className={`pop-scores-dock__item ${entry.isYou ? "is-you" : ""}`}
            style={{ "--score-accent": entry.accent } as React.CSSProperties}
          >
            {inner}
          </div>
        );
      })}
    </aside>
  );
}

function SidePopScoresDock({ user }: { user: UserProfile }) {
  const accent = getIdentityAccent(user.identity);
  const you: ScoreEntry = {
    label: user.name.split(" ")[0],
    score: user.pulseScore,
    accent,
    isYou: true,
    href: "/help/pop-scores",
  };
  const leftEntries: ScoreEntry[] = [you, ...CITY_LEADERBOARD];

  return <ScoreStack side="left" entries={leftEntries} />;
}

export default memo(SidePopScoresDock);
