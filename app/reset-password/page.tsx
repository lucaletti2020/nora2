"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PearIcon from "@/components/PearIcon";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p className="text-sm text-red-600 text-center">
        Invalid reset link. <Link href="/forgot-password" className="font-semibold text-primary hover:underline">Request a new one.</Link>
      </p>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card p-8">
      {done ? (
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center mx-auto mb-4">
            <span className="text-xl">✅</span>
          </div>
          <h2 className="font-semibold text-foreground mb-2">Password updated</h2>
          <p className="text-sm text-muted-foreground">Redirecting you to sign in…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoFocus
              className={inputClass}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className={inputClass}
              placeholder="Same password again"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-gradient-cta shadow-soft hover:opacity-90 transition-smooth group mt-2"
          >
            {loading ? "Updating…" : (
              <>
                Set new password
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft">
              <PearIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Nora</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-foreground text-center">Set new password</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">Choose something you'll remember.</p>
        </div>

        <Suspense>
          <ResetPasswordForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/login" className="font-semibold text-primary hover:underline transition-smooth">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
