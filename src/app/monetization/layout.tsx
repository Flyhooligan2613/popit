import type { Metadata } from "next";
import "../legal/legal.css";

export const metadata: Metadata = {
  title: "Monetization | POP'IT",
  description: "Creator monetization guides, levels, and requirements for POP'IT.",
  robots: { index: true, follow: true },
};

export default function MonetizationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
