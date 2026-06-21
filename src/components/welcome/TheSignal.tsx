"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import SignalBubbleCard from "./SignalBubbleCard";
import SignalHubCenter from "./SignalHubCenter";
import SignalNodePreview from "./SignalNodePreview";
import type { EnergyTier } from "./types";
import type { SignalBubble, SignalHubPhase } from "./signal/types";
import { useSignalNetwork } from "./signal/useSignalNetwork";

type TheSignalProps = {
  energyNorm: number;
  tier: EnergyTier;
  reducedMotion: boolean;
  city?: string | null;
  hubPhase?: SignalHubPhase;
  userAvatar?: string | null;
  reorganizeT?: number;
  onNodeOpen?: () => void;
};

export default function TheSignal({
  energyNorm,
  tier,
  reducedMotion,
  city,
  hubPhase = "inviting",
  userAvatar,
  reorganizeT = 0,
  onNodeOpen,
}: TheSignalProps) {
  const ignited = tier === "on-fire" || tier === "overdrive";
  const hubMode = hubPhase === "inviting" || hubPhase === "pulsing" ? "invite" : "user";
  const { bubbles, broadcast, waveActive, hubCenter, discoveryId } = useSignalNetwork({
    reducedMotion,
    hubMode,
    reorganizeT,
  });
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
      className={`the-signal the-signal-v2 the-signal-city ${ignited ? "is-ignited" : ""} tier-${tier} ${waveActive ? "is-broadcasting" : ""} hub-${hubPhase}`}
      aria-label="POP'IT live city network — the city comes to you"
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

          <SignalHubCenter
            phase={hubPhase}
            city={city}
            userAvatar={userAvatar}
            reducedMotion={reducedMotion}
          />

          {!reducedMotion && waveActive && (
            <>
              <span key={`wave-a-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-1" aria-hidden />
              <span key={`wave-b-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-2" aria-hidden />
            </>
          )}

          <svg className="signal-beam-layer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
            {broadcast.beam && !reducedMotion && (
              <g key={broadcast.beam.key}>
                <line
                  className="signal-beam"
                  x1={String(hubCenter.x)}
                  y1={String(hubCenter.y)}
                  x2={broadcast.beam.toX}
                  y2={broadcast.beam.toY}
                />
                <circle className="signal-beam-packet" r="0.8" cx={hubCenter.x} cy={hubCenter.y}>
                  <animateMotion
                    dur="0.85s"
                    repeatCount="1"
                    path={`M ${hubCenter.x} ${hubCenter.y} L ${broadcast.beam.toX} ${broadcast.beam.toY}`}
                  />
                </circle>
              </g>
            )}
          </svg>

          <div className={`signal-bubble-field ${hubPhase === "reorganizing" ? "is-reorganizing" : ""}`}>
            <AnimatePresence mode="sync">
              {bubbles.map((bubble) => (
                <SignalBubbleCard
                  key={bubble.id}
                  bubble={bubble}
                  illuminated={broadcast.illuminatedIds.includes(bubble.id)}
                  discovered={discoveryId === bubble.id}
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
