"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroAssembleTextProps = {
  top: string;
  accent: string;
  city: string;
  supporting: string;
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
      initial={{ opacity: 0, y: slam ? -24 : 12, scale: slam ? 1.15 : 0.94, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        delay,
        duration: slam ? 0.36 : 0.3,
        ease: slam ? SLAM_EASE : WORD_EASE,
      }}
    >
      {word}
      {slam && <span className="hero-word-burst" aria-hidden />}
    </motion.span>
  );
}

export default function HeroAssembleText({ top, accent, city, supporting, slideKey }: HeroAssembleTextProps) {
  const reducedMotion = useReducedMotion();
  const [shake, setShake] = useState(false);
  const topWords = top.split(/\s+/).filter(Boolean);
  const accentWords = accent.split(/\s+/).filter(Boolean);
  const accentStart = 0.14 + topWords.length * 0.09;

  useEffect(() => {
    if (reducedMotion) return;
    setShake(false);
    const slamAt = (accentStart + (accentWords.length - 1) * 0.09 + 0.36) * 1000;
    const t = window.setTimeout(() => setShake(true), slamAt);
    const t2 = window.setTimeout(() => setShake(false), slamAt + 260);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [slideKey, reducedMotion, accentStart, accentWords.length]);

  const supportDelay = accentStart + accentWords.length * 0.09 + 0.22;

  return (
    <motion.div
      key={slideKey}
      className={`hero-assemble hero-assemble-v2 ${shake ? "is-shaking" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.32 }}
    >
      <p className="hero-v2-kicker font-display">
        {topWords.map((word, i) => (
          <AssembledWord key={`${slideKey}-t-${word}-${i}`} word={word} delay={0.06 + i * 0.09} className="hero-v2-kicker-word" />
        ))}
      </p>

      <h1 className="hero-v2-accent font-display">
        {accentWords.map((word, i) => (
          <AssembledWord
            key={`${slideKey}-a-${word}-${i}`}
            word={word}
            delay={accentStart + i * 0.09}
            slam={i === accentWords.length - 1}
            className="hero-v2-accent-word"
          />
        ))}
      </h1>

      <motion.p
        className="hero-v2-city font-display"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: accentStart + accentWords.length * 0.09 + 0.12, duration: 0.38 }}
      >
        {city}
      </motion.p>

      <motion.p
        className="hero-v2-support font-body"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: supportDelay, duration: 0.42 }}
      >
        {supporting}
      </motion.p>
    </motion.div>
  );
}
