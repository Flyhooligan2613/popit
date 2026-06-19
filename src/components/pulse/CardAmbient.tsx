"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type CardAmbientProps = {
  accent: string;
  variant?: "waves" | "streaks" | "pulse";
};

function CardAmbient({ accent, variant = "waves" }: CardAmbientProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background: `linear-gradient(135deg, ${accent}18, transparent 50%, ${accent}08)`,
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {variant === "streaks" && (
        <motion.div
          className="absolute top-1/3 h-px w-1/2 opacity-40"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          animate={{ x: ["-20%", "120%"], opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        />
      )}

      {variant === "waves" && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-8 opacity-20"
          style={{
            background: `repeating-linear-gradient(90deg, ${accent}22 0px, transparent 8px, transparent 16px)`,
          }}
          animate={{ x: [0, 16, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2,
            height: 2,
            background: accent,
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 20}%`,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute -right-8 top-0 h-24 w-24 rounded-full opacity-15"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default memo(CardAmbient);
