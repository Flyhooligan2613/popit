"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { rankByVibe } from "@/lib/city/vibeEngine";
import type { LiveContentItem } from "./data";
import LiveDot from "./LiveDot";

function typeLabel(type: LiveContentItem["type"]) {
  if (type === "live") return "LIVE";
  if (type === "video") return "VIDEO";
  return "PHOTO";
}

function DistrictLiveContent({ items, accent }: { items: LiveContentItem[]; accent: string }) {
  const ranked = rankByVibe(items.map((item) => ({ ...item, baseEnergy: 0 })));

  if (ranked.length === 0) return null;

  return (
    <div className="relative mt-2.5 border-t border-white/[0.05] pt-2.5">
      <p className="mb-2 font-body text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/30">
        Live in this district
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ranked.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex w-[130px] shrink-0 flex-col gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2"
          >
            <div
              className="flex h-14 items-center justify-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${accent}22, rgba(5,5,5,0.4))`,
              }}
            >
              {item.type === "live" ? (
                <div className="flex items-center gap-1">
                  <LiveDot size={5} />
                  <span className="font-body text-[0.55rem] font-bold text-[#FF4D6D]">LIVE</span>
                </div>
              ) : (
                <span className="text-poster text-[0.6rem] text-white/40">{typeLabel(item.type)}</span>
              )}
            </div>
            <p className="truncate font-body text-[0.68rem] font-medium text-white/75">{item.title}</p>
            <p className="truncate font-body text-[0.58rem] text-white/35">{item.user}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default memo(DistrictLiveContent);
