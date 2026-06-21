"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { TrendingCreator } from "./types";
import { useHorizontalMarquee } from "./useHorizontalMarquee";

type WhatsPoppingNowProps = {
  creators: TrendingCreator[];
  reducedMotion: boolean;
  energyNorm?: number;
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function WhatsPoppingNow({ creators, reducedMotion, energyNorm = 0.5 }: WhatsPoppingNowProps) {
  const [paused, setPaused] = useState(false);
  const speed = 0.3 + energyNorm * 0.2;
  const viewportRef = useHorizontalMarquee({
    speed: reducedMotion ? 0 : speed,
    paused,
    enabled: !reducedMotion && creators.length > 1,
  });

  const loop = [...creators, ...creators];

  return (
    <section className="whats-popping whats-popping-mock" aria-label="What's popping right now">
      <header className="whats-popping-header">
        <h2 className="whats-popping-title font-display">
          <span className="whats-popping-fire" aria-hidden>
            🔥
          </span>
          What&apos;s Popping Right Now
        </h2>
      </header>

      <div
        ref={viewportRef}
        className="whats-popping-scroll"
        role="list"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {loop.map((creator, i) => {
          const rank = (i % creators.length) + 1;
          return (
            <motion.article
              key={`${creator.id}-${i}`}
              role="listitem"
              className="whats-popping-card whats-popping-card-mock"
              whileHover={{ y: -6 }}
            >
              <span className="whats-popping-rank font-display" aria-label={`Rank ${rank}`}>
                {rank}
              </span>
              <div className="whats-popping-avatar-wrap">
                <div className="whats-popping-avatar-ring" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar} alt="" className="whats-popping-avatar" loading="lazy" decoding="async" />
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
                <p className="whats-popping-category font-body">{creator.category} Creator</p>
                <p className="whats-popping-followers font-body">
                  +{formatCount(creator.followersToday)} followers today
                </p>

                <div className="whats-popping-stats font-body">
                  <span>❤️ {formatCount(creator.likes)}</span>
                  <span>💬 {formatCount(creator.comments)}</span>
                  <span>🔖 {formatCount(creator.saves)}</span>
                </div>

                {creator.trending && <span className="whats-popping-trending-badge font-body">Trending</span>}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
