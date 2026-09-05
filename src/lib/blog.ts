import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = join(process.cwd(), "src/content/blog");

// Typed separately: inline, `behavior` widens to `string` and stops matching
// the plugin's `Behavior` union. hast also expects `className` as an array.
const autolinkOptions: AutolinkOptions = {
  behavior: "wrap",
  properties: { className: ["heading-anchor"] },
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  /** Set false to keep a draft out of the build entirely. */
  published: boolean;
};

export type Post = PostMeta & { html: string; readingMinutes: number };

/**
 * Markdown rather than MDX: posts need code blocks and tables, not React.
 * That keeps the content pipeline free of any bundler interplay.
 */
async function render(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, autolinkOptions)
    .use(rehypeShiki, { theme: "github-light" })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

function readingMinutes(markdown: string): number {
  return Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 220));
}

async function slugs(): Promise<string[]> {
  try {
    const entries = await readdir(BLOG_DIR);
    return entries.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  } catch {
    return []; // no content directory yet
  }
}

async function load(slug: string): Promise<Post | null> {
  let raw: string;
  try {
    raw = await readFile(join(BLOG_DIR, `${slug}.md`), "utf-8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  if (data.published === false) return null;

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    published: data.published !== false,
    html: await render(content),
    readingMinutes: readingMinutes(content),
  };
}

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const all = await Promise.all((await slugs()).map(load));
  return all
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  return load(slug);
}

/**
 * The blog is only real once something is published. Until then /blog stays
 * out of the sitemap and the nav — an empty blog is a worse signal than none.
 */
export async function blogHasPosts(): Promise<boolean> {
  return (await getPosts()).length > 0;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
