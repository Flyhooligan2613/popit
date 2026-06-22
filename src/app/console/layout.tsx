import type { Metadata } from "next";
import "./admin-console.css";

export const metadata: Metadata = {
  title: "POP'IT Ops Console",
  robots: { index: false, follow: false },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-console-wrap">{children}</div>;
}
