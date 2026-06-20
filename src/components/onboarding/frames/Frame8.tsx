"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import BackNavButton from "@/components/nav/BackNavButton";
import { saveUserInterests } from "@/lib/city/personalizedCity";
import { Gamepad2, Trophy, Music2, Plane, Camera, UtensilsCrossed, Car, Cpu, TrendingUp, Clapperboard, Dumbbell, Shirt, Film, Moon, Footprints, PawPrint } from "lucide-react";

const INTERESTS = [
  { id: "gaming",        label: "Gaming",        Icon: Gamepad2 },
  { id: "sports",        label: "Sports",        Icon: Trophy },
  { id: "music",         label: "Music",         Icon: Music2 },
  { id: "travel",        label: "Travel",        Icon: Plane },
  { id: "photography",   label: "Photography",   Icon: Camera },
  { id: "food",          label: "Food",          Icon: UtensilsCrossed },
  { id: "cars",          label: "Cars",          Icon: Car },
  { id: "technology",    label: "Technology",    Icon: Cpu },
  { id: "business",      label: "Business",      Icon: TrendingUp },
  { id: "entertainment", label: "Entertainment", Icon: Clapperboard },
  { id: "fitness",       label: "Fitness",       Icon: Dumbbell },
  { id: "fashion",       label: "Fashion",       Icon: Shirt },
  { id: "movies",        label: "Movies",        Icon: Film },
  { id: "nightlife",     label: "Nightlife",     Icon: Moon },
  { id: "sneakers",      label: "Sneakers",      Icon: Footprints },
  { id: "pets",          label: "Pets",          Icon: PawPrint },
];

export default function Frame8({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSel(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const count = sel.size;
  const canGo = count >= 5;

  const proceed = () => {
    saveUserInterests([...sel]);
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
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 0%, rgba(255,77,109,0.07) 0%, transparent 55%)", zIndex: 0 }} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 20px 200px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#FF4D6D", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "system-ui, sans-serif" }}>Step 2 of 3</p>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", margin: "0 0 12px", fontFamily: "system-ui, sans-serif" }}>What Gets You Excited?</h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.95rem", margin: 0, fontFamily: "system-ui, sans-serif" }}>Choose at least 5. We'll make POP'IT yours.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {INTERESTS.map(({ id, label, Icon }, i) => {
            const active = sel.has(id);
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.035, duration: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "22px 12px", borderRadius: 20, cursor: "pointer", border: "none", fontFamily: "system-ui, sans-serif", background: active ? "rgba(255,77,109,0.1)" : "rgba(255,255,255,0.035)", outline: active ? "1.5px solid rgba(255,77,109,0.5)" : "1.5px solid rgba(255,255,255,0.07)", boxShadow: active ? "0 0 28px rgba(255,77,109,0.22)" : "none", transition: "all 0.22s ease" }}
              >
                <Icon size={22} strokeWidth={1.7} style={{ color: active ? "#FF4D6D" : "rgba(255,255,255,0.4)", transition: "color 0.22s", transform: active ? "scale(1.12)" : "scale(1)" }} />
                <span style={{ color: active ? "#fff" : "rgba(255,255,255,0.48)", fontSize: "0.78rem", fontWeight: active ? 600 : 400, transition: "all 0.22s" }}>{label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10, background: "linear-gradient(to top, #050505 60%, transparent)", padding: "20px 24px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i < count ? 28 : 8, background: i < count ? "linear-gradient(90deg,#FF4D6D,#A855F7)" : "rgba(255,255,255,0.13)" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 7, borderRadius: 99 }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.78rem", marginLeft: 8, fontFamily: "system-ui, sans-serif" }}>
            {count < 5 ? `${count} of 5` : `${count} selected ✓`}
          </span>
        </div>
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          <motion.button
            onClick={proceed}
            disabled={!canGo}
            animate={{ opacity: canGo ? 1 : 0.28 }}
            style={{ width: "100%", padding: "17px", borderRadius: 99, border: "none", background: "linear-gradient(90deg, #FF4D6D, #A855F7, #00D4FF)", color: "#fff", fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", cursor: canGo ? "pointer" : "not-allowed", boxShadow: canGo ? "0 0 32px rgba(255,77,109,0.35)" : "none" }}
          >
            Continue
          </motion.button>
          <button onClick={proceed} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.28)", fontFamily: "system-ui, sans-serif", fontSize: "0.875rem", cursor: "pointer", padding: "8px", width: "100%" }}>
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}
