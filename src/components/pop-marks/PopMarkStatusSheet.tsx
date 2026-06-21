"use client";

import { AnimatePresence, motion } from "framer-motion";
import PopMark from "./PopMark";
import { getPopMarkConfig } from "@/lib/pop-marks/types";
import type { PopMarkTier } from "@/lib/pop-marks/types";
import type { PopStatusState } from "@/lib/creator-economy/types";

type PopMarkStatusSheetProps = {
  open: boolean;
  tier: PopMarkTier;
  career?: PopStatusState | null;
  onClose: () => void;
};

export default function PopMarkStatusSheet({ open, tier, career, onClose }: PopMarkStatusSheetProps) {
  const config = getPopMarkConfig(tier);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="pop-mark-sheet-backdrop"
            aria-label="Close POP Status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="pop-mark-sheet"
            role="dialog"
            aria-labelledby="pop-mark-sheet-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pop-mark-sheet-header">
              <PopMark tier={tier} size={32} animate={false} interactive={false} />
              <div>
                <h2 id="pop-mark-sheet-title" className="pop-mark-sheet-title font-display">
                  POP Status
                </h2>
                <p className="pop-mark-sheet-tier font-body">
                  {config.title} · {config.subtitle}
                </p>
              </div>
            </div>

            <p className="pop-mark-sheet-philosophy font-body">{config.philosophy}</p>

            <section className="pop-mark-sheet-section">
              <h3 className="pop-mark-sheet-label font-body">Why you earned it</h3>
              <ul className="pop-mark-sheet-list font-body">
                {config.whyEarned.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="pop-mark-sheet-section">
              <h3 className="pop-mark-sheet-label font-body">Requirements</h3>
              <ul className="pop-mark-sheet-reqs font-body">
                {config.requirements.map((req) => (
                  <li key={req.label}>{req.label}</li>
                ))}
              </ul>
            </section>

            {career?.nextLevel && career.nextRequirements.length > 0 && (
              <section className="pop-mark-sheet-section">
                <h3 className="pop-mark-sheet-label font-body">
                  Progress toward {config.nextTitle ?? career.nextLevel.label}
                </h3>
                <div className="pop-mark-sheet-progress-bar" aria-hidden>
                  <span style={{ width: `${Math.round(career.progressToNext * 100)}%` }} />
                </div>
                <p className="pop-mark-sheet-progress-meta font-body">
                  {career.nextRequirements.join(" · ")}
                </p>
              </section>
            )}

            <button type="button" className="pop-mark-sheet-close font-body" onClick={onClose}>
              Done
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
