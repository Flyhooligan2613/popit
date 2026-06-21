"use client";

import { memo } from "react";

const MARK_SRC = "/brand/logo/popit-mark.png";

/** Permanent bottom-screen brand watermark — sits in the background layer, not over UI. */
function WelcomeBackgroundMark() {
  return (
    <div className="popit-home-brand-watermark" aria-hidden>
      <div className="popit-home-brand-watermark__wash" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARK_SRC} alt="" className="popit-home-brand-watermark__mark" decoding="async" />
    </div>
  );
}

export default memo(WelcomeBackgroundMark);
