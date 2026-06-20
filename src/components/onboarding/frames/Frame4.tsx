"use client";

import OpeningLensStage3 from "@/components/brand/opening/OpeningLensStage3";

export default function Frame4() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#050505]"
      style={{ minHeight: "100dvh", touchAction: "none" }}
    >
      <OpeningLensStage3 idPrefix="onboard" swirlDuration={2200} />
    </div>
  );
}
