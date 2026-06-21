"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import BackNavButton from "@/components/nav/BackNavButton";
import { saveUserInterests } from "@/lib/city/personalizedCity";
import type { InterestId } from "@/lib/city/personalizedCity";
import {
  getIdentityInterestConfig,
  resolveInterestsForCity,
} from "@/lib/identity/identityInterests";
import { getInterestIcon } from "@/lib/identity/interestIcons";
import { getUserIdentity } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";

export default function Frame8({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const identity = getUserIdentity();
  const config = useMemo(() => getIdentityInterestConfig(identity), [identity]);
  const accent = getIdentityAccent(identity);
  const identityLabel = IDENTITY_OPTIONS.find((option) => option.id === identity)?.label ?? "Your";

  const [sel, setSel] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSel(new Set());
  }, [identity, config.interests]);

  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const count = sel.size;
  const canGo = count >= config.minSelect;

  const proceed = () => {
    const cityInterests = resolveInterestsForCity(identity, [...sel]) as InterestId[];
    saveUserInterests(cityInterests.length > 0 ? cityInterests : ([...sel] as InterestId[]));
    onNext();
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", overflowY: "auto" }}>
      {onBack && (
        <div
          style={{
            position: "fixed",
            top: "max(0.75rem, env(safe-area-inset-top, 0px))",
            left: "max(1rem, env(safe-area-inset-left, 0px))",
            zIndex: 20,
          }}
        >
          <BackNavButton onClick={onBack} />
        </div>
      )}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${accent} 18%, transparent) 0%, transparent 55%)`,
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 20px 200px", position: "relative", zIndex: 1 }}>
        <motion.div
          key={identity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <p
            style={{
              color: accent,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Step 2 of 3 · {identityLabel}
          </p>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              margin: "0 0 12px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {config.title}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.95rem",
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {config.subtitle}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {config.interests.map(({ id, label, icon }, i) => {
            const active = sel.has(id);
            const Icon = getInterestIcon(icon);
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.035, duration: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "22px 12px",
                  borderRadius: 20,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "system-ui, sans-serif",
                  background: active ? `${accent}18` : "rgba(255,255,255,0.035)",
                  outline: active ? `1.5px solid color-mix(in srgb, ${accent} 55%, white)` : "1.5px solid rgba(255,255,255,0.07)",
                  boxShadow: active ? `0 0 28px color-mix(in srgb, ${accent} 28%, transparent)` : "none",
                  transition: "all 0.22s ease",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.7}
                  style={{
                    color: active ? accent : "rgba(255,255,255,0.4)",
                    transition: "color 0.22s",
                    transform: active ? "scale(1.12)" : "scale(1)",
                  }}
                />
                <span
                  style={{
                    color: active ? "#fff" : "rgba(255,255,255,0.48)",
                    fontSize: "0.78rem",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.22s",
                    textAlign: "center",
                  }}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: "linear-gradient(to top, #050505 60%, transparent)",
          padding: "20px 24px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Array.from({ length: config.minSelect }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i < count ? 28 : 8,
                background:
                  i < count
                    ? `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 40%, #00D4FF))`
                    : "rgba(255,255,255,0.13)",
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 7, borderRadius: 99 }}
            />
          ))}
          <span
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.78rem",
              marginLeft: 8,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {count < config.minSelect ? `${count} of ${config.minSelect}` : `${count} selected ✓`}
          </span>
        </div>
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          <motion.button
            onClick={proceed}
            disabled={!canGo}
            animate={{ opacity: canGo ? 1 : 0.28 }}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: 99,
              border: "none",
              background: `linear-gradient(90deg, ${accent}, #A855F7, #00D4FF)`,
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: canGo ? "pointer" : "not-allowed",
              boxShadow: canGo ? `0 0 32px color-mix(in srgb, ${accent} 35%, transparent)` : "none",
            }}
          >
            Continue
          </motion.button>
          <button
            onClick={proceed}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.875rem",
              cursor: "pointer",
              padding: "8px",
              width: "100%",
            }}
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}
