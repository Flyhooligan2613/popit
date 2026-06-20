"use client";

import { motion } from "framer-motion";
import { ENERGY_COLORS, SHOCK_RING_DELAYS } from "./effects";

type LogoBurstExplosionProps = {
  mobile?: boolean;
};

export default function LogoBurstExplosion({ mobile = false }: LogoBurstExplosionProps) {
  const streakCount = mobile ? 32 : 24;
  const ringScale = mobile ? 1.15 : 1;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, mobile ? 1 : 0.95, 0.45, 0] }}
        transition={{ duration: mobile ? 0.65 : 0.55, times: [0, 0.08, 0.35, 1] }}
        style={{
          background:
            "radial-gradient(circle at 50% 42%, #fff 0%, rgba(255,255,255,0.65) 8%, transparent 45%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, mobile ? 0.85 : 0.7, 0] }}
        transition={{ duration: 1.2, delay: 0.05 }}
        style={{
          background:
            "radial-gradient(ellipse 180% 160% at 50% 42%, rgba(255,77,109,0.75) 0%, rgba(168,85,247,0.45) 30%, rgba(0,212,255,0.2) 55%, transparent 80%)",
        }}
      />

      {SHOCK_RING_DELAYS.map((delay, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, (2.5 + i * 1.2) * ringScale, (5.5 + i * 1.8) * ringScale],
            opacity: [0, 0.9, 0],
          }}
          transition={{ duration: 1.6 + i * 0.2, delay, ease: [0.08, 0.82, 0.2, 1] }}
          style={{
            width: "50vmax",
            height: "50vmax",
            border: `${mobile ? 4 : 3}px solid ${ENERGY_COLORS[i % ENERGY_COLORS.length]}`,
            boxShadow: `0 0 ${mobile ? 56 : 40}px ${ENERGY_COLORS[i % ENERGY_COLORS.length]}, inset 0 0 60px rgba(255,255,255,0.15)`,
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, mobile ? 7 : 6], opacity: [0, 1, 0] }}
        transition={{ duration: 1.9, ease: [0.1, 0.9, 0.15, 1] }}
        style={{
          width: "200vmax",
          height: "200vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,77,109,0.8) 6%, rgba(168,85,247,0.55) 18%, rgba(0,212,255,0.3) 35%, transparent 58%)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 3.5, mobile ? 8 : 7], opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.1, ease: [0.12, 0.88, 0.22, 1] }}
        style={{
          width: "160vmax",
          height: "160vmax",
          borderRadius: "50%",
          boxShadow:
            "0 0 200px rgba(255,77,109,0.9), 0 0 400px rgba(168,85,247,0.6), 0 0 600px rgba(0,212,255,0.35), inset 0 0 120px rgba(255,122,0,0.4)",
          background:
            "radial-gradient(circle, transparent 38%, rgba(255,77,109,0.4) 44%, rgba(168,85,247,0.25) 50%, transparent 56%)",
        }}
      />

      {Array.from({ length: streakCount }).map((_, i) => {
        const angle = (i * (360 / streakCount)) % 360;
        return (
          <motion.div
            key={`streak-${i}`}
            className="absolute left-1/2 top-[42%] origin-bottom"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, mobile ? 1.35 : 1.2, 0], opacity: [0, 0.95, 0] }}
            transition={{ duration: 0.95, delay: i * 0.018, ease: "easeOut" }}
            style={{
              width: mobile ? 5 : 4,
              height: mobile ? "62vmax" : "55vmax",
              marginLeft: mobile ? -2.5 : -2,
              transform: `rotate(${angle}deg)`,
              background: `linear-gradient(to top, transparent, ${ENERGY_COLORS[i % ENERGY_COLORS.length]}, transparent)`,
              filter: `drop-shadow(0 0 ${mobile ? 16 : 12}px ${ENERGY_COLORS[i % ENERGY_COLORS.length]})`,
            }}
          />
        );
      })}
    </div>
  );
}
