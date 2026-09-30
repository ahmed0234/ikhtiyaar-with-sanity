"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/admin";

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json().catch(() => ({}))) as Record<string, string>;

      if (!res.ok) {
        throw new Error(json.error || "Invalid email or password.");
      }

      window.location.href = returnTo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-gate">
      <span className="eyebrow">IKHTIYAAR OWNER PORTAL</span>
      <h1>Welcome back.</h1>
      <form className="cms cms-panel" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            autoComplete="username"
            required
            disabled={busy}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            required
            disabled={busy}
          />
        </label>
        {error && (
          <div
            role="alert"
            style={{
              padding: "10px 14px",
              background: "#fff0ed",
              border: "1px solid #f4b7a9",
              color: "#9f3320",
              borderRadius: "6px",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}
        <button disabled={busy} className="button button-dark" style={{ width: "100%" }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p style={{ marginTop: "20px", fontSize: "13px", color: "#66808f" }}>
        Admin access is controlled via server environment variables. Public registration is disabled.
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="admin-gate"><p>Loading login…</p></main>}>
      <LoginForm />
    </Suspense>
  );
}
