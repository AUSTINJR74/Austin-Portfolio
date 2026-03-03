import { PromptItem } from "./types";

const baseTopics = [
  {
    key: "ssr",
    subject: "SSR, SSG & ISR decisions in production",
    meta: "Next.js · Core Web Vitals",
    prompts: [
      "Explain your Next.js architecture decisions",
      "When do you choose SSR vs SSG vs ISR in Next.js?",
      "How do you decide rendering strategy for SEO pages?",
      "What tradeoffs do you consider for SSR in production?",
      "How do you balance freshness, SEO, and performance in Next.js?",
      "How do you structure a Next.js app for scale?",
    ],
    names: [
      "Why Did You Pick SSR Here?",
      "SSR vs SSG — What’s Your Rule?",
      "When Does ISR Actually Make Sense?",
      "Do You Default to SSR?",
      "Rendering Strategy: How Do You Decide?",
      "Next.js Architecture — Walk Me Through It",
    ],
  },
  {
    key: "cms",
    subject: "Reducing engineering dependency for content",
    meta: "API Contracts · Structured Data",
    prompts: [
      "How do you design CMS-driven systems?",
      "How do you prevent CMS content from breaking layouts?",
      "How do you validate CMS payloads before rendering?",
      "What does a stable CMS contract look like?",
      "How do you handle fallbacks for missing CMS fields?",
      "How do you structure CMS content for SEO schema markup?",
    ],
    names: [
      "Why Is Your CMS Not a Mess?",
      "How Do You Keep CMS Pages Stable?",
      "CMS Contracts — How Do You Enforce Them?",
      "How Do You Avoid CMS Chaos?",
      "How Do You Ship CMS Updates Safely?",
      "CMS + SEO — How Do You Structure Data?",
    ],
  },
  {
    key: "performance",
    subject: "Improving Core Web Vitals & search visibility",
    meta: "Caching · JS Optimization · SEO",
    prompts: [
      "How do you approach performance optimization?",
      "What’s your process for improving Core Web Vitals?",
      "How do you reduce JS execution time in real apps?",
      "How do you optimize caching and asset loading?",
      "How do you audit and fix third-party script impact?",
      "What do you prioritize first: LCP, INP, or CLS?",
    ],
    names: [
      "How Did You Make It This Fast?",
      "Core Web Vitals — What Did You Fix First?",
      "What’s Your Performance Checklist?",
      "How Do You Debug Slow Pages?",
      "How Do You Reduce JS Bloat?",
      "How Do You Make Lighthouse Scores Real?",
    ],
  },
  {
    key: "analytics",
    subject: "Data-driven product improvements",
    meta: "Mixpanel · GTM · GrowthBook",
    prompts: [
      "How do you use analytics in product decisions?",
      "How do you design events and naming conventions?",
      "How do you build funnels that teams can trust?",
      "How do you use experiments to reduce guesswork?",
      "How do you diagnose onboarding drop-offs?",
      "How do you keep tracking clean over time?",
    ],
    names: [
      "Do You Actually Use Analytics Properly?",
      "How Do You Track Funnels That Matter?",
      "Event Tracking — How Do You Structure It?",
      "How Do You Use Experiments (A/B) Well?",
      "Onboarding Analytics — What Do You Look For?",
      "How Do You Prevent Analytics Drift?",
    ],
  },
  {
    key: "backend",
    subject: "APIs, Search & Real-time communication",
    meta: "Node.js · Elasticsearch · WebRTC",
    prompts: [
      "Tell me about your backend and system work",
      "What backend systems have you built or owned?",
      "How do you design APIs for reliability?",
      "How did you implement search with Elasticsearch?",
      "How do you approach real-time communication systems?",
      "What do you do to keep production uptime high?",
    ],
    names: [
      "Wait… You Built the Backend Too?",
      "How Deep Is Your Backend Experience?",
      "Search Systems — How Did You Build It?",
      "Real-time Features — What’s Your Approach?",
      "API Design — How Do You Keep It Stable?",
      "Reliability — What Did You Do In Prod?",
    ],
  },
] as const;

export const promptItems: PromptItem[] = baseTopics.flatMap((topic, topicIndex) => {
  return topic.prompts.map((prompt, i) => {
    return {
      name: topic.names[i] ?? topic.names[0],
      subject: topic.subject,
      meta: topic.meta,
      prompt,
      active: topicIndex === 0 && i === 0,
    } satisfies PromptItem;
  });
});