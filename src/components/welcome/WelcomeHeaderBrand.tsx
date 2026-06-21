"use client";

import PopitBrandLogo from "@/components/brand/PopitBrandLogo";

export default function WelcomeHeaderBrand() {
  return (
    <div className="welcome-header-brand">
      <PopitBrandLogo markWidth={52} markHeight={74} showWordmark wordmarkSize="lg" />
      <p className="welcome-header-tagline font-display">Discover What&apos;s Popping</p>
    </div>
  );
}
