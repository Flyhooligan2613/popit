"use client";

import { memo } from "react";

function VerifiedBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const isMd = size === "md";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 font-body font-bold uppercase tracking-[0.12em] text-[#00D4FF] ${
        isMd ? "px-2.5 py-1 text-[0.62rem]" : "px-2 py-0.5 text-[0.55rem]"
      }`}
    >
      <svg width={isMd ? 10 : 8} height={isMd ? 10 : 8} viewBox="0 0 12 12" aria-hidden>
        <path
          d="M6 0 L7.5 4.5 L12 5 L8.5 8 L9.5 12 L6 10 L2.5 12 L3.5 8 L0 5 L4.5 4.5 Z"
          fill="currentColor"
        />
      </svg>
      Verified
    </span>
  );
}

export default memo(VerifiedBadge);
