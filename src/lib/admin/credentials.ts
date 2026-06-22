export type AdminCredentialCheck = {
  ok: boolean;
  username: string | null;
  reason?: string;
};

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function getConfiguredAdminCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (username && password) {
    return { username, password };
  }

  if (process.env.NODE_ENV === "development") {
    return { username: "admin", password: "popit-dev" };
  }

  return null;
}

export function verifyAdminCredentials(username: string, password: string): AdminCredentialCheck {
  const configured = getConfiguredAdminCredentials();
  if (!configured) {
    return {
      ok: false,
      username: null,
      reason: "Admin credentials are not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
    };
  }

  const userOk = timingSafeEqual(username.trim(), configured.username);
  const passOk = timingSafeEqual(password, configured.password);
  if (!userOk || !passOk) {
    return { ok: false, username: null, reason: "Invalid admin credentials." };
  }

  return { ok: true, username: configured.username };
}

export function isAdminSetupKeyValid(key: string | null | undefined): boolean {
  const setupKey = process.env.ADMIN_SETUP_KEY?.trim();
  if (!setupKey || !key) return false;
  return timingSafeEqual(key.trim(), setupKey);
}
