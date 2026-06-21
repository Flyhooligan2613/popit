"use client";

import { motion } from "framer-motion";
import { CategoryIcon } from "./CategoryIcons";

type CategoryCardProps = {
  icon: string;
  label: string;
  stat: string;
  theme: string;
  selected: boolean;
  delay: number;
};

const THEME_FX: Record<string, string> = {
  "card-restaurants": "fx-warm",
  "card-events": "fx-neon",
  "card-trending": "fx-electric",
  "card-nearby": "fx-radar",
};

export default function CategoryCard({ label, stat, theme, selected, delay }: CategoryCardProps) {
  const fx = THEME_FX[theme] ?? "";

  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: selected ? 1.03 : 1 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={`popit-card popit-card-mock ${theme} ${fx} ${selected ? "is-selected" : ""}`}
    >
      <span className="popit-card-glass" aria-hidden />
      <span className="popit-card-theme-fx" aria-hidden />
      <span className="popit-card-edge" aria-hidden />
      <span className="popit-card-icon-svg" aria-hidden>
        <CategoryIcon theme={theme} className="popit-category-svg" />
      </span>
      <span className="popit-card-label font-display">{label}</span>
      <span className="popit-card-stat font-body">{stat}</span>
    </motion.div>
  );
}
