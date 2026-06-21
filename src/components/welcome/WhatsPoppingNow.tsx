"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import PoppingCardView from "./PoppingCardView";
import PoppingQuickPreview from "./PoppingQuickPreview";
import WhatsPoppingHeader from "./WhatsPoppingHeader";
import type { PoppingCard } from "./popping/types";
import { usePoppingFeed } from "./popping/usePoppingFeed";
import { useHorizontalMarquee } from "./useHorizontalMarquee";
import { useScrollCenterScale } from "./useScrollCenterScale";

type WhatsPoppingNowProps = {
  city?: string | null;
  reducedMotion: boolean;
  energyNorm?: number;
  onCardAction?: (card: PoppingCard) => void;
};

export default function WhatsPoppingNow({
  city = "Miami",
  reducedMotion,
  energyNorm = 0.5,
  onCardAction,
}: WhatsPoppingNowProps) {
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<PoppingCard | null>(null);
  const cards = usePoppingFeed(city, reducedMotion);

  const speed = 0.28 + energyNorm * 0.18;
  const viewportRef = useHorizontalMarquee({
    speed: reducedMotion ? 0 : speed,
    paused: paused || !!preview,
    enabled: !reducedMotion && cards.length > 1,
  });

  useScrollCenterScale(viewportRef, ".popping-card-s2", !reducedMotion);

  const handleTap = useCallback(
    (card: PoppingCard) => {
      onCardAction?.(card);
    },
    [onCardAction]
  );

  const loop = [...cards, ...cards];

  return (
    <section className="whats-popping-s2" aria-label="What's popping right now">
      <WhatsPoppingHeader reducedMotion={reducedMotion} />

      <div
        ref={viewportRef}
        className="popping-carousel-s2"
        role="list"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {loop.map((card, i) => (
          <PoppingCardView
            key={`${card.id}-${i}`}
            card={{ ...card, rank: (i % cards.length) + 1 }}
            reducedMotion={reducedMotion}
            onTap={() => handleTap(card)}
            onLongPress={() => setPreview(card)}
          />
        ))}
      </div>

      <AnimatePresence>
        {preview && <PoppingQuickPreview card={preview} onClose={() => setPreview(null)} />}
      </AnimatePresence>
    </section>
  );
}
