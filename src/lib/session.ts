const ONBOARDING_KEY = "popit:onboardingComplete";
const INTERESTS_KEY = "popit:interests";
const IDENTITY_KEY = "popit:identity";
const USER_KEY = "popit:user";

export function markOnboardingComplete() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_KEY, "true");
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

/** Clears saved session so the full journey can run again. */
export async function resetAppSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ONBOARDING_KEY);
  localStorage.removeItem(INTERESTS_KEY);
  localStorage.removeItem(IDENTITY_KEY);
  localStorage.removeItem(USER_KEY);

  const { signOut } = await import("@/lib/supabase/auth");
  await signOut();
}
