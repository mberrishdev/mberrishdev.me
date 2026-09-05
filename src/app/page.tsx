import Link from "next/link";
import companiesData from "@/data/companies.json";
import meta from "@/data/meta.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ProjectIcon from "@/components/ProjectIcon";
import ScrollEffects from "@/components/ScrollEffects";
import { allProjects, projectPath, hasLive, hasSource } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <ScrollEffects />

      <div className="content-wrap">
        {/* Liquid Glass Nav */}
        <nav className="glass-nav" aria-label="Primary">
          <div className="glass-pill">
            <a href="#" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <Link href="/blog">Blog</Link>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <main>
          {/* Hero */}
          <section className="hero" aria-labelledby="hero-heading">
            <div className="site-container hero-inner">
              <p className="hero-badge">
                <span className="status-dot" aria-hidden="true" />
                Available for opportunities
              </p>
              <h1 className="hero-name" id="hero-heading">
                <span className="hero-word" style={{ animationDelay: "0.3s" }}>Mikheil</span>{" "}
                <span className="hero-word" style={{ animationDelay: "0.42s" }}>Berishvili</span>
              </h1>
              <p className="hero-desc">
                Full-Stack Developer building scalable systems with .NET, React, and cloud technologies. Based in Georgia.
              </p>
              <div className="hero-links">
                <a href={`mailto:${meta.email}`} className="gbtn">
                  Email <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  href={meta.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gbtn"
                >
                  Resume <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a href={meta.socials.github} target="_blank" rel="me noopener noreferrer" className="gbtn">
                  GitHub <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a href={meta.socials.linkedin} target="_blank" rel="me noopener noreferrer" className="gbtn">
                  LinkedIn <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a href={meta.socials.x} target="_blank" rel="me noopener noreferrer" className="gbtn">
                  X <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" aria-labelledby="about-heading">
            <div className="site-container">
              <h2 className="section-label reveal" id="about-heading">About</h2>
              <div className="reveal" style={{ marginBottom: "24px" }}>
                <p className="pdesc" style={{ fontSize: "15px", marginBottom: "12px" }}>
                  I&apos;m a full-stack developer working mainly in .NET, C# and React, currently at
                  TBC Bank on systems where correctness under load actually matters — rate engines,
                  transaction flows, message-driven services built on RabbitMQ and SignalR.
                </p>
                <p className="pdesc" style={{ fontSize: "15px" }}>
                  I care most about the boring parts that decide whether a codebase survives: where the
                  boundaries sit, what belongs in the domain, when a repository abstraction earns its
                  keep. That interest shows up in what I open-source —{" "}
                  <Link href="/projects/dotnet-clean-architecture-template">
                    Clean Architecture templates
                  </Link>
                  , <Link href="/projects/common-repository">EF Core repository libraries</Link>,{" "}
                  <Link href="/projects/dct-dotnet-cli-tool">CQRS tooling</Link>.
                </p>
              </div>
              <ul className="pstack reveal">
                {[".NET & C#", "React & TypeScript", "Microservices", "Cloud & DevOps", "SQL & NoSQL", "System Design"].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" aria-labelledby="experience-heading">
            <div className="site-container">
              <h2 className="section-label reveal" id="experience-heading">Experience</h2>
              {companiesData.companies.map((company, i) => (
                <div
                  key={company.name}
                  className="exp-row reveal reveal-stagger"
                  style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
                >
                  <h3 className="exp-name">
                    {company.link && company.link !== "#" ? (
                      <a href={company.link} target="_blank" rel="noopener noreferrer">
                        {company.name}
                      </a>
                    ) : (
                      company.name
                    )}
                  </h3>
                  <p className="exp-title">{company.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" aria-labelledby="projects-heading">
            <div className="site-container">
              <h2 className="section-label reveal" id="projects-heading">Projects</h2>
              {allProjects.map((project) => {
                const path = projectPath(project);
                return (
                  <article key={project.id} className="project reveal">
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
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}

              <p className="detail-back reveal" style={{ marginTop: "32px" }}>
                <Link href="/projects">All projects →</Link>
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" aria-labelledby="contact-heading">
            <div className="site-container" style={{ textAlign: "center" }}>
              <h2
                className="section-label reveal"
                id="contact-heading"
                style={{ justifyContent: "center" }}
              >
                <span>Contact</span>
              </h2>
              <address className="contact-row reveal">
                <a href={`mailto:${meta.email}`} className="gbtn">
                  {meta.email}
                </a>
                <a href={`tel:${meta.telephone}`} className="gbtn">
                  +995 591 30 05 69
                </a>
                <a href={meta.socials.linkedin} target="_blank" rel="me noopener noreferrer" className="gbtn">
                  LinkedIn <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a href={meta.socials.x} target="_blank" rel="me noopener noreferrer" className="gbtn">
                  X <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </address>
            </div>
          </section>
        </main>

        <footer
          className="reveal"
          style={{ padding: "32px 0", textAlign: "center", fontSize: "12px", color: "var(--text-3)" }}
        >
          © {new Date().getFullYear()} {meta.name}
        </footer>
      </div>

      <ScrollToTopButton />
    </>
  );
}
