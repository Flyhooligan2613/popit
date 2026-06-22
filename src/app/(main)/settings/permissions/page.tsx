"use client";

import Link from "next/link";
import { MapPin, Camera, ImageIcon, Mic, Bell } from "lucide-react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import PermissionSettingsPanel, {
  type PermissionCardConfig,
} from "@/components/settings/PermissionSettingsPanel";

const PERMISSIONS: PermissionCardConfig[] = [
  {
    id: "location",
    label: "Location",
    title: "City & nearby discovery",
    description: "Used to show what's happening in your city and local feed.",
    Icon: MapPin,
    accent: "from-[#FF4D6D]/20 to-[#FF7A00]/10",
    glow: "rgba(255,77,109,0.25)",
  },
  {
    id: "camera",
    label: "Camera",
    title: "Capture & post",
    description: "Take photos and videos for posts, stories, and reels.",
    Icon: Camera,
    accent: "from-[#A855F7]/20 to-[#7C3AED]/10",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    id: "photos",
    label: "Photos",
    title: "Gallery uploads",
    description: "Choose whether POP'IT can access your photo library.",
    Icon: ImageIcon,
    accent: "from-[#00D4FF]/20 to-[#0099FF]/10",
    glow: "rgba(0,212,255,0.22)",
    photos: true,
  },
  {
    id: "microphone",
    label: "Microphone",
    title: "Live & audio",
    description: "Required for Go Live, voice, and video with sound.",
    Icon: Mic,
    accent: "from-[#FF7A00]/20 to-[#FF4D6D]/10",
    glow: "rgba(255,122,0,0.22)",
  },
  {
    id: "notifications",
    label: "Notifications",
    title: "Push alerts",
    description: "Get notified when your city is popping.",
    Icon: Bell,
    accent: "from-[#A855F7]/20 to-[#00D4FF]/10",
    glow: "rgba(168,85,247,0.22)",
  },
];

export default function PermissionsSettingsPage() {
  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Permissions"
        subtitle="Same controls as Step 4 onboarding — toggle anytime."
        backHref="/settings"
        right={
          <Link href="/help/permissions" className="profile-social__topnav-btn" aria-label="Help">
            ?
          </Link>
        }
      />

      <div className="profile-settings__section px-4">
        <PermissionSettingsPanel permissions={PERMISSIONS} variant="settings" />
      </div>
    </div>
  );
}
