"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import { useAnimatedNumber } from "@/components/pulse/useAnimatedNumber";
import WelcomeBrandedIntro, { WELCOME_INTRO_SESSION_KEY } from "./WelcomeBrandedIntro";

type CategoryKey = "restaurants" | "events" | "trending" | "nearby";

const SLIDES = [
  {
    category: "Restaurant",
    chipKey: "restaurants" as CategoryKey,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop",
    alt: "Premium restaurant dining atmosphere",
    headlineTop: "Discover What's",
    headlineAccent: "Popping",
    subtitle: "From hidden gems to the hottest tables everyone's talking about.",
    overlay: 0.64,
    ticker: [
      { icon: "🔥", text: "Blue Martini is trending", time: "2m ago" },
      { icon: "🍕", text: "Joe's Pizza gained 500 saves", time: "4m ago" },
      { icon: "🍔", text: "New restaurant opened today", time: "6m ago" },
    ],
  },
  {
    category: "Nightlife",
    chipKey: "trending" as CategoryKey,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
    alt: "Nightlife club and bar energy",
    headlineTop: "Discover",
    headlineAccent: "Tonight",
    subtitle: "Rooftops, clubs, and late-night spots lighting up tonight.",
    overlay: 0.68,
    ticker: [
      { icon: "🍹", text: "LIV Nightclub almost full", time: "1m ago" },
      { icon: "🎵", text: "Surprise DJ announced", time: "3m ago" },
      { icon: "🌃", text: "Rooftop hour is heating up", time: "5m ago" },
    ],
  },
  {
    category: "Concert",
    chipKey: "events" as CategoryKey,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop",
    alt: "Live concert and festival crowd",
    headlineTop: "Experience What's",
    headlineAccent: "Live",
    subtitle: "Concerts, festivals, and live shows happening around you.",
    overlay: 0.66,
    ticker: [
      { icon: "🎵", text: "Live DJ announced tonight", time: "2m ago" },
      { icon: "🎉", text: "Wynwood Festival starts in 45 min", time: "4m ago" },
      { icon: "🎤", text: "Sold-out show added nearby", time: "7m ago" },
    ],
  },
  {
    category: "Sports",
    chipKey: "trending" as CategoryKey,
    src: "https://images.unsplash.com/photo-1574629810360-1df083e8ee88?w=1400&q=80&auto=format&fit=crop",
    alt: "Sports bar watch party atmosphere",
    headlineTop: "Catch The",
    headlineAccent: "Action",
    subtitle: "Sports bars, watch parties, and game-day energy nearby.",
    overlay: 0.67,
    ticker: [
      { icon: "🏀", text: "Heat game traffic increasing", time: "3m ago" },
      { icon: "🏈", text: "Watch parties filling up", time: "5m ago" },
      { icon: "📺", text: "Big screen spots trending", time: "8m ago" },
    ],
  },
  {
    category: "Festival",
    chipKey: "events" as CategoryKey,
    src: "https://images.unsplash.com/photo-1459749411175-367ad7899a91?w=1400&q=80&auto=format&fit=crop",
    alt: "Outdoor festival and street fair",
    headlineTop: "Experience What's",
    headlineAccent: "Trending",
    subtitle: "Pop-up markets, street fairs, and can't-miss moments.",
    overlay: 0.65,
    ticker: [
      { icon: "🎉", text: "Food Festival starts in 2 hours", time: "2m ago" },
      { icon: "🎪", text: "Street fair crowd building fast", time: "5m ago" },
      { icon: "✨", text: "Pop-up market just went live", time: "9m ago" },
    ],
  },
  {
    category: "Beach",
    chipKey: "nearby" as CategoryKey,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6d7f03cc?w=1400&q=80&auto=format&fit=crop",
    alt: "Beach club and coastal scene",
    headlineTop: "Find Hidden",
    headlineAccent: "Gems",
    subtitle: "Coastal hangs, beach clubs, and sunny-day discoveries.",
    overlay: 0.63,
    ticker: [
      { icon: "🏖️", text: "South Beach is trending", time: "2m ago" },
      { icon: "🌊", text: "Beach club reservations rising", time: "4m ago" },
      { icon: "☀️", text: "Coastal spots heating up", time: "6m ago" },
    ],
  },
  {
    category: "Coffee Shop",
    chipKey: "restaurants" as CategoryKey,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop",
    alt: "Artisan coffee shop interior",
    headlineTop: "Find Your Next",
    headlineAccent: "Spot",
    subtitle: "Cafes, brunch spots, and your next go-to morning stop.",
    overlay: 0.62,
    ticker: [
      { icon: "☕", text: "42 people popped into Panther Coffee", time: "3m ago" },
      { icon: "🥐", text: "New brunch spot gaining saves", time: "5m ago" },
      { icon: "🍵", text: "Hidden cafe trending nearby", time: "7m ago" },
    ],
  },
  {
    category: "City",
    chipKey: "nearby" as CategoryKey,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80&auto=format&fit=crop",
    alt: "City skyline at night",
    headlineTop: "The City Is",
    headlineAccent: "Waiting",
    subtitle: "Trending restaurants, nightlife, events, and local favorites—all in one place.",
    overlay: 0.66,
    ticker: [
      { icon: "🔥", text: "Blue Martini is trending", time: "1m ago" },
      { icon: "🍔", text: "New taco spot opened in Wynwood", time: "4m ago" },
      { icon: "📍", text: "Downtown energy is surging", time: "6m ago" },
    ],
  },
] as const;

