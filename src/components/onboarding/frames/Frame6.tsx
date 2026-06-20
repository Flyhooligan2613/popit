"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";

const SLIDES = [
  {
    category: "Restaurant",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop",
    alt: "Premium restaurant dining atmosphere",
    headline: "Discover the Best Restaurants Near You",
    subtitle: "From hidden gems to the hottest tables everyone's talking about.",
    overlay: 0.64,
  },
  {
    category: "Nightlife",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
    alt: "Nightlife club and bar energy",
    headline: "Find Tonight's Hottest Nightlife",
    subtitle: "Rooftops, clubs, and late-night spots lighting up tonight.",
    overlay: 0.68,
  },
  {
    category: "Concert",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop",
    alt: "Live concert and festival crowd",
    headline: "Never Miss Live Events",
    subtitle: "Concerts, festivals, and live shows happening around you.",
    overlay: 0.66,
  },
  {
    category: "Sports",
    src: "https://images.unsplash.com/photo-1574629810360-1df083e8ee88?w=1400&q=80&auto=format&fit=crop",
    alt: "Sports bar watch party atmosphere",
    headline: "Catch the Biggest Games Around You",
    subtitle: "Sports bars, watch parties, and game-day energy nearby.",
    overlay: 0.67,
  },
  {
    category: "Festival",
    src: "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=1400&q=80&auto=format&fit=crop",
    alt: "Outdoor festival and street fair",
    headline: "Experience What's Trending Today",
    subtitle: "Pop-up markets, street fairs, and can't-miss moments.",
    overlay: 0.65,
  },
  {
    category: "Beach",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1400&q=80&auto=format&fit=crop",
    alt: "Beach club and coastal scene",
    headline: "Discover Hidden Local Gems",
    subtitle: "Coastal hangs, beach clubs, and sunny-day discoveries.",
    overlay: 0.63,
  },
  {
    category: "Coffee Shop",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop",
    alt: "Artisan coffee shop interior",
    headline: "Find Your Next Favorite Spot",
    subtitle: "Cafes, brunch spots, and your next go-to morning stop.",
    overlay: 0.62,
  },
  {
    category: "City",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80&auto=format&fit=crop",
    alt: "City skyline at night",
    headline: "Discover What's Popping Near You",
    subtitle: "Trending restaurants, nightlife, events, and local favorites—all in one place.",
    overlay: 0.66,
  },
] as const;

const FEATURE_CHIPS = [
  { icon: "🍽", label: "Restaurants" },
  { icon: "🎉", label: "Events" },
  { icon: "📍", label: "Trending" },
] as const;

const ACTIVITY_TICKER = [
  "🔥 Blue Martini is trending",
  "🍕 Joe's Pizza gained 500 saves",
  "🎉 Wynwood Food Festival starts tonight",
  "🎵 Live DJ announced",
  "🏖️ South Beach is trending",
  "🍹 LIV Nightclub nearly full",
  "🍔 New restaurant opened today",
] as const;

const TRUST_MESSAGES = [
  "📍 Thousands discovering places today",
  "🔥 Local businesses updating in real time",
  "🎉 New events added daily",
  "⭐ Trusted by local explorers",
  "📈 New places added every hour",
] as const;

const SOCIAL_STATS = [
  { key: "trending", icon: "🔥", label: "Trending", value: "128+", numeric: 128, suffix: "+" },
  { key: "restaurants", icon: "🍽", label: "Restaurants", value: "2.4K", numeric: null, suffix: null },
  { key: "events", icon: "🎉", label: "Events", value: "340", numeric: 340, suffix: null },
  { key: "cities", icon: "📍", label: "Cities", value: "12", numeric: 12, suffix: null },
] as const;

const PARTICLE_SEEDS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 17) % 84),
  y: 12 + ((i * 23) % 76),
  delay: (i % 5) * 0.7,
  duration: 5.5 + (i % 4) * 1.2,
}));

const SLIDE_MS = 6000;
const FADE_MS = 3.2;
const TICKER_MS = 3500;
const TRUST_MS = 5000;

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
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function FeatureChip({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{
        opacity: { delay, duration: 0.32, ease: INTRO_EASE },
        y: { delay, duration: 0.32, ease: INTRO_EASE },
        scale: { type: "spring", stiffness: 420, damping: 24 },
      }}
      className="welcome-chip welcome-glass group relative flex items-center font-semibold tracking-wide text-white/94"
    >
      <span aria-hidden>{icon}</span>
      <span className="font-body">{label}</span>
    </motion.div>
  );
}

