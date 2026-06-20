"use client";

import OpeningLensStage2 from "@/components/brand/opening/OpeningLensStage2";

export default function Frame3() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#050505]"
      style={{ minHeight: "100dvh", touchAction: "none" }}
    >
      <OpeningLensStage2 />
    </div>
  );
}
