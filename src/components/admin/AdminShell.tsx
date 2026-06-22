"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientAdminBase } from "@/lib/admin/constants";

type AdminShellProps = {
  children: React.ReactNode;
  username?: string;
};

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/platform", label: "Platform Setup" },
  { href: "/moderation", label: "Moderation" },
  { href: "/security", label: "Security" },
];

export default function AdminShell({ children, username }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const base = getClientAdminBase(pathname);

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace(`${base}/login`);
  };

  useEffect(() => {
    document.documentElement.classList.add("admin-console-root");
    return () => document.documentElement.classList.remove("admin-console-root");
  }, []);

  return (
    <div className="admin-console">
      <aside className="admin-console__sidebar">
        <div className="admin-console__brand">
          <span className="admin-console__brand-mark">◆</span>
          <div>
            <p className="admin-console__brand-title">POP&apos;IT Ops</p>
            <p className="admin-console__brand-sub">Internal console</p>
          </div>
        </div>

        <nav className="admin-console__nav" aria-label="Admin navigation">
          {NAV.map((item) => {
            const href = `${base}${item.href}`;
            const active = pathname.endsWith(item.href) || pathname.includes(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={href}
                className={`admin-console__nav-link ${active ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-console__sidebar-foot">
          {username && <p className="admin-console__user">Signed in as {username}</p>}
          <button type="button" className="admin-console__logout" onClick={() => void logout()} disabled={loggingOut}>
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      <main className="admin-console__main">{children}</main>
    </div>
  );
}
