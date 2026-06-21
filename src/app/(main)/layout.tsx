"use client";

import AppTabBar from "@/components/nav/AppTabBar";
import PulseFAB from "@/components/pulse/PulseFAB";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFab = pathname === "/pulse" || pathname === "/map";
  const hideChrome =
    pathname.startsWith("/profile") ||
    pathname === "/search" ||
    pathname === "/settings";

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505]">
      {children}
      {!hideChrome && <AppTabBar />}
      {showFab && <PulseFAB />}
    </div>
  );
}
