"use client";

import { useCallback, useEffect, useState } from "react";
import PopMarkSvg from "./PopMarkSvg";
import PopMarkStatusSheet from "./PopMarkStatusSheet";
import { normalizePopMarkTier } from "@/lib/pop-marks/popMarkArt";
import type { PopMarkSize, PopMarkTier } from "@/lib/pop-marks/types";
import type { PopStatusState } from "@/lib/creator-economy/types";

type PopMarkProps = {
  tier: PopMarkTier;
  size?: PopMarkSize;
  animate?: boolean;
  interactive?: boolean;
  career?: PopStatusState | null;
  className?: string;
  label?: string;
};

function PopMarkVisual({
  tier,
  animate,
  entered,
  interactive,
  className,
  size,
}: {
  tier: PopMarkTier;
  animate: boolean;
  entered: boolean;
  interactive: boolean;
  className: string;
  size: PopMarkSize;
}) {
  const visualTier = normalizePopMarkTier(tier);
  return (
    <span
      className={`pop-mark pop-mark-${visualTier} pop-mark-size-${size} ${animate ? "is-animated" : ""} ${entered ? "is-entered" : ""} ${interactive ? "is-interactive" : ""} ${className}`}
      style={{ "--pop-mark-size": `${size}px` } as React.CSSProperties}
    >
      <span className="pop-mark-glow" aria-hidden />
      <span className="pop-mark-inner">
        <PopMarkSvg tier={tier} className="pop-mark-svg" />
      </span>
      <span className="pop-mark-sweep" aria-hidden />
    </span>
  );
}

export default function PopMark({
  tier,
  size = 20,
  animate = true,
  interactive = true,
  career = null,
  className = "",
  label,
}: PopMarkProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const t = window.setTimeout(() => setEntered(true), 40);
    return () => window.clearTimeout(t);
  }, [animate]);

  const handleClick = useCallback(() => {
    if (!interactive) return;
    setSheetOpen(true);
  }, [interactive]);

  const ariaLabel = label ?? `${tier} POP Mark`;
  const visual = (
    <PopMarkVisual
      tier={tier}
      animate={animate}
      entered={entered}
      interactive={interactive}
      className={className}
      size={size}
    />
  );

  return (
    <>
      {interactive ? (
        <button
          type="button"
          className="pop-mark-btn"
          aria-label={`${ariaLabel}. Open POP Status`}
          onClick={handleClick}
        >
          {visual}
        </button>
      ) : (
        visual
      )}

      {interactive && (
        <PopMarkStatusSheet
          open={sheetOpen}
          tier={tier}
          career={career}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}
