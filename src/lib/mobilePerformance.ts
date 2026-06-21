"use client";

import { useEffect, useState } from "react";

export function detectMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  return (coarse || narrow) && navigator.maxTouchPoints > 0;
}

export function isPageVisible(): boolean {
  if (typeof document === "undefined") return true;
  return document.visibilityState === "visible";
}

export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return visible;
}

/** Touch phones — lighter animations to avoid tab reloads / OOM on iOS Safari. */
export function useMobileLite(): boolean {
  const [mobileLite, setMobileLite] = useState(false);

  useEffect(() => {
    const sync = () => setMobileLite(detectMobileDevice());
    sync();
    const narrow = window.matchMedia("(max-width: 900px)");
    const coarse = window.matchMedia("(pointer: coarse)");
    narrow.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  return mobileLite;
}
