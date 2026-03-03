import { useState } from "react";
import { ChatMessage, Topic } from "./types";
import { getReply } from "./getReply";

export const useChatEngine = () => {
  const initMessage: ChatMessage = {
    id: "init",
    role: "bot",
    content:
      "Welcome to Austin’s engineering studio — where performance is engineered, not negotiated.",
    ts: Date.now(),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    initMessage,
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("Typing…");
  const [typingColorClass, setTypingColorClass] = useState("text-muted-foreground");
  const [turnCount, setTurnCount] = useState(0);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  const thinkingPhrases = [
    "Austin is shaking the brain to see what falls out…",
    "Austin checking if this is a feature or a personality trait…",
    "Austin googling inside his own head…",
    "Austin pretending he knew this already…",
    "Austin blowing dust off archived genius…",
    "Jose arguing with himself again…",
    "Jose found the answer. It’s judging you.",
    "Jose opening a mental Stack Overflow…",
    "Jose upgrading the sarcasm firmware…",
    "Jose rolling back a bad thought…",
    "ASJS running in chaotic-smart mode…",
    "ASJS overheating. Adding logic coolant…",
    "ASJS spinning up premium brain servers…",
    "ASJS deploying answer_v1_final_final…",
    "ASJS pretending this is under control…",
  ] as const;

  const pick = <T,>(items: readonly T[]): T => {
    return items[Math.floor(Math.random() * items.length)] as T;
  };

  const thinkingColors = [
    "text-primary",
    "text-emerald-400",
    "text-sky-400",
    "text-violet-400",
    "text-amber-400",
    "text-pink-400",
  ] as const;

  const getConclusion = (topic: Topic | null): string => {
    if (topic === "ssr") {
      return "Conclusion: pick SSR/SSG/ISR based on SEO, freshness, and backend behavior — then validate it with real metrics (CWV + crawl/index + caching). Thanks for the questions — I’ll be here, aggressively optimizing in the corner.";
    }

    if (topic === "cms") {
      return "Conclusion: keep CMS systems stable with contracts, validation, safe fallbacks, and a clear content-block mapping layer. Thanks for the questions — may your content editors never discover ‘creative formatting’.";
    }

    if (topic === "performance") {
      return "Conclusion: measure Web Vitals, fix the biggest bottleneck (LCP/INP/CLS), and lock improvements with budgets and re-checks. Thanks for the questions — your Lighthouse score just blushed.";
    }

    if (topic === "analytics") {
      return "Conclusion: define the question, instrument clean events, analyze funnels/cohorts, ship an improvement, and measure the impact (ideally via experiments). Thanks for the questions — and yes, we’ll name events like adults.";
    }

    if (topic === "backend") {
      return "Conclusion: design APIs and systems around reliability first (failure modes + observability + contracts), then optimize performance and cost. Thanks for the questions — may your deploys be boring and your logs be quiet.";
    }

    return "Conclusion: pick a topic (rendering, performance, CMS, analytics, backend), go one level deeper, then validate with real data. Thanks for the questions — I’ll be on standby, drinking cache headers.";
  };

  const resetChat = (lastMessage?: ChatMessage) => {
    const freshInit: ChatMessage = {
      ...initMessage,
      id: `init-${Date.now()}`,
      ts: Date.now(),
    };

    setMessages(lastMessage ? [lastMessage] : [freshInit]);
    setTurnCount(0);
    setActiveTopic(null);
  };

  const isSmallTalk = (text: string): boolean => {
    const t = text.toLowerCase();
    const normalized = t
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[^a-z0-9\s'!?]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const isGreeting = /^(hi|hello|hey|yo)\b/.test(normalized) ||
      normalized === "hola" ||
      normalized === "sup" ||
      normalized === "good morning" ||
      normalized === "good afternoon" ||
      normalized === "good evening";

    const isHowAreYou =
      /\bhow\s+(are|r)\s+(you|u)\b/.test(normalized) ||
      normalized === "hru" ||
      /\bhow('?s|s)\s+it\s+going\b/.test(normalized) ||
      /\bwhat('?s|s)\s+up\b/.test(normalized);

    const isSecretsAboutAustin =
      /\bsecret(s)?\b/.test(normalized) &&
      (normalized.includes("austin") || normalized.includes("asjs") || normalized.includes("jose"));

    return isGreeting || isHowAreYou || isSecretsAboutAustin;
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nextTurn = turnCount + 1;
    setTurnCount(nextTurn);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    if (isSmallTalk(trimmed)) {
      const reply = getReply(trimmed, {
        topicHint: activeTopic ?? undefined,
      });

      if (reply.topic) setActiveTopic(reply.topic);

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        content: reply.content,
        suggestions: reply.suggestions,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      return;
    }

    setTypingText(pick(thinkingPhrases));
    setTypingColorClass(pick(thinkingColors));
    setIsTyping(true);

    const delayMs = 3000 + Math.floor(Math.random() * 1000);

    setTimeout(() => {
      const maxTurns = 4;

      if (nextTurn >= maxTurns) {
        const concludingMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          role: "bot",
          content: getConclusion(activeTopic),
          ts: Date.now(),
        };

        setMessages((prev) => [...prev, concludingMsg]);
        setIsTyping(false);

        setTimeout(() => {
          resetChat(concludingMsg);
        }, 900);

        return;
      }

      const reply = getReply(trimmed, {
        topicHint: activeTopic ?? undefined,
      });

      if (reply.topic) setActiveTopic(reply.topic);

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        content: reply.content,
        suggestions: reply.suggestions,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delayMs);
  };

  const showPrompts = turnCount === 0;

  return { messages, sendMessage, isTyping, typingText, typingColorClass, showPrompts };
};