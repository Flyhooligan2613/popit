"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import WelcomeBrandedIntro, { WELCOME_INTRO_SESSION_KEY } from "@/components/onboarding/frames/WelcomeBrandedIntro";
import PullToRefresh from "@/components/ui/PullToRefresh";
import BackNavButton from "@/components/nav/BackNavButton";
import AmbientField from "./AmbientField";
import WelcomeBackgroundMark from "./WelcomeBackgroundMark";
import CategoryCard from "./CategoryCard";
import CityEnergyMeter from "./CityEnergyMeter";
import CityPulse from "./CityPulse";
import LiveVenueCards from "./LiveVenueCards";
import WelcomeLandingFooter from "./WelcomeLandingFooter";
import WelcomeHeroBackground from "./WelcomeHeroBackground";
import WeatherReportSheet from "./WeatherReportSheet";
import WhatsPoppingNow from "./WhatsPoppingNow";
import CityCareerSection from "./CityCareerSection";
import WelcomeHeroSection from "./WelcomeHeroSection";
import { CATEGORY_CARDS, LIVE_AVATAR_STACK, LIVE_VENUE_CARDS, SCENE_SLIDES } from "./data";
import type { WelcomeHomeProps } from "./types";
import type { SignalHubPhase } from "./signal/types";
import { useCityEnergy } from "./useCityEnergy";
import { useTimeOfDay } from "./useTimeOfDay";
import { useMobileLite } from "@/lib/mobilePerformance";
import {
  categoryRoute,
  navigateFromWelcome,
  pulseChannelRoute,
  venueRoute,
  WELCOME_TAB_ROUTES,
} from "@/lib/welcomeNavigation";
import type { CategoryKey, PulseChannel } from "./types";
import type { VenueCard } from "./types";

const SLIDE_MS = 9000;
const INTRO_EASE = [0.16, 1, 0.3, 1] as const;
const DEMO_USER_AVATAR = LIVE_AVATAR_STACK[0];

const CONNECT_PHASE_MS = {
  auth: 420,
  pulse: 680,
  transform: 820,
  reorganize: 1400,
  connected: 900,
} as const;

function hapticTap() {
  try {
    navigator.vibrate?.(16);
  } catch {
    /* ignore */
  }
}

function shouldSkipWelcomeIntro(): boolean {
  if (typeof window === "undefined") return true;
  return (
    sessionStorage.getItem("popit:splashSeen") === "1" ||
    sessionStorage.getItem(WELCOME_INTRO_SESSION_KEY) === "1"
  );
}