const CATEGORY_CARDS = [
  {
    key: "restaurants" as CategoryKey,
    icon: "🍽",
    label: "Restaurants",
    stat: "2.4K+ Hot Spots",
    accent: "welcome-v2-card-accent-orange",
  },
  {
    key: "events" as CategoryKey,
    icon: "🎉",
    label: "Events",
    stat: "340+ Tonight",
    accent: "welcome-v2-card-accent-purple",
  },
  {
    key: "trending" as CategoryKey,
    icon: "🔥",
    label: "Trending",
    stat: "128+ Now",
    accent: "welcome-v2-card-accent-cyan",
  },
  {
    key: "nearby" as CategoryKey,
    icon: "📍",
    label: "Nearby",
    stat: "12 Cities",
    accent: "welcome-v2-card-accent-teal",
  },
] as const;

const SOCIAL_STATS = [
  { key: "trending", label: "Trending", numeric: 128, suffix: "+", displayK: false },
  { key: "restaurants", label: "Restaurants", numeric: 2400, suffix: null, displayK: true },
  { key: "events", label: "Events", numeric: 340, suffix: null, displayK: false },
  { key: "cities", label: "Cities", numeric: 12, suffix: null, displayK: false },
] as const;

const LIVE_CITY_FEED = [
  { icon: "🔥", text: "LIV Nightclub almost full", time: "2m ago" },
  { icon: "🍕", text: "Joe's Pizza gained 500 saves", time: "4m ago" },
  { icon: "🎵", text: "Surprise DJ announced", time: "3m ago" },
  { icon: "🍺", text: "Blue Martini trending", time: "1m ago" },
  { icon: "🎉", text: "Wynwood Festival starts in 45 min", time: "5m ago" },
  { icon: "🏀", text: "Heat game traffic increasing", time: "6m ago" },
  { icon: "🏖️", text: "South Beach is trending", time: "4m ago" },
  { icon: "☕", text: "Panther Coffee buzzing", time: "7m ago" },
] as const;

const AVATAR_GRADIENTS = [
  ["#ff4d6d", "#ff8a4c"],
  ["#a855f7", "#6366f1"],
  ["#00d4ff", "#22d3a0"],
  ["#f59e0b", "#ff4d6d"],
  ["#ec4899", "#8b5cf6"],
] as const;

const LOGO_PARTICLES = [
  { x: -34, y: -22, delay: 0 },
  { x: 38, y: -28, delay: 0.5 },
  { x: -42, y: 16, delay: 1 },
  { x: 44, y: 24, delay: 0.3 },
  { x: 0, y: -40, delay: 0.8 },
];

const DUST_SEEDS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + ((i * 23) % 90),
  top: 8 + ((i * 17) % 85),
  delay: (i % 4) * 1.1,
}));

const SLIDE_MS = 7000;
const FADE_MS = 3.6;
const SPOTLIGHT_MS = 3600;
const LIVE_COUNT_MS = 3800;
const INTRO_EASE = [0.16, 1, 0.3, 1] as const;

type Frame6Props = {
  onJoin: () => void;
  onSignIn: () => void;
};

function hapticTap() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(14);
    } catch {
      /* ignore */
    }
  }
}

