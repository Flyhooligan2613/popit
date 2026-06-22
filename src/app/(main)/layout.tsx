"use client";

import AppTabBar from "@/components/nav/AppTabBar";
import AppSocialChrome from "@/components/nav/AppSocialChrome";
import ProfileCornerButton from "@/components/nav/ProfileCornerButton";
import PulseFAB from "@/components/pulse/PulseFAB";
import SocialActionSheets from "@/components/social/SocialActionSheets";
import { SocialActionsProvider } from "@/lib/social/SocialActionsContext";
import { isOnboardingComplete } from "@/lib/session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isYourCityRoute(pathname: string) {
  return pathname === "/pulse" || pathname.startsWith("/pulse/");
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    setOnboarded(isOnboardingComplete());
  }, []);

  const yourCity = isYourCityRoute(pathname);
  const showFab = pathname === "/map";
  const hideTabBar = pathname.startsWith("/profile") || pathname === "/search" || pathname === "/settings";
  const showSocialChrome = onboarded && pathname !== "/settings";
  const showCornerProfile = onboarded && !yourCity;

  return (
    <SocialActionsProvider>
      <div
        className={`fixed inset-0 overflow-hidden bg-[#050505] ${showSocialChrome ? "app-social-chrome-active" : ""} ${showCornerProfile ? "app-corner-profile-active" : ""}`}
      >
        {children}
        {showCornerProfile && <ProfileCornerButton />}
        {showSocialChrome && <AppSocialChrome />}
        {showSocialChrome && <SocialActionSheets />}
        {!hideTabBar && onboarded && <AppTabBar />}
        {showFab && <PulseFAB />}
      </div>
    </SocialActionsProvider>
  );
}
