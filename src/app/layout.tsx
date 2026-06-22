import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";
import LocationBootstrap from "@/components/location/LocationBootstrap";
import PlatformBanner from "@/components/admin/PlatformBanner";
import MaintenanceGate from "@/components/admin/MaintenanceGate";
import AuthBootstrap from "@/components/auth/AuthBootstrap";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/seo/brandUrls";

export const metadata: Metadata = {
  title: "POP'IT",
  description: "See What's Popping — discover live culture, creators, and venues in your city.",
  applicationName: "POP'IT",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "POP'IT",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "POP'IT",
    title: "POP'IT",
    description: "See What's Popping.",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: "image/png",
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POP'IT",
    description: "See What's Popping.",
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/icons/popit-lens-master.svg", color: "#FF4D6D" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "POP'IT",
    "privacy-policy": "https://www.getpopit.com/legal/privacy",
    "terms-of-service": "https://www.getpopit.com/legal/terms",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      </head>
      <body className="font-body">
        <PwaRegister />
        <AuthBootstrap />
        <LocationBootstrap />
        <PlatformBanner />
        <MaintenanceGate>{children}</MaintenanceGate>
      </body>
    </html>
  );
}
