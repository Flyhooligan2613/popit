"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  establishAuthSession,
  establishAuthSessionFromCredentials,
  syncAuthSessionFromCredentials,
} from "@/lib/auth/appSession";
import { hasRegisteredAccount, isOnboardingComplete, markOnboardingComplete } from "@/lib/session";
import { loadAuthenticatedProfile } from "@/lib/supabase/auth";

/**
 * Restores login state on every app load — local credentials + Supabase session.
 */
export default function AuthBootstrap() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (hasRegisteredAccount()) {
        syncAuthSessionFromCredentials();
      }

      const supabase = createClient();
      if (!supabase) {
        if (hasRegisteredAccount() && isOnboardingComplete()) {
          establishAuthSessionFromCredentials("local");
        }
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (session?.user) {
        const email = session.user.email ?? "";
        const username =
          (session.user.user_metadata?.username as string | undefined) ??
          getAuthSessionUsername() ??
          email.split("@")[0] ??
          "user";

        establishAuthSession({
          email,
          username,
          phone: session.user.phone ?? undefined,
          source: "supabase",
        });

        await loadAuthenticatedProfile();

        if (hasRegisteredAccount() && !isOnboardingComplete()) {
          markOnboardingComplete();
        }
        return;
      }

      if (hasRegisteredAccount() && isOnboardingComplete()) {
        establishAuthSessionFromCredentials("local");
      }
    })();

    const supabase = createClient();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const email = session.user.email ?? "";
        const username =
          (session.user.user_metadata?.username as string | undefined) ??
          email.split("@")[0] ??
          "user";

        establishAuthSession({
          email,
          username,
          phone: session.user.phone ?? undefined,
          source: "supabase",
        });
        await loadAuthenticatedProfile();
        markOnboardingComplete();
      }

      if (event === "SIGNED_OUT") {
        const { clearAuthSession } = await import("@/lib/auth/appSession");
        clearAuthSession();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return null;
}

function getAuthSessionUsername(): string | null {
  try {
    const raw = localStorage.getItem("popit:user");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { username?: string };
    return parsed.username ?? null;
  } catch {
    return null;
  }
}
