"use client";

import { memo, useRef, type ChangeEvent } from "react";
import PopitLens from "./PopitLens";
import { getProfileAvatarUrl, setProfilePhotoFromFile } from "@/lib/identity/profilePhoto";
import type { UserProfile } from "@/lib/identity/userProfile";

type ProfileAvatarLensProps = {
  user: Pick<UserProfile, "name" | "followers" | "pulseScore" | "verified" | "live" | "avatarMediaId">;
  accent: string;
  size?: number;
  creatorLevel?: number;
  followersBeneath?: boolean;
  /** Tap opens gallery to set profile photo */
  allowPhotoChange?: boolean;
  /** Tap runs custom handler (e.g. navigate to profile) */
  onTap?: () => void;
  interactive?: boolean;
  onPhotoUpdated?: () => void;
};

function ProfileAvatarLens({
  user,
  accent,
  size = 72,
  creatorLevel = 5,
  followersBeneath = true,
  allowPhotoChange = false,
  onTap,
  interactive = false,
  onPhotoUpdated,
}: ProfileAvatarLensProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const avatarUrl = getProfileAvatarUrl(user);
  const showPhotoPlus = allowPhotoChange && !avatarUrl;

  const handleTap = () => {
    if (allowPhotoChange) {
      inputRef.current?.click();
      return;
    }
    onTap?.();
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    await setProfilePhotoFromFile(file);
    onPhotoUpdated?.();
  };

  return (
    <>
      <PopitLens
        name={user.name}
        followers={user.followers}
        creatorLevel={creatorLevel}
        influence={user.pulseScore}
        verified={user.verified}
        live={user.live}
        accent={accent}
        size={size}
        avatarUrl={avatarUrl}
        showPhotoPlus={showPhotoPlus}
        interactive={interactive || allowPhotoChange || !!onTap}
        openApertureOnTap={!allowPhotoChange}
        onTap={handleTap}
        followersBeneath={followersBeneath}
      />
      {allowPhotoChange && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-hidden
          tabIndex={-1}
          onChange={(e) => void handleFile(e)}
        />
      )}
    </>
  );
}

export default memo(ProfileAvatarLens);
