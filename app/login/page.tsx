"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PearIcon from "@/components/PearIcon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push("/chat");
      router.refresh();
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft">
              <PearIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Nora</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-foreground text-center">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-border shadow-card p-8">
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
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
                placeholder="••••••••"
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
              {loading ? "Signing in…" : (
                <>
                  Sign in
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline transition-smooth">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
