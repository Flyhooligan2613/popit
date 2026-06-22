import { Suspense } from "react";
import StoryViewerScreen from "@/components/create/StoryViewerScreen";

export default function StoryViewPage() {
  return (
    <Suspense fallback={<div className="story-viewer story-viewer--empty">Loading story…</div>}>
      <StoryViewerScreen />
    </Suspense>
  );
}
