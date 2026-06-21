"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroAssembleTextProps = {
  top: string;
  accent: string;
  city: string;
  subtitle: string;
  slideKey: string;
};

const SLAM_EASE = [0.12, 1.25, 0.28, 1] as const;
const WORD_EASE = [0.16, 1, 0.3, 1] as const;

function AssembledWord({
  word,
  delay,
  slam = false,
  className,
}: {
  word: string;
  delay: number;
  slam?: boolean;
  className: string;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{word}</span>;
  }

  return (
    <motion.span
      className={`hero-word ${className}`}
      initial={{ opacity: 0, y: slam ? -28 : 14, scale: slam ? 1.2 : 0.92, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        delay,
        duration: slam ? 0.38 : 0.32,
        ease: slam ? SLAM_EASE : WORD_EASE,
      }}
    >
      {word}
      {slam && <span className="hero-word-burst" aria-hidden />}
    </motion.span>
  );
}

export default function HeroAssembleText({ top, accent, city, subtitle, slideKey }: HeroAssembleTextProps) {
  const reducedMotion = useReducedMotion();
  const [shake, setShake] = useState(false);
  const topWords = top.split(/\s+/).filter(Boolean);
  const accentWords = accent.split(/\s+/).filter(Boolean);
  const accentStart = 0.18 + topWords.length * 0.11;

  useEffect(() => {
    if (reducedMotion) return;
    setShake(false);
    const slamAt = (accentStart + (accentWords.length - 1) * 0.11 + 0.38) * 1000;
    const t = window.setTimeout(() => setShake(true), slamAt);
    const t2 = window.setTimeout(() => setShake(false), slamAt + 280);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [slideKey, reducedMotion, accentStart, accentWords.length]);

  return (
    <motion.div
      key={slideKey}
      className={`hero-assemble hero-assemble-polish ${shake ? "is-shaking" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.35 }}
    >
      <p className="popit-hero-kicker font-display hero-assemble-kicker">
        {topWords.map((word, i) => (
          <AssembledWord key={`${slideKey}-t-${word}-${i}`} word={word} delay={0.08 + i * 0.11} className="hero-kicker-word" />
        ))}
      </p>

      <h1 className="popit-hero-accent font-display hero-assemble-accent">
        {accentWords.map((word, i) => (
          <AssembledWord
            key={`${slideKey}-a-${word}-${i}`}
            word={word}
            delay={accentStart + i * 0.11}
            slam={i === accentWords.length - 1}
            className="hero-accent-word"
          />
        ))}
      </h1>

      <motion.p
        className="popit-hero-city font-display"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: accentStart + accentWords.length * 0.11 + 0.15, duration: 0.4 }}
      >
        {city}
      </motion.p>

      <motion.p
        className="popit-hero-sub font-body"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: accentStart + accentWords.length * 0.11 + 0.28, duration: 0.45 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
