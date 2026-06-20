"use client";

import WelcomeOverdriveHome from "@/components/welcome/WelcomeOverdriveHome";

type Frame6Props = {
  onJoin: () => void;
  onSignIn: () => void;
};

export default function Frame6({ onJoin, onSignIn }: Frame6Props) {
  return <WelcomeOverdriveHome onJoin={onJoin} onSignIn={onSignIn} />;
}
