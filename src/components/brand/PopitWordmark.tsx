"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type PopitWordmarkProps = {
  size?: "hero" | "lg" | "md" | "sm";
  glow?: boolean;
  className?: string;
};

const SIZES = {
  hero: "clamp(3.2rem, 14vw, 5.5rem)",
  lg: "clamp(2.4rem, 10vw, 3.8rem)",
  md: "clamp(1.8rem, 7vw, 2.8rem)",
  sm: "clamp(1.2rem, 5vw, 1.8rem)",
};

function PopitWordmark({ size = "lg", glow = true, className = "" }: PopitWordmarkProps) {
  const fontSize = SIZES[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="pointer-events-none absolute inset-[-40%] opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,77,109,0.45) 0%, rgba(168,85,247,0.25) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      <motion.div
        className="relative z-[1] flex items-center font-black italic"
        style={{
          fontSize,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          letterSpacing: "0.06em",
          lineHeight: 1,
        }}
        animate={glow ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            color: "#FFFFFF",
            textShadow:
              "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,77,109,0.35), 0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          POP
        </span>
        <motion.span
          style={{
            background: "linear-gradient(180deg, #FF7A00 0%, #FF4D6D 50%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 16px rgba(255,122,0,0.8)) drop-shadow(0 0 32px rgba(255,77,109,0.5))",
            marginLeft: "-0.02em",
            marginRight: "-0.02em",
          }}
          animate={{ filter: [
            "drop-shadow(0 0 16px rgba(255,122,0,0.8)) drop-shadow(0 0 32px rgba(255,77,109,0.5))",
            "drop-shadow(0 0 24px rgba(255,122,0,1)) drop-shadow(0 0 48px rgba(255,77,109,0.7))",
            "drop-shadow(0 0 16px rgba(255,122,0,0.8)) drop-shadow(0 0 32px rgba(255,77,109,0.5))",
          ] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          &apos;
        </motion.span>
        <span
          style={{
            color: "#FFFFFF",
            textShadow:
              "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(0,212,255,0.25), 0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          IT
        </span>
      </motion.div>
    </div>
  );
}

export default memo(PopitWordmark);
