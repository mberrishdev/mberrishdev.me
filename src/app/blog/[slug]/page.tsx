import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import meta from "@/data/meta.json";
import { getPosts, getPost, formatDate } from "@/lib/blog";
import { ID } from "@/lib/structured-data";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [meta.siteUrl],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${meta.siteUrl}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@id": ID.person },
        publisher: { "@id": ID.person },
        keywords: post.tags.join(", "),
        inLanguage: "en",
        isPartOf: { "@id": `${meta.siteUrl}/blog#blog` },
        wordCount: post.readingMinutes * 220,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: meta.siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${meta.siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="content-wrap">
        <nav className="glass-nav" aria-label="Primary">
          <div className="glass-pill">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog" className="active">Blog</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </nav>

        <main>
          <article className="site-container detail">
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{post.title}</span>
            </nav>

            <header className="detail-head">
              <h1 className="detail-title">{post.title}</h1>
              <p className="post-byline">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
                {post.tags.length > 0 && (
                  <>
                    <span aria-hidden="true"> · </span>
                    {post.tags.join(", ")}
                  </>
                )}
              </p>
            </header>

            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

            <p className="detail-back">
              <Link href="/blog">← All posts</Link>
            </p>
          </article>
        </main>

        <footer
          style={{
            padding: "32px 0",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--text-3)",
          }}
        >
          © {new Date().getFullYear()} {meta.name}
        </footer>
      </div>
    </>
  );
}
