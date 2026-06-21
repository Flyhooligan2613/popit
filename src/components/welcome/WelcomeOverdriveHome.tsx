"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import WelcomeBrandedIntro, { WELCOME_INTRO_SESSION_KEY } from "@/components/onboarding/frames/WelcomeBrandedIntro";
import BackNavButton from "@/components/nav/BackNavButton";
import AmbientField from "./AmbientField";
import CategoryCard from "./CategoryCard";
import CityEnergyMeter from "./CityEnergyMeter";
import CityPulse from "./CityPulse";
import CityStatusPanel from "./CityStatusPanel";
import HolographicGlobe from "./HolographicGlobe";
import LiveNowBadge from "./LiveNowBadge";
import LiveVenueCards from "./LiveVenueCards";
import StartExploringButton from "./StartExploringButton";
import WelcomeHeroBackground from "./WelcomeHeroBackground";
import WhatsPoppingNow from "./WhatsPoppingNow";
import WelcomeBottomNav from "./WelcomeBottomNav";
import WelcomeHeaderBrand from "./WelcomeHeaderBrand";
import WelcomeHeroMock from "./WelcomeHeroMock";
import { CATEGORY_CARDS, LIVE_AVATAR_STACK, LIVE_VENUE_CARDS, SCENE_SLIDES, TRENDING_CREATORS } from "./data";
import type { WelcomeHomeProps } from "./types";
import { useCityEnergy } from "./useCityEnergy";
import { useTimeOfDay } from "./useTimeOfDay";

const SLIDE_MS = 9000;
const INTRO_EASE = [0.16, 1, 0.3, 1] as const;

function hapticTap() {
  try {
    navigator.vibrate?.(16);
  } catch {
    /* ignore */
  }
}

export default function WelcomeOverdriveHome({ onJoin, onSignIn, onBack }: WelcomeHomeProps) {
  const reducedMotion = useReducedMotion();
  const timePeriod = useTimeOfDay();
  const [showIntro, setShowIntro] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const [city, setCity] = useState<string | null>("Miami");
  const [ctaLoading, setCtaLoading] = useState(false);
  const [surge, setSurge] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const joinLock = useRef(false);

  const { state, pulse, displayEnergy, displayExploring, energyNorm } = useCityEnergy({
    reducedMotion: !!reducedMotion,
  });

  const current = SCENE_SLIDES[slide];
  const contentVisible = introReady && !showIntro;

  useEffect(() => {
    if (reducedMotion) {
      sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
      setShowIntro(false);
    } else {
      setShowIntro(sessionStorage.getItem(WELCOME_INTRO_SESSION_KEY) !== "1");
    }
    setIntroReady(true);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % SCENE_SLIDES.length),
      reducedMotion ? 12000 : SLIDE_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    SCENE_SLIDES.forEach((s, i) => {
      if (i <= slide + 2) {
        const img = new Image();
        img.src = s.src;
      }
    });
  }, [slide]);

  useEffect(() => {
    let cancelled = false;
    async function detectCity() {
      if (!navigator.geolocation) return;
      try {
        const perm = await navigator.permissions?.query({ name: "geolocation" });
        if (perm?.state !== "granted") return;
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            if (cancelled) return;
            try {
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
              );
              if (!res.ok) return;
              const data = (await res.json()) as { city?: string; locality?: string };
              const name = data.city || data.locality;
              if (name) setCity(name);
            } catch {
              /* silent */
            }
          },
          () => {},
          { maximumAge: 900_000, timeout: 5000 }
        );
      } catch {
        /* silent */
      }
    }
    detectCity();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, reducedMotion]);

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
    setShowIntro(false);
  }, []);

  const handleJoin = () => {
    if (joinLock.current || ctaLoading) return;
    joinLock.current = true;
    hapticTap();
    setSurge(true);
    setCtaLoading(true);
    window.setTimeout(() => setSurge(false), 700);
    window.setTimeout(onJoin, 580);
  };

  return (
    <div
      className={`popit-home popit-mock-match popit-living-city time-${timePeriod} ${state.isOverdrive ? "is-overdrive" : ""} ${state.isOnFire ? "is-on-fire" : ""} energy-${state.tier} ${surge ? "is-surging" : ""}`}
      style={
        {
          "--city-energy": String(energyNorm),
          "--scene-hue": current.ambientHue,
        } as Record<string, string>
      }
      role="main"
      aria-label="POP'IT Living City"
    >
      {introReady && showIntro && <WelcomeBrandedIntro onComplete={handleIntroDone} />}

      <WelcomeHeroBackground
        slides={SCENE_SLIDES}
        slideIndex={slide}
        reducedMotion={!!reducedMotion}
        parallax={parallax}
        energyNorm={energyNorm}
        ambientHue={current.ambientHue}
      />
      <div className="popit-lobby-fog" aria-hidden />
      <AmbientField active={!reducedMotion && contentVisible} intensity={energyNorm} />

      <motion.div
        className="popit-home-content popit-mock-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: INTRO_EASE }}
      >
        {onBack && (
          <div className="welcome-back-float">
            <BackNavButton onClick={onBack} />
          </div>
        )}

        <header className="welcome-mock-header">
          <CityStatusPanel city={city} />
          <WelcomeHeaderBrand />
          <LiveNowBadge exploringCount={displayExploring} todayGain={342} avatarUrls={LIVE_AVATAR_STACK} />
        </header>

        <section className="welcome-mock-hero-zone" aria-label="City network">
          <WelcomeHeroMock cityName={city} />
          <HolographicGlobe
            energyNorm={energyNorm}
            tier={state.tier}
            reducedMotion={!!reducedMotion}
            focusCity={city}
            large
          />
        </section>

        <CityEnergyMeter
          value={displayEnergy}
          label={state.label}
          tier={state.tier}
          reducedMotion={!!reducedMotion}
          exploringCount={displayExploring}
          cityName={city}
        />

        <WhatsPoppingNow creators={TRENDING_CREATORS} reducedMotion={!!reducedMotion} energyNorm={energyNorm} />

        <div className="popit-category-grid popit-category-grid-mock" role="list" aria-label="Explore modes">
          {CATEGORY_CARDS.map((card, i) => (
            <CategoryCard
              key={card.key}
              icon={card.icon}
              label={card.label}
              stat={card.stat}
              theme={card.theme}
              selected={current.chipKey === card.key}
              delay={0.12 + i * 0.06}
            />
          ))}
        </div>

        <LiveVenueCards venues={LIVE_VENUE_CARDS} reducedMotion={!!reducedMotion} energyNorm={energyNorm} />

        <CityPulse channels={pulse} reducedMotion={!!reducedMotion} />

        <footer className="popit-home-footer popit-home-footer-mock">
          <StartExploringButton loading={ctaLoading} isOverdrive={state.isOverdrive} onClick={handleJoin} />
          <motion.button
            type="button"
            onClick={onSignIn}
            whileTap={{ scale: 0.98 }}
            className="popit-signin-btn popit-signin-btn-mock font-body"
          >
            Sign In To Your Account
          </motion.button>
        </footer>
      </motion.div>

      <WelcomeBottomNav onCreate={handleJoin} />
    </div>
  );
}
