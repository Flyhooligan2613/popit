"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getClientAdminBase } from "@/lib/admin/constants";

type SetupInfo = {
  credentialsConfigured: boolean;
  devFallback: boolean;
  setupKeyValid: boolean;
  sessionSecretConfigured: boolean;
  consoleSlug: string;
  configuredUsername: string | null;
};

export default function AdminSetupPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const key = searchParams.get("key");
  const [info, setInfo] = useState<SetupInfo | null>(null);
  const base = getClientAdminBase(pathname);

  useEffect(() => {
    void fetch(`/api/admin/setup?key=${encodeURIComponent(key ?? "")}`)
      .then((r) => r.json())
      .then((data) => setInfo(data as SetupInfo))
      .catch(() => undefined);
  }, [key]);

  const allowed = info?.setupKeyValid || info?.devFallback || info?.credentialsConfigured;

  return (
    <div className="admin-auth">
      <div className="admin-auth__card" style={{ width: "min(100%, 560px)" }}>
        <p className="admin-auth__eyebrow">Bootstrap setup</p>
        <h1 className="admin-auth__title">Admin Console Setup</h1>
        <p className="admin-auth__sub">
          Configure production credentials in your hosting provider (Vercel, etc.). This page does not
          store passwords in the app — similar to how Meta and TikTok ops teams use env-based internal
          access.
        </p>

        {!info && <p className="admin-panel__loading">Checking setup status…</p>}

        {info && !allowed && (
          <p className="admin-auth__error">
            Invalid or missing setup key. Set <code>ADMIN_SETUP_KEY</code> and visit{" "}
            <code>/{info.consoleSlug}/setup?key=YOUR_KEY</code>
          </p>
        )}

        {info && allowed && (
          <>
            <section className="admin-panel__section">
              <h2>1. Set deployment secrets</h2>
              <ul className="admin-checklist">
                <li>
                  <code>ADMIN_USERNAME</code> = your ops username
                </li>
                <li>
                  <code>ADMIN_PASSWORD</code> = strong unique password
                </li>
                <li>
                  <code>ADMIN_SESSION_SECRET</code> = random string (32+ chars)
                </li>
                <li>
                  <code>ADMIN_CONSOLE_SLUG</code> = secret path (e.g. <code>popit-ops-x7k2</code>)
                </li>
              </ul>
            </section>

            <section className="admin-panel__section">
              <h2>2. Status</h2>
              <ul className="admin-checklist">
                <li>Credentials: {info.credentialsConfigured ? "✓ configured" : "○ using dev fallback"}</li>
                <li>Session secret: {info.sessionSecretConfigured ? "✓ ready" : "○ missing"}</li>
                <li>
                  Console URL: <code>/{info.consoleSlug}/login</code>
                </li>
              </ul>
            </section>

            <section className="admin-panel__section">
              <h2>3. Sign in & configure platform</h2>
              <p className="admin-panel__loading">
                After redeploying with env vars, sign in and open Platform Setup to control feature
                flags, maintenance mode, and announcements.
              </p>
              <Link
                href={`${base}/login`}
                className="admin-auth__submit"
                style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
              >
                Go to admin login →
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
