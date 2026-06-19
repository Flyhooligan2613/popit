"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { INTEREST_SCENES } from "@/lib/city/personalizedCity";
import AmbientParticles from "./AmbientParticles";
import { usePersonalizedCity } from "./usePersonalizedCity";
import "./pulse.css";

const DEFAULT_SCENES = INTEREST_SCENES.filter((s) =>
  ["neon-streets", "murals", "nightlife-rooftop", "arena", "creator-studio"].includes(s.id)
);

const BILLBOARDS = [
  "SEE WHAT'S POPPING",
  "ULTRA · LIVE TONIGHT",
  "HEAT VS KNICKS · 7:30",
  "LIV MIAMI · MAX HYPE",
  "YOUR CITY IS ALIVE",
  "WHERE LIFE IS HAPPENING",
];

function NeonStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.6]">
      {[12, 32, 55, 72, 88].map((top, i) => (
        <motion.div
          key={top}
          className="absolute h-px w-[50%]"
          style={{
            top: `${top}%`,
            left: i % 2 === 0 ? "0%" : "25%",
            background: `linear-gradient(90deg, transparent, ${["#FF4D6D", "#A855F7", "#00D4FF", "#FF7A00", "#FF4D6D"][i]}, transparent)`,
            boxShadow: `0 0 16px ${["#FF4D6D", "#A855F7", "#00D4FF", "#FF7A00", "#FF4D6D"][i]}`,
          }}
          animate={{ opacity: [0.25, 0.95, 0.25], x: [0, i % 2 === 0 ? 60 : -60, 0] }}
          transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CityBillboards() {
  return (
    <div className="absolute left-0 right-0 top-[10%] z-[1] overflow-hidden opacity-[0.32]">
      <div className="pulse-billboard-scroll flex w-[200%] gap-24 whitespace-nowrap px-8">
        {[...BILLBOARDS, ...BILLBOARDS].map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="text-poster text-[clamp(2.4rem,10vw,5.5rem)] text-white"
            style={{ textShadow: "0 0 48px rgba(255,77,109,0.55)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function TrafficStreaks() {
  return (
    <div className="absolute bottom-[18%] left-0 right-0 h-8 overflow-hidden opacity-40">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="traffic-streak absolute top-[30%] h-px w-16"
          style={{
            left: `${i * 22}%`,
            background: `linear-gradient(90deg, transparent, ${["#FF7A00", "#00D4FF", "#FF4D6D", "#A855F7"][i]}, transparent)`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedSkyline() {
  const windows = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: 4 + (i % 12) * 8,
        bottom: 2 + Math.floor(i / 12) * 6,
        delay: (i * 0.27) % 4,
      })),
    []
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[24%] opacity-25">
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="h-full w-full">
        <path
          fill="#050505"
          d="M0,200 L0,120 L60,90 L120,110 L200,70 L280,95 L360,55 L440,80 L520,40 L600,75 L680,35 L760,65 L840,45 L920,70 L1000,50 L1080,80 L1200,60 L1200,200 Z"
        />
      </svg>
      {windows.map((w) => (
        <div
          key={w.id}
          className="skyline-window absolute h-1 w-1.5 rounded-sm bg-[#00D4FF]"
          style={{
            left: `${w.left}%`,
            bottom: `${w.bottom}%`,
            animationDelay: `${w.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function LivingCityBackground() {
  const { scenes, isPersonalized } = usePersonalizedCity();
  const activeScenes = useMemo(
    () => (scenes.length > 0 ? scenes : DEFAULT_SCENES),
    [scenes]
  );
  const [districtIndex, setDistrictIndex] = useState(0);

  useEffect(() => {
    setDistrictIndex(0);
  }, [activeScenes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistrictIndex((prev) => (prev + 1) % activeScenes.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [activeScenes.length]);

  const district = activeScenes[districtIndex] ?? DEFAULT_SCENES[0];

  return (
    <div className="city-breathe pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={`${district.id}-${isPersonalized}`}
          className="absolute inset-[-8%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ scale: [1, 1.06, 1], x: [0, -24, 0], y: [0, -12, 0] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={district.src}
              alt={district.label}
              fill
              priority={districtIndex === 0}
              className="object-cover"
              sizes="100vw"
              style={{ filter: "blur(3px) saturate(1.65) brightness(0.92)" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 25%, ${district.tint} 0%, transparent 60%)`,
        }}
      />

      <NeonStreaks />
      <CityBillboards />
      <TrafficStreaks />

      <div
        className="pulse-fog-drift absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(168,85,247,0.06) 0%, rgba(5,5,5,0.12) 40%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div
        className="pulse-fog-drift absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.04), transparent 50%)",
          animationDelay: "4s",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="pulse-city-shimmer absolute -left-1/2 top-[20%] h-[75%] w-1/3 opacity-[0.14]"
          style={{
            background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.9), transparent)",
          }}
        />
      </div>

      <AnimatedSkyline />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.35) 50%, rgba(5,5,5,0.75) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 12%, rgba(255,77,109,0.2) 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(168,85,247,0.16) 0%, transparent 45%), radial-gradient(ellipse at 50% 90%, rgba(0,212,255,0.12) 0%, transparent 40%)",
        }}
      />

      <AmbientParticles />
    </div>
  );
}

export default memo(LivingCityBackground);
