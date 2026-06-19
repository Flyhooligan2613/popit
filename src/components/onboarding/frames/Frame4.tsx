"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CameraLens() {
  return (
    <motion.div
      animate={{ boxShadow: ["0 0 24px rgba(255,77,109,0.4), 0 0 0 2px rgba(255,255,255,0.06)", "0 0 60px rgba(168,85,247,0.7), 0 0 0 2px rgba(255,255,255,0.1)", "0 0 24px rgba(255,77,109,0.4), 0 0 0 2px rgba(255,255,255,0.06)"] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 150, height: 150, borderRadius: "50%", position: "relative", background: "radial-gradient(circle at 35% 30%, #1e1e2e, #060608)" }}
    >
      <div style={{ position: "absolute", inset: "5%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, #22223a, #0a0a10)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ position: "absolute", inset: "10%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, #18182e, #050508)", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)" }}>
          <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, rgba(30,50,180,0.55) 0%, rgba(10,10,30,0.98) 55%, rgba(0,0,8,1) 100%)", boxShadow: "inset 0 0 30px rgba(0,0,0,1)" }}>
            <motion.div
              animate={{ opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "10%", left: "14%", width: "38%", height: "16%", borderRadius: "50%", background: "rgba(255,255,255,0.22)", transform: "rotate(-28deg)", filter: "blur(1px)" }}
            />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "18%", height: "18%", borderRadius: "50%", background: "rgba(0,0,0,1)" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SWIRLS = [
  { color: "#FF4D6D", d: "M -320 -200 C -200 -150 -100 -60 0 0 C 80 50 160 90 240 110", delay: 0 },
  { color: "#A855F7", d: "M -360 10 C -240 8 -120 4 0 0 C 120 -4 240 -10 360 -20", delay: 0.18 },
  { color: "#00D4FF", d: "M -280 230 C -190 170 -100 80 0 0 C 90 -70 180 -150 250 -210", delay: 0.34 },
];

export default function Frame4() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 600, height: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>

        <svg
          width="600"
          height="600"
          viewBox="-300 -300 600 600"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <defs>
            {SWIRLS.map(({ color }, i) => (
              <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
          </defs>
          {SWIRLS.map(({ color, d, delay }, i) => {
            const delayFraction = delay / 2;
            const adjustedProgress = Math.max(0, Math.min(1, (progress - delayFraction) / (1 - delayFraction)));
            return (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                filter={`url(#glow${i})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: adjustedProgress, opacity: adjustedProgress > 0 ? 1 : 0 }}
                transition={{ duration: 0.05 }}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            );
          })}
        </svg>

        <div style={{ position: "relative", zIndex: 2 }}>
          <CameraLens />
        </div>
      </div>
    </div>
  );
}
