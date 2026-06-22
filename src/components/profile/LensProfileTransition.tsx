"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProfileAvatarLens from "./ProfileAvatarLens";
import type { UserProfile } from "@/lib/identity/userProfile";

type LensProfileTransitionProps = {
  user: Pick<UserProfile, "name" | "followers" | "pulseScore" | "verified" | "live" | "avatarMediaId">;
  creatorLevel?: number;
  accent?: string;
  href: string;
  size?: number;
  allowPhotoChange?: boolean;
};

function LensProfileTransition({
  user,
  creatorLevel = 5,
  accent = "#FF4D6D",
  href,
  size = 72,
  allowPhotoChange = false,
}: LensProfileTransitionProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "zoom" | "open">("idle");

  const handleTap = () => {
    if (allowPhotoChange || phase !== "idle") return;
    setPhase("zoom");
    setTimeout(() => setPhase("open"), 300);
    setTimeout(() => router.push(href), 750);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "open" ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-[101]"
        animate={{
          scale: phase === "zoom" || phase === "open" ? 3.5 : 1,
          zIndex: phase !== "idle" ? 101 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center center" }}
      >
        <ProfileAvatarLens
          user={user}
          accent={accent}
          size={size}
          creatorLevel={creatorLevel}
          followersBeneath
          allowPhotoChange={allowPhotoChange}
          interactive={!allowPhotoChange}
          onTap={handleTap}
        />
      </motion.div>
    </div>
  );
}

export default memo(LensProfileTransition);
