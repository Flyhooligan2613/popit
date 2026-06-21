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
  cinematic?: boolean;
};

export default function WelcomeHeroBackground({
  slides,
  slideIndex,
  reducedMotion,
  parallax,
  energyNorm,
  ambientHue,
  cinematic = false,
}: WelcomeHeroBackgroundProps) {
  const fadeDuration = reducedMotion ? 0.4 : 3.8;

  return (
    <div
      className={`popit-bg-stage popit-bg-stage-v3 ${cinematic ? "is-cinematic-v2" : ""}`}
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
              filter: active ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: fadeDuration, ease: [0.42, 0, 0.18, 1] }}
          >
            <div className={`popit-bg-inner ${active && !reducedMotion ? "is-ken-burns is-cinematic" : ""}`}>
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
            {cinematic && <div className="popit-bg-depth-blur" aria-hidden />}
          </motion.div>
        );
      })}

      <div className="popit-bg-gradient-base" />
      <div className="popit-bg-gradient-center" />
      <div className="popit-bg-vignette" />
      <div className="popit-bg-rays" />
      <div className="popit-bg-ambient" />
      <div className="popit-bg-neon-reflect" />
      <div className="popit-bg-blur-veil" />

      {cinematic && (
        <>
          <div className="popit-bg-rim-orange" aria-hidden />
          <div className="popit-bg-rim-blue" aria-hidden />
          <div className="popit-bg-rim-purple" aria-hidden />
          <div className="popit-bg-light-leak popit-bg-light-leak-1" aria-hidden />
          <div className="popit-bg-light-leak popit-bg-light-leak-2" aria-hidden />
        </>
      )}

      {!reducedMotion && (
        <>
          <div className="popit-bg-fog-drift" />
          <div className="popit-bg-lens-flare" />
          <div className="popit-bg-city-shimmer" />
          <div className="popit-bg-headlight popit-bg-headlight-1" />
          <div className="popit-bg-headlight popit-bg-headlight-2" />
          <div className="popit-bg-dust-field">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={`popit-bg-dust popit-bg-dust-${(i % 6) + 1}`} />
            ))}
          </div>
          <div className="popit-bg-float-particles">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className={`popit-bg-particle popit-bg-particle-${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
