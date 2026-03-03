import { PromptItem } from "./types";

export const promptItems: PromptItem[] = [
  {
    name: "Why Did You Pick SSR Here?",
    subject: "SSR, SSG & ISR decisions in production",
    meta: "Next.js · Core Web Vitals",
    prompt: "Explain your Next.js architecture decisions",
    active: true,
  },
  {
    name: "Why Is Your CMS Not a Mess?",
    subject: "Reducing engineering dependency for content",
    meta: "API Contracts · Structured Data",
    prompt: "How do you design CMS-driven systems?",
  },
  {
    name: "How Did You Make It This Fast?",
    subject: "Improving Core Web Vitals & search visibility",
    meta: "Caching · JS Optimization · SEO",
    prompt: "How do you approach performance optimization?",
  },
  {
    name: "Do You Actually Use Analytics Properly?",
    subject: "Data-driven product improvements",
    meta: "Mixpanel · GTM · GrowthBook",
    prompt: "How do you use analytics in product decisions?",
  },
  {
    name: "Wait… You Built the Backend Too?",
    subject: "APIs, Search & Real-time communication",
    meta: "Node.js · Elasticsearch · WebRTC",
    prompt: "Tell me about your backend and system work",
  },
];