"use client";

import AppTabBar from "@/components/nav/AppTabBar";
import AppSocialChrome from "@/components/nav/AppSocialChrome";
import ProfileCornerButton from "@/components/nav/ProfileCornerButton";
import PopitPageWatermark from "@/components/welcome/PopitPageWatermark";
import PulseFAB from "@/components/pulse/PulseFAB";
import SocialActionSheets from "@/components/social/SocialActionSheets";
import { SocialActionsProvider } from "@/lib/social/SocialActionsContext";
import { syncLiveProfileState } from "@/lib/identity/liveProfileSync";
import { isOnboardingComplete, ONBOARDING_UPDATED_EVENT } from "@/lib/session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isYourCityRoute(pathname: string) {
  return pathname === "/pulse" || pathname.startsWith("/pulse/");
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const sync = () => setOnboarded(isOnboardingComplete());
    sync();
    syncLiveProfileState();
    window.addEventListener(ONBOARDING_UPDATED_EVENT, sync);
    return () => window.removeEventListener(ONBOARDING_UPDATED_EVENT, sync);
  }, []);

  const yourCity = isYourCityRoute(pathname);
  const immersiveMedia =
    pathname.startsWith("/broadcast") ||
    pathname.startsWith("/create/") ||
    pathname.startsWith("/live/watch/") ||
    pathname.startsWith("/stories/view");
  const showFab = pathname === "/map";
  const hideTabBar =
    pathname.startsWith("/profile") ||
    pathname === "/search" ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/help") ||
    immersiveMedia;
  const showSocialChrome = onboarded && pathname !== "/settings" && !immersiveMedia;
  const showCornerProfile = onboarded && !yourCity && !immersiveMedia;

  return (
    <SocialActionsProvider>
      <div
        className={`fixed inset-0 overflow-hidden bg-[#050505] ${showSocialChrome ? "app-social-chrome-active" : ""} ${showCornerProfile ? "app-corner-profile-active" : ""}`}
      >
        {onboarded && <PopitPageWatermark />}
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
