"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PullToRefreshState = "idle" | "pulling" | "ready" | "refreshing";

type UsePullToRefreshOptions = {
  onRefresh: () => void | Promise<void>;
  disabled?: boolean;
  threshold?: number;
  maxPull?: number;
};

export function usePullToRefresh({
  onRefresh,
  disabled = false,
  threshold = 76,
  maxPull = 128,
}: UsePullToRefreshOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pulling = useRef(false);
  const stateRef = useRef<PullToRefreshState>("idle");
  const [pull, setPull] = useState(0);
  const [state, setState] = useState<PullToRefreshState>("idle");
  const [atTop, setAtTop] = useState(true);

  const setPullState = useCallback((next: PullToRefreshState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const resetPull = useCallback(() => {
    pulling.current = false;
    setPull(0);
    setPullState("idle");
  }, [setPullState]);

  const triggerRefresh = useCallback(async () => {
    if (disabled || stateRef.current === "refreshing") return;
    setPullState("refreshing");
    setPull(threshold * 0.72);
    try {
      await onRefresh();
    } finally {
      resetPull();
    }
  }, [disabled, onRefresh, resetPull, setPullState, threshold]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || disabled) return;

    const onTouchStart = (event: TouchEvent) => {
      if (stateRef.current === "refreshing" || el.scrollTop > 2) return;
      startY.current = event.touches[0]?.clientY ?? 0;
      pulling.current = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!pulling.current || stateRef.current === "refreshing") return;
      if (el.scrollTop > 2) {
        pulling.current = false;
        setPull(0);
        return;
      }

      const currentY = event.touches[0]?.clientY ?? startY.current;
      const delta = currentY - startY.current;
      if (delta <= 0) {
        setPull(0);
        setPullState("idle");
        return;
      }

      event.preventDefault();
      const damped = Math.min(maxPull, delta * 0.42);
      setPull(damped);
      setPullState(damped >= threshold ? "ready" : "pulling");
    };

    const onTouchEnd = async () => {
      if (!pulling.current) return;
      pulling.current = false;
      if (stateRef.current === "ready") {
        await triggerRefresh();
        return;
      }
      resetPull();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [disabled, maxPull, resetPull, setPullState, threshold, triggerRefresh]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => setAtTop(el.scrollTop <= 2);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return {
    scrollRef,
    pull,
    state,
    atTop,
    triggerRefresh,
    isRefreshing: state === "refreshing",
  };
}
