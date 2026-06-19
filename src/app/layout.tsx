import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POP'IT",
  description: "See What's Popping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
