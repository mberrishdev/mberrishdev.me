import { MetadataRoute } from "next";
import meta from "@/data/meta.json";

/**
 * AI crawlers are allowed explicitly rather than relying on the wildcard, so
 * that being cited by ChatGPT / Claude / Perplexity / Gemini is an intentional,
 * auditable choice rather than a default.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — training + ChatGPT
  "OAI-SearchBot", // OpenAI — ChatGPT Search index
  "ChatGPT-User", // OpenAI — user-initiated fetches
  "ClaudeBot", // Anthropic — crawling
  "Claude-User", // Anthropic — user-initiated fetches
  "Claude-SearchBot", // Anthropic — search index
  "PerplexityBot", // Perplexity — index
  "Perplexity-User", // Perplexity — user-initiated fetches
  "Google-Extended", // Google — Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "meta-externalagent", // Meta AI
  "Amazonbot", // Amazon / Alexa
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${meta.siteUrl}/sitemap.xml`,
    host: meta.siteUrl,
  };
}
