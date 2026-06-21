"use client";

import { motion } from "framer-motion";
import { CategoryIcon } from "./CategoryIcons";
import ReliableImage from "./ReliableImage";

type CategoryCardProps = {
  icon: string;
  label: string;
  stat: string;
  theme: string;
  image?: string;
  selected: boolean;
  delay: number;
  onClick?: () => void;
};

const THEME_FX: Record<string, string> = {
  "card-restaurants": "fx-warm",
  "card-events": "fx-neon",
  "card-trending": "fx-electric",
  "card-nearby": "fx-radar",
};

export default function CategoryCard({
  icon,
  label,
  stat,
  theme,
  image,
  selected,
  delay,
  onClick,
}: CategoryCardProps) {
  const fx = THEME_FX[theme] ?? "";

  return (
    <motion.button
      type="button"
      role="listitem"
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: selected ? 1.03 : 1 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={`popit-card popit-card-mock popit-card-portal popit-card-photo popit-tap-target ${theme} ${fx} ${selected ? "is-selected" : ""}`}
    >
      {image && (
        <span className="popit-card-photo-bg" aria-hidden>
          <ReliableImage
            src={image}
            className="popit-card-photo-img"
            fallbackClassName="popit-card-photo-fallback"
            fallbackIcon={icon}
          />
        </span>
      )}
      <span className="popit-card-photo-scrim" aria-hidden />
      <span className="popit-card-photo-glow" aria-hidden />
      <span className="popit-card-glass" aria-hidden />
      <span className="popit-card-theme-fx" aria-hidden />
      <span className="popit-card-edge" aria-hidden />
      <span className="popit-card-light-sweep" aria-hidden />
      <span className="popit-card-portal-particles" aria-hidden>
        <span className="popit-card-portal-particle popit-card-portal-particle-1" />
        <span className="popit-card-portal-particle popit-card-portal-particle-2" />
        <span className="popit-card-portal-particle popit-card-portal-particle-3" />
      </span>

      <span className="popit-card-icon-badge" aria-hidden>
        <CategoryIcon theme={theme} className="popit-category-svg" />
      </span>

      <div className="popit-card-photo-content">
        <span className="popit-card-label font-display">{label}</span>
        <span className="popit-card-stat font-body">{stat}</span>
      </div>
    </motion.button>
  );
}
