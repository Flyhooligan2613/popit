"use client";

import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";

export type PopitIconType =
  | "music"
  | "sports"
  | "food"
  | "creator"
  | "nightlife"
  | "gaming"
  | "travel"
  | "camera"
  | "friends";

type PopitIconProps = {
  type: PopitIconType;
  size?: number;
  color?: string;
};

function IconFrame({ children, size, color }: { children: ReactNode; size: number; color: string }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
      style={{ width: size, height: size, boxShadow: `0 0 16px ${color}33` }}
    >
      {children}
    </div>
  );
}

function MusicIcon({ size, color }: { size: number; color: string }) {
  const bars = [0.4, 0.7, 1, 0.6, 0.85];
  return (
    <IconFrame size={size} color={color}>
      <div className="flex items-end gap-[3px]" style={{ height: size * 0.45 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{ background: color, height: size * 0.2 * h }}
            animate={{ scaleY: [h, h * 0.4, h * 1.1, h * 0.6, h] }}
            transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </IconFrame>
  );
}

function SportsIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <motion.svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M12 2 C8 8, 8 16, 12 22" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
        <path d="M12 2 C16 8, 16 16, 12 22" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
        <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.2" opacity="0.5" />
      </motion.svg>
    </IconFrame>
  );
}

function FoodIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <div className="relative" style={{ width: size * 0.4, height: size * 0.35 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              width: 4,
              height: 4,
              background: color,
              opacity: 0.6,
            }}
            animate={{ y: [0, -14, -20], opacity: [0.6, 0.3, 0], scale: [1, 1.4, 0.8] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm"
          style={{ width: size * 0.35, height: 3, background: color, opacity: 0.8 }}
        />
      </div>
    </IconFrame>
  );
}

function CreatorIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <div className="relative flex items-center justify-center" style={{ width: size * 0.45, height: size * 0.45 }}>
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="rounded-full border-2 bg-black/40" style={{ width: size * 0.28, height: size * 0.28, borderColor: color }}>
          <motion.div
            className="h-full w-full rounded-full"
            style={{ background: `radial-gradient(circle, ${color}88, transparent)` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </IconFrame>
  );
}

function NightlifeIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <motion.div
        className="rounded px-1.5 py-0.5 font-display text-[0.55rem] tracking-widest"
        style={{ color, border: `1px solid ${color}`, textShadow: `0 0 8px ${color}` }}
        animate={{ opacity: [1, 0.6, 1, 0.85, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        LIVE
      </motion.div>
    </IconFrame>
  );
}

function GamingIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <motion.svg
        width={size * 0.5}
        height={size * 0.35}
        viewBox="0 0 32 20"
        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <rect x="2" y="6" width="28" height="12" rx="6" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="10" cy="12" r="2" fill={color} />
        <circle cx="22" cy="10" r="1.5" fill="#FF4D6D" />
        <circle cx="25" cy="13" r="1.5" fill="#00D4FF" />
      </motion.svg>
    </IconFrame>
  );
}

function TravelIcon({ size, color }: { size: number; color: string }) {
  return (
    <IconFrame size={size} color={color}>
      <div className="relative" style={{ width: size * 0.4, height: size * 0.45 }}>
        <motion.div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: color }}
          animate={{ scale: [0.6, 1.2], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <svg viewBox="0 0 24 24" width={size * 0.4} height={size * 0.4} fill={color}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    </IconFrame>
  );
}

function FriendsIcon({ size, color }: { size: number; color: string }) {
  const colors = ["#FF4D6D", "#A855F7", "#00D4FF"];
  return (
    <IconFrame size={size} color={color}>
      <div className="flex -space-x-2">
        {colors.map((c, i) => (
          <motion.div
            key={c}
            className="rounded-full border border-white/20"
            style={{ width: size * 0.22, height: size * 0.22, background: c }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </IconFrame>
  );
}

const ICONS: Record<PopitIconType, FC<{ size: number; color: string }>> = {
  music: MusicIcon,
  sports: SportsIcon,
  food: FoodIcon,
  creator: CreatorIcon,
  nightlife: NightlifeIcon,
  gaming: GamingIcon,
  travel: TravelIcon,
  camera: CreatorIcon,
  friends: FriendsIcon,
};

export default function PopitIcon({ type, size = 36, color = "#FF4D6D" }: PopitIconProps) {
  const Icon = ICONS[type];
  return <Icon size={size} color={color} />;
}

import PopitLens from "@/components/profile/PopitLens";

export function FriendAvatars({ names, accent }: { names: string[]; accent: string }) {
  return (
    <div className="flex items-center gap-1">
      {names.map((name, i) => (
        <PopitLens
          key={name}
          name={name}
          followers={800 + i * 200}
          accent={accent}
          size={24}
          followersBeneath={false}
        />
      ))}
    </div>
  );
}
