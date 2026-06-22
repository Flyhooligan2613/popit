"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { BackgroundCategoryId } from "@/lib/identity/platformBackgrounds";
import {
  BACKGROUND_CATEGORIES,
  backgroundHasVariants,
  backgroundVariantsOf,
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
  const [variantParent, setVariantParent] = useState<string | null>(null);

  const items = useMemo(
    () => backgroundsForCategory(category, identity),
    [category, identity]
  );

  const variants = useMemo(
    () => (variantParent ? backgroundVariantsOf(variantParent) : []),
    [variantParent]
  );

  const preview = getPlatformBackground(selected ?? undefined);

  useEffect(() => {
    setVariantParent(null);
  }, [category]);

  const handlePick = (id: string) => {
    if (backgroundHasVariants(id)) {
      setVariantParent(id);
      if (!selected || !backgroundVariantsOf(id).some((v) => v.id === selected)) {
        onSelect(id);
      }
      return;
    }
    onSelect(id);
  };

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
          const active = selected === bg.id || bg.id === variantParent;
          const hasVariants = backgroundHasVariants(bg.id);
          return (
            <motion.button
              key={bg.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-picker__cell ${active ? "is-active" : ""}`}
              onClick={() => handlePick(bg.id)}
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
              {hasVariants ? <span className="bg-picker__cell-badge">Styles</span> : null}
            </motion.button>
          );
        })}
      </div>

      {variantParent && variants.length > 1 && (
        <div className="bg-picker__variants">
          <div className="bg-picker__variants-head">
            <p className="bg-picker__variants-title">Choose a style</p>
            <button
              type="button"
              className="bg-picker__variants-back"
              onClick={() => setVariantParent(null)}
            >
              Back
            </button>
          </div>
          <div className="bg-picker__grid bg-picker__grid--variants">
            {variants.map((bg, i) => {
              const active = selected === bg.id;
              return (
                <motion.button
                  key={bg.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
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
      )}

      <p className="bg-picker__profile-note">
        Backgrounds appear on your profile page only.
      </p>
    </div>
  );
}
