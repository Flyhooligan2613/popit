"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PopitMark from "./PopitMark";

export const MARK_SVG = "/brand/logo/popit-mark.svg";
export const MARK_PNG = "/brand/logo/popit-mark.png";

type MarkSource = "svg" | "png" | "component";

type PopitBrandLogoProps = {
  markWidth?: number;
  markHeight?: number;
  showWordmark?: boolean;
  wordmarkSize?: "hero" | "lg";
  className?: string;
};

async function resolveMarkSource(): Promise<MarkSource> {
  try {
    const svg = await fetch(MARK_SVG, { method: "HEAD", cache: "no-store" });
    if (svg.ok) return "svg";
  } catch {
    /* fall through */
  }

  try {
    const png = await fetch(MARK_PNG, { method: "HEAD", cache: "no-store" });
    if (png.ok) return "png";
  } catch {
    /* fall through */
  }

  return "component";
}

/** Original POP'IT brand lockup — prefers SVG mark, then PNG, then inline fallback. */
function PopitBrandLogo({
  markWidth = 320,
  markHeight = 240,
  showWordmark = true,
  wordmarkSize = "hero",
  className = "",
}: PopitBrandLogoProps) {
  const [markSource, setMarkSource] = useState<MarkSource | null>(null);
  const fontSize = wordmarkSize === "hero" ? "clamp(2.2rem, 10vw, 3.6rem)" : "clamp(1.6rem, 7vw, 2.4rem)";

  useEffect(() => {
    let active = true;
    resolveMarkSource().then((source) => {
      if (active) setMarkSource(source);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleMarkError = useCallback(() => {
    setMarkSource((current) => {
      if (current === "svg") return "png";
      if (current === "png") return "component";
      return "component";
    });
  }, []);

  const usingAsset = markSource === "svg" || markSource === "png";
  const markSrc = markSource === "svg" ? MARK_SVG : MARK_PNG;
  const showSeparateWordmark = showWordmark && !usingAsset;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {markSource === null ? (
        <div style={{ width: markWidth, height: markHeight * 0.75, maxWidth: "92vw" }} />
      ) : markSource === "component" ? (
        <PopitMark size={Math.round(markWidth * 0.38)} />
      ) : (
        <Image
          src={markSrc}
          alt="POP'IT"
          width={markWidth}
          height={markHeight}
          style={{
            objectFit: "contain",
            width: "100%",
            maxWidth: `min(92vw, ${markWidth}px)`,
            height: "auto",
          }}
          priority
          unoptimized
          onError={handleMarkError}
        />
      )}

      {showSeparateWordmark && (
        <motion.div
          className="flex items-center"
          style={{
            fontSize,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.08em",
            fontStyle: "italic",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 0 24px rgba(255,255,255,0.25)" }}>
            POP
          </span>
          <span
            style={{
              background: "linear-gradient(180deg, #FF7A00 0%, #FF4D6D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 14px rgba(255,122,0,0.55))",
            }}
          >
            &apos;
          </span>
          <span style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 0 24px rgba(255,255,255,0.25)" }}>
            IT
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default memo(PopitBrandLogo);
