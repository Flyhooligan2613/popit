"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ZipCodeEntry from "@/components/location/ZipCodeEntry";
import {
  getPopitLocation,
  hasSeenLocationPrompt,
  markLocationPromptSeen,
} from "@/lib/location/zipLocation";

type LocationPermissionPromptProps = {
  onResolved?: (city: string) => void;
};

export default function LocationPermissionPrompt({ onResolved }: LocationPermissionPromptProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasSeenLocationPrompt()) return;
    if (getPopitLocation()?.zipCode) {
      markLocationPromptSeen();
      return;
    }
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const finish = useCallback(
    (city: string) => {
      markLocationPromptSeen();
      setOpen(false);
      onResolved?.(city);
    },
    [onResolved]
  );

  const handleSkip = () => {
    markLocationPromptSeen();
    setOpen(false);
    onResolved?.("Your City");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 p-4 sm:items-center"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="relative w-full max-w-[400px] rounded-[28px] border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_60px_rgba(255,77,109,0.15)]"
          >
            <button
              type="button"
              onClick={handleSkip}
              aria-label="Close"
              className="absolute right-4 top-4 border-none bg-transparent text-white/35"
            >
              <X size={20} />
            </button>

            <div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
              style={{ boxShadow: "0 0 28px rgba(255,77,109,0.25)" }}
            >
              <MapPin size={26} className="text-[#FF4D6D]" strokeWidth={1.75} />
            </div>

            <p className="mb-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#FF4D6D]">
              Your ZIP Code
            </p>
            <h2 className="mb-2 font-sans text-xl font-extrabold text-white">
              Set your POP environment
            </h2>
            <p className="mb-4 font-sans text-[0.92rem] leading-relaxed text-white/45">
              We use your ZIP code to match local feed, weather, and time to your area — without
              tracking you everywhere. When you travel, update your ZIP in Settings.
            </p>

            <ZipCodeEntry compact onSaved={finish} />

            <button
              type="button"
              onClick={handleSkip}
              className="mt-3 w-full cursor-pointer border-none bg-transparent px-2 py-2 font-sans text-[0.875rem] text-white/30"
            >
              Not Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
