"use client";

import { motion } from "framer-motion";
import type { SignalNode } from "./signal/types";
import { SIGNAL_CATEGORY_COLOR } from "./signal/types";

type SignalNodePreviewProps = {
  node: SignalNode;
  onOpen: () => void;
  onClose: () => void;
};

export default function SignalNodePreview({ node, onOpen, onClose }: SignalNodePreviewProps) {
  const accent = SIGNAL_CATEGORY_COLOR[node.category];

  return (
    <motion.div
      className="signal-node-preview"
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.94 }}
      style={{ "--signal-accent": accent } as Record<string, string>}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`${node.title} preview`}
    >
      {node.image && (
        <div className="signal-preview-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt="" className="signal-preview-image" loading="lazy" />
        </div>
      )}
      <div className="signal-preview-body">
        <p className="signal-preview-status font-body">{node.status}</p>
        <h3 className="signal-preview-title font-display">
          {node.icon} {node.title}
        </h3>
        {node.distance && <p className="signal-preview-meta font-body">📍 {node.distance}</p>}
        {node.liveCount != null && (
          <p className="signal-preview-live font-body">{node.liveCount.toLocaleString()} active now</p>
        )}
        <button type="button" className="signal-preview-open font-body" onClick={onOpen}>
          Open
        </button>
        <button type="button" className="signal-preview-dismiss font-body" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
}
