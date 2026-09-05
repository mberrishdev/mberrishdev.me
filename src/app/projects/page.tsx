import type { Metadata } from "next";
import Link from "next/link";
import meta from "@/data/meta.json";
import ProjectIcon from "@/components/ProjectIcon";
import { allProjects, projectPath, hasLive, hasSource } from "@/lib/projects";

const description =
  "Open-source tools, macOS apps and .NET libraries built by Mikheil Berishvili — including Notchly, Patchly, Readly, Camus, Versume, HubDocs and dct.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${meta.name}`,
    description,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${meta.siteUrl}/projects#collection`,
    url: `${meta.siteUrl}/projects`,
    name: `Projects — ${meta.name}`,
    description,
    isPartOf: { "@id": `${meta.siteUrl}/#website` },
    about: { "@id": `${meta.siteUrl}/#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allProjects.length,
      itemListElement: allProjects.map((p, i) => {
        const path = projectPath(p);
        return {
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          description: p.description,
          ...(path ? { url: `${meta.siteUrl}${path}` } : {}),
        };
      }),
    },
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
            <Link href="/projects" className="active">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </nav>

        <main>
          <div className="site-container detail">
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Projects</span>
            </nav>

            <header className="detail-head">
              <h1 className="detail-title">Projects</h1>
              <p className="detail-tagline">
                Developer tools, macOS apps and .NET libraries — most of them built
                to solve something that annoyed me first.
              </p>
            </header>

            <section aria-labelledby="all-heading">
              <h2 className="section-label" id="all-heading">
                All projects
              </h2>

              {allProjects.map((project) => {
                const path = projectPath(project);
                return (
                  <article key={project.id} className="project">
                    <div className="project-top">
                      <h3 className="pname">
                        <ProjectIcon name={project.icon} />
                        {path ? (
                          <Link href={path}>{project.title}</Link>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <div className="plinks">
                        {path && <Link href={path}>Details →</Link>}
                        {hasLive(project) && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — live site`}
                          >
                            Live ↗
                          </a>
                        )}
                        {hasSource(project) && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — source on GitHub`}
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="pdesc">{project.description}</p>
                    <ul className="pstack">
                      {project.technologies.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </section>

            <p className="detail-back">
              <Link href="/">← Back home</Link>
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
