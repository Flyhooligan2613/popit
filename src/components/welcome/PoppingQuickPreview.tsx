"use client";

import { motion } from "framer-motion";
import type { PoppingCard } from "./popping/types";

type PoppingQuickPreviewProps = {
  card: PoppingCard;
  onClose: () => void;
};

export default function PoppingQuickPreview({ card, onClose }: PoppingQuickPreviewProps) {
  return (
    <motion.div
      className="popping-preview-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        className="popping-preview-panel"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Preview ${card.title}`}
      >
        <div className="popping-preview-photo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt="" className="popping-preview-photo" />
        </div>
        <div className="popping-preview-body">
          <p className="popping-preview-kind font-body">{card.category}</p>
          <h3 className="popping-preview-title font-display">{card.title}</h3>
          <p className="popping-preview-score font-body">POP SCORE {card.popScore}</p>
          <p className="popping-preview-hint font-body">Join POP&apos;IT to explore this moment live.</p>
        </div>
        <button type="button" className="popping-preview-close font-body" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
