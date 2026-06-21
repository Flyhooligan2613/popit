"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import SignalNodePreview from "./SignalNodePreview";
import type { EnergyTier } from "./types";
import { SIGNAL_EDGES } from "./signal/nodes";
import { SIGNAL_CATEGORY_COLOR } from "./signal/types";
import type { SignalNode } from "./signal/types";
import { useSignalNetwork } from "./signal/useSignalNetwork";

type TheSignalProps = {
  energyNorm: number;
  tier: EnergyTier;
  reducedMotion: boolean;
  city?: string | null;
  onNodeOpen?: () => void;
};

export default function TheSignal({
  energyNorm,
  tier,
  reducedMotion,
  onNodeOpen,
}: TheSignalProps) {
  const ignited = tier === "on-fire" || tier === "overdrive";
  const { nodes, activeNodeId, burstTargetId, burstKey } = useSignalNetwork(reducedMotion);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId]
  );

  const burstNode = useMemo(
    () => nodes.find((n) => n.id === burstTargetId) ?? null,
    [nodes, burstTargetId]
  );

  const handleNodeTap = useCallback(
    (node: SignalNode) => {
      if (expandedId === node.id) {
        onNodeOpen?.();
        setExpandedId(null);
        setSelectedId(null);
        return;
      }
      setSelectedId(node.id);
      setExpandedId(node.id);
    },
    [expandedId, onNodeOpen]
  );

  return (
    <div
      className={`the-signal ${ignited ? "is-ignited" : ""} tier-${tier}`}
      aria-label="THE SIGNAL — live city network"
      style={{ "--signal-energy": String(energyNorm) } as Record<string, string>}
    >
      <div className="signal-depth-fog" aria-hidden />
      <div className="signal-depth-layer signal-depth-back" aria-hidden />

      {/* Satellite */}
      <div className={`signal-orbit ${reducedMotion ? "is-static" : ""}`}>
        <div className="signal-satellite">
          <span className="signal-sat-glow" aria-hidden />
          {!reducedMotion && (
            <>
              <span className="signal-sat-ring signal-sat-ring-1" aria-hidden />
              <span className="signal-sat-ring signal-sat-ring-2" aria-hidden />
            </>
          )}
          <div className="signal-sat-body">
            <span className="signal-sat-panel signal-sat-panel-l" aria-hidden />
            <span className="signal-sat-core" aria-hidden />
            <span className="signal-sat-panel signal-sat-panel-r" aria-hidden />
          </div>
          <span className="signal-sat-antenna signal-sat-antenna-l" aria-hidden />
          <span className="signal-sat-antenna signal-sat-antenna-r" aria-hidden />
          {!reducedMotion && (
            <>
              <span className="signal-sat-light signal-sat-light-1" aria-hidden />
              <span className="signal-sat-light signal-sat-light-2" aria-hidden />
              <span className="signal-sat-light signal-sat-light-3" aria-hidden />
            </>
          )}
        </div>
        {!reducedMotion && (
          <span key={burstKey} className="signal-tx-pulse" aria-hidden />
        )}
      </div>

      {/* Network */}
      <div className="signal-network">
        <div className="signal-depth-layer signal-depth-mid" aria-hidden />
        <svg className="signal-mesh" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {SIGNAL_EDGES.map(([a, b], i) => {
            const from = nodes[a];
            const to = nodes[b];
            if (!from || !to) return null;
            return (
              <g key={`${a}-${b}`}>
                <line
                  className="signal-line"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
                {!reducedMotion && (
                  <circle
                    className="signal-packet"
                    r="0.65"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <animateMotion
                      dur={`${2.8 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                      path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
          {burstNode && !reducedMotion && (
            <line
              key={`burst-${burstKey}`}
              className="signal-burst-beam"
              x1="50"
              y1="8"
              x2={burstNode.x}
              y2={burstNode.y}
            />
          )}
        </svg>

        {!reducedMotion && (
          <div className="signal-float-particles" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`signal-float-particle signal-float-particle-${i + 1}`} />
            ))}
          </div>
        )}

        {nodes.map((node) => {
          const accent = SIGNAL_CATEGORY_COLOR[node.category];
          const isActive = activeNodeId === node.id;
          const isSelected = expandedId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`signal-node signal-node-${node.category} ${isActive ? "is-active" : ""} ${isSelected ? "is-selected" : ""}`}
              style={
                {
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  "--signal-node-accent": accent,
                  "--signal-node-depth": String(node.depth),
                } as Record<string, string>
              }
              onClick={() => handleNodeTap(node)}
              aria-label={`${node.title}, ${node.status}`}
            >
              <span className="signal-node-halo" aria-hidden />
              <span className="signal-node-core" aria-hidden />
              <span className="signal-node-label font-body">
                <span className="signal-node-icon">{node.icon}</span>
                <span className="signal-node-title">{node.title}</span>
                {(isActive || isSelected) && (
                  <motion.span
                    className="signal-node-status"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {node.status}
                  </motion.span>
                )}
              </span>
            </button>
          );
        })}

        <AnimatePresence>
          {selectedNode && expandedId && (
            <SignalNodePreview
              key={selectedNode.id}
              node={selectedNode}
              onOpen={() => {
                onNodeOpen?.();
                setExpandedId(null);
                setSelectedId(null);
              }}
              onClose={() => {
                setExpandedId(null);
                setSelectedId(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
