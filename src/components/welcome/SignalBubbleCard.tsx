"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { SignalBubble } from "./signal/types";
import { SIGNAL_CATEGORY_COLOR } from "./signal/types";
import { isSignalBubbleLit } from "./signal/bubbleLit";

type SignalBubbleCardProps = {
  bubble: SignalBubble;
  illuminated: boolean;
  discovered?: boolean;
  selected: boolean;
  isDragging?: boolean;
  reducedMotion: boolean;
  onPointerDown?: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerMove?: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerCancel?: () => void;
};

export default function SignalBubbleCard({
  bubble,
  illuminated,
  discovered = false,
  selected,
  isDragging = false,
  reducedMotion,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: SignalBubbleCardProps) {
  const accent = SIGNAL_CATEGORY_COLOR[bubble.category] ?? "#00d4ff";
  const blur = bubble.z < -20 ? Math.min(3, Math.abs(bubble.z) / 25) : 0;
  const isLit = isSignalBubbleLit(bubble, illuminated, discovered);

  return (
    <button
      type="button"
      className={`signal-bubble signal-bubble-${bubble.category} ${illuminated ? "is-illuminated" : ""} ${discovered ? "is-discovered" : ""} ${selected ? "is-selected" : ""} ${isLit ? "is-lit" : ""} ${isDragging ? "is-dragging" : ""}`}
      style={
        {
          left: `${bubble.x}%`,
          top: `${bubble.y}%`,
          zIndex: Math.round(10 + bubble.z / 10) + (isDragging ? 30 : 0),
          "--signal-accent": accent,
          "--signal-z": `${bubble.z}px`,
          "--signal-scale": String(bubble.scale),
          "--signal-blur": `${blur}px`,
          touchAction: "none",
        } as React.CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      aria-label={`${bubble.title}, ${bubble.status}. Tap to preview, drag to reposition.`}
    >
      {isLit && !reducedMotion && (
        <span className="signal-bubble-shock" aria-hidden>
          <span className="signal-shock-ring signal-shock-ring-1" />
          <span className="signal-shock-ring signal-shock-ring-2" />
          <span className="signal-shock-ring signal-shock-ring-3" />
          <span className="signal-shock-arc signal-shock-arc-1" />
          <span className="signal-shock-arc signal-shock-arc-2" />
          <span className="signal-shock-spark signal-shock-spark-1" />
          <span className="signal-shock-spark signal-shock-spark-2" />
        </span>
      )}

      <span className="signal-bubble-glass" aria-hidden />
      <span className="signal-bubble-glow" aria-hidden />
      {isLit && <span className="signal-bubble-electric-rim" aria-hidden />}

      <span className="signal-bubble-shell">
        {bubble.badge && (
          <span className={`signal-bubble-badge font-body ${bubble.badge === "LIVE" ? "is-live" : ""}`}>
            {bubble.badge === "LIVE" ? "🔴 LIVE" : `🔥 ${bubble.badge}`}
          </span>
        )}
        <span className="signal-bubble-icon" aria-hidden>
          {bubble.icon}
        </span>
        <span className="signal-bubble-title font-display">{bubble.title}</span>
        <span className="signal-bubble-status font-body">{bubble.status}</span>
        {bubble.detail && <span className="signal-bubble-detail font-body">{bubble.detail}</span>}
      </span>
    </button>
  );
}
