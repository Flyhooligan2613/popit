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
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: selected ? 1.03 : 1 }}
      transition={{ delay, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: selected ? 1.05 : 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`popit-card ${theme} ${selected ? "is-selected" : ""}`}
    >
      <span className="popit-card-fx" aria-hidden />
      <span className="popit-card-icon" aria-hidden>
        {icon}
      </span>
      <span className="popit-card-label font-display">{label}</span>
      <span className="popit-card-stat font-body">{stat}</span>
    </motion.div>
  );
}
