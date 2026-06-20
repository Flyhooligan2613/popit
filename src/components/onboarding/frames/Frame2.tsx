"use client";

import OpeningLensStage1 from "@/components/brand/opening/OpeningLensStage1";

export default function Frame2() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#050505]"
      style={{ minHeight: "100dvh", touchAction: "none" }}
    >
      <OpeningLensStage1 />
    </div>
  );
}
