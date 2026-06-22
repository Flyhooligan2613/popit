"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type SettingsPageHeaderProps = {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  right?: ReactNode;
};

export default function SettingsPageHeader({
  title,
  subtitle,
  backHref = "/settings",
  backLabel = "Back",
  right,
}: SettingsPageHeaderProps) {
  return (
    <div className="profile-settings__hero">
      <div className="flex items-center justify-between">
        <Link href={backHref} className="profile-social__topnav-btn" aria-label={backLabel}>
          ←
        </Link>
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/50">{title}</p>
        {right ?? <span className="w-9" aria-hidden />}
      </div>
      {subtitle && <p className="mt-4 font-body text-sm text-white/40">{subtitle}</p>}
    </div>
  );
}
