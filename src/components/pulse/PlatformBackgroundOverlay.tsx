"use client";

import { memo, useEffect, useState } from "react";
import { getPlatformBackground, getPlatformBackgroundId } from "@/lib/identity/platformBackgrounds";

const UPDATE_EVENT = "popit:platformBackground:update";

export function emitPlatformBackgroundUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

function PlatformBackgroundOverlay() {
  const [bgId, setBgId] = useState(getPlatformBackgroundId);

  useEffect(() => {
    const refresh = () => setBgId(getPlatformBackgroundId());
    window.addEventListener(UPDATE_EVENT, refresh);
    return () => window.removeEventListener(UPDATE_EVENT, refresh);
  }, []);

  const bg = getPlatformBackground(bgId);

  return (
    <>
      <div
        className="platform-bg-overlay"
        style={{ background: bg.gradient }}
        aria-hidden
      />
      {bg.glow && (
        <div
          className="platform-bg-glow"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${bg.glow} 0%, transparent 55%)`,
          }}
          aria-hidden
        />
      )}
    </>
  );
}

export default memo(PlatformBackgroundOverlay);