function StatValue({
  value,
  numeric,
  suffix,
  animate,
}: {
  value: string;
  numeric: number | null;
  suffix: string | null;
  animate: boolean;
}) {
  const count = useAnimatedNumber(animate && numeric != null ? numeric : 0, 900);

  if (numeric == null) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="font-display welcome-stat-value block leading-none text-white"
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span className="font-display welcome-stat-value block leading-none text-white" data-value={value}>
      {animate ? count : numeric}
      {suffix ?? ""}
    </span>
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
            transition={{ duration: fadeDuration, ease: [0.4, 0, 0.2, 1] }}
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
            <div
              className="welcome-overlay-slide absolute inset-0"
              style={{ opacity: overlay }}
            />
          </motion.div>
        );
      })}
      <div className="welcome-overlay-base absolute inset-0" />
      <div className="welcome-overlay-center absolute inset-0" />
      <div
        className="welcome-ambient absolute inset-0"
        style={{ opacity: 0.35 + current.overlay * 0.15 }}
      />
    </div>
  );
}

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  const reducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: true });
  const [ticker, setTicker] = useState(0);
  const [trust, setTrust] = useState(0);
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
    const interval = reducedMotion ? 9000 : SLIDE_MS;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), interval);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setTicker((i) => (i + 1) % ACTIVITY_TICKER.length),
      reducedMotion ? 7000 : TICKER_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setTrust((i) => (i + 1) % TRUST_MESSAGES.length),
      reducedMotion ? 8000 : TRUST_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), reducedMotion ? 0 : 720);
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
          () => {
            /* denied or unavailable */
          },
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
      const nx = (event.clientX / window.innerWidth - 0.5) * 14;
      const ny = (event.clientY / window.innerHeight - 0.5) * 10;
      setParallax({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop, reducedMotion]);

  const shouldAnimateStats = statsReady && !reducedMotion;

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
      <HeroBackground slide={slide} reducedMotion={!!reducedMotion} parallax={parallax} />
      <WelcomeParticles active={!reducedMotion} />

      <div className="welcome-content relative z-[2]">
        <div className="welcome-logo-wrap welcome-logo-scale">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: reducedMotion ? 0 : [0, -4, 0],
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.05, ease: INTRO_EASE },
              y: reducedMotion
                ? { duration: 0.3 }
                : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
          >
            <PopitBrandLogo markWidth={86} markHeight={122} showWordmark={false} />
          </motion.div>
        </div>

        <div className="welcome-hero">
          <div className="welcome-headline-wrap relative w-full min-h-[2.6em]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${slide}-${city ?? "default"}-${headline}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onAnimationComplete={() => {
                  headlineIntroRef.current = false;
                }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.45,
                  delay: headlineIntroRef.current && slide === 0 ? 0.12 : 0,
                  ease: INTRO_EASE,
                }}
                className="welcome-headline font-display text-poster text-white"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
              >
                {headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="welcome-subtitle-wrap relative w-full min-h-[2.8em]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${slide}-sub-${city ?? "default"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0.18 : 0.45, ease: INTRO_EASE, delay: 0.04 }}
                className="welcome-subtitle font-body"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.7)" }}
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" role="list" aria-label="Features">
            {FEATURE_CHIPS.map((chip, index) => (
              <div key={chip.label} role="listitem">
                <FeatureChip {...chip} delay={0.28 + index * 0.08} />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.34, ease: INTRO_EASE }}
            className="welcome-ticker relative w-full max-w-[19rem] overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={ticker}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.42, ease: INTRO_EASE }}
                className="font-body welcome-glass welcome-ticker-pill absolute inset-x-0 truncate px-3 py-1 text-[clamp(0.6875rem,2.4vw,0.8125rem)] text-white/72"
              >
                {ACTIVITY_TICKER[ticker]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.36, ease: INTRO_EASE }}
            className="grid w-full grid-cols-4 gap-1 sm:gap-1.5"
            aria-label="Platform activity"
          >
            {SOCIAL_STATS.map(({ key, icon, label, value, numeric, suffix }, index) => (
              <motion.div
                key={key}
                data-stat={key}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.76 + index * 0.06, duration: 0.34, ease: INTRO_EASE }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="welcome-stat welcome-glass-stat rounded-lg sm:rounded-xl"
              >
                <p className="welcome-stat-label font-body uppercase tracking-wide text-white/48">
                  <span aria-hidden>{icon}</span> {label}
                </p>
                <StatValue value={value} numeric={numeric} suffix={suffix} animate={shouldAnimateStats} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="welcome-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.38, ease: INTRO_EASE }}
        >
          <div className="welcome-trust relative w-full overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={trust}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: INTRO_EASE }}
                className="font-body welcome-trust-text truncate text-center text-[clamp(0.6875rem,2.2vw,0.8125rem)] text-white/52"
              >
                {TRUST_MESSAGES[trust]}
              </motion.p>
            </AnimatePresence>
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
      </div>
    </div>
  );
}
