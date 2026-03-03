import React, { useRef, useEffect, useState } from "react";
import { ChatMessage, PromptItem } from "@/lib/chat/types";

type Props = {
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  promptItems: PromptItem[];
};

export default function ChatUI({
  messages,
  isTyping,
  onSend,
  promptItems,
}: Props) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-6xl animate-fade-up">
      <div className="relative">
        {/* Background Glow */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-20 blur-3xl rounded-[28px]"
        />

        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur shadow-elevated overflow-hidden">
          
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

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="mt-5 h-[150px] md:h-[300px] overflow-y-auto pr-1"
              >
                <div className="space-y-2.5 text-sm leading-relaxed">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={[
                          "max-w-[85%] rounded-xl border px-3 py-2 whitespace-pre-line text-left",
                          m.role === "user"
                            ? "bg-primary text-primary-foreground border-primary/30"
                            : "bg-background/40 text-muted-foreground border-border/60",
                        ].join(" ")}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-xl border px-3 py-2 bg-background/40 text-muted-foreground border-border/60">
                        Typing…
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Prompt chips */}
              {promptItems.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {promptItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => onSend(item.prompt)}
                      className={[
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        "bg-background/30 text-muted-foreground border-border/60",
                        "hover:border-primary/60 hover:text-foreground",
                        item.active ? "border-border text-foreground" : "",
                      ].join(" ")}
                      aria-label={`Send prompt: ${item.name}`}
                    >
                      🔍 {item.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about onboarding, CMS sync, analytics..."
                  className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="submit"
                  className="rounded-md border border-border/60 bg-background/40 px-3 py-2 text-xs font-semibold text-foreground hover:border-primary/60 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}