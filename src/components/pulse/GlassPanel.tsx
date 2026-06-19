"use client";

import type { ReactNode } from "react";
import { memo, useState } from "react";
import { motion } from "framer-motion";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  glow?: string;
  accent?: string;
  delay?: number;
  hover?: boolean;
  powered?: boolean;
  weight?: "light" | "normal";
  as?: "div" | "button";
  onClick?: () => void;
};

const PANEL_PARTICLES = Array.from({ length: 2 }, (_, i) => ({
  id: i,
  x: 20 + i * 35,
  y: 25 + (i % 2) * 35,
  color: ["#FF4D6D", "#A855F7", "#00D4FF", "#FF7A00"][i],
}));

function GlassPanel({
  children,
  className = "",
  glow = "rgba(255,77,109,0.12)",
  accent = "#FF4D6D",
  delay = 0,
  hover = true,
  powered = true,
  weight = "light",
  as = "div",
  onClick,
}: GlassPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Component = motion[as];
  const isLight = weight === "light";

  const borderGradient = powered
    ? `linear-gradient(${isHovered ? "135deg" : "90deg"}, ${accent}${isLight ? "33" : "55"}, rgba(168,85,247,0.2), rgba(0,212,255,0.2), ${accent}${isLight ? "33" : "55"})`
    : "rgba(255,255,255,0.06)";

  return (
    <Component
      type={as === "button" ? "button" : undefined}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        hover
          ? {
              y: -3,
              scale: 1.005,
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }
          : undefined
      }
      whileTap={
        hover
          ? { scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 24 } }
          : undefined
      }
      className={`group relative rounded-[20px] ${className}`}
      style={{
        boxShadow: isHovered
          ? `0 12px 32px rgba(0,0,0,0.28), 0 0 24px ${glow}`
          : `0 6px 20px rgba(0,0,0,0.18), 0 0 10px ${glow.replace(/[\d.]+\)$/, "0.04)")}`,
        transition: "box-shadow 0.35s ease",
      }}
    >
      {powered && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] p-px ${isHovered ? "pulse-animated-border" : ""}`}
          style={{ background: borderGradient, opacity: isLight ? 0.7 : 1 }}
        />
      )}

      <div
        className={`relative overflow-hidden rounded-[inherit] border border-white/[0.05] backdrop-blur-md ${powered ? "m-px" : ""}`}
        style={{ background: isLight ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.04)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%, transparent 70%, rgba(255,255,255,0.02) 100%)",
            opacity: isLight ? 0.6 : 1,
          }}
        />

        {powered && (
          <motion.div
            className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full"
            style={{ background: `radial-gradient(circle, ${accent}44, transparent 70%)` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {powered &&
          PANEL_PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 1.5,
                height: 1.5,
                background: p.color,
                opacity: 0.4,
              }}
              animate={{ y: [0, -6, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4 + p.id, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

        <div className="relative">{children}</div>
      </div>
    </Component>
  );
}

export default memo(GlassPanel);
