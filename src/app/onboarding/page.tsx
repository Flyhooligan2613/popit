"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resetAppSession } from "@/lib/session";
import Frame1 from "@/components/onboarding/frames/Frame1";
import Frame2 from "@/components/onboarding/frames/Frame2";
import Frame3 from "@/components/onboarding/frames/Frame3";
import Frame4 from "@/components/onboarding/frames/Frame4";
import Frame5 from "@/components/onboarding/frames/Frame5";
import Frame6 from "@/components/onboarding/frames/Frame6";
import Frame7 from "@/components/onboarding/frames/Frame7";
import Frame8 from "@/components/onboarding/frames/Frame8";
import Frame9 from "@/components/onboarding/frames/Frame9";
import Frame10 from "@/components/onboarding/frames/Frame10";
import Frame11 from "@/components/onboarding/frames/Frame11";

const AUTO_ADVANCE_MS: Record<number, number> = {
  1: 1400,
  2: 2800,
  3: 2400,
  4: 2800,
  5: 3400,
};

export default function OnboardingPage() {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      resetAppSession();
    }
  }, []);

  const advance = () => setFrame((current) => Math.min(current + 1, 11));

  useEffect(() => {
    if (frame < 1 || frame > 5) return;

    const timeout = setTimeout(advance, AUTO_ADVANCE_MS[frame]);
    return () => clearTimeout(timeout);
  }, [frame]);

  const renderFrame = () => {
    switch (frame) {
      case 1:
        return <Frame1 />;
      case 2:
        return <Frame2 />;
      case 3:
        return <Frame3 />;
      case 4:
        return <Frame4 />;
      case 5:
        return <Frame5 />;
      case 6:
        return <Frame6 onNext={advance} />;
      case 7:
        return <Frame7 onNext={advance} />;
      case 8:
        return <Frame8 onNext={advance} />;
      case 9:
        return <Frame9 onNext={advance} />;
      case 10:
        return <Frame10 onNext={advance} />;
      case 11:
        return <Frame11 />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={frame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          {renderFrame()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