function StatValue({
  numeric,
  suffix,
  displayK,
  animate,
}: {
  numeric: number;
  suffix: string | null;
  displayK: boolean;
  animate: boolean;
}) {
  const count = useAnimatedNumber(animate ? numeric : 0, 1300);

  let text = "0";
  if (animate) {
    if (displayK && count >= 1000) {
      text = `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    } else {
      text = `${count}${suffix ?? ""}`;
    }
  }

  return <span className="welcome-v2-stat-value">{text}</span>;
}

function EnergyLayers({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="welcome-v2-energy" aria-hidden>
      <div className="welcome-v2-light-rays" />
      <div className="welcome-v2-energy-wave" />
      {DUST_SEEDS.map((d) => (
        <span
          key={d.id}
          className="welcome-v2-dust"
          style={{ left: `${d.left}%`, top: `${d.top}%`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
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
      <div className="welcome-ambient absolute inset-0" style={{ opacity: 0.4 + current.overlay * 0.14 }} />
    </div>
  );
}

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  const reducedMotion = useReducedMotion();
  const [showBrandedIntro, setShowBrandedIntro] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: true });
  const [spotlight, setSpotlight] = useState(0);
  const [statsReady, setStatsReady] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(3284);
  const [newUsers, setNewUsers] = useState(417);
  const [ctaLoading, setCtaLoading] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const joinLockRef = useRef(false);

  const currentSlide = SLIDES[slide];
  const cityLine = city ? `In ${city.toUpperCase()}` : "Near You";
  const spotlightMsg = currentSlide.ticker[spotlight % currentSlide.ticker.length];
  const displayLiveCount = useAnimatedNumber(liveCount, reducedMotion ? 0 : 650);
  const displayNewUsers = useAnimatedNumber(newUsers, reducedMotion ? 0 : 650);

  const marqueeItems = [...LIVE_CITY_FEED, ...LIVE_CITY_FEED];

  useEffect(() => {
    if (reducedMotion) {
      sessionStorage.setItem(WELCOME_INTRO_SESSION_KEY, "1");
      setShowBrandedIntro(false);
    } else {
      setShowBrandedIntro(sessionStorage.getItem(WELCOME_INTRO_SESSION_KEY) !== "1");
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
    setSpotlight(0);
  }, [slide]);

  useEffect(() => {
    const interval = reducedMotion ? 9000 : SLIDE_MS;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), interval);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setInterval(
      () => setSpotlight((i) => i + 1),
      reducedMotion ? 7000 : SPOTLIGHT_MS
    );
    return () => clearInterval(t);
  }, [reducedMotion, slide]);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 5) + 2);
      if (Math.random() > 0.55) setNewUsers((u) => u + 1);
    }, LIVE_COUNT_MS);
    return () => clearInterval(t);
  }, [reducedMotion]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), reducedMotion ? 0 : 700);
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
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
              );
              if (!res.ok) return;
              const data = (await res.json()) as { city?: string; locality?: string };
              const resolved = data.city || data.locality;
              if (resolved && !cancelled) setCity(resolved);
            } catch {
              /* silent */
            }
          },
          () => {},
          { maximumAge: 900_000, timeout: 5000, enableHighAccuracy: false }
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
    const handleMove = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop, reducedMotion]);

  const contentVisible = introReady && !showBrandedIntro;
  const shouldAnimateStats = statsReady && !reducedMotion;

  const handleJoin = () => {
    if (joinLockRef.current || ctaLoading) return;
    joinLockRef.current = true;
    hapticTap();
    setCtaLoading(true);
    window.setTimeout(onJoin, 540);
  };

  return (
    <div className="welcome-v2-screen absolute inset-0 bg-[#050505]" role="main" aria-label="Welcome to POP'IT">
      {introReady && showBrandedIntro && <WelcomeBrandedIntro onComplete={handleIntroComplete} />}

      <HeroBackground slide={slide} reducedMotion={!!reducedMotion} parallax={parallax} />
      <EnergyLayers active={!reducedMotion && contentVisible} />

      <motion.div
        className="welcome-v2-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: INTRO_EASE }}
      >
        <div className="welcome-v2-topbar">
          <div className="welcome-v2-live-badge">
            <span className="welcome-v2-live-pill">
              <span className="welcome-v2-live-dot" aria-hidden />
              LIVE NOW
            </span>
            <span className="welcome-v2-live-count">{displayLiveCount.toLocaleString()} exploring</span>
          </div>
        </div>

        <motion.div
          className="welcome-v2-logo-wrap welcome-v2-logo-scale"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -3, 0] }}
          transition={{
            opacity: { duration: 0.45, delay: 0.05 },
            y: reducedMotion
              ? { duration: 0.3 }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        >
          <div className="welcome-v2-logo-stage">
            <div className="welcome-v2-logo-glow" aria-hidden />
            <div className="welcome-v2-logo-bloom" aria-hidden />
            {!reducedMotion &&
              LOGO_PARTICLES.map((p) => (
                <span
                  key={`${p.x}-${p.y}`}
                  className="welcome-v2-logo-particle"
                  style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, animationDelay: `${p.delay}s` }}
                  aria-hidden
                />
              ))}
            <PopitBrandLogo markWidth={108} markHeight={154} showWordmark={false} />
          </div>
        </motion.div>

        <motion.div
          className="welcome-v2-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: INTRO_EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-${slide}-${city ?? "default"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.48, ease: INTRO_EASE }}
            >
              <p className="welcome-v2-headline-top">{currentSlide.headlineTop}</p>
              <h1 className="welcome-v2-headline-accent">{currentSlide.headlineAccent}</h1>
              <p className="welcome-v2-headline-city">{cityLine}</p>
              <p className="welcome-v2-subtitle">{currentSlide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="welcome-v2-categories"
          role="list"
          aria-label="Explore categories"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
          }}
        >
          {CATEGORY_CARDS.map((card) => (
            <motion.div
              key={card.key}
              role="listitem"
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.94 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: INTRO_EASE } },
              }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`welcome-v2-card ${card.accent} ${currentSlide.chipKey === card.key ? "is-selected" : ""}`}
            >
              <span className="welcome-v2-card-icon" aria-hidden>
                {card.icon}
              </span>
              <span className="welcome-v2-card-label">{card.label}</span>
              <span className="welcome-v2-card-stat">{card.stat}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="welcome-v2-feed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.42, ease: INTRO_EASE }}
          aria-label="Live city activity"
        >
          <div className="welcome-v2-feed-header">
            <span className="welcome-v2-feed-chevron" aria-hidden>
              ◀▶
            </span>
            <span className="welcome-v2-feed-title">Live Activity</span>
            <span className="welcome-v2-feed-chevron" aria-hidden>
              ◀▶
            </span>
          </div>

          <div className={`welcome-v2-marquee-track ${reducedMotion ? "is-paused" : ""}`}>
            {marqueeItems.map((item, i) => (
              <div key={`${item.text}-${i}`} className="welcome-v2-feed-item">
                <span className="welcome-v2-feed-item-text">
                  {item.icon} {item.text}
                </span>
                <span className="welcome-v2-feed-item-time">{item.time}</span>
              </div>
            ))}
          </div>

          <div className="welcome-v2-spotlight" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${slide}-${spotlight}`}
                className="welcome-v2-spotlight-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: INTRO_EASE }}
              >
                {spotlightMsg.icon} {spotlightMsg.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="welcome-v2-social"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.4, ease: INTRO_EASE }}
          aria-label="Platform activity"
        >
          <div className="welcome-v2-stats-row">
            {SOCIAL_STATS.map((stat, index) => (
              <motion.div
                key={stat.key}
                data-stat={stat.key}
                className="welcome-v2-stat-cell"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + index * 0.06, duration: 0.34 }}
                whileHover={{ y: -2, scale: 1.04 }}
              >
                <StatValue
                  numeric={stat.numeric}
                  suffix={stat.suffix}
                  displayK={stat.displayK}
                  animate={shouldAnimateStats}
                />
                <p className="welcome-v2-stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="welcome-v2-avatars-row">
            <div className="welcome-v2-avatar-stack" aria-hidden>
              {AVATAR_GRADIENTS.map(([a, b], i) => (
                <span
                  key={i}
                  className="welcome-v2-avatar"
                  style={{ "--av-a": a, "--av-b": b } as Record<string, string>}
                />
              ))}
            </div>
            <p className="welcome-v2-avatars-copy">
              {displayLiveCount.toLocaleString()} exploring · {displayNewUsers} new today
            </p>
          </div>
        </motion.div>

        <motion.div
          className="welcome-v2-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 16 }}
          transition={{ delay: 0.75, duration: 0.42, ease: INTRO_EASE }}
        >
          <motion.button
            type="button"
            onClick={handleJoin}
            disabled={ctaLoading}
            aria-busy={ctaLoading}
            whileTap={{ scale: 0.97 }}
            className={`welcome-v2-cta ${ctaLoading ? "is-loading" : ""}`}
          >
            <span>{ctaLoading ? "Loading…" : "Start Exploring Free"}</span>
            {!ctaLoading && <span className="welcome-v2-cta-arrow" aria-hidden>→</span>}
          </motion.button>

          <motion.button
            type="button"
            onClick={onSignIn}
            whileTap={{ scale: 0.98 }}
            className="welcome-v2-signin"
          >
            Sign In
          </motion.button>

          <p className="welcome-v2-guest" aria-disabled="true">
            Continue as Guest{" "}
            <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-px text-[9px] uppercase tracking-wider text-white/38">
              Soon
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
