"use client";

import { motion } from "framer-motion";
import type { SignalBubble } from "./signal/types";
import { SIGNAL_CATEGORY_COLOR } from "./signal/types";

type SignalNodePreviewProps = {
  node: SignalBubble;
  visitHref: string;
  onVisit: () => void;
  onClose: () => void;
};

export default function SignalNodePreview({ node, visitHref, onVisit, onClose }: SignalNodePreviewProps) {
  const accent = SIGNAL_CATEGORY_COLOR[node.category] ?? "#00d4ff";

  return (
    <motion.div
      className="signal-node-preview signal-node-preview--fullscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${node.title}`}
    >
      <motion.div
        className="signal-node-preview__card"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ "--signal-accent": accent } as Record<string, string>}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="signal-preview-close" onClick={onClose} aria-label="Close preview">
          ✕
        </button>

        {node.image && (
          <div className="signal-preview-image-wrap signal-preview-image-wrap--hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.image} alt="" className="signal-preview-image" loading="lazy" />
            <div className="signal-preview-image-scrim" aria-hidden />
          </div>
        )}

        <div className="signal-preview-body signal-preview-body--fullscreen">
          {node.badge && <p className="signal-preview-status font-body">{node.badge}</p>}
          <h3 className="signal-preview-title font-display">
            {node.icon} {node.title}
          </h3>
          <p className="signal-preview-meta font-body">{node.status}</p>
          {node.detail && <p className="signal-preview-meta font-body">{node.detail}</p>}
          {node.distance && <p className="signal-preview-meta font-body">📍 {node.distance}</p>}
          {node.liveCount != null && (
            <p className="signal-preview-live font-body">{node.liveCount.toLocaleString()} active now</p>
          )}

          <div className="signal-preview-actions">
            <button type="button" className="signal-preview-open font-body" onClick={onVisit}>
              Visit page
            </button>
            <button type="button" className="signal-preview-dismiss font-body" onClick={onClose}>
              Not now
            </button>
          </div>
          <p className="signal-preview-route-hint font-body">Opens {visitHref}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
