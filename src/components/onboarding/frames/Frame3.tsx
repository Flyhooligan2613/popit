"use client";
import { motion } from "framer-motion";

function CameraLens() {
  return (
    <motion.div
      animate={{ boxShadow: "0 0 50px rgba(255,77,109,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
      style={{ width: 200, height: 200, borderRadius: "50%", position: "relative", background: "radial-gradient(circle at 35% 30%, #1e1e2e, #060608)" }}
    >
      <div style={{ position: "absolute", inset: "5%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, #22223a, #0a0a10)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ position: "absolute", inset: "10%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, #18182e, #050508)", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)" }}>
          <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, rgba(30,50,180,0.55) 0%, rgba(10,10,30,0.98) 55%, rgba(0,0,8,1) 100%)", boxShadow: "inset 0 0 30px rgba(0,0,0,1)" }}>
            <div style={{ position: "absolute", top: "10%", left: "14%", width: "38%", height: "16%", borderRadius: "50%", background: "rgba(255,255,255,0.22)", transform: "rotate(-28deg)", filter: "blur(1px)" }} />
            <div style={{ position: "absolute", top: "18%", left: "10%", width: "14%", height: "7%", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "18%", height: "18%", borderRadius: "50%", background: "rgba(0,0,0,1)" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "8%", right: "16%", width: "8%", height: "3%", borderRadius: "50%", background: "rgba(255,255,255,0.12)", transform: "rotate(30deg)" }} />
    </motion.div>
  );
}

export default function Frame3() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ filter: "blur(14px)", scale: 1.08 }}
        animate={{ filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      >
        <CameraLens />
      </motion.div>
    </div>
  );
}
