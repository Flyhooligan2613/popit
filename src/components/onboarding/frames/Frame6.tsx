"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import WelcomeBrandedIntro, { WELCOME_INTRO_SESSION_KEY } from "./WelcomeBrandedIntro";

type ChipKey = "restaurants" | "events" | "trending";

const SLIDES = [
  {
    category: "Restaurant",
    chipKey: "restaurants" as ChipKey,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop",
    alt: "Premium restaurant dining atmosphere",
    headline: "Discover the Best Restaurants Near You",
    subtitle: "From hidden gems to the hottest tables everyone's talking about.",
    overlay: 0.64,
    ticker: [
      "🔥 Blue Martini is trending",
      "🍕 Joe's Pizza gained 500 saves",
      "🍔 New restaurant opened today",
    ],
    trustSuffix: "people exploring restaurants right now",
  },
  {
    category: "Nightlife",
    chipKey: "trending" as ChipKey,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
    alt: "Nightlife club and bar energy",
    headline: "Find Tonight's Hottest Nightlife",
    subtitle: "Rooftops, clubs, and late-night spots lighting up tonight.",
    overlay: 0.68,
    ticker: [
      "🍹 LIV Nightclub nearly full",
      "🎵 Live DJ announced tonight",
      "🌃 Rooftop hour is heating up",
    ],
    trustSuffix: "people scouting nightlife right now",
  },
  {
    category: "Concert",
    chipKey: "events" as ChipKey,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop",
    alt: "Live concert and festival crowd",
    headline: "Never Miss Live Events",
    subtitle: "Concerts, festivals, and live shows happening around you.",
    overlay: 0.66,
    ticker: [
      "🎵 Live DJ announced tonight",
      "🎉 Wynwood Food Festival starts tonight",
      "🎤 Sold-out show added nearby",
    ],
    trustSuffix: "people browsing live events right now",
  },
  {
    category: "Sports",
    chipKey: "trending" as ChipKey,
    src: "https://images.unsplash.com/photo-1574629810360-1df083e8ee88?w=1400&q=80&auto=format&fit=crop",
    alt: "Sports bar watch party atmosphere",
    headline: "Catch the Biggest Games Around You",
    subtitle: "Sports bars, watch parties, and game-day energy nearby.",
    overlay: 0.67,
    ticker: [
      "🏈 Game day watch parties filling up",
      "🍺 Sports bar reservations spiking",
      "📺 Big screen spots trending",
    ],
    trustSuffix: "people finding game-day spots right now",
  },
  {
    category: "Festival",
    chipKey: "events" as ChipKey,
    src: "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=1400&q=80&auto=format&fit=crop",
    alt: "Outdoor festival and street fair",
    headline: "Experience What's Trending Today",
    subtitle: "Pop-up markets, street fairs, and can't-miss moments.",
    overlay: 0.65,
    ticker: [
      "🎉 Food Festival starts in 2 hours",
      "🎪 Street fair crowd building fast",
      "✨ Pop-up market just went live",
    ],
    trustSuffix: "people discovering festivals right now",
  },
  {
    category: "Beach",
    chipKey: "trending" as ChipKey,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1400&q=80&auto=format&fit=crop",
    alt: "Beach club and coastal scene",
    headline: "Discover Hidden Local Gems",
    subtitle: "Coastal hangs, beach clubs, and sunny-day discoveries.",
    overlay: 0.63,
    ticker: [
      "🏖️ South Beach is trending",
      "🌊 Beach club reservations rising",
      "☀️ Coastal spots heating up",
    ],
    trustSuffix: "people exploring coastal gems right now",
  },
  {
    category: "Coffee Shop",
    chipKey: "restaurants" as ChipKey,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop",
    alt: "Artisan coffee shop interior",
    headline: "Find Your Next Favorite Spot",
    subtitle: "Cafes, brunch spots, and your next go-to morning stop.",
    overlay: 0.62,
    ticker: [
      "☕ 42 people popped into Panther Coffee",
      "🥐 New brunch spot gaining saves",
      "🍵 Hidden cafe trending nearby",
    ],
    trustSuffix: "people finding cafes right now",
  },
  {
    category: "City",
    chipKey: "trending" as ChipKey,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80&auto=format&fit=crop",
    alt: "City skyline at night",
    headline: "Discover What's Popping Near You",
    subtitle: "Trending restaurants, nightlife, events, and local favorites—all in one place.",
    overlay: 0.66,
    ticker: [
      "🔥 Blue Martini is trending",
      "🍔 New taco spot opened in Wynwood",
      "📍 Downtown energy is surging",
    ],
    trustSuffix: "people exploring nearby right now",
  },
] as const;

