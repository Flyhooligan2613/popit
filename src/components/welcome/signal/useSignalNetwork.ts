"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HUB_CENTER, orbitPosition, tickOrbit, type OrbitalBubble } from "./orbit";
import type { SignalBroadcast, SignalHubMode } from "./types";
import {
  buildInitialField,
  bumpBubbleStats,
  bubbleDistanceFromHub,
  rotateNodeActivity,
  spawnBubble,
} from "./nodes";

type UseSignalNetworkOptions = {
  reducedMotion: boolean;
  hubMode: SignalHubMode;
  reorganizeT: number;
};

export function useSignalNetwork({ reducedMotion, hubMode, reorganizeT }: UseSignalNetworkOptions) {
  const orbitalRef = useRef<OrbitalBubble[]>(buildInitialField());
  const discoveryIdRef = useRef<string | null>(null);
  const hubModeRef = useRef(hubMode);
  const reorganizeRef = useRef(reorganizeT);

  hubModeRef.current = hubMode;
  reorganizeRef.current = reorganizeT;

  const [bubbles, setBubbles] = useState(() =>
    orbitalRef.current.map((b) => ({ ...b, ...orbitPosition(b, hubMode, reorganizeT) }))
  );
  const [broadcast, setBroadcast] = useState<SignalBroadcast>({ key: 0, illuminatedIds: [], beam: null });
  const [waveActive, setWaveActive] = useState(false);
  const [discoveryId, setDiscoveryId] = useState<string | null>(null);

  discoveryIdRef.current = discoveryId;

  const triggerBroadcast = useCallback(() => {
    const current = orbitalRef.current;
    if (current.length === 0) return;

    const positioned = current.map((b) => ({
      ...b,
      ...orbitPosition(b, hubModeRef.current, reorganizeRef.current),
    }));
    const sorted = [...positioned].sort((a, b) => bubbleDistanceFromHub(a) - bubbleDistanceFromHub(b));
    const near = sorted.slice(0, Math.min(3, sorted.length));
    const beamTarget = near[Math.floor(Math.random() * near.length)];

    setWaveActive(true);
    setBroadcast({
      key: Date.now(),
      illuminatedIds: near.map((b) => b.id),
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
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setBubbles(
        orbitalRef.current.map((b) => ({
          ...b,
          ...orbitPosition(b, hubMode, reorganizeT, b.id === discoveryId ? 1 : 0),
        }))
      );
      return;
    }

    let raf = 0;
    const loop = () => {
      orbitalRef.current = orbitalRef.current.map((b) => tickOrbit(b));
      const pullId = discoveryIdRef.current;
      setBubbles(
        orbitalRef.current.map((b) => ({
          ...b,
          ...orbitPosition(
            b,
            hubModeRef.current,
            reorganizeRef.current,
            b.id === pullId ? 1 : 0
          ),
        }))
      );
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, hubMode, reorganizeT, discoveryId]);

  useEffect(() => {
    if (reducedMotion) return;

    const broadcastTimer = setInterval(triggerBroadcast, 4800);
    triggerBroadcast();

    const statTimer = setInterval(() => {
      orbitalRef.current = orbitalRef.current.map((b) =>
        Math.random() > 0.5 ? bumpBubbleStats(b) : b
      );
    }, 3400);

    const discoveryTimer = setInterval(() => {
      const target = orbitalRef.current[Math.floor(Math.random() * orbitalRef.current.length)];
      if (!target) return;
      setDiscoveryId(target.id);
      window.setTimeout(() => setDiscoveryId(null), 3200);
    }, 6200);

    const evolveTimer = setInterval(() => {
      const prev = orbitalRef.current;
      const roll = Math.random();
      if (roll < 0.38) {
        const idx = Math.floor(Math.random() * prev.length);
        orbitalRef.current = prev.map((b, i) => (i === idx ? rotateNodeActivity(b) : b));
      } else if (roll < 0.58 && prev.length >= 6) {
        const removeIdx = Math.floor(Math.random() * prev.length);
        const removed = prev[removeIdx];
        const titles = prev.map((b) => b.title);
        const fresh = spawnBubble(
          {
            orbitRadius: removed.orbitRadius,
            orbitAngle: removed.orbitAngle + 0.5,
            personalWeight: removed.personalWeight,
          },
          titles
        );
        orbitalRef.current = prev.map((b, i) => (i === removeIdx ? fresh : b));
      }
    }, 8000);

    return () => {
      clearInterval(broadcastTimer);
      clearInterval(statTimer);
      clearInterval(discoveryTimer);
      clearInterval(evolveTimer);
    };
  }, [reducedMotion, triggerBroadcast]);

  return { bubbles, broadcast, waveActive, hubCenter: HUB_CENTER, discoveryId };
}
