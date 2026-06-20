"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";

/** Lifestyle imagery — restaurants, nightlife, events, city discovery */
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
    alt: "Restaurant dining atmosphere",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80&auto=format&fit=crop",
    alt: "Live music and festival crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
    alt: "Coffee shop and local cafe",
  },
  {
    src: "https://images.unsplash.com/photo-1566417713940-9614e2601d2?w=1200&q=80&auto=format&fit=crop",
    alt: "Rooftop bar and nightlife",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop",
    alt: "City skyline at night",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80&auto=format&fit=crop",
    alt: "Friends enjoying food together",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop",
    alt: "Trending restaurant dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1200&q=80&auto=format&fit=crop",
    alt: "Beach event and outdoor gathering",
  },
] as const;

const FEATURE_CHIPS = [
  { icon: "🍽", label: "Restaurants" },
  { icon: "🎉", label: "Events" },
  { icon: "📍", label: "Trending Nearby" },
] as const;

const ACTIVITY_TICKER = [
  "🔥 Blue Martini is trending",
  "🍔 New taco spot added in Wynwood",
  "🎵 Live music starts at 8 PM",
  "☕ 42 people popped into Panther Coffee",
  "🌃 Rooftop hour is heating up",
  "🛍 Local deals just dropped nearby",
] as const;

/** Placeholder stats — wire to live API later via data-stat keys */
const SOCIAL_STATS = [
  { key: "trending", icon: "🔥", label: "Places Trending Today", value: "128+" },
  { key: "restaurants", icon: "🍽", label: "Restaurants", value: "2.4K" },
  { key: "events", icon: "🎉", label: "Events", value: "340" },
  { key: "cities", icon: "📍", label: "Cities Supported", value: "12" },
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
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="welcome-chip group flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2.5 backdrop-blur-md"
    >
      <span className="text-base" aria-hidden>
        {icon}
      </span>
      <span className="font-body text-sm font-semibold tracking-wide text-white/90">{label}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  const reducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: true });
  const [ticker, setTicker] = useState(0);

  const preload = useCallback((index: number) => {
    if (typeof window === "undefined" || loaded[index]) return;
    const img = new window.Image();
    img.onload = () => setLoaded((prev) => ({ ...prev, [index]: true }));
    img.src = SLIDES[index].src;
  }, [loaded]);

  useEffect(() => {
    const next = (slide + 1) % SLIDES.length;
    preload(next);
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

  const fadeDuration = reducedMotion ? 0.4 : FADE_MS;

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050505]"
      style={{ minHeight: "100dvh" }}
      role="main"
      aria-label="Welcome to POP'IT"
    >
      {/* Background slideshow — cinematic crossfade */}
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
              style={{ transform: slide === index ? "scale(1)" : "scale(1.04)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.45) 40%, rgba(5,5,5,0.92) 78%, rgba(5,5,5,0.98) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-[2] flex min-h-[100dvh] flex-col items-center justify-between px-6 pb-10 pt-12 sm:px-8">
        {/* Logo — gentle float */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.2 },
            y: reducedMotion
              ? { duration: 0.5 }
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        >
          <PopitBrandLogo markWidth={108} markHeight={154} showWordmark={false} />
        </motion.div>

        {/* Hero copy + features */}
        <motion.div
          className="flex w-full max-w-md flex-col items-center gap-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-poster text-[clamp(2rem,8.5vw,3.25rem)] text-white"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.75)" }}
          >
            Discover What&apos;s Popping Near You
          </h1>

          <p
            className="font-body max-w-[22rem] text-[clamp(0.95rem,3.8vw,1.08rem)] leading-relaxed text-white/78"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
          >
            Discover trending restaurants, nightlife, events, hidden gems, and local favorites—all in
            one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1" role="list" aria-label="Features">
            {FEATURE_CHIPS.map((chip) => (
              <div key={chip.label} role="listitem">
                <FeatureChip {...chip} />
              </div>
            ))}
          </div>

          {/* Live activity ticker */}
          <div
            className="relative h-7 w-full max-w-xs overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={ticker}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.45 }}
                className="font-body absolute inset-x-0 truncate text-sm text-white/55"
              >
                {ACTIVITY_TICKER[ticker]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Social proof — placeholder stats for future API */}
          <div
            className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4"
            aria-label="Platform activity"
          >
            {SOCIAL_STATS.map(({ key, icon, label, value }) => (
              <div
                key={key}
                data-stat={key}
                className="rounded-xl border border-white/8 bg-white/[0.04] px-2.5 py-2.5 backdrop-blur-sm"
              >
                <p className="font-body text-[10px] uppercase tracking-wider text-white/40">
                  <span aria-hidden>{icon}</span> {label}
                </p>
                <p className="font-display mt-0.5 text-lg leading-none text-white" data-value={value}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex w-full max-w-[19.5rem] flex-col items-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          <button
            type="button"
            onClick={onJoin}
            className="welcome-cta-primary font-body w-full rounded-full px-6 py-[17px] text-base font-bold tracking-wide text-white"
          >
            Start Exploring Free
          </button>

          <button
            type="button"
            onClick={onSignIn}
            className="font-body text-[15px] font-medium text-white/55 transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
          >
            Sign In
          </button>

          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className="font-body relative mt-1 text-[13px] text-white/30"
          >
            Continue as Guest
            <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
              Coming Soon
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
