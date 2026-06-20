import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { AppIconMarkup } from "@/lib/brand/appIconMarkup";

export const runtime = "edge";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ size: string }> }) {
  const { size: sizeParam } = await params;
  const px = sizeParam === "512" ? 512 : 192;

  return new ImageResponse(<AppIconMarkup />, {
    width: px,
    height: px,
  });
}
