import { useState } from "react";
import { ChatMessage } from "./types";
import { getReply } from "./getReply";

export const useChatEngine = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "bot",
      content:
        "Hi — I’m a small window into Austin’s architecture brain. Ask about onboarding, CMS sync, analytics, caching, or micro-frontends.",
      ts: Date.now(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        content: getReply(trimmed),
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  return { messages, sendMessage, isTyping };
};