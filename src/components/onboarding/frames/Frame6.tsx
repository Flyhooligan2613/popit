"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  "https://images.unsplash.com/photo-1768053919038-4340b9333e00?w=1080&q=80",
  "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1080&q=80",
  "https://images.unsplash.com/photo-1775649135829-4ccec72dc442?w=1080&q=80",
  "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?w=1080&q=80",
  "https://images.unsplash.com/photo-1554143907-4f0625902eed?w=1080&q=80",
];

export default function Frame6({ onNext }: { onNext: () => void }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

      <AnimatePresence mode="sync">
        <motion.img
          key={slide}
          src={SLIDES[slide]}
          alt="background"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
      </AnimatePresence>

      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.3) 35%, rgba(5,5,5,0.88) 70%, rgba(5,5,5,0.97) 100%)" }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "52px 28px" }}>

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Image src="/brand/logo/popit-mark.png" alt="POP'IT" width={100} height={75} style={{ objectFit: "contain" }} priority />
        </motion.div>

        <motion.div style={{ textAlign: "center" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.4rem, 9vw, 3.8rem)", fontWeight: 800, fontFamily: "Georgia, serif", letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 16, textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}>
            What's Popping?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.7, fontFamily: "system-ui, sans-serif", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>
            Discover what's happening.<br />Share what matters.
          </p>
        </motion.div>

        <motion.div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 310, alignItems: "center" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
          <button
            onClick={onNext}
            style={{ width: "100%", padding: "17px", borderRadius: 99, border: "none", background: "linear-gradient(90deg, #FF4D6D, #A855F7, #00D4FF)", color: "#fff", fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", letterSpacing: "0.01em", boxShadow: "0 0 32px rgba(255,77,109,0.4)" }}
          >
            Join POP'IT
          </button>
          <button
            onClick={onNext}
            style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "system-ui, sans-serif", fontSize: "1rem", fontWeight: 500, cursor: "pointer", padding: "10px" }}
          >
            Sign In
          </button>
        </motion.div>

      </div>
    </div>
  );
}
