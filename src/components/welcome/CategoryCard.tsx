"use client";

import { motion } from "framer-motion";

type CategoryCardProps = {
  icon: string;
  label: string;
  stat: string;
  theme: string;
  selected: boolean;
  delay: number;
};

export default function CategoryCard({ icon, label, stat, theme, selected, delay }: CategoryCardProps) {
  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: selected ? 1.04 : 1 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: selected ? 1.06 : 1.05, rotateX: 2 }}
      whileTap={{ scale: 0.94, y: -2 }}
      className={`popit-card popit-card-v2 ${theme} ${selected ? "is-selected" : ""}`}
    >
      <span className="popit-card-glass" aria-hidden />
      <span className="popit-card-reflection" aria-hidden />
      <span className="popit-card-fx" aria-hidden />
      <span className="popit-card-edge" aria-hidden />
      <span className="popit-card-icon" aria-hidden>
        {icon}
      </span>
      <span className="popit-card-label font-display">{label}</span>
      <span className="popit-card-stat font-body">{stat}</span>
    </motion.div>
  );
}
