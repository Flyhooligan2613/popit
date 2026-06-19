"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/onboarding");
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050505]">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-poster text-sm tracking-[0.3em] text-white/30"
      >
        POP&apos;IT
      </motion.div>
    </div>
  );
}
