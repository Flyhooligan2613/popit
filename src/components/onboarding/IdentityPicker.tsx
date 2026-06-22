"use client";

import { motion } from "framer-motion";
import type { IdentityType } from "@/lib/identity/types";
import { IDENTITY_OPTIONS } from "@/lib/identity/types";

type IdentityPickerProps = {
  selected: IdentityType | null;
  onSelect: (id: IdentityType) => void;
};

export default function IdentityPicker({ selected, onSelect }: IdentityPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {IDENTITY_OPTIONS.map((option, i) => {
        const active = selected === option.id;
        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border px-3 py-3 text-left transition"
            style={{
              borderColor: active ? option.accent : "rgba(255,255,255,0.1)",
              background: active ? `${option.accent}18` : "rgba(255,255,255,0.04)",
              boxShadow: active ? `0 0 20px ${option.accent}33` : undefined,
            }}
          >
            <p className="font-body text-sm font-bold text-white">{option.label}</p>
            <p className="font-body text-[0.65rem] text-white/40">{option.description}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
