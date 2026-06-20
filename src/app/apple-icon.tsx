import { ImageResponse } from "next/og";
import { AppIconMarkup } from "@/lib/brand/appIconMarkup";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<AppIconMarkup />, { ...size });
}
