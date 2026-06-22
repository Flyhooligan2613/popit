import type { Metadata } from "next";
import "./legal.css";

export const metadata: Metadata = {
  title: "Legal | POP'IT",
  description: "Terms, privacy, community guidelines, and platform policies for POP'IT.",
  robots: { index: true, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
