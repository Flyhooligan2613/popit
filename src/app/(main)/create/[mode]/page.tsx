import CameraStudio from "@/components/create/CameraStudio";
import type { CreateMode } from "@/lib/social/createRoutes";
import { notFound } from "next/navigation";

const MODES: CreateMode[] = ["story", "reel", "page"];

export default async function CreateModePage({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = await params;
  if (!MODES.includes(mode as CreateMode)) notFound();
  return <CameraStudio mode={mode as CreateMode} />;
}