const FEATURE_CHIPS = [
  { key: "restaurants" as ChipKey, icon: "🍽", label: "Restaurants" },
  { key: "events" as ChipKey, icon: "🎉", label: "Events" },
  { key: "trending" as ChipKey, icon: "📍", label: "Trending" },
] as const;

const SOCIAL_STATS = [
  { key: "trending", icon: "🔥", label: "Trending", value: "128+", numeric: 128, suffix: "+" },
  { key: "restaurants", icon: "🍽", label: "Restaurants", value: "2.4K", numeric: 2400, suffix: null, display: "2.4K" },
  { key: "events", icon: "🎉", label: "Events", value: "340", numeric: 340, suffix: null },
  { key: "cities", icon: "📍", label: "Cities", value: "12", numeric: 12, suffix: null },
] as const;

const LOGO_PARTICLE_SEEDS = [
  { x: -28, y: -18, delay: 0 },
  { x: 32, y: -24, delay: 0.6 },
  { x: -36, y: 12, delay: 1.1 },
  { x: 38, y: 20, delay: 0.3 },
  { x: 0, y: -34, delay: 0.9 },
];

const PARTICLE_SEEDS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 6 + ((i * 19) % 88),
  y: 10 + ((i * 21) % 80),
  delay: (i % 6) * 0.65,
  duration: 5 + (i % 5) * 1.1,
  size: i % 3 === 0 ? 2 : 3,
}));

const SLIDE_MS = 6500;
const FADE_MS = 3.4;
const TICKER_MS = 3600;
const LIVE_COUNT_MS = 4200;

const INTRO_EASE = [0.16, 1, 0.3, 1] as const;

type Frame6Props = {
  onJoin: () => void;
  onSignIn: () => void;
};

function withCity(text: string, city: string | null): string {
  if (!city) return text;
  return text
    .replace(/\bNear You\b/, `in ${city}`)
    .replace(/\bAround You\b/, `in ${city}`);
}

function hapticTap() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(12);
    } catch {
      /* ignore */
    }
  }
}

function StatValue({
  value,
  numeric,
  suffix,
  display,
  animate,
}: {
  value: string;
  numeric: number;
  suffix: string | null;
  display?: string;
  animate: boolean;
}) {
  const count = useAnimatedNumber(animate ? numeric : 0, 1200);

  let text = "0";
  if (animate) {
    if (display && numeric >= 1000) {
      text = count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(count);
    } else {
      text = `${count}${suffix ?? ""}`;
    }
  }

  return (
    <span className="font-display welcome-stat-value block leading-none text-white" data-value={value}>
      {text}
    </span>
  );
}

function WelcomeParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="welcome-particles pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {PARTICLE_SEEDS.map((p) => (
        <span
          key={p.id}
          className="welcome-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function FeatureChip({
  icon,
  label,
  delay,
  selected,
}: {
  icon: string;
  label: string;
  delay: number;
  selected: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: selected ? 1.04 : 1,
      }}
      whileHover={{ y: -2, scale: selected ? 1.06 : 1.03 }}
      transition={{
        opacity: { delay, duration: 0.32, ease: INTRO_EASE },
        y: { delay, duration: 0.32, ease: INTRO_EASE },
        scale: selected
          ? { type: "spring", stiffness: 520, damping: 18 }
          : { type: "spring", stiffness: 420, damping: 24 },
      }}
      className={`welcome-chip welcome-glass group relative flex items-center font-semibold tracking-wide ${
        selected ? "welcome-chip-selected text-white" : "text-white/94"
      }`}
    >
      <motion.span
        aria-hidden
        animate={{ scale: selected ? 1.12 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {icon}
      </motion.span>
      <span className="font-body">{label}</span>
    </motion.div>
  );
}

function LiveSocialProof({
  slide,
  reducedMotion,
}: {
  slide: number;
  reducedMotion: boolean;
}) {
  const [liveCount, setLiveCount] = useState(3281);
  const displayCount = useAnimatedNumber(liveCount, reducedMotion ? 0 : 700);
  const suffix = SLIDES[slide].trustSuffix;

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 4) + 2);
    }, LIVE_COUNT_MS);
    return () => clearInterval(t);
  }, [reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={slide}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: INTRO_EASE }}
        className="font-body welcome-trust-text truncate text-center text-[clamp(0.6875rem,2.2vw,0.8125rem)] text-white/54"
      >
        📍 {displayCount.toLocaleString()} {suffix}
      </motion.p>
    </AnimatePresence>
  );
}

