"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import CityStatusPanel from "./CityStatusPanel";
import HeroAssembleText from "./HeroAssembleText";
import HeroParticleField from "./HeroParticleField";
import TheSignal from "./TheSignal";
import LiveNowBadge from "./LiveNowBadge";
import WelcomeHeaderBrand from "./WelcomeHeaderBrand";
import type { EnergyTier, SceneSlide } from "./types";
import { useHeroScrollProgress } from "./useHeroScrollProgress";

type WelcomeHeroSectionProps = {
  slide: SceneSlide;
  city: string | null;
  reducedMotion: boolean;
  energyNorm: number;
  tier: EnergyTier;
  exploringCount: number;
  minuteGain: number;
  avatarUrls: string[];
  onExplore?: () => void;
};

export default function WelcomeHeroSection({
  slide,
  city,
  reducedMotion,
  energyNorm,
  tier,
  exploringCount,
  minuteGain,
  avatarUrls,
  onExplore,
}: WelcomeHeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const scrollProgress = useHeroScrollProgress(heroRef);

  useEffect(() => {
    const root = heroRef.current?.closest(".popit-home") as HTMLElement | null;
    if (!root) return;
    root.style.setProperty("--hero-scroll", String(scrollProgress));
    root.classList.toggle("is-hero-scrolling", scrollProgress > 0.02);
  }, [scrollProgress]);

  return (
    <section
      ref={heroRef}
      className="welcome-hero-v2"
      aria-label="POP'IT city hero"
      style={{ "--hero-scroll": String(scrollProgress) } as Record<string, string>}
    >
      <div className="hero-v2-lighting" aria-hidden />
      <HeroParticleField scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      <header className="welcome-hero-status-row">
        <CityStatusPanel city={city} />
        <LiveNowBadge
          exploringCount={exploringCount}
          minuteGain={minuteGain}
          avatarUrls={avatarUrls}
          compact
        />
      </header>

      <WelcomeHeaderBrand variant="hero" />

      <div className="hero-v2-copy">
        <AnimatePresence mode="wait">
          <HeroAssembleText
            key={slide.id}
            slideKey={slide.id}
            top={slide.headlineTop}
            accent={slide.headlineAccent}
            city={city ? `IN ${city.toUpperCase()}` : "NEAR YOU"}
            supporting={slide.heroSupport}
          />
        </AnimatePresence>
      </div>

      <div className="hero-v2-signal-wrap">
        <TheSignal
          energyNorm={energyNorm}
          tier={tier}
          reducedMotion={reducedMotion}
          city={city}
          onNodeOpen={onExplore}
        />
      </div>
    </section>
  );
}
