"use client";

import { useEffect, useState } from "react";
import type { PoppingCard } from "./types";
import { bumpCardStats, generateDeck, nextRotatedCard } from "./generator";

const DECK_SIZE = 14;

function reindexRanks(cards: PoppingCard[]): PoppingCard[] {
  return cards.map((c, i) => ({ ...c, rank: i + 1 }));
}

export function usePoppingFeed(
  city: string | null,
  reducedMotion: boolean,
  refreshKey = 0
) {
  const cityLabel = city ?? "Miami";
  const [cards, setCards] = useState<PoppingCard[]>(() => generateDeck(cityLabel, DECK_SIZE));

  useEffect(() => {
    setCards(generateDeck(cityLabel, DECK_SIZE));
  }, [cityLabel, refreshKey]);

  useEffect(() => {
    if (reducedMotion) return;

    const statTimer = setInterval(() => {
      setCards((prev) => prev.map(bumpCardStats));
    }, 5500);

    const rotateTimer = setInterval(() => {
      setCards((prev) => {
        if (prev.length < 2) return prev;
        const tail = prev.slice(1);
        const fresh = nextRotatedCard(prev, cityLabel);
        return reindexRanks([...tail, fresh]).slice(0, DECK_SIZE);
      });
    }, 12000);

    return () => {
      clearInterval(statTimer);
      clearInterval(rotateTimer);
    };
  }, [reducedMotion, cityLabel]);

  return cards;
}
