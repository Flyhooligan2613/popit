"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import SignalBubbleCard from "./SignalBubbleCard";
import SignalNodePreview from "./SignalNodePreview";
import type { EnergyTier } from "./types";
import type { SignalBubble } from "./signal/types";
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
  const { bubbles, broadcast, waveActive } = useSignalNetwork(reducedMotion);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedBubble = useMemo(
    () => bubbles.find((b) => b.id === selectedId) ?? null,
    [bubbles, selectedId]
  );

  const handleTap = useCallback(
    (bubble: SignalBubble) => {
      if (expandedId === bubble.id) {
        onNodeOpen?.();
        setExpandedId(null);
        setSelectedId(null);
        return;
      }
      setSelectedId(bubble.id);
      setExpandedId(bubble.id);
    },
    [expandedId, onNodeOpen]
  );

  return (
    <div
      className={`the-signal the-signal-v2 ${ignited ? "is-ignited" : ""} tier-${tier} ${waveActive ? "is-broadcasting" : ""}`}
      aria-label="THE SIGNAL — POP'IT live city network"
      style={{ "--signal-energy": String(energyNorm) } as Record<string, string>}
    >
      <div className={`signal-field-drift ${reducedMotion ? "is-static" : ""}`}>
        <div className="signal-field-3d">
          <div className="signal-env-fog signal-env-fog-back" aria-hidden />
          <div className="signal-env-fog signal-env-fog-mid" aria-hidden />
          <span className="signal-env-flare signal-env-flare-1" aria-hidden />
          <span className="signal-env-flare signal-env-flare-2" aria-hidden />

          {!reducedMotion && (
            <div className="signal-env-particles" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={`signal-env-particle signal-env-particle-${(i % 5) + 1}`} />
              ))}
            </div>
          )}

          {/* Satellite hub */}
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
          </div>

          {/* Broadcast wave — expands from satellite */}
          {!reducedMotion && waveActive && (
            <>
              <span key={`wave-a-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-1" aria-hidden />
              <span key={`wave-b-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-2" aria-hidden />
            </>
          )}

          {/* Transient beam — only during transmission */}
          <svg className="signal-beam-layer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
            {broadcast.beam && !reducedMotion && (
              <g key={broadcast.beam.key}>
                <line
                  className="signal-beam"
                  x1="50"
                  y1="12"
                  x2={broadcast.beam.toX}
                  y2={broadcast.beam.toY}
                />
                <circle className="signal-beam-packet" r="0.8" cx="50" cy="12">
                  <animateMotion
                    dur="0.85s"
                    repeatCount="1"
                    path={`M 50 12 L ${broadcast.beam.toX} ${broadcast.beam.toY}`}
                  />
                </circle>
              </g>
            )}
          </svg>

          {/* Floating information bubbles */}
          <div className="signal-bubble-field">
            <AnimatePresence mode="sync">
              {bubbles.map((bubble) => (
                <SignalBubbleCard
                  key={bubble.id}
                  bubble={bubble}
                  illuminated={broadcast.illuminatedIds.includes(bubble.id)}
                  selected={expandedId === bubble.id}
                  reducedMotion={reducedMotion}
                  onTap={() => handleTap(bubble)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedBubble && expandedId && (
          <SignalNodePreview
            key={selectedBubble.id}
            node={selectedBubble}
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
  );
}
