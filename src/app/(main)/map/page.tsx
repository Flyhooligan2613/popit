import { Suspense } from "react";
import LiveMap from "@/components/map/LiveMap";

export default function MapPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#050505]" />}>
      <LiveMap />
    </Suspense>
  );
}
