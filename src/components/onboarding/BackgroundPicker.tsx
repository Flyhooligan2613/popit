"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { BackgroundCategoryId } from "@/lib/identity/platformBackgrounds";
import {
  BACKGROUND_CATEGORIES,
  backgroundsForCategory,
  getPlatformBackground,
} from "@/lib/identity/platformBackgrounds";
import { getUserIdentity } from "@/lib/identity/userProfile";
import type { IdentityType } from "@/lib/identity/types";

type BackgroundPickerProps = {
  selected: string | null;
  onSelect: (id: string) => void;
  accent: string;
  identity?: IdentityType;
};

export default function BackgroundPicker({
  selected,
  onSelect,
  accent,
  identity: identityProp,
}: BackgroundPickerProps) {
  const identity = identityProp ?? getUserIdentity();
  const [category, setCategory] = useState<BackgroundCategoryId>("flags");

  const items = useMemo(
    () => backgroundsForCategory(category, identity),
    [category, identity]
  );

  const preview = getPlatformBackground(selected ?? undefined);

  return (
    <div className="bg-picker">
      <div className="bg-picker__preview" style={{ background: preview.gradient }} aria-hidden>
        <span className="bg-picker__preview-label">
          {preview.emoji ?? "🌆"} {preview.label}
        </span>
      </div>

      <div className="bg-picker__categories" role="tablist">
        {BACKGROUND_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            className={`bg-picker__category ${category === cat.id ? "is-active" : ""}`}
            onClick={() => setCategory(cat.id)}
            style={
              category === cat.id
                ? ({ "--bg-accent": accent } as React.CSSProperties)
                : undefined
            }
          >
            {cat.label}
          </button>
        ))}
      </div>
      <p className="bg-picker__category-hint">
        {BACKGROUND_CATEGORIES.find((c) => c.id === category)?.description}
      </p>

      <div className="bg-picker__grid">
        {items.map((bg, i) => {
          const active = selected === bg.id;
          return (
            <motion.button
              key={bg.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-picker__cell ${active ? "is-active" : ""}`}
              onClick={() => onSelect(bg.id)}
              style={{
                background: bg.gradient,
                outline: active ? `2px solid ${accent}` : undefined,
                boxShadow: active
                  ? `0 0 24px color-mix(in srgb, ${accent} 35%, transparent)`
                  : undefined,
              }}
            >
              <span className="bg-picker__cell-emoji">{bg.emoji ?? "🌆"}</span>
              <span className="bg-picker__cell-label">{bg.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
