"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import AppStartupSplash from "@/components/brand/AppStartupSplash";
import { isOnboardingComplete } from "@/lib/session";
import { loadAuthenticatedProfile } from "@/lib/supabase/auth";

const SPLASH_KEY = "popit:splashSeen";

export default function Home() {
  const router = useRouter();
  const [showSplash] = useState(true);

  const handleSplashComplete = useCallback(async () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SPLASH_KEY, "1");
      sessionStorage.setItem("popit:welcomeIntroSeen", "1");
    }

    const profile = await loadAuthenticatedProfile();
    const onboarded = isOnboardingComplete();

    if (profile && onboarded) {
      router.replace("/pulse");
      return;
    }

    if (onboarded) {
      router.replace("/pulse");
      return;
    }

    router.replace("/onboarding?skipIntro=1");
  }, [router]);

  if (!showSplash) return null;

  return <AppStartupSplash onComplete={handleSplashComplete} />;
}
