"use client";
import { motion } from "framer-motion";
import OpeningCameraLens from "@/components/brand/OpeningCameraLens";

export default function Frame2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <OpeningCameraLens size={200} aperture={0.15} />
      </motion.div>
    </div>
  );
}
