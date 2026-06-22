"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import SignalBubbleCard from "./SignalBubbleCard";
import SignalHubCenter from "./SignalHubCenter";
import SignalNodePreview from "./SignalNodePreview";
import type { EnergyTier } from "./types";
import type { SignalBubble, SignalHubPhase } from "./signal/types";
import { signalBubbleRoute } from "./signal/routes";
import { useSignalNetwork } from "./signal/useSignalNetwork";

type TheSignalProps = {
  energyNorm: number;
  tier: EnergyTier;
  reducedMotion: boolean;
  mobileLite?: boolean;
  city?: string | null;
  hubPhase?: SignalHubPhase;
  userAvatar?: string | null;
  reorganizeT?: number;
  onVisit?: (href: string) => void;
};

type DragState = {
  id: string;
  startX: number;
  startY: number;
  bubX: number;
  bubY: number;
  moved: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function TheSignal({
  energyNorm,
  tier,
  reducedMotion,
  mobileLite = false,
  city,
  hubPhase = "inviting",
  userAvatar,
  reorganizeT = 0,
  onVisit,
}: TheSignalProps) {
  const ignited = tier === "on-fire" || tier === "overdrive";
  const hubMode = hubPhase === "inviting" || hubPhase === "pulsing" ? "invite" : "user";
  const [motionEnabled, setMotionEnabled] = useState(false);
  const { bubbles, broadcast, waveActive, hubCenter, discoveryId, repositionBubble } = useSignalNetwork({
    reducedMotion,
    mobileLite,
    hubMode,
    reorganizeT,
    motionEnabled,
  });

  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [dragPosition, setDragPosition] = useState<{ id: string; x: number; y: number } | null>(null);
  const [previewBubble, setPreviewBubble] = useState<SignalBubble | null>(null);

  const displayBubbles = useMemo(
    () =>
      bubbles.map((bubble) =>
        dragPosition?.id === bubble.id ? { ...bubble, x: dragPosition.x, y: dragPosition.y } : bubble
      ),
    [bubbles, dragPosition]
  );

  const openPreview = useCallback((bubble: SignalBubble) => {
    setPreviewBubble(bubble);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewBubble(null);
  }, []);

  const handleVisit = useCallback(() => {
    if (!previewBubble) return;
    onVisit?.(signalBubbleRoute(previewBubble.category));
    setPreviewBubble(null);
  }, [onVisit, previewBubble]);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLButtonElement>, bubble: SignalBubble) => {
    if (previewBubble) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      id: bubble.id,
      startX: e.clientX,
      startY: e.clientY,
      bubX: bubble.x,
      bubY: bubble.y,
      moved: false,
    };
  }, [previewBubble]);

  const handlePointerMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const field = fieldRef.current;
    if (!drag || !field) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;

    drag.moved = true;
    const rect = field.getBoundingClientRect();
    const x = clamp(drag.bubX + (dx / rect.width) * 100, 8, 92);
    const y = clamp(drag.bubY + (dy / rect.height) * 100, 10, 90);
    setDragPosition({ id: drag.id, x, y });
  }, []);

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, bubble: SignalBubble) => {
      const drag = dragRef.current;
      const field = fieldRef.current;
      if (!drag || drag.id !== bubble.id) return;

      e.currentTarget.releasePointerCapture(e.pointerId);

      if (drag.moved && field) {
        const rect = field.getBoundingClientRect();
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        const x = clamp(drag.bubX + (dx / rect.width) * 100, 8, 92);
        const y = clamp(drag.bubY + (dy / rect.height) * 100, 10, 90);
        repositionBubble(bubble.id, x, y);
      } else {
        openPreview(bubble);
      }

      dragRef.current = null;
      setDragPosition(null);
    },
    [openPreview, repositionBubble]
  );

  const handlePointerCancel = useCallback(() => {
    dragRef.current = null;
    setDragPosition(null);
  }, []);

  return (
    <div
      className={`the-signal the-signal-v2 the-signal-city ${ignited ? "is-ignited" : ""} tier-${tier} ${waveActive ? "is-broadcasting" : ""} hub-${hubPhase} ${motionEnabled ? "is-motion-on" : ""}`}
      aria-label="POP'IT live city network — the city comes to you"
      style={{ "--signal-energy": String(energyNorm) } as Record<string, string>}
    >
      <button
        type="button"
        className={`signal-motion-toggle ${motionEnabled ? "is-active" : ""}`}
        aria-pressed={motionEnabled}
        onClick={() => setMotionEnabled((on) => !on)}
      >
        <span className="signal-motion-toggle__icon" aria-hidden>
          {motionEnabled ? "⏸" : "▶"}
        </span>
        <span className="signal-motion-toggle__label">{motionEnabled ? "Pause orbit" : "Spin satellite"}</span>
      </button>

      <div className={`signal-field-drift ${motionEnabled ? "is-motion-on" : "is-static"}`}>
        <div className="signal-field-3d">
          <div className="signal-env-fog signal-env-fog-back" aria-hidden />
          <div className="signal-env-fog signal-env-fog-mid" aria-hidden />
          <span className="signal-env-flare signal-env-flare-1" aria-hidden />
          <span className="signal-env-flare signal-env-flare-2" aria-hidden />

          {!reducedMotion && motionEnabled && (
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

          {!reducedMotion && motionEnabled && waveActive && (
            <>
              <span key={`wave-a-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-1" aria-hidden />
              <span key={`wave-b-${broadcast.key}`} className="signal-broadcast-wave signal-broadcast-wave-2" aria-hidden />
            </>
          )}

          <svg className="signal-beam-layer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
            {broadcast.beam && motionEnabled && !reducedMotion && (
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

          <div
            ref={fieldRef}
            className={`signal-bubble-field ${hubPhase === "reorganizing" ? "is-reorganizing" : ""}`}
          >
            <AnimatePresence mode="sync">
              {displayBubbles.map((bubble) => (
                <SignalBubbleCard
                  key={bubble.id}
                  bubble={bubble}
                  illuminated={broadcast.illuminatedIds.includes(bubble.id)}
                  discovered={discoveryId === bubble.id}
                  selected={previewBubble?.id === bubble.id}
                  isDragging={dragPosition?.id === bubble.id}
                  reducedMotion={reducedMotion}
                  onPointerDown={(e) => handlePointerDown(e, bubble)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={(e) => handlePointerUp(e, bubble)}
                  onPointerCancel={handlePointerCancel}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewBubble && (
          <SignalNodePreview
            key={previewBubble.id}
            node={previewBubble}
            visitHref={signalBubbleRoute(previewBubble.category)}
            onVisit={handleVisit}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
