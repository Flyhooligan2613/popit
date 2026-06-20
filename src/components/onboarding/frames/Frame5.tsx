"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import OpeningCameraLens from "@/components/brand/OpeningCameraLens";

const ENERGY_COLORS = ["#FF4D6D", "#FF7A00", "#A855F7", "#00D4FF", "#7C3AED", "#0099FF"];

const CONFETTI = Array.from({ length: 90 }, (_, i) => ({
  color: ENERGY_COLORS[i % ENERGY_COLORS.length],
  angle: (i * 41 + (i % 13) * 27) % 360,
  dist: 240 + (i % 20) * 32 + Math.floor(i / 20) * 48,
  fall: 100 + (i % 12) * 48,
  w: i % 4 === 0 ? 5 + (i % 3) : 3 + (i % 3),
  h: i % 4 === 0 ? 5 + (i % 3) : 8 + (i % 7) * 2,
  round: i % 4 === 1,
  streak: i % 6 === 0,
  delay: (i % 30) * 0.01,
  spin: -220 + (i % 19) * 28,
  duration: 1.7 + (i % 8) * 0.14,
}));

const PARTICLES = [
  { color: "#FF4D6D", angle: 0,   dist: 160, size: 8  },
  { color: "#FF7A00", angle: 25,  dist: 200, size: 5  },
  { color: "#A855F7", angle: 55,  dist: 180, size: 10 },
  { color: "#00D4FF", angle: 85,  dist: 220, size: 6  },
  { color: "#FF4D6D", angle: 115, dist: 190, size: 7  },
  { color: "#A855F7", angle: 145, dist: 160, size: 5  },
  { color: "#FF7A00", angle: 175, dist: 210, size: 9  },
  { color: "#00D4FF", angle: 205, dist: 185, size: 5  },
  { color: "#FF4D6D", angle: 235, dist: 200, size: 8  },
  { color: "#A855F7", angle: 265, dist: 155, size: 6  },
  { color: "#00D4FF", angle: 295, dist: 215, size: 10 },
  { color: "#FF7A00", angle: 325, dist: 175, size: 5  },
  { color: "#FF4D6D", angle: 10,  dist: 240, size: 4  },
  { color: "#A855F7", angle: 70,  dist: 250, size: 5  },
  { color: "#00D4FF", angle: 130, dist: 225, size: 4  },
  { color: "#FF7A00", angle: 190, dist: 245, size: 6  },
  { color: "#FF4D6D", angle: 250, dist: 235, size: 4  },
  { color: "#A855F7", angle: 310, dist: 250, size: 5  },
];

export default function Frame5() {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBurst(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", isolation: "isolate" }}>

      <div style={{ position: "absolute", top: "42%", left: "50%", pointerEvents: "none", zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={burst ? { scale: [0, 1.4, 3.2], opacity: [0, 0.85, 0] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.12, 0.9, 0.25, 1] }}
          style={{
            position: "absolute",
            width: "120vmax",
            height: "120vmax",
            marginLeft: "-60vmax",
            marginTop: "-60vmax",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,77,109,0.75) 8%, rgba(168,85,247,0.5) 28%, rgba(0,212,255,0.25) 48%, transparent 68%)",
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={burst ? { scale: [0.15, 2.8, 4.5], opacity: [0, 0.6, 0] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.1, 0.85, 0.2, 1] }}
          style={{
            position: "absolute",
            width: "100vmax",
            height: "100vmax",
            marginLeft: "-50vmax",
            marginTop: "-50vmax",
            borderRadius: "50%",
            boxShadow: "0 0 120px rgba(255,77,109,0.7), 0 0 240px rgba(168,85,247,0.45), inset 0 0 80px rgba(255,77,109,0.3)",
            background: "radial-gradient(circle, transparent 42%, rgba(255,77,109,0.35) 48%, rgba(168,85,247,0.2) 52%, transparent 58%)",
          }}
        />
      </div>

      <motion.div
        animate={burst ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: "radial-gradient(ellipse 140% 120% at 50% 42%, rgba(255,77,109,0.55) 0%, rgba(168,85,247,0.3) 35%, rgba(0,212,255,0.12) 55%, transparent 75%)",
        }}
      />

      <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 4 }}>
        {burst && CONFETTI.map((piece, i) => {
          const rad = (piece.angle * Math.PI) / 180;
          const endX = Math.cos(rad) * piece.dist;
          const endY = Math.sin(rad) * piece.dist * 0.55 + piece.fall;
          return (
            <motion.div
              key={`confetti-${i}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 1, 0.6, 0],
                scale: [0.2, 1.1, 1, 0.8, 0.3],
                rotate: piece.spin,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.12, 0.88, 0.42, 1],
              }}
              style={{
                position: "absolute",
                width: piece.streak ? 2 : piece.w,
                height: piece.streak ? piece.h + 12 : piece.round ? piece.w : piece.h,
                borderRadius: piece.round ? "50%" : piece.streak ? 99 : 1,
                background: piece.streak
                  ? `linear-gradient(180deg, transparent, ${piece.color}, transparent)`
                  : piece.color,
                boxShadow: piece.streak ? "none" : `0 0 10px ${piece.color}, 0 0 18px ${piece.color}88`,
              }}
            />
          );
        })}
      </div>

      <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 5 }}>
        {burst && PARTICLES.map(({ color, angle, dist, size }, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: 0, scale: 0.1 }}
              transition={{ duration: 1.2, ease: [0.2, 0, 0.5, 1], delay: i * 0.022 }}
              style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}` }}
            />
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 6, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -360 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ opacity: { duration: 0.5 }, scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }, rotate: { duration: 1.5, ease: [0.34, 1.15, 0.64, 1] } }}
          style={{ position: "relative", zIndex: 3 }}
        >
          <motion.div
            animate={burst ? { scale: [1, 1.08, 1] } : {}}
            transition={burst ? { duration: 0.5, ease: "easeOut" } : {}}
          >
            <OpeningCameraLens size={220} aperture={0.32} glow glowIntensity={1} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
