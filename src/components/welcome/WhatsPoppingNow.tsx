"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { TrendingCreator } from "./types";

type WhatsPoppingNowProps = {
  creators: TrendingCreator[];
  autoScrollMs: number;
  reducedMotion: boolean;
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function WhatsPoppingNow({ creators, autoScrollMs, reducedMotion }: WhatsPoppingNowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (reducedMotion || creators.length <= 1) return;
    const el = scrollerRef.current;
    if (!el) return;

    const tick = () => {
      indexRef.current = (indexRef.current + 1) % creators.length;
      const card = el.children[indexRef.current] as HTMLElement | undefined;
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const t = setInterval(tick, autoScrollMs);
    return () => clearInterval(t);
  }, [autoScrollMs, reducedMotion, creators.length]);

  return (
    <section className="whats-popping" aria-label="What's popping right now">
      <header className="whats-popping-header">
        <h2 className="whats-popping-title font-display">
          <span aria-hidden>🔥</span> What&apos;s Popping Right Now
        </h2>
      </header>

      <div ref={scrollerRef} className="whats-popping-scroll" role="list">
        {creators.map((creator, i) => (
          <motion.article
            key={creator.id}
            role="listitem"
            className="whats-popping-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="whats-popping-avatar-wrap">
              <div className="whats-popping-avatar-ring" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatar}
                alt=""
                className="whats-popping-avatar"
                loading="lazy"
                decoding="async"
              />
              {creator.trending && <span className="whats-popping-trending-badge font-body">Trending Now</span>}
            </div>

            <div className="whats-popping-info">
              <div className="whats-popping-name-row">
                <h3 className="whats-popping-username font-display">{creator.username}</h3>
                {creator.verified && (
                  <span className="whats-popping-verified" aria-label="Verified">
                    ✓
                  </span>
                )}
              </div>
              <p className="whats-popping-category font-body">{creator.category}</p>

              <div className="whats-popping-stats font-body">
                <span>❤️ {formatCount(creator.likes)}</span>
                <span>💬 {formatCount(creator.comments)}</span>
                <span>🔖 {formatCount(creator.saves)}</span>
              </div>
              <p className="whats-popping-followers font-body">
                +{formatCount(creator.followersToday)} followers today
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
