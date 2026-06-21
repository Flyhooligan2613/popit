"use client";

import { motion } from "framer-motion";

type StartExploringButtonProps = {
  loading: boolean;
  isOverdrive: boolean;
  onClick: () => void;
};

export default function StartExploringButton({ loading, isOverdrive, onClick }: StartExploringButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      className={`popit-start-btn popit-start-btn-mock font-display ${loading ? "is-loading" : ""} ${isOverdrive ? "is-overdrive" : ""}`}
    >
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
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  );
}
