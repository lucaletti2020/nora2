"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PearIcon from "@/components/PearIcon";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="font-display text-3xl font-semibold text-foreground text-center">Forgot password?</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-card p-8">
          {sent ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">✉️</span>
              </div>
              <h2 className="font-semibold text-foreground mb-2">Check your inbox</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If an account exists for <span className="font-medium text-foreground">{email}</span>, you'll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className={inputClass}
                  placeholder="you@example.com"
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
                {loading ? "Sending…" : (
                  <>
                    Send reset link
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline transition-smooth">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
