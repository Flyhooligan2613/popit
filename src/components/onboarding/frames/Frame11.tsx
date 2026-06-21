"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { markOnboardingComplete } from "@/lib/session";
import { consumePendingRoute } from "@/lib/welcomeNavigation";

export default function Frame11() {
  const router = useRouter();

  useEffect(() => {
    markOnboardingComplete();
    const pending = consumePendingRoute();
    const timeout = setTimeout(() => {
      router.replace(pending ?? "/pulse");
    }, 900);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p className="text-poster mb-2 text-[clamp(2rem,8vw,3rem)] text-white">YOUR CITY</p>
        <motion.p
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="font-body text-sm text-white/40"
        >
          Stepping into your city&apos;s heartbeat...
        </motion.p>
      </motion.div>
    </div>
  );
}
