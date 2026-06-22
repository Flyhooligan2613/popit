import { persistMediaBlob, getMediaUrl } from "@/lib/media/mediaStorage";
import { saveUserProfile, type UserProfile, PROFILE_UPDATE_EVENT } from "./userProfile";

export function getProfileAvatarUrl(profile: Pick<UserProfile, "avatarMediaId">): string | null {
  return getMediaUrl(profile.avatarMediaId);
}

export async function setProfilePhotoFromFile(file: File): Promise<string> {
  const mediaId = await persistMediaBlob(file);
  saveUserProfile({ avatarMediaId: mediaId });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROFILE_UPDATE_EVENT));
  }
  return mediaId;
}
