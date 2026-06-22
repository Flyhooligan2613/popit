"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadSocialState,
  SOCIAL_UPDATE_EVENT,
  toggleFollow,
  togglePostLike,
  togglePostRepost,
  togglePostSave,
} from "./socialStore";
import type { SocialState } from "./types";

export function useSocialStore() {
  const [state, setState] = useState<SocialState>(() =>
    typeof window === "undefined" ? loadSocialState() : loadSocialState()
  );

  const refresh = useCallback(() => setState(loadSocialState()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(SOCIAL_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(SOCIAL_UPDATE_EVENT, refresh);
  }, [refresh]);

  return {
    state,
    refresh,
    like: togglePostLike,
    save: togglePostSave,
    repost: togglePostRepost,
    follow: toggleFollow,
  };
}
