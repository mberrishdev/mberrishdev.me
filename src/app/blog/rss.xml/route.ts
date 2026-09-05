import meta from "@/data/meta.json";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getPosts();
  const site = meta.siteUrl;

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${site}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site}/blog/${p.slug}</guid>
      <description>${escape(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(meta.name)} — Blog</title>
    <link>${site}/blog</link>
    <description>Notes on SignalR, .NET and building real-time systems.</description>
    <language>en</language>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
