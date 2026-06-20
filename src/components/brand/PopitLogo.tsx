"use client";

import { memo } from "react";
import PopitMark from "./PopitMark";
import PopitWordmark from "./PopitWordmark";

type PopitLogoProps = {
  variant?: "hero" | "stacked" | "wordmark" | "mark";
  markSize?: number;
  wordmarkSize?: "hero" | "lg" | "md" | "sm";
  className?: string;
};

function PopitLogo({
  variant = "stacked",
  markSize = 200,
  wordmarkSize = "hero",
  className = "",
}: PopitLogoProps) {
  if (variant === "mark") return <PopitMark size={markSize} className={className} />;
  if (variant === "wordmark") return <PopitWordmark size={wordmarkSize} className={className} />;

  const showMark = variant === "stacked" || variant === "hero";
  const showWordmark = variant === "stacked" || variant === "hero";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {showMark && <PopitMark size={markSize} />}
      {showWordmark && <PopitWordmark size={wordmarkSize} />}
    </div>
  );
}

export default memo(PopitLogo);
