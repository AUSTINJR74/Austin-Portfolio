import type { Reply, Topic } from "./types";

const pick = <T,>(items: readonly T[]): T => {
  return items[Math.floor(Math.random() * items.length)] as T;
};

const maybeSuggestions = (questions: readonly string[], desiredCount = 2): string[] => {
  if (questions.length === 0) return [];

  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(desiredCount, questions.length));
};

type GetReplyOptions = {
  topicHint?: Topic;
};

export const getReply = (text: string, options?: GetReplyOptions): Reply => {
  const t = text.toLowerCase();
  const hinted = options?.topicHint;

  const normalized = t
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^a-z0-9\s'!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const getSmallTalkReply = (): Reply | null => {
    const greetings = [
      "hi",
      "hello",
      "hey",
      "yo",
      "hola",
      "sup",
      "good morning",
      "good afternoon",
      "good evening",
    ] as const;

    const howAreYou = [
      "how are you",
      "how r u",
      "hru",
      "how are u",
      "how's it going",
      "hows it going",
      "what's up",
      "whats up",
    ] as const;

    const isGreeting =
      greetings.includes(normalized as (typeof greetings)[number]) ||
      /^(hi|hello|hey|yo)\b/.test(normalized);

    const isHowAreYou =
      howAreYou.includes(normalized as (typeof howAreYou)[number]) ||
      /\bhow\s+(are|r)\s+(you|u)\b/.test(normalized) ||
      /\bhow('?s|s)\s+it\s+going\b/.test(normalized) ||
      /\bwhat('?s|s)\s+up\b/.test(normalized);

    const isSecretsAboutAustin =
      /\bsecret(s)?\b/.test(normalized) &&
      (normalized.includes("austin") || normalized.includes("asjs") || normalized.includes("jose"));

    if (!isGreeting && !isHowAreYou && !isSecretsAboutAustin) return null;

    if (isSecretsAboutAustin) {
      const replies = [
        "Top secret: Austin once tried to fight a slow build by staring at the progress bar. It did not blink first.",
        "The secrets are sealed in a vault protected by two-factor sarcasm.",
        "Rumor says Austin’s real weakness is unminified JavaScript. Please be respectful.",
        "Confidential: Austin’s password manager is just a sticky note that says ‘use a password manager’.",
      ] as const;

      const followUps = [
        "Want the *real* secret (skills) or the funny secret (lore)?",
        "Ask me about performance, CMS, analytics, or backend — I’ll behave. Mostly.",
      ] as const;

      return {
        content: pick(replies),
        suggestions: maybeSuggestions(followUps, 2),
      };
    }

    if (isHowAreYou) {
      const replies = [
        "I’m doing great — currently running on caffeine, cache hits, and questionable confidence.",
        "Alive and well. Mentally I’m in a Lighthouse audit, spiritually I’m in a git rebase.",
        "I’m good. No errors so far… but I haven’t opened the console yet.",
        "Fantastic. My CPU is cool, my bundle is small, and my optimism is dangerously high.",
      ] as const;

      const followUps = [
        "What can I help you with — performance, SEO, CMS, analytics, or backend?",
        "Want a quick overview of Austin’s work, or something specific?",
      ] as const;

      return {
        content: pick(replies),
        suggestions: maybeSuggestions(followUps, 2),
      };
    }

    const replies = [
      "Hey! Welcome in. Please keep your hands and feet inside the build at all times.",
      "Hello! I’m the friendly neighborhood portfolio bot. I accept compliments and clear requirements.",
      "Hi there — I’m here to talk shop, tell mild jokes, and aggressively optimize things.",
      "Hey! If you say ‘performance’ three times, a Lighthouse score appears behind you.",
    ] as const;

    const followUps = [
      "Want to talk SSR/SSG/ISR, performance, CMS, analytics, or backend?",
      "Ask me anything — or try ‘secrets about Austin’ if you like chaos.",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
    };
  };

  const smallTalkReply = getSmallTalkReply();
  if (smallTalkReply) return smallTalkReply;

  if (
    hinted === "ssr" ||
    t.includes("next") ||
    t.includes("ssr") ||
    t.includes("architecture") ||
    t.includes("isr") ||
    t.includes("ssg")
  ) {
    const replies = [
      `In production, I choose between SSR, SSG, and ISR based on three factors:

• SEO importance of the page
• Backend response characteristics
• Data freshness requirements

For high-intent pages, SSR ensures crawlability + consistent structured data.
For stable informational pages, SSG reduces server load.
For semi-dynamic content, ISR balances freshness with performance.

My focus is not just rendering — it’s aligning rendering strategy with SEO and backend behavior.`,
      `I treat SSR/SSG/ISR like a product decision, not a framework preference.

• If content must be indexed immediately and depends on request-time data: SSR.
• If content is mostly static and can be precomputed: SSG.
• If content changes regularly but can tolerate revalidation windows: ISR.

Then I validate it with metrics: LCP/INP, cache hit rate, and crawl/index behavior.`,
      `My rule of thumb:

• SSR for high-intent SEO pages where correctness matters at request time.
• SSG when the content is stable and speed is the primary win.
• ISR when you want "mostly static" performance with controlled freshness.

The best outcome is when rendering, caching, and backend SLAs are designed together.`,
    ] as const;

    const followUps = [
      "Do you want the short version (rules) or the deeper version (architecture + caching)?",
      "Which page type are you thinking about — marketing, docs, or a data-heavy dashboard?",
      "Are you optimizing more for SEO, performance, or operational simplicity?",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
      topic: "ssr",
    };
  }

  if (hinted === "cms" || t.includes("cms") || t.includes("content")) {
    const replies = [
      `I worked on CMS-driven pages that let non-engineers publish safely without breaking layout or data contracts.

My approach:

• Define strict API response structures
• Normalize backend payloads before UI usage
• Enforce validation and fallback handling
• Separate layout logic from content data
• Support structured schema markup for SEO

This reduces engineering dependency for content updates while keeping pages stable.`,
      `To keep a CMS from becoming a mess, I focus on contracts and guardrails:

• Typed models (even if the CMS is flexible)
• Validation at the edge of the system
• Safe defaults for missing/invalid fields
• A component mapping layer (content blocks -> UI)

That way content authors can move fast without production surprises.`,
      `The biggest CMS wins usually come from “structure over freedom”.

I like:
• a stable content schema
• versioned API responses
• strict rendering fallbacks
• separating “content” from “presentation rules”

It keeps pages resilient and reduces fire drills during content pushes.`,
    ] as const;

    const followUps = [
      "Is your CMS headless (API-first) or coupled to the frontend?",
      "Do you have issues with content breaking the UI today, or is this for a new build?",
      "Are you optimizing for editor autonomy, SEO, or release safety?",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
      topic: "cms",
    };
  }

  if (
    hinted === "performance" ||
    t.includes("performance") ||
    t.includes("core web vitals") ||
    t.includes("lcp") ||
    t.includes("inp") ||
    t.includes("cls")
  ) {
    const replies = [
      `Performance work included improving Core Web Vitals across mobile and desktop.

Key improvements:

• Reduced JavaScript execution time
• Optimized dynamic imports and chunk splitting
• Improved caching strategies
• Minimized third-party script impact
• Optimized image delivery and asset loading

I treat performance as measurable engineering work, not guesswork.`,
      `My performance loop is:

• Measure (RUM + Lighthouse + Web Vitals)
• Identify top offenders (JS long tasks, image LCP, third-party scripts)
• Fix the highest-leverage bottleneck
• Re-measure and lock it in with budgets

It’s boring in the best way: small, repeatable wins.`,
      `For Core Web Vitals, I usually prioritize in this order:

• LCP: images, font loading, server response, critical CSS
• INP: reduce JS work, defer non-critical scripts, split bundles
• CLS: reserve space, stabilize fonts and dynamic content

Then I validate changes with real-user data, not just lab scores.`,
    ] as const;

    const followUps = [
      "What metric is hurting you most right now — LCP, INP, or CLS?",
      "Is this on mobile, desktop, or both?",
      "Do you have a particular slow page/template in mind?",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
      topic: "performance",
    };
  }

  if (
    hinted === "analytics" ||
    t.includes("analytics") ||
    t.includes("mixpanel") ||
    t.includes("growth") ||
    t.includes("gtm") ||
    t.includes("events")
  ) {
    const replies = [
      `I use analytics tools to improve product decisions, not just track events.

Tools used:
• Mixpanel for funnel tracking
• Google Tag Manager for structured event delivery
• Microsoft Clarity for behavioral insights
• GrowthBook for experimentation

I track onboarding drop-offs, interaction patterns, and conversions, then refine flows based on real data.`,
      `Good analytics is mostly discipline:

• consistent event naming
• clear ownership of tracking
• a small set of “north star” funnels
• instrumentation that’s testable

Then you can actually make decisions confidently instead of debating whose dashboard is right.`,
      `I like to connect analytics to action:

• define the question (ex: why drop-off at step 2?)
• instrument just enough
• analyze cohorts / funnels
• ship a change
• measure the delta (ideally with an experiment)

That closes the loop and keeps tracking meaningful.`,
    ] as const;

    const followUps = [
      "Are you trying to improve onboarding, activation, or retention?",
      "Do you already have events in place, or are you starting from scratch?",
      "Do you prefer product analytics (Mixpanel) or warehouse-first analytics?",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
      topic: "analytics",
    };
  }

  if (
    hinted === "backend" ||
    t.includes("backend") ||
    t.includes("search") ||
    t.includes("system") ||
    t.includes("api") ||
    t.includes("realtime") ||
    t.includes("websocket")
  ) {
    const replies = [
      `Beyond frontend work, I’ve contributed to backend and system-level features.

Examples:

• Built backend flows using Hapi.js and Node.js
• Implemented Elasticsearch for search-heavy Q&A systems
• Designed JWT-based authentication flows
• Worked on WebRTC + WebSocket signaling for real-time consultations
• Maintained ~99% uptime in production environments

I’m comfortable working across the stack when reliability or performance requires it.`,
      `I’m comfortable going backend when the product needs it:

• API design + contracts
• search relevance + indexing pipelines
• auth (JWT flows) and secure integrations
• real-time signaling (WebSocket/WebRTC patterns)

I generally optimize for reliability first, then developer ergonomics, then raw throughput.`,
      `On backend/system work, I’m usually thinking in terms of:

• failure modes (timeouts, retries, partial outages)
• observability (logs/metrics/traces)
• contracts (schema + versioning)
• performance (caching + query efficiency)

That’s what keeps production calm at scale.`,
    ] as const;

    const followUps = [
      "Are you more interested in search (Elasticsearch) or real-time (WebRTC/WebSockets)?",
      "Do you want examples of system design decisions or implementation details?",
      "What’s the most important constraint: latency, uptime, or cost?",
    ] as const;

    return {
      content: pick(replies),
      suggestions: maybeSuggestions(followUps, 2),
      topic: "backend",
    };
  }

  const generalReplies = [
    `I work primarily on production-grade Next.js applications with a focus on:

• SEO-aware rendering strategies
• Core Web Vitals optimization
• CMS-driven architectures
• Analytics-informed product improvements
• Backend collaboration and search systems

Feel free to ask about any of these areas.`,
    `I can help with architecture, performance, CMS design, analytics, or backend/search systems.

If you tell me what you’re building (and what’s currently painful), I can zoom in quickly.`,
    `If you want, pick a direction:

• rendering strategy (SSR/SSG/ISR)
• performance + Core Web Vitals
• CMS contracts and safety
• analytics + experimentation
• backend/search/realtime
`,
  ] as const;

  const generalFollowUps = [
    "What are you building right now — a marketing site, marketplace, or dashboard?",
    "Do you want a high-level overview or a technical deep-dive?",
    "Which area should we start with: performance, CMS, analytics, or backend?",
  ] as const;

  return {
    content: pick(generalReplies),
    suggestions: maybeSuggestions(generalFollowUps, 2),
    topic: "general",
  };
};