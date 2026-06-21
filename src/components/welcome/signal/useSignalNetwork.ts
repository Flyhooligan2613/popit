"use client";

import { useEffect, useState } from "react";
import type { SignalNode } from "./types";
import { buildInitialNetwork, bumpNodeStat, rotateNodeActivity } from "./nodes";

export function useSignalNetwork(reducedMotion: boolean) {
  const [nodes, setNodes] = useState<SignalNode[]>(() => buildInitialNetwork());
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [burstTargetId, setBurstTargetId] = useState<string | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const burstTimer = setInterval(() => {
      setNodes((current) => {
        const target = current[Math.floor(Math.random() * current.length)];
        if (!target) return current;
        setBurstTargetId(target.id);
        setActiveNodeId(target.id);
        setBurstKey((k) => k + 1);
        window.setTimeout(() => {
          setActiveNodeId((id) => (id === target.id ? null : id));
        }, 2400);
        return current;
      });
    }, 4300);

    const statTimer = setInterval(() => {
      setNodes((prev) => prev.map((n) => (Math.random() > 0.55 ? bumpNodeStat(n) : n)));
    }, 3500);

    const rotateTimer = setInterval(() => {
      setNodes((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        return prev.map((n, i) => (i === idx ? rotateNodeActivity(n) : n));
      });
    }, 8500);

    return () => {
      clearInterval(burstTimer);
      clearInterval(statTimer);
      clearInterval(rotateTimer);
    };
  }, [reducedMotion]);

  return { nodes, activeNodeId, burstTargetId, burstKey };
}
