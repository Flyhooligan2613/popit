"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1080&q=75&auto=format&fit=crop",
    alt: "Restaurant dining atmosphere",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080&q=75&auto=format&fit=crop",
    alt: "Live music and festival crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&q=75&auto=format&fit=crop",
    alt: "Coffee shop and local cafe",
  },
  {
    src: "https://images.unsplash.com/photo-1566417713940-9614e2601d2?w=1080&q=75&auto=format&fit=crop",
    alt: "Rooftop bar and nightlife",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1080&q=75&auto=format&fit=crop",
    alt: "City skyline at night",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1080&q=75&auto=format&fit=crop",
    alt: "Friends enjoying food together",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080&q=75&auto=format&fit=crop",
    alt: "Trending restaurant dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1080&q=75&auto=format&fit=crop",
    alt: "Beach event and outdoor gathering",
  },
] as const;

const FEATURE_CHIPS = [
  { icon: "🍽", label: "Restaurants" },
  { icon: "🎉", label: "Events" },
  { icon: "📍", label: "Trending" },
] as const;

const ACTIVITY_TICKER = [
  "🔥 Blue Martini is trending",
  "🍔 New taco spot added in Wynwood",
  "🎵 Live music starts at 8 PM",
  "☕ 42 people popped into Panther Coffee",
  "🌃 Rooftop hour is heating up",
  "🛍 Local deals just dropped nearby",
] as const;

const SOCIAL_STATS = [
  { key: "trending", icon: "🔥", label: "Trending", value: "128+", numeric: 128, suffix: "+" },
  { key: "restaurants", icon: "🍽", label: "Restaurants", value: "2.4K", numeric: null, suffix: null },
  { key: "events", icon: "🎉", label: "Events", value: "340", numeric: 340, suffix: null },
  { key: "cities", icon: "📍", label: "Cities", value: "12", numeric: 12, suffix: null },
] as const;

const SLIDE_MS = 5500;
const FADE_MS = 2.8;
const TICKER_MS = 4200;

type Frame6Props = {
  onJoin: () => void;
  onSignIn: () => void;
};

function FeatureChip({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="welcome-chip group relative flex items-center rounded-full border border-white/12 bg-white/[0.08] font-semibold tracking-wide text-white/92 backdrop-blur-md"
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

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  const reducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: true });
  const [ticker, setTicker] = useState(0);
  const [statsReady, setStatsReady] = useState(false);

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
  }, [slide, preload]);

  useEffect(() => {
    const interval = reducedMotion ? 8000 : SLIDE_MS;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), interval);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setTicker((i) => (i + 1) % ACTIVITY_TICKER.length),
      reducedMotion ? 6000 : TICKER_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), reducedMotion ? 0 : 400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  const fadeDuration = reducedMotion ? 0.4 : FADE_MS;
  const shouldAnimateStats = statsReady && !reducedMotion;

  return (
    <div className="welcome-screen absolute inset-0 bg-[#050505]" role="main" aria-label="Welcome to POP'IT">
      <div className="absolute inset-0 z-0" aria-hidden>
        {SLIDES.map(({ src, alt }, index) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: slide === index ? 1 : 0 }}
            transition={{ duration: fadeDuration, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={slide === index ? alt : ""}
              loading={index <= 1 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
              onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="welcome-overlay-base absolute inset-0 z-[1]" aria-hidden />
      <div className="welcome-overlay-center absolute inset-0 z-[1]" aria-hidden />

      <div className="welcome-content relative z-[2]">
        <div className="welcome-logo-wrap welcome-logo-scale">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -4, 0] }}
            transition={{
              opacity: { duration: 0.55, delay: 0.12 },
              y: reducedMotion
                ? { duration: 0.4 }
                : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            }}
          >
            <PopitBrandLogo markWidth={86} markHeight={122} showWordmark={false} />
          </motion.div>
        </div>

        <motion.div
          className="welcome-hero"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="welcome-headline font-display text-poster text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          >
            Discover What&apos;s Popping Near You
          </h1>

          <p
            className="welcome-subtitle font-body"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.65)" }}
          >
            Trending restaurants, nightlife, events, and local favorites—all in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" role="list" aria-label="Features">
            {FEATURE_CHIPS.map((chip) => (
              <div key={chip.label} role="listitem">
                <FeatureChip {...chip} />
              </div>
            ))}
          </div>

          <div className="welcome-ticker relative w-full max-w-[18rem] overflow-hidden" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={ticker}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.38 }}
                className="font-body absolute inset-x-0 truncate text-[clamp(0.6875rem,2.4vw,0.8125rem)] text-white/58"
              >
                {ACTIVITY_TICKER[ticker]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="grid w-full grid-cols-4 gap-1 sm:gap-1.5" aria-label="Platform activity">
            {SOCIAL_STATS.map(({ key, icon, label, value, numeric, suffix }) => (
              <div
                key={key}
                data-stat={key}
                className="welcome-stat rounded-lg border border-white/10 bg-white/[0.05] backdrop-blur-sm sm:rounded-xl"
              >
                <p className="welcome-stat-label font-body uppercase tracking-wide text-white/45">
                  <span aria-hidden>{icon}</span> {label}
                </p>
                <StatValue value={value} numeric={numeric} suffix={suffix} animate={shouldAnimateStats} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="welcome-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
        >
          <button type="button" onClick={onJoin} className="welcome-cta-primary font-body w-full rounded-full font-bold tracking-wide text-white">
            Start Exploring Free
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
