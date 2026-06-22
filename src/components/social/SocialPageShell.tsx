"use client";

import type { ReactNode } from "react";

type SocialPageShellProps = {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function SocialPageShell({
  title,
  subtitle,
  headerRight,
  children,
  className = "",
}: SocialPageShellProps) {
  return (
    <div className={`social-page ${className}`}>
      <header className="social-page__header app-page-pad">
        <div className="social-page__header-inner">
          <div>
            <h1 className="social-page__title">{title}</h1>
            {subtitle && <p className="social-page__subtitle">{subtitle}</p>}
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
