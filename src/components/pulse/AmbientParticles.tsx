"use client";

import { memo } from "react";
import { motion } from "framer-motion";

const BOKEH = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: (i * 17 + 5) % 100,
  y: (i * 23 + 9) % 100,
  size: 2 + (i % 4),
  duration: 10 + (i % 7) * 2,
  delay: (i % 9) * 0.4,
  color: ["#FF4D6D", "#A855F7", "#00D4FF", "#FF7A00", "#7C3AED"][i % 5],
  blur: i % 3 === 0,
}));

function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BOKEH.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            filter: p.blur ? `blur(${p.size}px)` : undefined,
            boxShadow: p.blur ? `0 0 ${p.size * 5}px ${p.color}` : undefined,
          }}
          animate={{
            y: [0, -36, 0],
            x: [0, p.id % 2 === 0 ? 18 : -18, 0],
            opacity: [0.12, 0.5, 0.12],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default memo(AmbientParticles);
