"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";
import { getClientAdminBase } from "@/lib/admin/constants";

function AdminLoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [devHint, setDevHint] = useState(false);

  const next = searchParams.get("next") || `${getClientAdminBase(typeof window !== "undefined" ? window.location.pathname : "/console")}/dashboard`;

  useEffect(() => {
    void fetch("/api/admin/setup")
      .then((r) => r.json())
      .then((data: { devFallback?: boolean }) => setDevHint(Boolean(data.devFallback)))
      .catch(() => undefined);
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.replace(next);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-auth__form" onSubmit={(e) => void submit(e)}>
      <label className="admin-auth__label">
        Admin username
        <input
          className="admin-auth__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label className="admin-auth__label">
        Password
        <PasswordInput
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />
      </label>

      {error && <p className="admin-auth__error">{error}</p>}

      {devHint && (
        <p className="admin-auth__hint">
          Development fallback: <code>admin</code> / <code>popit-dev</code>
        </p>
      )}

      <button type="submit" className="admin-auth__submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in to console"}
      </button>
    </form>
  );
}

export default function AdminLoginForm() {
  return (
    <Suspense fallback={<p className="admin-panel__loading">Loading…</p>}>
      <AdminLoginFormInner />
    </Suspense>
  );
}
