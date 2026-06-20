import { Suspense } from "react";
import PopWorldEngine from "@/components/popworld/PopWorldEngine";

export default function MapPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <PopWorldEngine />
    </Suspense>
  );
}
