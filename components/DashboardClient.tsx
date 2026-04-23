"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PearIcon from "@/components/PearIcon";

interface Prefs {
  age?: number | null;
  sex?: string | null;
  weightKg?: number | null;
  heightCm?: number | null;
  bmi?: number | null;
  medicalConditions?: string | null;
  allergies?: string | null;
  dietType?: string | null;
  calorieTarget?: number | null;
  proteinTargetG?: number | null;
  fibreTargetG?: number | null;
  calciumTargetMg?: number | null;
  dislikedFoods?: string | null;
  favoriteFoods?: string | null;
  cuisinePreference?: string | null;
  goal?: string | null;
}

interface Plan {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Props {
  userName: string;
  initialPrefs: Prefs | null;
  initialPlans: Plan[];
}

const PREF_LABELS: Record<keyof Prefs, string> = {
  age: "Age",
  sex: "Biological sex",
  weightKg: "Weight (kg)",
  heightCm: "Height (cm)",
  bmi: "BMI",
  medicalConditions: "Medical conditions",
  allergies: "Allergies / intolerances",
  dietType: "Diet type",
  calorieTarget: "Daily calorie target",
  proteinTargetG: "Protein target (g)",
  fibreTargetG: "Fibre target (g)",
  calciumTargetMg: "Calcium target (mg)",
  dislikedFoods: "Foods to avoid",
  favoriteFoods: "Favourite foods",
  cuisinePreference: "Cuisine preference",
  goal: "Health goal",
};

const inputClass =
  "w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function DashboardClient({ userName, initialPrefs, initialPlans }: Props) {
  const [prefs, setPrefs] = useState<Prefs>(initialPrefs ?? {});
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState<Prefs>(initialPrefs ?? {});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const hasPrefs = Object.values(prefs).some((v) => v !== null && v !== undefined && v !== "");

  const startEdit = () => {
    setEditDraft({ ...prefs });
    setSaveError("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setSaveError("");
  };

  const savePrefs = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setPrefs(updated);
      setEditing(false);
    } catch {
      setSaveError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const deletePlan = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/mealplans/${id}`, { method: "DELETE" });
      setPlans((prev) => prev.filter((p) => p.id !== id));
      if (expandedPlan === id) setExpandedPlan(null);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft">
              <PearIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">Nora</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{userName}</span>
            <Link href="/chat">
              <Button size="sm" className="rounded-full bg-gradient-cta text-white shadow-soft hover:opacity-90 transition-smooth">
                <Plus className="w-3.5 h-3.5 mr-1" />
                New plan
              </Button>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-background hover:text-foreground transition-smooth"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Welcome back, {userName.split(" ")[0]}.
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Your meal plans and preferences, all in one place.
          </p>
        </div>

        {/* Preferences */}
        <section className="bg-card rounded-3xl border border-border shadow-soft p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Your preferences</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {hasPrefs ? "Saved from your Nora conversation — edit anytime." : "Not set yet. Chat with Nora or fill in manually."}
              </p>
            </div>
            {!editing && (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-background hover:text-foreground transition-smooth"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {(Object.keys(PREF_LABELS) as (keyof Prefs)[]).map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      {PREF_LABELS[key]}
                    </label>
                    <input
                      type={["age", "weightKg", "heightCm", "bmi", "calorieTarget", "proteinTargetG", "fibreTargetG", "calciumTargetMg"].includes(key) ? "number" : "text"}
                      value={(editDraft[key] as string | number | null | undefined) ?? ""}
                      onChange={(e) =>
                        setEditDraft((prev) => ({
                          ...prev,
                          [key]: e.target.value === "" ? null : (["age", "weightKg", "heightCm", "bmi", "calorieTarget", "proteinTargetG", "fibreTargetG", "calciumTargetMg"].includes(key) ? Number(e.target.value) : e.target.value),
                        }))
                      }
                      className={inputClass}
                      placeholder="—"
                    />
                  </div>
                ))}
              </div>
              {saveError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                  {saveError}
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={savePrefs}
                  disabled={saving}
                  className="rounded-full bg-gradient-cta text-white shadow-soft hover:opacity-90 transition-smooth"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {saving ? "Saving…" : "Save preferences"}
                </Button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : hasPrefs ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(PREF_LABELS) as (keyof Prefs)[])
                .filter((k) => prefs[k] !== null && prefs[k] !== undefined && prefs[k] !== "")
                .map((key) => (
                  <div key={key} className="bg-background rounded-2xl border border-border px-4 py-3">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-0.5">
                      {PREF_LABELS[key]}
                    </p>
                    <p className="text-sm text-foreground">{String(prefs[key])}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-4">
                Chat with Nora to get a personalised plan — your preferences will be saved automatically.
              </p>
              <Link href="/chat">
                <Button className="rounded-full bg-gradient-cta text-white shadow-soft hover:opacity-90 transition-smooth">
                  <Plus className="w-4 h-4 mr-1" />
                  Chat with Nora
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Meal plans */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Your meal plans</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {plans.length === 0 ? "No plans saved yet." : `${plans.length} plan${plans.length === 1 ? "" : "s"} saved.`}
              </p>
            </div>
            <Link href="/chat">
              <Button size="sm" className="rounded-full bg-gradient-cta text-white shadow-soft hover:opacity-90 transition-smooth">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Create new
              </Button>
            </Link>
          </div>

          {plans.length === 0 ? (
            <div className="bg-card rounded-3xl border border-border shadow-soft p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center mx-auto mb-4">
                <PearIcon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">No plans yet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Chat with Nora to generate your first weekly meal plan.
              </p>
              <Link href="/chat">
                <Button className="rounded-full bg-gradient-cta text-white shadow-soft hover:opacity-90 transition-smooth">
                  Get my meal plan
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-card rounded-3xl border border-border shadow-soft overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{plan.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatDate(plan.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {expandedPlan === plan.id ? (
                          <><ChevronUp className="w-3.5 h-3.5" /> Hide</>
                        ) : (
                          <><ChevronDown className="w-3.5 h-3.5" /> View plan</>
                        )}
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        disabled={deletingId === plan.id}
                        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-smooth disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {deletingId === plan.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>

                  {expandedPlan === plan.id && (
                    <div className="border-t border-border px-6 py-5 max-h-[600px] overflow-y-auto">
                      <div className="markdown-content prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {plan.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
