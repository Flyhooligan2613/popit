"use client";

import { motion } from "framer-motion";
import PopitMark from "@/components/brand/PopitMark";
import { useEffect, useState } from "react";

const DURATION_MS = 4200;

export default function Frame10({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"arrive" | "through" | "transport">("arrive");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("through"), 1400);
    const t2 = setTimeout(() => setPhase("transport"), 2600);
    const t3 = setTimeout(() => onNext(), DURATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onNext]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background:
            phase === "transport"
              ? "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #FF4D6D 20%, #050505 70%)"
              : "radial-gradient(ellipse at 50% 45%, rgba(168,85,247,0.15) 0%, transparent 60%)",
        }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: phase === "through" ? 18 : phase === "transport" ? 24 : 1,
          opacity: phase === "transport" ? 0 : 1,
        }}
        transition={{ duration: phase === "through" ? 1.1 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{
            boxShadow:
              phase === "arrive"
                ? [
                    "0 0 32px rgba(255,77,109,0.5), 0 0 64px rgba(168,85,247,0.3)",
                    "0 0 48px rgba(0,212,255,0.6), 0 0 96px rgba(255,77,109,0.4)",
                    "0 0 32px rgba(255,77,109,0.5), 0 0 64px rgba(168,85,247,0.3)",
                  ]
                : "0 0 80px rgba(255,255,255,0.8), 0 0 160px rgba(255,77,109,0.6)",
          }}
          transition={{ duration: phase === "arrive" ? 1.4 : 0.6, repeat: phase === "arrive" ? Infinity : 0 }}
          className="relative rounded-full"
        >
          {phase === "arrive" && (
            <motion.div
              className="absolute inset-[-20px] rounded-full border border-[#00D4FF]/40"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <PopitMark size={96} />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-poster absolute bottom-16 left-0 right-0 text-center text-sm tracking-[0.3em] text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "arrive" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        See What&apos;s Popping
      </motion.p>
    </div>
  );
}
