"use client";

type WhatsPoppingHeaderProps = {
  reducedMotion?: boolean;
  onClick?: () => void;
};

export default function WhatsPoppingHeader({ reducedMotion = false, onClick }: WhatsPoppingHeaderProps) {
  return (
    <button type="button" className="popping-header-s2 popit-tap-target" onClick={onClick}>
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
    </button>
  );
}
