"use client";

import { memo } from "react";
import WelcomeBackgroundMark from "./WelcomeBackgroundMark";

/** POP'IT mark watermark for in-app pages (not the home lobby). */
function PopitPageWatermark() {
  return (
    <div className="popit-page-watermark" aria-hidden>
      <WelcomeBackgroundMark />
    </div>
  );
}

export default memo(PopitPageWatermark);
