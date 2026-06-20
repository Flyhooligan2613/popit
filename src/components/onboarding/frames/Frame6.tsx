"use client";

import WelcomeOverdriveHome from "@/components/welcome/WelcomeOverdriveHome";

type Frame6Props = {
  onJoin: () => void;
  onSignIn: () => void;
  onBack?: () => void;
};

export default function Frame6({ onJoin, onSignIn, onBack }: Frame6Props) {
  return <WelcomeOverdriveHome onJoin={onJoin} onSignIn={onSignIn} onBack={onBack} />;
}
