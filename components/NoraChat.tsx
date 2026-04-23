"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { ArrowUp, LayoutDashboard, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import NoraChatMessage from "./NoraChatMessage";
import PearIcon from "./PearIcon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey, I'm Nora — your personal nutrition agent. I'm going to ask you a few questions and build you a weekly meal plan that actually makes sense for your body and your life. Let's get into it.\n\nHow old are you?",
};

export default function NoraChat() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [savingPlan, setSavingPlan] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  const adjustTextareaHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 150) + "px";
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent("");

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Server error (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") {
            setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
            setStreamingContent("");
            setIsStreaming(false);
            break;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) { accumulated += parsed.text; setStreamingContent(accumulated); }
          } catch (parseErr) {
            if (parseErr instanceof Error && parseErr.message !== "Unexpected token") throw parseErr;
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const detail = err instanceof Error ? err.message : "Unknown error";
      console.error("[Nora chat error]", detail);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `Something went wrong: ${detail}`,
      }]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingContent("");
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const displayMessages = isStreaming
    ? [...messages, { role: "assistant" as const, content: streamingContent }]
    : messages;

  const canSend = !isLoading && !!input.trim();

  const hasPlan = messages.some(
    (m) => m.role === "assistant" && m.content.includes("Weekly Nutrient Summary")
  );

  const savePlan = useCallback(async () => {
    setSavingPlan(true);
    try {
      await fetch("/api/mealplans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      setPlanSaved(true);
    } finally {
      setSavingPlan(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* ── Header ── */}
      <header className="relative z-10 flex-shrink-0 bg-card border-b border-border shadow-soft">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft flex-shrink-0">
            <PearIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground leading-none">Nora</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Your personal nutrition agent</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Online pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary-soft text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Online
            </span>

            {/* User name */}
            {session?.user?.name && (
              <span className="text-xs text-muted-foreground hidden md:inline">
                {session.user.name}
              </span>
            )}

            {/* Dashboard link */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-background hover:text-foreground transition-smooth"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            {/* Sign out */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-background hover:text-foreground transition-smooth"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-5">
          {displayMessages.map((msg, i) => (
            <NoraChatMessage
              key={i}
              message={msg}
              isStreaming={isStreaming && i === displayMessages.length - 1 && msg.role === "assistant"}
            />
          ))}

          {/* Thinking dots */}
          {isLoading && !isStreaming && (
            <div className="message-enter flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft mt-0.5">
                <PearIcon className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border shadow-soft rounded-3xl rounded-tl-sm px-5 py-3.5">
                <div className="flex items-center gap-1.5 h-5">
                  <div className="w-2 h-2 rounded-full bg-primary dot-1" />
                  <div className="w-2 h-2 rounded-full bg-primary dot-2" />
                  <div className="w-2 h-2 rounded-full bg-primary dot-3" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Save plan banner ── */}
      {hasPlan && (
        <div className="relative z-10 flex-shrink-0 bg-primary-soft border-t border-primary/20 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <p className="text-sm text-primary font-medium">
              Your meal plan is ready.
            </p>
            <div className="flex items-center gap-2">
              {planSaved ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full bg-primary text-white shadow-soft hover:opacity-90 transition-smooth"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  View in dashboard
                </Link>
              ) : (
                <button
                  onClick={savePlan}
                  disabled={savingPlan}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full bg-primary text-white shadow-soft hover:opacity-90 transition-smooth disabled:opacity-60"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  {savingPlan ? "Saving…" : "Save this plan"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <div className="relative z-10 flex-shrink-0 bg-card border-t border-border shadow-soft">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className={`flex items-end gap-3 rounded-3xl border px-4 py-2.5 bg-background transition-smooth ${
            isLoading ? "border-border" : "border-primary"
          }`}
          style={{ boxShadow: isLoading ? "none" : "0 0 0 3px rgba(22,163,74,0.1)" }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); adjustTextareaHeight(); }}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer…"
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none outline-none text-sm py-1 leading-relaxed bg-transparent text-foreground placeholder:text-muted-foreground"
              style={{ minHeight: "36px", maxHeight: "150px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              aria-label="Send"
              className={`flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center transition-smooth mb-0.5 ${
                canSend
                  ? "bg-gradient-cta text-white shadow-soft hover:opacity-90 cursor-pointer"
                  : "bg-background border border-border text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs mt-2 text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded border border-border text-xs">Enter</kbd> to send
            {" · "}
            <kbd className="px-1.5 py-0.5 rounded border border-border text-xs">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}
