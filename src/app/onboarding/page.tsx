"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isOnboardingComplete, resetAppSession } from "@/lib/session";
import Frame4 from "@/components/onboarding/frames/Frame4";
import Frame5 from "@/components/onboarding/frames/Frame5";
import Frame6 from "@/components/onboarding/frames/Frame6";
import Frame7 from "@/components/onboarding/frames/Frame7";
import Frame8 from "@/components/onboarding/frames/Frame8";
import Frame9 from "@/components/onboarding/frames/Frame9";
import Frame10 from "@/components/onboarding/frames/Frame10";
import Frame11 from "@/components/onboarding/frames/Frame11";

/** Intro: frame 4 (swirls) → frame 5 (logo burst) → frame 6 (landing) */
const INTRO_AUTO_MS: Record<number, number> = {
  4: 2000,
  5: 2600,
};

function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("skipIntro") === "1" || sessionStorage.getItem("popit:splashSeen") === "1";
}

function resolveStartFrame(skipIntro: boolean): number {
  return skipIntro ? 6 : 4;
}

function nextIntroFrame(current: number): number {
  if (current === 4) return 5;
  if (current === 5) return 6;
  return Math.min(current + 1, 11);
}

function prevFrame(current: number): number {
  if (current === 6) return 5;
  if (current === 5) return 4;
  return Math.max(current - 1, 4);
}

const shellStyle = {
  position: "fixed" as const,
  inset: 0,
  height: "100dvh",
  maxHeight: "100dvh",
  background: "#000000",
  overflow: "hidden" as const,
};

export default function OnboardingPage() {
  const [mounted, setMounted] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [frame, setFrame] = useState(6);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      resetAppSession();
      sessionStorage.removeItem("popit:splashSeen");
      sessionStorage.removeItem("popit:welcomeIntroSeen");
    }

    const skip = shouldSkipIntro();
    setSkipIntro(skip);
    setFrame(resolveStartFrame(skip));
    setMounted(true);

    if (isOnboardingComplete()) {
      window.location.replace("/pulse");
    }
  }, []);

  const advance = useCallback(
    () => setFrame((current) => (current <= 5 ? nextIntroFrame(current) : Math.min(current + 1, 11))),
    []
  );
  const goBack = useCallback(() => setFrame((current) => prevFrame(current)), []);

  useEffect(() => {
    if (!mounted || skipIntro) return;
    const delay = INTRO_AUTO_MS[frame];
    if (delay == null) return;

    const timeout = setTimeout(advance, delay);
    return () => clearTimeout(timeout);
  }, [frame, mounted, skipIntro, advance]);

  const renderFrame = () => {
    switch (frame) {
      case 4:
        return <Frame4 />;
      case 5:
        return <Frame5 />;
      case 6:
        return (
          <Frame6
            onBack={skipIntro ? undefined : goBack}
            onJoin={() => {
              setAuthMode("signup");
              advance();
            }}
            onSignIn={() => {
              setAuthMode("signin");
              advance();
            }}
          />
        );
      case 7:
        return <Frame7 initialMode={authMode} onNext={advance} onBack={goBack} />;
      case 8:
        return <Frame8 onNext={advance} onBack={goBack} />;
      case 9:
        return <Frame9 onNext={advance} onBack={goBack} />;
      case 10:
        return <Frame10 onNext={advance} />;
      case 11:
        return <Frame11 />;
      default:
        return null;
    }
  };

  if (!mounted) {
    return <div style={shellStyle} />;
  }

  if (skipIntro && frame === 6) {
    return <div style={shellStyle}>{renderFrame()}</div>;
  }

  return (
    <div style={shellStyle}>
      <AnimatePresence mode="wait">
        <motion.div
          key={frame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          {renderFrame()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
