"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type OpeningCameraLensProps = {
  size?: number;
  /** 0 = closed, 1 = fully open */
  aperture?: number;
  glow?: boolean;
  className?: string;
};

function OpeningCameraLens({
  size = 200,
  aperture = 0.35,
  glow = true,
  className = "",
}: OpeningCameraLensProps) {
  const bladeHeight = 10 + aperture * 22;

  return (
    <motion.div
      className={`relative rounded-full ${className}`}
      style={{ width: size, height: size }}
      animate={
        glow
          ? {
              boxShadow: [
                "0 0 0 2px rgba(255,255,255,0.05), 0 0 18px rgba(80,80,200,0.18)",
                "0 0 0 2px rgba(255,255,255,0.1), 0 0 50px rgba(255,77,109,0.35), 0 0 80px rgba(168,85,247,0.2)",
                "0 0 0 2px rgba(255,255,255,0.05), 0 0 18px rgba(80,80,200,0.18)",
              ],
            }
          : undefined
      }
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Metal body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(145deg, #4a4a4a 0%, #1a1a1a 35%, #2a2a2a 65%, #0a0a0a 100%)",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.8)",
        }}
      />

      {/* Outer ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "5%",
          background: "radial-gradient(circle at 30% 25%, #22223a, #0a0a10)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Mid ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "10%",
          background: "radial-gradient(circle at 30% 25%, #18182e, #050508)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)",
        }}
      />

      {/* Glass chamber */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: "12%",
          background:
            "radial-gradient(circle at 30% 25%, rgba(30,50,180,0.55) 0%, rgba(10,10,30,0.98) 55%, rgba(0,0,8,1) 100%)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,1)",
        }}
      >
        {/* Aperture blades */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: "22%",
              height: `${bladeHeight}%`,
              marginLeft: "-11%",
              marginTop: `-${bladeHeight}%`,
              background: "rgba(0,0,0,0.85)",
              clipPath: "polygon(28% 100%, 72% 100%, 50% 0)",
              transform: `rotate(${i * 60}deg)`,
            }}
          />
        ))}

        {/* Glass reflection */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "14%",
            width: "38%",
            height: "16%",
            background: "rgba(255,255,255,0.22)",
            transform: "rotate(-28deg)",
            filter: "blur(1px)",
          }}
          animate={{ opacity: [0.18, 0.32, 0.18], x: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center pupil */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            width: "18%",
            height: "18%",
            transform: "translate(-50%, -50%)",
            background: "#000",
          }}
        />
      </div>

      {/* Lens flare dot */}
      <div
        className="absolute rounded-full"
        style={{
          top: "8%",
          right: "16%",
          width: "8%",
          height: "3%",
          background: "rgba(255,255,255,0.12)",
          transform: "rotate(30deg)",
        }}
      />
    </motion.div>
  );
}

export default memo(OpeningCameraLens);
