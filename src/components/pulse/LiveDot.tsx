"use client";

import { motion } from "framer-motion";
import { getHypeConfig } from "./hypeConfig";

export default function LiveDot({
  size = 8,
  pulseDuration,
}: {
  size?: number;
  pulseDuration?: number;
}) {
  const duration = pulseDuration ?? 2.4;

  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0 rounded-full bg-[#FF4D6D]"
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative rounded-full bg-[#FF4D6D]"
        style={{
          width: size,
          height: size,
          boxShadow: "0 0 10px rgba(255,77,109,0.55)",
        }}
      />
    </span>
  );
}

export function HypeLiveBadge({ energy }: { energy: number }) {
  const config = getHypeConfig(energy);

  return (
    <div className="flex items-center gap-1">
      <LiveDot size={5} pulseDuration={config.livePulseDuration} />
      <span className="font-body text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#FF4D6D]/90">
        Live
      </span>
    </div>
  );
}
