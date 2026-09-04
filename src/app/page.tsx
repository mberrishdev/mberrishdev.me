import projectsData from "@/data/projects.json";
import companiesData from "@/data/companies.json";
import meta from "@/data/meta.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ProjectIcon from "@/components/ProjectIcon";
import ScrollEffects from "@/components/ScrollEffects";

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
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" aria-labelledby="about-heading">
            <div className="site-container">
              <h2 className="section-label reveal" id="about-heading">About</h2>
              <div className="reveal" style={{ marginBottom: "24px" }}>
                <p className="pdesc" style={{ fontSize: "15px", marginBottom: "12px" }}>
                  With years of experience in full-stack development, I specialize in building scalable,
                  high-performance applications that solve real-world problems. My expertise spans from
                  modern frontend frameworks to robust backend systems.
                </p>
                <p className="pdesc" style={{ fontSize: "15px" }}>
                  I thrive on tackling complex challenges and transforming them into elegant, maintainable
                  solutions. Whether it&apos;s architecting microservices, optimizing database performance,
                  or crafting intuitive user interfaces, I bring a meticulous approach to every project.
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
              {projectsData.projects.map((project) => (
                <article key={project.id} className="project reveal">
                  <div className="project-top">
                    <h3 className="pname">
                      <ProjectIcon name={project.icon} />
                      {project.title}
                    </h3>
                    <div className="plinks">
                      {project.liveLink && project.liveLink !== "#" && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} — live site`}
                        >
                          Live ↗
                        </a>
                      )}
                      {project.githubLink && project.githubLink !== "#" && (
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
              ))}
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