function HeroBackground({
  slide,
  reducedMotion,
  parallax,
}: {
  slide: number;
  reducedMotion: boolean;
  parallax: { x: number; y: number };
}) {
  const fadeDuration = reducedMotion ? 0.45 : FADE_MS;
  const current = SLIDES[slide];

  return (
    <div
      className="welcome-bg-stage absolute inset-0 z-0 overflow-hidden bg-[#050505]"
      aria-hidden
      style={
        {
          "--welcome-parallax-x": `${parallax.x}px`,
          "--welcome-parallax-y": `${parallax.y}px`,
        } as Record<string, string>
      }
    >
      {SLIDES.map(({ src, alt, overlay }, index) => {
        const isActive = slide === index;
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: fadeDuration, ease: [0.42, 0, 0.18, 1] }}
          >
            <div className={`welcome-bg-inner ${isActive && !reducedMotion ? "is-active" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={isActive ? alt : ""}
                loading={index <= 1 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className="welcome-bg-image"
              />
            </div>
            <div className="welcome-overlay-slide absolute inset-0" style={{ opacity: overlay }} />
          </motion.div>
        );
      })}
      <div className="welcome-overlay-base absolute inset-0" />
      <div className="welcome-overlay-center absolute inset-0" />
      <div className="welcome-vignette absolute inset-0" />
      <div className="welcome-lens-bloom absolute inset-0" />
      <div
        className="welcome-ambient absolute inset-0"
        style={{ opacity: 0.38 + current.overlay * 0.14 }}
      />
    </div>
  );
}

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  const reducedMotion = useReducedMotion();
  const [showBrandedIntro, setShowBrandedIntro] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: true });
  const [tickerIndex, setTickerIndex] = useState(0);
  const [statsReady, setStatsReady] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const [ctaLoading, setCtaLoading] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const joinLockRef = useRef(false);
  const headlineIntroRef = useRef(true);

  const currentSlide = SLIDES[slide];
  const headline = withCity(currentSlide.headline, city);
  const subtitle = city
    ? currentSlide.subtitle.replace(/\baround you\b/i, `in ${city}`).replace(/\bnearby\b/i, `in ${city}`)
    : currentSlide.subtitle;
  const sceneTicker = currentSlide.ticker[tickerIndex % currentSlide.ticker.length];

  useEffect(() => {
    if (reducedMotion) {
      sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
      setShowBrandedIntro(false);
    } else {
      const seen = sessionStorage.getItem(WELCOME_INTRO_SESSION_KEY) === "1";
      setShowBrandedIntro(!seen);
    }
    setIntroReady(true);
  }, [reducedMotion]);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
    setShowBrandedIntro(false);
  }, []);

  const preload = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || loaded[index]) return;
      const img = new window.Image();
      img.onload = () => setLoaded((prev) => ({ ...prev, [index]: true }));
      img.src = SLIDES[index].src;
    },
    [loaded]
  );

  useEffect(() => {
    preload((slide + 1) % SLIDES.length);
    preload((slide + 2) % SLIDES.length);
  }, [slide, preload]);

  useEffect(() => {
    setTickerIndex(0);
  }, [slide]);

  useEffect(() => {
    const interval = reducedMotion ? 9000 : SLIDE_MS;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), interval);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setTickerIndex((i) => i + 1),
      reducedMotion ? 7000 : TICKER_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion, slide]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), reducedMotion ? 0 : 850);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    let cancelled = false;

    async function detectCity() {
      if (typeof window === "undefined" || !navigator.geolocation) return;

      try {
        const permissions = navigator.permissions;
        if (permissions?.query) {
          const status = await permissions.query({ name: "geolocation" });
          if (status.state !== "granted") return;
        }

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            if (cancelled) return;
            try {
              const { latitude, longitude } = pos.coords;
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              if (!res.ok) return;
              const data = (await res.json()) as { city?: string; locality?: string };
              const resolved = data.city || data.locality;
              if (resolved && !cancelled) setCity(resolved);
            } catch {
              /* silent fallback */
            }
          },
          () => {},
          { maximumAge: 900_000, timeout: 5000, enableHighAccuracy: false }
        );
      } catch {
        /* permissions API unavailable */
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

    const handleMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 12;
      const ny = (event.clientY / window.innerHeight - 0.5) * 8;
      setParallax({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop, reducedMotion]);

  const shouldAnimateStats = statsReady && !reducedMotion;
  const contentVisible = introReady && !showBrandedIntro;

  const handleJoin = () => {
    if (joinLockRef.current || ctaLoading) return;
    joinLockRef.current = true;
    hapticTap();
    setCtaLoading(true);
    window.setTimeout(() => {
      onJoin();
    }, 520);
  };

  return (
    <div className="welcome-screen absolute inset-0 bg-[#050505]" role="main" aria-label="Welcome to POP'IT">
      {introReady && showBrandedIntro && <WelcomeBrandedIntro onComplete={handleIntroComplete} />}

      <HeroBackground slide={slide} reducedMotion={!!reducedMotion} parallax={parallax} />
      <WelcomeParticles active={!reducedMotion && contentVisible} />

      <motion.div
        className="welcome-content relative z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.45, ease: INTRO_EASE }}
      >
        <div className="welcome-logo-wrap welcome-logo-scale">
          <div className="welcome-logo-stage relative">
            <div className="welcome-logo-glow" aria-hidden />
            <div className="welcome-logo-bloom" aria-hidden />
            {!reducedMotion &&
              LOGO_PARTICLE_SEEDS.map((p) => (
                <span
                  key={`${p.x}-${p.y}`}
                  className="welcome-logo-particle"
                  style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, animationDelay: `${p.delay}s` }}
                  aria-hidden
                />
              ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: reducedMotion ? 0 : [0, -2.5, 0],
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.08, ease: INTRO_EASE },
                y: reducedMotion
                  ? { duration: 0.3 }
                  : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              }}
            >
              <PopitBrandLogo markWidth={86} markHeight={122} showWordmark={false} />
            </motion.div>
          </div>
        </div>

        <div className="welcome-hero">
          <div className="welcome-headline-wrap relative w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${slide}-${city ?? "default"}-${headline}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onAnimationComplete={() => {
                  headlineIntroRef.current = false;
                }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.5,
                  delay: headlineIntroRef.current && slide === 0 ? 0.1 : 0,
                  ease: INTRO_EASE,
                }}
                className="welcome-headline font-display text-poster text-white"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
              >
                {headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="welcome-subtitle-wrap relative w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${slide}-sub-${city ?? "default"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0.18 : 0.48, ease: INTRO_EASE, delay: 0.05 }}
                className="welcome-subtitle font-body"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.7)" }}
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5" role="list" aria-label="Features">
            {FEATURE_CHIPS.map((chip, index) => (
              <div key={chip.label} role="listitem">
                <FeatureChip
                  icon={chip.icon}
                  label={chip.label}
                  delay={0.24 + index * 0.07}
                  selected={currentSlide.chipKey === chip.key}
                />
              </div>
            ))}
          </div>

          <div
            className="welcome-ticker relative w-full max-w-[19rem] overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`${slide}-${tickerIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.44, ease: INTRO_EASE }}
                className="font-body welcome-glass welcome-ticker-pill absolute inset-x-0 truncate px-3 py-1.5 text-[clamp(0.6875rem,2.4vw,0.8125rem)] text-white/76"
              >
                {sceneTicker}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="grid w-full grid-cols-4 gap-1.5 sm:gap-2" aria-label="Platform activity">
            {SOCIAL_STATS.map(({ key, icon, label, value, numeric, suffix, ...rest }, index) => (
              <motion.div
                key={key}
                data-stat={key}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.72 + index * 0.06, duration: 0.36, ease: INTRO_EASE }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="welcome-stat welcome-glass-stat rounded-lg sm:rounded-xl"
              >
                <p className="welcome-stat-label font-body uppercase tracking-wide text-white/48">
                  <span aria-hidden>{icon}</span> {label}
                </p>
                <StatValue
                  value={value}
                  numeric={numeric}
                  suffix={suffix}
                  display={"display" in rest ? rest.display : undefined}
                  animate={shouldAnimateStats}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="welcome-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 14 }}
          transition={{ delay: 0.95, duration: 0.38, ease: INTRO_EASE }}
        >
          <div className="welcome-trust relative w-full overflow-hidden" aria-live="polite">
            <LiveSocialProof slide={slide} reducedMotion={!!reducedMotion} />
          </div>

          <button
            type="button"
            onClick={handleJoin}
            disabled={ctaLoading}
            aria-busy={ctaLoading}
            className={`welcome-cta-primary font-body w-full rounded-full font-bold tracking-wide text-white ${ctaLoading ? "is-loading" : ""}`}
          >
            <span className="welcome-cta-label">{ctaLoading ? "Loading…" : "Start Exploring Free"}</span>
          </button>

          <button
            type="button"
            onClick={onSignIn}
            className="font-body text-[clamp(0.8125rem,2.5vw,0.9375rem)] font-medium text-white/58 transition-colors hover:text-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/40"
          >
            Sign In
          </button>

          <p className="welcome-guest-row font-body text-white/28" aria-disabled="true">
            Continue as Guest
            <span className="ml-1.5 rounded-full border border-white/10 bg-white/5 px-1.5 py-px text-[9px] uppercase tracking-wider text-white/38">
              Soon
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
