"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type PopitBrandLogoProps = {
  markWidth?: number;
  markHeight?: number;
  showWordmark?: boolean;
  wordmarkSize?: "hero" | "lg";
};

/** Original POP'IT brand lockup — image mark + italic wordmark. */
function PopitBrandLogo({
  markWidth = 320,
  markHeight = 240,
  showWordmark = true,
  wordmarkSize = "hero",
}: PopitBrandLogoProps) {
  const [markMissing, setMarkMissing] = useState(false);
  const fontSize = wordmarkSize === "hero" ? "clamp(2.2rem, 10vw, 3.6rem)" : "clamp(1.6rem, 7vw, 2.4rem)";

  return (
    <div className="flex flex-col items-center gap-2">
      {!markMissing && (
        <Image
          src="/brand/logo/popit-mark.png"
          alt="POP'IT"
          width={markWidth}
          height={markHeight}
          style={{ objectFit: "contain", width: markWidth, height: "auto", maxWidth: "90vw" }}
          priority
          onError={() => setMarkMissing(true)}
        />
      )}

      {showWordmark && (
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
