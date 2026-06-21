"use client";

import { memo } from "react";

const MARK_SRC = "/brand/logo/popit-mark.png";

/** Official POP'IT brand mark — blended into the home background. */
function WelcomeBackgroundMark() {
  return (
    <div className="popit-home-brand-watermark" aria-hidden>
      <div className="popit-home-brand-watermark__glow" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MARK_SRC}
        alt=""
        className="popit-home-brand-watermark__mark"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

export default memo(WelcomeBackgroundMark);
