"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isPageVisible } from "@/lib/mobilePerformance";
import { HUB_CENTER, orbitPosition, tickOrbit, xyToOrbit, type OrbitalBubble } from "./orbit";
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
  mobileLite?: boolean;
  hubMode: SignalHubMode;
  reorganizeT: number;
  motionEnabled: boolean;
};

export function useSignalNetwork({
  reducedMotion,
  mobileLite = false,
  hubMode,
  reorganizeT,
  motionEnabled,
}: UseSignalNetworkOptions) {
  const orbitalRef = useRef<OrbitalBubble[]>(buildInitialField());
  const discoveryIdRef = useRef<string | null>(null);
  const hubModeRef = useRef(hubMode);
  const reorganizeRef = useRef(reorganizeT);
  const motionRef = useRef(motionEnabled);

  hubModeRef.current = hubMode;
  reorganizeRef.current = reorganizeT;
  motionRef.current = motionEnabled;

  const paintBubbles = useCallback(
    (pullId: string | null = discoveryIdRef.current) =>
      orbitalRef.current.map((b) => ({
        ...b,
        ...orbitPosition(
          b,
          hubModeRef.current,
          reorganizeRef.current,
          b.id === pullId ? 1 : 0
        ),
      })),
    []
  );

  const [bubbles, setBubbles] = useState(() => paintBubbles());
  const [broadcast, setBroadcast] = useState<SignalBroadcast>({ key: 0, illuminatedIds: [], beam: null });
  const [waveActive, setWaveActive] = useState(false);
  const [discoveryId, setDiscoveryId] = useState<string | null>(null);

  discoveryIdRef.current = discoveryId;

  const triggerBroadcast = useCallback(() => {
    if (!motionRef.current) return;
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

  const repositionBubble = useCallback(
    (id: string, x: number, y: number) => {
      const { orbitAngle, orbitRadius } = xyToOrbit(x, y);
      orbitalRef.current = orbitalRef.current.map((b) =>
        b.id === id ? { ...b, orbitAngle, orbitRadius } : b
      );
      setBubbles(paintBubbles());
    },
    [paintBubbles]
  );

  useEffect(() => {
    setBubbles(paintBubbles());
  }, [hubMode, reorganizeT, paintBubbles]);

  useEffect(() => {
    let raf = 0;
    let lastPaint = 0;
    const PAINT_MS = mobileLite ? 150 : 50;

    const loop = (now: number) => {
      if (isPageVisible() && motionRef.current) {
        orbitalRef.current = orbitalRef.current.map((b) => tickOrbit(b));

        if (now - lastPaint >= PAINT_MS) {
          lastPaint = now;
          setBubbles(paintBubbles());
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mobileLite, paintBubbles]);

  useEffect(() => {
    if (!motionEnabled || reducedMotion || mobileLite) return;

    const broadcastTimer = setInterval(triggerBroadcast, 6200);

    const statTimer = setInterval(() => {
      if (!motionRef.current) return;
      orbitalRef.current = orbitalRef.current.map((b) =>
        Math.random() > 0.55 ? bumpBubbleStats(b) : b
      );
    }, 5200);

    const discoveryTimer = setInterval(() => {
      if (!motionRef.current) return;
      const target = orbitalRef.current[Math.floor(Math.random() * orbitalRef.current.length)];
      if (!target) return;
      setDiscoveryId(target.id);
      window.setTimeout(() => setDiscoveryId(null), 3200);
    }, 8500);

    const evolveTimer = setInterval(() => {
      if (!motionRef.current) return;
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
  }, [motionEnabled, reducedMotion, mobileLite, triggerBroadcast]);

  return { bubbles, broadcast, waveActive, hubCenter: HUB_CENTER, discoveryId, repositionBubble };
}
