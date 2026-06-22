import { endLiveSession, getActiveLiveSession } from "@/lib/social/liveStore";
import { getUserProfile, saveUserProfile, PROFILE_UPDATE_EVENT } from "./userProfile";

/** Clears stale `live` on the profile when no matching broadcast session exists. */
export function syncLiveProfileState() {
  if (typeof window === "undefined") return;

  const user = getUserProfile();
  const session = getActiveLiveSession();
  const shouldBeLive =
    !!session &&
    session.broadcasterUsername.trim().toLowerCase() === user.username.trim().toLowerCase();

  if (user.live !== shouldBeLive) {
    saveUserProfile({ live: shouldBeLive });
    window.dispatchEvent(new Event(PROFILE_UPDATE_EVENT));
  }
}

export function endLiveForCurrentUser() {
  if (typeof window === "undefined") return;

  endLiveSession();
  saveUserProfile({ live: false });
  window.dispatchEvent(new Event(PROFILE_UPDATE_EVENT));
}
