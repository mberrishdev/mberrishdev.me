import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import meta from "@/data/meta.json";
import ProjectIcon from "@/components/ProjectIcon";
import {
  pagedProjects,
  getProjectBySlug,
  formatCreated,
  hasLive,
  hasSource,
  type Project,
} from "@/lib/projects";
import { ID } from "@/lib/structured-data";

export function generateStaticParams() {
  return pagedProjects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description = project.tagline
    ? `${project.tagline} ${project.description}`.slice(0, 300)
    : project.description;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${meta.name}`,
      description,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${meta.name}`,
      description,
    },
  };
}

function softwareSchema(project: Project) {
  const url = `${meta.siteUrl}/projects/${project.slug}`;
  const isAuthor = project.role === "Author";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#software`,
        name: project.title,
        headline: project.title,
        abstract: project.tagline || undefined,
        description: project.description,
        url,
        ...(hasSource(project) ? { codeRepository: project.githubLink } : {}),
        programmingLanguage: project.language || undefined,
        ...(project.license ? { license: project.license } : {}),
        ...(project.created ? { dateCreated: project.created } : {}),
        keywords: project.technologies.join(", "),
        // Authorship is only claimed where it is actually true; on a project
        // contributed to rather than authored, `contributor` is the honest term.
        ...(isAuthor
          ? { author: { "@id": ID.person }, creator: { "@id": ID.person } }
          : { contributor: { "@id": ID.person } }),
        isPartOf: { "@id": `${meta.siteUrl}/projects#collection` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: meta.siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${meta.siteUrl}/projects`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const facts: Array<[string, string]> = [
    ["Role", project.role],
    ["Started", formatCreated(project.created)],
    ["Language", project.language],
    ["Platform", project.platforms.join(", ")],
    ["Licence", project.license],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema(project)) }}
      />

      <div className="content-wrap">
        <nav className="glass-nav" aria-label="Primary">
          <div className="glass-pill">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </nav>

        <main>
          <article className="site-container detail">
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/projects">Projects</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{project.title}</span>
            </nav>

            <header className="detail-head">
              <h1 className="detail-title">
                <ProjectIcon name={project.icon} />
                {project.title}
              </h1>
              {project.tagline && <p className="detail-tagline">{project.tagline}</p>}

              <div className="hero-links" style={{ marginTop: "24px" }}>
                {hasLive(project) && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gbtn"
                  >
                    Visit <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                )}
                {hasSource(project) && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gbtn"
                  >
                    Source <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </header>

            {facts.length > 0 && (
              <section aria-labelledby="facts-heading">
                <h2 className="section-label" id="facts-heading">Details</h2>
                <dl className="facts">
                  {facts.map(([k, v]) => (
                    <div key={k} className="fact">
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section aria-labelledby="overview-heading">
              <h2 className="section-label" id="overview-heading">Overview</h2>
              {project.overview.map((para, i) => (
                <p key={i} className="pdesc detail-para">{para}</p>
              ))}
            </section>

            {project.highlights.length > 0 && (
              <section aria-labelledby="highlights-heading">
                <h2 className="section-label" id="highlights-heading">Highlights</h2>
                <ul className="bullets">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="stack-heading">
              <h2 className="section-label" id="stack-heading">Built with</h2>
              <ul className="pstack">
                {project.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <p className="detail-back">
              <Link href="/projects">← All projects</Link>
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
