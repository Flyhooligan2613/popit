"use client";

import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IdentityType } from "@/lib/identity/types";
import { getIdentityTopicConfig } from "@/lib/identity/identityTopics";

type IdentityTopicPickerProps = {
  identity: IdentityType;
  selectedTopic: string | null;
  onSelect: (topicId: string) => void;
  accent?: string;
};

export default function IdentityTopicPicker({
  identity,
  selectedTopic,
  onSelect,
  accent = "#A855F7",
}: IdentityTopicPickerProps) {
  const config = getIdentityTopicConfig(identity);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={identity}
        initial={{ opacity: 0, y: 10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -6, height: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="identity-topic-picker"
        style={{ "--topic-accent": accent } as CSSProperties}
      >
        <label className="identity-topic-picker__label" htmlFor="identity-topic-select">
          {config.prompt}
        </label>
        <div className="identity-topic-picker__select-wrap">
          <select
            id="identity-topic-select"
            value={selectedTopic ?? ""}
            onChange={(e) => onSelect(e.target.value)}
            className="identity-topic-picker__select"
          >
            <option value="" disabled>
              Select your lane…
            </option>
            {config.groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span className="identity-topic-picker__chevron" aria-hidden>
            ▾
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
