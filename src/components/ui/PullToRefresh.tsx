"use client";

import { type CSSProperties, type ReactNode, useMemo } from "react";
import { usePullToRefresh, type PullToRefreshState } from "@/hooks/usePullToRefresh";

type PullToRefreshProps = {
  children: ReactNode;
  onRefresh: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  role?: string;
  "aria-label"?: string;
};

function statusLabel(state: PullToRefreshState): string {
  if (state === "refreshing") return "Refreshing…";
  if (state === "ready") return "Release to refresh";
  if (state === "pulling") return "Pull to refresh";
  return "Refresh feed";
}

export default function PullToRefresh({
  children,
  onRefresh,
  className = "",
  disabled = false,
  style,
  role,
  "aria-label": ariaLabel,
}: PullToRefreshProps) {
  const { scrollRef, pull, state, atTop, triggerRefresh, isRefreshing } = usePullToRefresh({
    onRefresh,
    disabled,
  });

  const showIndicator = atTop || pull > 0 || isRefreshing;

  const indicatorOpacity = useMemo(() => {
    if (!showIndicator) return 0;
    if (state === "refreshing") return 1;
    if (pull <= 0) return 0.82;
    return Math.min(1, 0.35 + pull / 90);
  }, [pull, showIndicator, state]);

  const canTapRefresh = !disabled && !isRefreshing && pull === 0 && atTop;

  return (
    <div
      ref={scrollRef}
      className={`ptr-root ${atTop ? "is-at-top" : ""} ${className}`.trim()}
      style={style}
      role={role}
      aria-label={ariaLabel}
    >
      <div
        className="ptr-indicator"
        style={{
          height: state === "refreshing" ? 72 : Math.max(0, pull),
          opacity: indicatorOpacity,
        }}
        aria-hidden={!showIndicator}
      >
        <button
          type="button"
          className={`ptr-indicator-btn ${isRefreshing ? "is-refreshing" : ""} ${state === "ready" ? "is-ready" : ""} ${showIndicator ? "is-visible" : ""}`}
          onClick={() => {
            if (canTapRefresh) void triggerRefresh();
          }}
          disabled={!canTapRefresh}
          aria-label={statusLabel(state)}
        >
          <span className="ptr-indicator-ring">
            <span className="ptr-indicator-icon">↻</span>
          </span>
          <span className="ptr-indicator-label">{statusLabel(state)}</span>
        </button>
      </div>

      <div
        className="ptr-content"
        style={{
          transform: pull > 0 || isRefreshing ? `translateY(${isRefreshing ? 56 : pull}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
