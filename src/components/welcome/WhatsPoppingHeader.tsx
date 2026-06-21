"use client";

type WhatsPoppingHeaderProps = {
  reducedMotion?: boolean;
};

export default function WhatsPoppingHeader({ reducedMotion = false }: WhatsPoppingHeaderProps) {
  return (
    <header className="popping-header-s2">
      <div className="popping-header-s2-left">
        <span className={`popping-flame-icon ${reducedMotion ? "" : "is-animated"}`} aria-hidden>
          🔥
        </span>
        <div className="popping-header-s2-copy">
          <h2 className="popping-header-s2-title font-display">What&apos;s Popping Right Now</h2>
          <p className="popping-header-s2-sub font-body">
            The city&apos;s hottest creators, businesses, and moments.
          </p>
        </div>
      </div>
      <div className="popping-header-s2-live font-body">
        <span className={`popping-live-dot ${reducedMotion ? "" : "is-pulse"}`} aria-hidden />
        LIVE
      </div>
    </header>
  );
}
