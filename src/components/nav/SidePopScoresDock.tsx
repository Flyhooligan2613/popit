"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

function ScoreItem({ entry }: { entry: ScoreEntry }) {
  const inner = (
    <>
      <PopScoreRing score={entry.score} />
      <span className="pop-scores-dock__label">{entry.isYou ? "You" : entry.label}</span>
    </>
  );

  const className = [
    "pop-scores-dock__item",
    entry.href ? "pop-scores-dock__item--link" : "",
    entry.isYou ? "is-you" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (entry.href && !entry.isYou) {
    return (
      <Link
        href={entry.href}
        className={className}
        style={{ "--score-accent": entry.accent } as React.CSSProperties}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} style={{ "--score-accent": entry.accent } as React.CSSProperties}>
      {inner}
    </div>
  );
}

function SidePopScoresDock({ user }: { user: UserProfile }) {
  const [expanded, setExpanded] = useState(false);
  const accent = getIdentityAccent(user.identity);
  const you: ScoreEntry = {
    label: user.name.split(" ")[0],
    score: user.pulseScore,
    accent,
    isYou: true,
    href: "/help/pop-scores",
  };
  const rest = CITY_LEADERBOARD;

  return (
    <aside
      className={`pop-scores-dock pop-scores-dock--left ${expanded ? "is-expanded" : "is-collapsed"}`}
      aria-label="POP scores"
    >
      <button
        type="button"
        className="pop-scores-dock__toggle"
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse POP scores" : "Expand POP scores"}
        onClick={() => setExpanded((open) => !open)}
      >
        <ScoreItem entry={you} />
        <span className="pop-scores-dock__chevron" aria-hidden>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="pop-scores-stack"
            className="pop-scores-dock__stack"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {rest.map((entry, index) => (
              <motion.div
                key={entry.label}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05, duration: 0.22 }}
              >
                <ScoreItem entry={entry} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

export default memo(SidePopScoresDock);
