"use client";

import AppTabBar from "@/components/nav/AppTabBar";
import AppSocialChrome from "@/components/nav/AppSocialChrome";
import PulseFAB from "@/components/pulse/PulseFAB";
import SocialActionSheets from "@/components/social/SocialActionSheets";
import { SocialActionsProvider } from "@/lib/social/SocialActionsContext";
import { isOnboardingComplete } from "@/lib/session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    setOnboarded(isOnboardingComplete());
  }, []);

  const showFab = pathname === "/map";
  const hideTabBar = pathname.startsWith("/profile") || pathname === "/search" || pathname === "/settings";
  const showSocialChrome = onboarded && pathname !== "/settings";

  return (
    <SocialActionsProvider>
      <div
        className={`fixed inset-0 overflow-hidden bg-[#050505] ${showSocialChrome ? "app-social-chrome-active" : ""}`}
      >
        {children}
        {showSocialChrome && <AppSocialChrome />}
        {showSocialChrome && <SocialActionSheets />}
        {!hideTabBar && <AppTabBar />}
        {showFab && <PulseFAB />}
      </div>
    </SocialActionsProvider>
  );
}
