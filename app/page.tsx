import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Heart, Calendar, ShieldCheck, Sprout, Wallet, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PearIcon from "@/components/PearIcon";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Nav */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between max-w-6xl">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-primary-soft flex items-center justify-center">
            <PearIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">Nora</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-smooth">How it works</a>
          <a href="#benefits" className="hover:text-foreground transition-smooth">Benefits</a>
          <a href="#preview" className="hover:text-foreground transition-smooth">Preview</a>
        </nav>
        <Link href="/login">
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary-soft">Login</Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 bg-gradient-hero">
        <div className="container mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-32 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground">
                Nora, the meal&nbsp;plan{" "}
                <span className="italic text-primary">explorer</span>.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Personalized weekly meal plans based on your preferences, allergies, and nutrition goals — done for you in seconds.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Tailored to your food preferences, allergies & intolerances",
                  "Balanced with the right protein, fiber & calcium",
                  "A fresh new plan every single week",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                      <Sprout className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm opacity-80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full h-14 px-8 text-base bg-gradient-cta shadow-glow hover:opacity-95 transition-smooth group">
                    Create my free meal plan
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mascot */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-soft rounded-full blur-3xl scale-75 opacity-60" />
              <div className="relative">
                <Image
                  src="/nora-mascot.svg"
                  alt="Nora, the friendly avocado mascot"
                  width={520}
                  height={520}
                  className="w-72 md:w-[420px] drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 20px 40px hsl(142 32% 38% / 0.2))",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">How it works</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Three steps to a tastier week
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Tell Nora about you", desc: "Share your preferences, allergies, and nutrition goals — it takes a minute." },
            { icon: Sparkles, title: "Get your weekly plan", desc: "Nora crafts a personalized 7-day meal plan tailored just for you." },
            { icon: Calendar, title: "Come back for more", desc: "Generate a fresh new plan anytime. Your taste, your rhythm." },
          ].map((step, i) => (
            <div key={step.title} className="relative bg-card rounded-3xl p-8 border border-border shadow-soft hover:shadow-card transition-smooth">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-sm">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-soft flex items-center justify-center mb-5">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="relative z-10 bg-gradient-soft">
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Why Nora</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-foreground">
                Real nutrition, made personal — and free.
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                No generic diets. No paywalls. Just a plan that actually fits your life and your kitchen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Wallet,     title: "100% free",            desc: "Always. No hidden tiers." },
                { icon: Settings2,  title: "Edit anytime",          desc: "Save and tweak your preferences." },
                { icon: Heart,      title: "Adapts to you",         desc: "Plans evolve with your goals." },
                { icon: ShieldCheck,title: "Backed by guidelines",  desc: "Built around real nutrition science." },
              ].map((b) => (
                <div key={b.title} className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center mb-3">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-foreground">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section id="preview" className="relative z-10 container mx-auto px-6 py-24 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Eat well, effortlessly</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
            Does hitting your <span className="italic text-primary">protein, fiber & calcium</span> targets feel like a full-time job?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Nora understands your lifestyle, preferences, and goals — and turns them into a personalized weekly meal plan that&apos;s easy to cook and genuinely tasty.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { label: "Protein", value: "Hit your daily target" },
              { label: "Fiber",   value: "Gut-friendly meals" },
              { label: "Calcium", value: "Bone-strong choices" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-foreground opacity-80">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 container mx-auto px-6 pb-24 max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-cta px-8 py-16 md:py-24 text-center shadow-glow">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-primary-foreground leading-tight">
              Your weekly meal plan, done for you.
            </h2>
            <p className="mt-5 text-primary-foreground/80 text-lg">
              Join Nora and eat better, without the guesswork.
            </p>
            <Link href="/register">
              <Button size="lg" className="mt-10 rounded-full h-14 px-10 text-base bg-background text-foreground hover:bg-background/90 shadow-card group">
                Create free meal plan now
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <p className="mt-6 text-xs text-primary-foreground/60">No credit card · Ready in under a minute</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="container mx-auto px-6 py-10 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-primary-soft flex items-center justify-center">
              <PearIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-semibold text-foreground">Nora</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md text-center md:text-right leading-relaxed">
            Nora provides general nutrition guidance and is not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
