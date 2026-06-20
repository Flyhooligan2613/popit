"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import WelcomeBrandedIntro, { WELCOME_INTRO_SESSION_KEY } from "@/components/onboarding/frames/WelcomeBrandedIntro";
import AmbientField from "./AmbientField";
import CategoryCard from "./CategoryCard";
import CityEnergyMeter from "./CityEnergyMeter";
import CityPulse from "./CityPulse";
import LiveActivityCenter from "./LiveActivityCenter";
import LiveNowBadge from "./LiveNowBadge";
import StartExploringButton from "./StartExploringButton";
import WelcomeHeroBackground from "./WelcomeHeroBackground";
import { CATEGORY_CARDS, LIVE_ACTIVITY_FEED, SCENE_SLIDES } from "./data";
import type { WelcomeHomeProps } from "./types";
import { useCityEnergy } from "./useCityEnergy";

const SLIDE_MS = 7500;
const INTRO_EASE = [0.16, 1, 0.3, 1] as const;
const LOGO_PARTICLES = [
  { x: -40, y: -26, d: 0 },
  { x: 44, y: -32, d: 0.5 },
  { x: -48, y: 18, d: 1 },
  { x: 50, y: 28, d: 0.3 },
];

function hapticTap() {
  try {
    navigator.vibrate?.(14);
  } catch {
    /* ignore */
  }
}

export default function WelcomeOverdriveHome({ onJoin, onSignIn }: WelcomeHomeProps) {
  const reducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const [city, setCity] = useState<string | null>(null);
  const [ctaLoading, setCtaLoading] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const joinLock = useRef(false);

  const { state, pulse, displayEnergy, displayExploring, energyNorm } = useCityEnergy({
    reducedMotion: !!reducedMotion,
  });

  const current = SCENE_SLIDES[slide];
  const cityLine = city ? `In ${city.toUpperCase()}` : "Near You";
  const marqueeSpeed = state.isOverdrive ? 18 : 26 - energyNorm * 8;
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
      reducedMotion ? 10000 : SLIDE_MS
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
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
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
    setCtaLoading(true);
    window.setTimeout(onJoin, 560);
  };

  return (
    <div
      className={`popit-home ${state.isOverdrive ? "is-overdrive" : ""} energy-${state.tier}`}
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
      <AmbientField active={!reducedMotion && contentVisible} intensity={energyNorm} />

      <motion.div
        className="popit-home-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: INTRO_EASE }}
      >
        <header className="popit-home-top">
          <LiveNowBadge exploringCount={displayExploring} />
        </header>

        <motion.div
          className="popit-hero-logo"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.06 },
            y: reducedMotion
              ? { duration: 0.3 }
              : { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
        >
          <div className="popit-hero-logo-stage">
            <div className="popit-hero-logo-glow" aria-hidden />
            {!reducedMotion &&
              LOGO_PARTICLES.map((p) => (
                <span
                  key={`${p.x}-${p.y}`}
                  className="popit-hero-logo-particle"
                  style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, animationDelay: `${p.d}s` }}
                  aria-hidden
                />
              ))}
            <PopitBrandLogo markWidth={124} markHeight={176} showWordmark={false} />
          </div>
        </motion.div>

        <section className="popit-hero-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide}-${city ?? "x"}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.52, ease: INTRO_EASE }}
            >
              <p className="popit-hero-kicker font-display">{current.headlineTop}</p>
              <h1 className="popit-hero-accent font-display">{current.headlineAccent}</h1>
              <p className="popit-hero-city font-display">{cityLine}</p>
              <p className="popit-hero-sub font-body">{current.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </section>

        <CityEnergyMeter
          value={displayEnergy}
          label={state.label}
          tier={state.tier}
          reducedMotion={!!reducedMotion}
        />

        <div className="popit-category-grid" role="list" aria-label="Explore modes">
          {CATEGORY_CARDS.map((card, i) => (
            <CategoryCard
              key={card.key}
              icon={card.icon}
              label={card.label}
              stat={card.stat}
              theme={card.theme}
              selected={current.chipKey === card.key}
              delay={0.2 + i * 0.08}
            />
          ))}
        </div>

        <LiveActivityCenter items={LIVE_ACTIVITY_FEED} speedSec={marqueeSpeed} reducedMotion={!!reducedMotion} />

        <CityPulse channels={pulse} reducedMotion={!!reducedMotion} />

        <footer className="popit-home-footer">
          <StartExploringButton loading={ctaLoading} isOverdrive={state.isOverdrive} onClick={handleJoin} />
          <motion.button
            type="button"
            onClick={onSignIn}
            whileTap={{ scale: 0.98 }}
            className="popit-signin-btn font-display"
          >
            Sign In
          </motion.button>
          <p className="popit-guest-note font-body" aria-disabled="true">
            Continue as Guest{" "}
            <span className="popit-guest-soon">Soon</span>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
