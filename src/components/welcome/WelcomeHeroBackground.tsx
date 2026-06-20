"use client";

import { motion } from "framer-motion";
import type { SceneSlide } from "./types";

type WelcomeHeroBackgroundProps = {
  slides: SceneSlide[];
  slideIndex: number;
  reducedMotion: boolean;
  parallax: { x: number; y: number };
  energyNorm: number;
  ambientHue: string;
};

export default function WelcomeHeroBackground({
  slides,
  slideIndex,
  reducedMotion,
  parallax,
  energyNorm,
  ambientHue,
}: WelcomeHeroBackgroundProps) {
  const fadeDuration = reducedMotion ? 0.4 : 3.8;

  return (
    <div
      className="popit-bg-stage"
      aria-hidden
      style={
        {
          "--bg-parallax-x": `${parallax.x}px`,
          "--bg-parallax-y": `${parallax.y}px`,
          "--city-energy-norm": String(energyNorm),
          "--scene-ambient": ambientHue,
        } as Record<string, string>
      }
    >
      {slides.map((slide, index) => {
        const active = slideIndex === index;
        return (
          <motion.div
            key={slide.id}
            className="popit-bg-layer"
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              filter: active ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: fadeDuration, ease: [0.42, 0, 0.18, 1] }}
          >
            <div className={`popit-bg-inner ${active && !reducedMotion ? "is-ken-burns" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={active ? slide.alt : ""}
                loading={index <= 1 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className="popit-bg-image"
              />
            </div>
            <div className="popit-bg-scene-overlay" style={{ opacity: slide.overlay }} />
          </motion.div>
        );
      })}
      <div className="popit-bg-gradient-base" />
      <div className="popit-bg-gradient-center" />
      <div className="popit-bg-vignette" />
      <div className="popit-bg-rays" />
      <div className="popit-bg-ambient" />
    </div>
  );
}
