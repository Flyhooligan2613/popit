import { AuthError } from "@supabase/supabase-js";

export function isNetworkAuthError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes("fetch") ||
    msg.includes("network") ||
    msg.includes("failed to load") ||
    err.name === "TypeError"
  );
}

export function formatAuthError(err: unknown): Error {
  if (err instanceof AuthError) {
    if (err.message === "Invalid login credentials") {
      return new Error("Wrong email, username, phone, or password.");
    }
    return new Error(err.message);
  }

  if (isNetworkAuthError(err)) {
    return new Error(
      "Could not reach the server. Check your connection, then try again."
    );
  }

  if (err instanceof Error) return err;
  return new Error("Something went wrong. Please try again.");
}
