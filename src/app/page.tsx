"use client";

import { useCallback, useEffect, useState } from "react";
import AppStartupSplash from "@/components/brand/AppStartupSplash";
import { isOnboardingComplete } from "@/lib/session";
import { loadAuthenticatedProfile } from "@/lib/supabase/auth";

const SPLASH_KEY = "popit:splashSeen";

function goToWelcome() {
  window.location.replace("/onboarding?skipIntro=1");
}

function goToPulse() {
  window.location.replace("/pulse");
}

export default function Home() {
  const [phase, setPhase] = useState<"boot" | "splash">("boot");

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY) === "1") {
      void (async () => {
        const profile = await loadAuthenticatedProfile();
        if (profile && isOnboardingComplete()) {
          goToPulse();
          return;
        }
        if (isOnboardingComplete()) {
          goToPulse();
          return;
        }
        goToWelcome();
      })();
      return;
    }
    setPhase("splash");
  }, []);

  const handleSplashComplete = useCallback(async () => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    sessionStorage.setItem("popit:welcomeIntroSeen", "1");

    const profile = await loadAuthenticatedProfile();
    const onboarded = isOnboardingComplete();

    if (profile && onboarded) {
      goToPulse();
      return;
    }

    if (onboarded) {
      goToPulse();
      return;
    }

    goToWelcome();
  }, []);

  if (phase === "boot") {
    return <div style={{ position: "fixed", inset: 0, background: "#000000" }} />;
  }

  return <AppStartupSplash onComplete={handleSplashComplete} />;
}
