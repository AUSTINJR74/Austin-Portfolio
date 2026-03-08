import React, { useRef, useEffect, useState } from "react";
import { ChatMessage, PromptItem } from "@/lib/chat/types";

type Props = {
  messages: ChatMessage[];
  isTyping: boolean;
  typingText: string;
  typingColorClass: string;
  onSend: (text: string) => void;
  promptItems: PromptItem[];
  showPrompts: boolean;
};

export default function ChatUI({
  messages,
  isTyping,
  typingText,
  typingColorClass,
  onSend,
  promptItems,
  showPrompts,
}: Props) {
  const [input, setInput] = useState("");
  const [visiblePrompts, setVisiblePrompts] = useState<PromptItem[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledBotIdRef = useRef<string | null>(null);

  const placeholders = [
    ".✦ ݁˖  Say Hello! Austin's Awake.",
    ".✦ ݁˖  What would you like to know?",
    ".✦ ݁˖  I'm listening...",
  ];

  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing effect
        if (charIndex < currentPlaceholder.length) {
          setPlaceholderText(currentPlaceholder.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting effect
        if (charIndex > 0) {
          setPlaceholderText(currentPlaceholder.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next placeholder
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex, placeholders]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (isTyping) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
      return;
    }

    const last = messages[messages.length - 1];
    const prev = messages[messages.length - 2];
    if (!last || last.role !== "bot") return;
    if (last.id === lastScrolledBotIdRef.current) return;
    if (!prev || prev.role !== "user") return;

    const userEl = container.querySelector<HTMLElement>(
      `[data-message-id="${prev.id}"]`
    );
    if (!userEl) return;

    lastScrolledBotIdRef.current = last.id;

    const paddingTop = 8;
    const targetTop = Math.max(0, userEl.offsetTop - paddingTop);
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [messages.length, isTyping]);

  useEffect(() => {
    if (!showPrompts) {
      setVisiblePrompts([]);
      return;
    }

    if (promptItems.length === 0) {
      setVisiblePrompts([]);
      return;
    }

    const desiredCount = Math.min(5, Math.max(4, promptItems.length >= 5 ? 5 : promptItems.length));
    const shuffled = [...promptItems].sort(() => Math.random() - 0.5);
    setVisiblePrompts(shuffled.slice(0, desiredCount));
  }, [promptItems, showPrompts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-6xl animate-fade-up text-left">
      <div className="relative">
        {/* Background Glow */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-20 blur-3xl rounded-[28px]"
        />

        <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur shadow-elevated overflow-hidden">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/30">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
          </div>

          {/* Body */}
          <div>
            {/* Right Panel */}
            <div className="p-5 md:p-6">
              <div className="text-sm font-semibold text-foreground">
                Ask Gently. Get Answered Simply.
              </div>

              <div className="mt-5 h-[350px] md:h-[400px] flex flex-col">
                {/* Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto pr-1"
                >
                  <div className="space-y-2.5 text-sm leading-relaxed">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        data-message-id={m.id}
                        className={`flex ${
                          m.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={[
                            "max-w-[85%] flex flex-col",
                            m.role === "user"
                              ? "items-end text-left"
                              : "items-start text-left mr-auto",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "rounded-xl border px-3 py-2 whitespace-pre-line",
                              m.role === "user"
                                ? "bg-primary text-primary-foreground border-primary/30 rounded-tr-none"
                                : m.id.startsWith("init")
                                  ? "bg-gradient-primary text-primary-foreground border-primary/40 shadow-elevated"
                                  : "bg-background/40 text-muted-foreground border-border/60 rounded-tl-none",
                            ].join(" ")}
                          >
                            {m.content}
                          </div>

                          {m.role === "bot" && (m.suggestions?.length ?? 0) > 0 && (
                            <div className="mt-2 flex flex-wrap items-start justify-start gap-2 self-start text-left">
                              {m.suggestions!.map((s) => (
                                <button
                                  key={`${m.id}-${s}`}
                                  type="button"
                                  onClick={() => onSend(s)}
                                  className={[
                                    "rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors text-left whitespace-normal",
                                    "bg-primary/10 text-foreground border-primary/30",
                                    "hover:bg-primary/15 hover:border-primary/60",
                                  ].join(" ")}
                                  aria-label={`Send suggestion: ${s}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-xl border px-3 py-2 bg-background/40 text-muted-foreground border-border/60">
                          <div className={["flex items-center gap-2", typingColorClass].join(" ")}>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                              className="shrink-0"
                            >
                              <circle cx="6" cy="12" r="2" fill="currentColor">
                                <animate
                                  attributeName="opacity"
                                  values="0.25;1;0.25"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  begin="0s"
                                />
                              </circle>
                              <circle cx="12" cy="12" r="2" fill="currentColor">
                                <animate
                                  attributeName="opacity"
                                  values="0.25;1;0.25"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  begin="0.15s"
                                />
                              </circle>
                              <circle cx="18" cy="12" r="2" fill="currentColor">
                                <animate
                                  attributeName="opacity"
                                  values="0.25;1;0.25"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  begin="0.3s"
                                />
                              </circle>
                            </svg>
                            <span className="italic">{typingText}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Prompt chips */}
                {showPrompts && visiblePrompts.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                      {visiblePrompts.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => onSend(item.prompt)}
                          className={[
                            "w-full sm:w-auto rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
                            "bg-background/30 text-muted-foreground border-border/60",
                            "hover:border-primary/60 hover:text-foreground",
                            "text-left flex items-center justify-start gap-2",
                            item.active ? "border-border text-foreground" : "",
                          ].join(" ")}
                          aria-label={`Send prompt: ${item.name}`}
                        >
                          🔍 {item.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex items-center gap-2"
              >
                <div className="relative w-full">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholderText + (charIndex < placeholders[placeholderIndex].length && !isDeleting ? "|" : "")}
                    className="w-full rounded-md border border-primary/20 bg-primary/5 px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Send message"
                  >
                   ➤
                  </button>
                </div>
                {/* <button
                  type="submit"
                  className="rounded-md border border-border/60 bg-background/40 px-3 py-2 text-xs font-semibold text-foreground hover:border-primary/60 transition-colors"
                >
                  Send
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}