"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import PearIcon from "./PearIcon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
  isStreaming?: boolean;
}

function HtmlRenderer({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    container.innerHTML = html;
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={ref} />;
}

const BLOCK_TAGS = ["div", "script", "button", "span", "table", "style"];
const OPEN_RE = new RegExp(`^<(${BLOCK_TAGS.join("|")})(\\s[^>]*)?>`, "i");
const CLOSE_RE = new RegExp(`</(${BLOCK_TAGS.join("|")})>`, "gi");
const ANY_OPEN_RE = new RegExp(`<(${BLOCK_TAGS.join("|")})(\\s[^>]*)?>`, "gi");

function parseContent(content: string) {
  const segments: Array<{ type: "markdown" | "html"; content: string }> = [];
  const lines = content.split("\n");
  let htmlLines: string[] = [];
  let markdownLines: string[] = [];
  let depth = 0;

  const flushMarkdown = () => {
    const text = markdownLines.join("\n").trim();
    if (text) segments.push({ type: "markdown", content: text });
    markdownLines = [];
  };
  const flushHtml = () => {
    const text = htmlLines.join("\n").trim();
    if (text) segments.push({ type: "html", content: text });
    htmlLines = [];
  };

  for (const line of lines) {
    if (depth === 0) {
      if (OPEN_RE.test(line.trimStart())) {
        flushMarkdown();
        htmlLines.push(line);
        const opens = (line.match(ANY_OPEN_RE) || []).length;
        const closes = (line.match(CLOSE_RE) || []).length;
        depth += opens - closes;
        if (depth <= 0) { depth = 0; flushHtml(); }
      } else {
        markdownLines.push(line);
      }
    } else {
      htmlLines.push(line);
      const opens = (line.match(ANY_OPEN_RE) || []).length;
      const closes = (line.match(CLOSE_RE) || []).length;
      depth += opens - closes;
      if (depth <= 0) { depth = 0; flushHtml(); }
    }
  }

  flushHtml();
  flushMarkdown();
  if (segments.length === 0) segments.push({ type: "markdown", content });
  return segments;
}

export default function NoraChatMessage({ message, isStreaming }: Props) {
  const isAssistant = message.role === "assistant";
  const segments = parseContent(message.content);

  return (
    <div className={`message-enter flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}>

      {/* Nora avatar */}
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-soft mt-0.5">
          <PearIcon className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[82%] px-5 py-3.5 text-sm leading-relaxed ${
          isAssistant
            ? "bg-card border border-border shadow-soft rounded-3xl rounded-tl-sm text-foreground"
            : "bg-gradient-cta text-primary-foreground rounded-3xl rounded-tr-sm shadow-soft"
        }`}
        style={{ wordBreak: "break-word" }}
      >
        {isAssistant ? (
          <div className={`markdown-content ${isStreaming ? "typing-cursor" : ""}`}>
            {segments.map((seg, i) =>
              seg.type === "html" ? (
                <HtmlRenderer key={i} html={seg.content} />
              ) : (
                <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
                  {seg.content}
                </ReactMarkdown>
              )
            )}
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>

      {/* User avatar */}
      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-primary-soft flex items-center justify-center text-primary text-xs font-semibold mt-0.5">
          U
        </div>
      )}
    </div>
  );
}
