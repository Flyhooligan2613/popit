"use client";

import { motion } from "framer-motion";

type BackNavButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export default function BackNavButton({ onClick, label = "Back", className = "" }: BackNavButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`back-nav-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 ${className}`.trim()}
      aria-label={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </motion.button>
  );
}
