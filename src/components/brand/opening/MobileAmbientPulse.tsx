"use client";

import { motion } from "framer-motion";
import { useOpeningMobile } from "./effects";

type MobileAmbientPulseProps = {
  active?: boolean;
  intensity?: "low" | "mid" | "high";
};

export default function MobileAmbientPulse({ active = true, intensity = "low" }: MobileAmbientPulseProps) {
  const mobile = useOpeningMobile();
  if (!mobile || !active) return null;

  const opacity = intensity === "high" ? 0.55 : intensity === "mid" ? 0.38 : 0.28;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[20%] top-[18%] h-[55vmax] w-[55vmax] rounded-full blur-3xl"
        animate={{ opacity: [opacity * 0.6, opacity, opacity * 0.6], scale: [0.9, 1.08, 0.9], x: [0, 24, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(255,77,109,0.45) 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute -right-[15%] bottom-[12%] h-[50vmax] w-[50vmax] rounded-full blur-3xl"
        animate={{ opacity: [opacity * 0.5, opacity * 0.9, opacity * 0.5], scale: [1, 1.12, 1], x: [0, -20, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{ opacity: [0, opacity * 0.7, 0], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.35) 0%, transparent 68%)" }}
      />
    </div>
  );
}