export default function WelcomeOverdriveHome({ onJoin, onSignIn, onBack }: WelcomeHomeProps) {
  const reducedMotion = useReducedMotion();
  const mobileLite = useMobileLite();
  const motionLite = !!reducedMotion || mobileLite;
  const timePeriod = useTimeOfDay();
  const [skipWelcomeIntro] = useState(shouldSkipWelcomeIntro);
  const [showIntro, setShowIntro] = useState(() => !shouldSkipWelcomeIntro());
  const [slide, setSlide] = useState(0);
  const [city, setCity] = useState<string | null>("Miami");
  const [ctaLoading, setCtaLoading] = useState(false);
  const [surge, setSurge] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [hubPhase, setHubPhase] = useState<SignalHubPhase>("inviting");
  const [reorganizeT, setReorganizeT] = useState(0);
  const [signInBusy, setSignInBusy] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);
  const joinLock = useRef(false);
  const signInLock = useRef(false);
  const reorganizeRaf = useRef(0);

  const { state, pulse, displayEnergy, displayExploring, minuteGain, energyNorm, refresh } = useCityEnergy({
    reducedMotion: motionLite,
  });

  const current = SCENE_SLIDES[slide];
  const contentVisible = !showIntro;

  useEffect(() => {
    if (reducedMotion || skipWelcomeIntro) {
      sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
      setShowIntro(false);
      return;
    }
    setShowIntro(sessionStorage.getItem(WELCOME_INTRO_SESSION_KEY) !== "1");
  }, [reducedMotion, skipWelcomeIntro]);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % SCENE_SLIDES.length),
      reducedMotion ? 12000 : SLIDE_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    [slide, (slide + 1) % SCENE_SLIDES.length].forEach((i) => {
      const img = new Image();
      img.src = SCENE_SLIDES[i].src;
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

  const goTo = useCallback(
    (href: string) => {
      hapticTap();
      navigateFromWelcome(href, onJoin);
    },
    [onJoin]
  );

  const handleCategory = (key: CategoryKey) => goTo(categoryRoute(key));
  const handleVenue = (venue: VenueCard) => goTo(venueRoute(venue.id));
  const handlePulseChannel = (channel: PulseChannel) => goTo(pulseChannelRoute(channel.key));

  const runReorganize = useCallback((durationMs: number) => {
    if (reorganizeRaf.current) cancelAnimationFrame(reorganizeRaf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setReorganizeT(eased);
      if (t < 1) {
        reorganizeRaf.current = requestAnimationFrame(tick);
      }
    };
    reorganizeRaf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (reorganizeRaf.current) cancelAnimationFrame(reorganizeRaf.current);
    };
  }, []);

  const handleSignIn = useCallback(() => {
    if (signInLock.current || signInBusy) return;
    signInLock.current = true;
    setSignInBusy(true);
    hapticTap();

    if (reducedMotion) {
      setHubPhase("connected");
      setReorganizeT(1);
      window.setTimeout(() => {
        setSignInBusy(false);
        onSignIn();
      }, 480);
      return;
    }

    const { auth, pulse, transform, reorganize, connected } = CONNECT_PHASE_MS;
    let elapsed = 0;

    window.setTimeout(() => setHubPhase("pulsing"), (elapsed += auth));
    window.setTimeout(() => setHubPhase("transforming"), (elapsed += pulse));
    window.setTimeout(() => {
      setHubPhase("reorganizing");
      runReorganize(reorganize);
    }, (elapsed += transform));
    window.setTimeout(() => setHubPhase("connected"), (elapsed += reorganize));
    window.setTimeout(() => {
      setSignInBusy(false);
      onSignIn();
    }, (elapsed += connected));
  }, [onSignIn, reducedMotion, runReorganize, signInBusy]);

  const handleRefresh = useCallback(async () => {
    hapticTap();
    setFeedRefreshKey((key) => key + 1);
    refresh();
    setSurge(true);
    window.setTimeout(() => setSurge(false), 850);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
  }, [refresh]);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      className={`popit-home popit-mock-match popit-polish-v1 popit-hero-v2-root popit-living-city time-${timePeriod} ${state.isOverdrive ? "is-overdrive" : ""} ${state.isOnFire ? "is-on-fire" : ""} energy-${state.tier} ${surge ? "is-surging" : ""}`}
      style={
        {
          "--city-energy": String(energyNorm),
          "--scene-hue": current.ambientHue,
        } as Record<string, string>
      }
      role="main"
      aria-label="POP'IT Living City"
    >
      {showIntro && !skipWelcomeIntro && <WelcomeBrandedIntro onComplete={handleIntroDone} />}

      <WelcomeHeroBackground
        slides={SCENE_SLIDES}
        slideIndex={slide}
        reducedMotion={motionLite}
        mobileLite={mobileLite}
        parallax={parallax}
        energyNorm={energyNorm}
        ambientHue={current.ambientHue}
        cinematic={!mobileLite}
      />
      <div className="popit-lobby-fog" aria-hidden />
      <AmbientField active={!motionLite && contentVisible} intensity={energyNorm} />

      <motion.div
        className="popit-home-content popit-mock-content"
        initial={{ opacity: skipWelcomeIntro ? 1 : 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: skipWelcomeIntro || reducedMotion ? 0 : 0.55, ease: INTRO_EASE }}
      >
        <WelcomeBackgroundMark />
        {onBack && (
          <div className="welcome-back-float">
            <BackNavButton onClick={onBack} />
          </div>
        )}

        <WelcomeHeroSection
          slide={current}
          city={city}
          reducedMotion={motionLite}
          mobileLite={mobileLite}
          energyNorm={energyNorm}
          tier={state.tier}
          exploringCount={displayExploring}
          minuteGain={minuteGain}
          avatarUrls={LIVE_AVATAR_STACK}
          hubPhase={hubPhase}
          userAvatar={hubPhase === "inviting" || hubPhase === "pulsing" ? null : DEMO_USER_AVATAR}
          reorganizeT={reorganizeT}
          onExplore={() => goTo(WELCOME_TAB_ROUTES.signal)}
          onWeatherClick={() => {
            hapticTap();
            setWeatherOpen(true);
          }}
          onLiveClick={() => goTo(WELCOME_TAB_ROUTES.live)}
          onSignalClick={() => goTo(WELCOME_TAB_ROUTES.signal)}
        />

        <CityEnergyMeter
          value={displayEnergy}
          label={state.label}
          tier={state.tier}
          reducedMotion={motionLite}
          mobileLite={mobileLite}
          exploringCount={displayExploring}
          cityName={city}
          onClick={() => goTo(WELCOME_TAB_ROUTES.energy)}
        />

        <WhatsPoppingNow
          city={city}
          reducedMotion={motionLite}
          mobileLite={mobileLite}
          energyNorm={energyNorm}
          refreshKey={feedRefreshKey}
          onCardAction={() => goTo(WELCOME_TAB_ROUTES.popping)}
          onSectionClick={() => goTo(WELCOME_TAB_ROUTES.popping)}
        />

        <CityCareerSection
          reducedMotion={motionLite}
          onExplore={() => goTo(WELCOME_TAB_ROUTES.career)}
          onSectionClick={() => goTo(WELCOME_TAB_ROUTES.career)}
        />

        <div className="popit-category-grid popit-category-grid-mock" role="list" aria-label="Explore modes">
          {CATEGORY_CARDS.map((card, i) => (
            <CategoryCard
              key={card.key}
              icon={card.icon}
              label={card.label}
              stat={card.stat}
              theme={card.theme}
              image={card.image}
              selected={current.chipKey === card.key}
              delay={0.12 + i * 0.06}
              onClick={() => handleCategory(card.key)}
            />
          ))}
        </div>

        <LiveVenueCards
          venues={LIVE_VENUE_CARDS}
          reducedMotion={motionLite}
          mobileLite={mobileLite}
          energyNorm={energyNorm}
          onVenueClick={handleVenue}
          onSectionClick={() => goTo(WELCOME_TAB_ROUTES.live)}
        />

        <CityPulse
          channels={pulse}
          reducedMotion={motionLite}
          onChannelClick={handlePulseChannel}
          onSectionClick={() => goTo(WELCOME_TAB_ROUTES.energy)}
        />

        <WelcomeLandingFooter
          loading={ctaLoading}
          isOverdrive={state.isOverdrive}
          signInBusy={signInBusy}
          onPrimary={handleJoin}
          onSignIn={handleSignIn}
        />
      </motion.div>

      <WeatherReportSheet
        open={weatherOpen}
        city={city}
        period={timePeriod}
        onClose={() => setWeatherOpen(false)}
      />
    </PullToRefresh>
  );
}
