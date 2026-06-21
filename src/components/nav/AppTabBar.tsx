"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { EXPLORE_HOME_ROUTE } from "@/lib/session";

const TABS = [
  { href: EXPLORE_HOME_ROUTE, label: "Explore", id: "home" },
  { href: "/pulse", label: "Your City", id: "pulse" },
  { href: "/map", label: "POP WORLD", id: "map" },
] as const;

export default function AppTabBar() {
  const pathname = usePathname();
  const isBusiness = pathname.startsWith("/business");

  if (isBusiness) return null;

  return (
    <nav className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-5">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#050505]/80 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {TABS.map((tab) => {
          const active =
            tab.id === "home"
              ? pathname.startsWith("/onboarding")
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative rounded-full px-5 py-2.5 font-body text-xs font-semibold transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-primary)", opacity: 0.22 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative ${active ? "text-white" : "text-white/45"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
