"use client";
import { motion } from "framer-motion";
import OpeningCameraLens from "@/components/brand/OpeningCameraLens";

export default function Frame3() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ filter: "blur(14px)", scale: 1.08 }}
        animate={{ filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      >
        <OpeningCameraLens size={200} aperture={0.25} />
      </motion.div>
    </div>
  );
}
