"use client";

import { motion, useReducedMotion } from "framer-motion";

type StartExploringButtonProps = {
  loading: boolean;
  isOverdrive: boolean;
  onClick: () => void;
};

export default function StartExploringButton({ loading, isOverdrive, onClick }: StartExploringButtonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      whileTap={{ scale: 0.96 }}
      whileHover={reducedMotion ? undefined : { scale: 1.01 }}
      className={`popit-start-btn popit-start-btn-mock popit-start-btn-polish font-display ${loading ? "is-loading" : ""} ${isOverdrive ? "is-overdrive" : ""}`}
    >
      {!reducedMotion && !loading && (
        <span className="popit-start-btn-particles" aria-hidden>
          <span className="popit-start-btn-particle popit-start-btn-particle-1" />
          <span className="popit-start-btn-particle popit-start-btn-particle-2" />
          <span className="popit-start-btn-particle popit-start-btn-particle-3" />
        </span>
      )}
      <span className="popit-start-btn-glow" aria-hidden />
      <span className="popit-start-btn-sweep" aria-hidden />
      <span className="popit-start-btn-ripple" aria-hidden />
      <span className="popit-start-btn-inner">
        <span className="popit-start-btn-label">{loading ? "Loading…" : "Start Exploring"}</span>
        <span className="popit-start-btn-sub font-body">Discover · Connect · Experience</span>
      </span>
      {!loading && (
        <motion.span
          className="popit-start-btn-arrow"
          aria-hidden
          animate={reducedMotion ? undefined : { x: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  );
}
