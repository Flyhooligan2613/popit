"use client";

import { useCallback, useEffect, useState } from "react";
import type { SignalBroadcast, SignalBubble } from "./types";
import {
  buildInitialField,
  bumpBubbleStats,
  bubbleDistanceFromHub,
  rotateBubbleContent,
  spawnBubble,
} from "./nodes";

export function useSignalNetwork(reducedMotion: boolean) {
  const [bubbles, setBubbles] = useState<SignalBubble[]>(() => buildInitialField());
  const [broadcast, setBroadcast] = useState<SignalBroadcast>({ key: 0, illuminatedIds: [], beam: null });
  const [waveActive, setWaveActive] = useState(false);

  const triggerBroadcast = useCallback(() => {
    setBubbles((current) => {
      if (current.length === 0) return current;

      const sorted = [...current].sort((a, b) => bubbleDistanceFromHub(a) - bubbleDistanceFromHub(b));
      const near = sorted.slice(0, Math.min(3, sorted.length));
      const beamTarget = near[Math.floor(Math.random() * near.length)];
      const illuminated = near.map((b) => b.id);

      setWaveActive(true);
      setBroadcast({
        key: Date.now(),
        illuminatedIds: illuminated,
        beam: beamTarget
          ? {
              key: Date.now(),
              toBubbleId: beamTarget.id,
              toX: beamTarget.x,
              toY: beamTarget.y,
            }
          : null,
      });

      window.setTimeout(() => setWaveActive(false), 1400);
      window.setTimeout(() => {
        setBroadcast((b) => ({ ...b, illuminatedIds: [], beam: null }));
      }, 2200);

      return current;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const broadcastTimer = setInterval(triggerBroadcast, 4500);
    triggerBroadcast();

    const statTimer = setInterval(() => {
      setBubbles((prev) => prev.map((b) => (Math.random() > 0.5 ? bumpBubbleStats(b) : b)));
    }, 3200);

    const evolveTimer = setInterval(() => {
      setBubbles((prev) => {
        const roll = Math.random();
        if (roll < 0.35) {
          const idx = Math.floor(Math.random() * prev.length);
          return prev.map((b, i) => (i === idx ? rotateBubbleContent(b) : b));
        }
        if (roll < 0.55 && prev.length >= 6) {
          const removeIdx = Math.floor(Math.random() * prev.length);
          const removed = prev[removeIdx];
          const titles = prev.map((b) => b.title);
          const fresh = spawnBubble(
            { x: removed.x, y: removed.y, z: removed.z, scale: removed.scale },
            titles
          );
          return prev.map((b, i) => (i === removeIdx ? fresh : b));
        }
        return prev.map((b, i) => (i === 0 ? bumpBubbleStats(b) : b));
      });
    }, 7500);

    return () => {
      clearInterval(broadcastTimer);
      clearInterval(statTimer);
      clearInterval(evolveTimer);
    };
  }, [reducedMotion, triggerBroadcast]);

  return { bubbles, broadcast, waveActive };
}
