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
      className={`popit-start-btn popit-start-btn-v2 font-display ${loading ? "is-loading" : ""} ${isOverdrive ? "is-overdrive" : ""}`}
    >
      <span className="popit-start-btn-glow" aria-hidden />
      <span className="popit-start-btn-ripple" aria-hidden />
      <span className="popit-start-btn-particles" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="popit-start-btn-label">{loading ? "Loading…" : "Start Exploring Free"}</span>
      {!loading && (
        <span className="popit-start-btn-arrow" aria-hidden>
          →
        </span>
      )}
    </motion.button>
  );
}
