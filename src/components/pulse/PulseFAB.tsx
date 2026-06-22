"use client";

import { AnimatePresence, motion } from "framer-motion";
import OpeningCameraLens from "@/components/brand/OpeningCameraLens";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PopitIcon from "./PopitIcon";
import { FAB_ACTIONS } from "./data";
import { createModeRoute } from "@/lib/social/createRoutes";
import { useSocialActionsOptional } from "@/lib/social/SocialActionsContext";

const RADIUS = 118;

function radialPosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.sin(rad) * RADIUS,
    y: -Math.cos(rad) * RADIUS - 20,
  };
}

export default function PulseFAB() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const social = useSocialActionsOptional();

  const handleAction = (actionId: string) => {
    setOpen(false);
    if (actionId === "closeFriends") {
      router.push("/close-friends");
      return;
    }
    if (actionId === "live") {
      router.push(createModeRoute("live"));
      return;
    }
    if (actionId === "photo") {
      router.push(createModeRoute("page"));
      return;
    }
    if (actionId === "video") {
      router.push(createModeRoute("reel"));
      return;
    }
    if (actionId === "create") {
      social?.openSheet("create");
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`pulse-fab pointer-events-none fixed bottom-8 right-6 z-50 ${open ? "pulse-fab--open" : ""}`}
    >
      <div className="pulse-fab__stage pointer-events-auto">
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [1, 1.6, 1.4], opacity: [0, 0.5, 0.35] }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="pulse-fab__glow absolute bottom-0 right-0 h-[60px] w-[60px] rounded-full"
                style={{
                  background: "var(--gradient-primary)",
                  filter: "blur(28px)",
                }}
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.2, opacity: 0.12 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pulse-fab__ring absolute bottom-[10px] right-[10px] h-10 w-10 rounded-full border border-white/20"
              />
              {FAB_ACTIONS.map((action, i) => {
                const pos = radialPosition(action.angle);
                return (
                  <motion.button
                    key={action.id}
                    type="button"
                    onClick={() => handleAction(action.id)}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    transition={{
                      delay: i * 0.05,
                      type: "spring",
                      stiffness: 380,
                      damping: 24,
                    }}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 28px rgba(255,77,109,0.35)" }}
                    whileTap={{ scale: 0.94 }}
                    className="pulse-fab__action absolute bottom-[10px] right-[10px] z-20 flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] py-1.5 pl-3 pr-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                  >
                    <span className="whitespace-nowrap font-body text-xs font-semibold text-white/90">
                      {action.label}
                    </span>
                    <PopitIcon type={action.icon} size={28} color="#FFFFFF" />
                  </motion.button>
                );
              })}
            </>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.06, boxShadow: "0 0 56px rgba(255,77,109,0.55)" }}
          whileTap={{ scale: 0.96 }}
          animate={{ scale: open ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 20 }}
          className="pulse-fab__main relative z-30 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border border-white/[0.16] shadow-[0_0_48px_rgba(255,77,109,0.45)]"
          style={{ background: "var(--gradient-primary)" }}
          aria-label={open ? "Close create menu" : "Open create menu"}
          aria-expanded={open}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0, scale: open ? 0.9 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <OpeningCameraLens size={40} aperture={0.4} glow={false} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
