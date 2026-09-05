import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import meta from "@/data/meta.json";
import { getPosts, formatDate } from "@/lib/blog";
import { ID } from "@/lib/structured-data";

const description =
  "Notes on SignalR, .NET and building real-time systems — by Mikheil Berishvili.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog — ${meta.name}`, description, url: "/blog", type: "website" },
};

export default async function BlogIndex() {
  const posts = await getPosts();
  // An empty blog is a worse signal than no blog, so it 404s until a post exists.
  if (posts.length === 0) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${meta.siteUrl}/blog#blog`,
    url: `${meta.siteUrl}/blog`,
    name: `Blog — ${meta.name}`,
    description,
    inLanguage: "en",
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
    isPartOf: { "@id": ID.website },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${meta.siteUrl}/blog/${p.slug}#post`,
      headline: p.title,
      description: p.description,
      url: `${meta.siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@id": ID.person },
    })),
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
          <div className="site-container detail">
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Blog</span>
            </nav>

            <header className="detail-head">
              <h1 className="detail-title">Blog</h1>
              <p className="detail-tagline">
                Mostly SignalR and .NET — the problems I hit at work and in the tools I
                build, written down while they are still fresh.
              </p>
            </header>

            <section aria-labelledby="posts-heading">
              <h2 className="section-label" id="posts-heading">Posts</h2>
              {posts.map((post) => (
                <article key={post.slug} className="project">
                  <div className="project-top">
                    <h3 className="pname">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <div className="plinks">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                  <p className="pdesc">{post.description}</p>
                  <ul className="pstack">
                    {post.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>

            <p className="detail-back">
              <Link href="/">← Back home</Link>
              <span aria-hidden="true"> · </span>
              <a href="/blog/rss.xml">RSS</a>
            </p>
          </div>
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
