"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { EXPLORE_HOME_ROUTE } from "@/lib/session";

const TABS = [
  { href: EXPLORE_HOME_ROUTE, label: "Explore", id: "explore" },
  { href: "/feed", label: "Feed", id: "feed" },
  { href: "/pulse", label: "Your City", id: "pulse" },
  { href: "/live", label: "POPIT Live", id: "live" },
  { href: "/map", label: "POP WORLD", id: "map" },
] as const;

export default function AppTabBar() {
  const pathname = usePathname();
  const isBusiness = pathname.startsWith("/business");

  if (isBusiness) return null;

  return (
    <nav className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-5">
      <div className="app-tab-bar pointer-events-auto flex max-w-[100vw] items-center gap-0.5 overflow-x-auto rounded-full border border-white/[0.08] bg-[#050505]/80 px-1 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl scrollbar-none">
        {TABS.map((tab) => {
          const active =
            tab.id === "explore"
              ? pathname === "/explore" || pathname.startsWith("/explore/")
              : tab.id === "pulse"
                ? pathname === "/pulse" || pathname.startsWith("/pulse/")
                : tab.id === "feed"
                  ? pathname === "/feed" || pathname.startsWith("/feed/")
                  : tab.id === "live"
                    ? pathname === "/live" || pathname.startsWith("/live/")
                    : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative shrink-0 rounded-full px-2.5 py-2 font-body text-[0.58rem] font-semibold transition-colors sm:px-3.5 sm:py-2.5 sm:text-[0.68rem]"
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-primary)", opacity: 0.22 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative whitespace-nowrap ${active ? "text-white" : "text-white/45"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
