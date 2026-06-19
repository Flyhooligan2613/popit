"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PopitLens from "./PopitLens";

type LensProfileTransitionProps = {
  name: string;
  followers: number;
  creatorLevel: number;
  influence: number;
  verified?: boolean;
  live?: boolean;
  accent?: string;
  href: string;
  size?: number;
};

function LensProfileTransition({
  name,
  followers,
  creatorLevel,
  influence,
  verified,
  live,
  accent,
  href,
  size = 72,
}: LensProfileTransitionProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "zoom" | "open">("idle");

  const handleTap = () => {
    if (phase !== "idle") return;
    setPhase("zoom");
    setTimeout(() => setPhase("open"), 300);
    setTimeout(() => router.push(href), 750);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "open" ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-[101]"
        animate={{
          scale: phase === "zoom" || phase === "open" ? 3.5 : 1,
          zIndex: phase !== "idle" ? 101 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center center" }}
      >
        <PopitLens
          name={name}
          followers={followers}
          creatorLevel={creatorLevel}
          influence={influence}
          verified={verified}
          live={live}
          accent={accent}
          size={size}
          interactive
          onTap={handleTap}
        />
      </motion.div>
    </div>
  );
}

export default memo(LensProfileTransition);
