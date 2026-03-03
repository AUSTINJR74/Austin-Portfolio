export const getReply = (text: string): string => {
  const t = text.toLowerCase();

  if (t.includes("next") || t.includes("ssr") || t.includes("architecture")) {
    return `In production, I choose between SSR, SSG, and ISR based on three factors:

• SEO importance of the page
• Backend response characteristics
• Data freshness requirements

For high-intent legal service pages, I used SSR to ensure crawlability and structured data delivery.
For stable informational pages, I used SSG to reduce server load.
For semi-dynamic pages, ISR balanced freshness with performance.

This approach helped improve search impressions and eliminate thousands of underperforming URLs in Search Console.

My focus is not just rendering — it’s aligning rendering strategy with SEO and backend behavior.`;
  }

  if (t.includes("cms")) {
    return `I worked on CMS-driven pages that allowed non-engineers to safely publish content without breaking layout or data contracts.

My approach:

• Define strict API response structures
• Normalize backend payloads before UI usage
• Enforce validation and fallback handling
• Separate layout logic from content data
• Support structured schema markup for SEO

This reduced engineering dependency for content updates and shortened release cycles while keeping pages stable.`;
  }

  if (t.includes("performance") || t.includes("core web vitals")) {
    return `Performance work included improving Core Web Vitals across mobile and desktop.

Key improvements:

• Reduced JavaScript execution time
• Optimized dynamic imports and chunk splitting
• Improved caching strategies
• Minimized third-party script impact
• Optimized image delivery and asset loading

Within 10 days, search impressions increased by 8%, and over 3,000 underperforming pages were resolved.

I treat performance as measurable engineering work, not guesswork.`;
  }

  if (t.includes("analytics") || t.includes("mixpanel") || t.includes("growth")) {
    return `I use analytics tools to improve product decisions, not just track events.

Tools used:
• Mixpanel for funnel tracking
• Google Tag Manager for structured event delivery
• Microsoft Clarity for behavioral insights
• GrowthBook for experimentation

I track onboarding drop-offs, interaction patterns, and step conversions, then work with product teams to refine flows based on real data.

This helps prioritize improvements backed by user behavior instead of assumptions.`;
  }

  if (t.includes("backend") || t.includes("search") || t.includes("system")) {
    return `Beyond frontend work, I’ve contributed to backend and system-level features.

Examples:

• Built backend flows using Hapi.js and Node.js
• Implemented Elasticsearch for search-heavy Q&A systems
• Designed JWT-based authentication flows
• Worked on WebRTC + WebSocket signaling for real-time consultations
• Maintained ~99% uptime in production environments

I’m comfortable working across the stack when system reliability or performance requires it.`;
  }

  return `I work primarily on production-grade Next.js applications with a focus on:

• SEO-aware rendering strategies
• Core Web Vitals optimization
• CMS-driven architectures
• Analytics-informed product improvements
• Backend collaboration and search systems

Feel free to ask about any of these areas.`;
};