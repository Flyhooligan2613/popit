"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type SocialPageShellProps = {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
  className?: string;
};

export default function SocialPageShell({
  title,
  subtitle,
  headerRight,
  backHref,
  backLabel = "Back",
  children,
  className = "",
}: SocialPageShellProps) {
  return (
    <div className={`social-page ${className}`}>
      <header className="social-page__header app-page-pad">
        <div className="social-page__header-inner">
          <div className="social-page__header-left">
            {backHref && (
              <Link href={backHref} className="social-page__back" aria-label={backLabel}>
                ←
              </Link>
            )}
            <div>
              <h1 className="social-page__title">{title}</h1>
              {subtitle && <p className="social-page__subtitle">{subtitle}</p>}
            </div>
          </div>
          {headerRight}
        </div>
      </header>
      <div className="social-page__scroll app-page-pad">
        <div className="social-page__inner">{children}</div>
      </div>
    </div>
  );
}
