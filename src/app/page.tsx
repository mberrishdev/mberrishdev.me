"use client";

import projectsData from "@/data/projects.json";
import companiesData from "@/data/companies.json";
import { useEffect, useRef } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ProjectIcon from "@/components/ProjectIcon";

export default function Home() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObs.observe(el));

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".glass-pill a");

    function updateActive() {
      const scrollY = window.scrollY + 100;
      let current = "";
      sections.forEach((s) => {
        if (scrollY >= (s as HTMLElement).offsetTop) current = s.id;
      });
      navLinks.forEach((a) => {
        a.classList.toggle(
          "active",
          current
            ? a.getAttribute("href") === "#" + current
            : a.getAttribute("href") === "#"
        );
      });
    }

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;

    function handleScroll() {
      const y = window.scrollY;
      if (orb1) orb1.style.transform = `translate(${y * 0.03}px, ${y * 0.08}px)`;
      if (orb2) orb2.style.transform = `translate(${-y * 0.04}px, ${-y * 0.06}px)`;
      updateActive();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    return () => {
      revealObs.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={orb1Ref} className="orb" style={{ top: "-200px", left: "-150px" }} />
      <div ref={orb2Ref} className="orb orb-warm" style={{ bottom: "-200px", right: "-150px" }} />

      <div className="content-wrap">
        {/* Liquid Glass Nav */}
        <nav className="glass-nav">
          <div className="glass-pill">
            <a href="#" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="site-container hero-inner">
            <div className="hero-badge">
              <span className="status-dot" />
              Available for opportunities
            </div>
            <h1 className="hero-name">
              <span className="hero-word" style={{ animationDelay: "0.3s" }}>Mikheil</span>{" "}
              <span className="hero-word" style={{ animationDelay: "0.42s" }}>Berishvili</span>
            </h1>
            <p className="hero-desc">
              Full-Stack Developer building scalable systems with .NET, React, and cloud technologies. Based in Georgia.
            </p>
            <div className="hero-links">
              <a href="mailto:mikheil.berishvili@outlook.com" className="gbtn">
                Email <span className="arrow">↗</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1PKL2O3Jd1YmBL4gNkTghjmIyMU7TcfTZ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="gbtn"
              >
                Resume <span className="arrow">↗</span>
              </a>
              <a href="https://github.com/mberrishdev" target="_blank" rel="noopener noreferrer" className="gbtn">
                GitHub <span className="arrow">↗</span>
              </a>
              <a href="https://linkedin.com/in/mberrish" target="_blank" rel="noopener noreferrer" className="gbtn">
                LinkedIn <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about">
          <div className="site-container">
            <div className="section-label reveal">About</div>
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
            <div className="pstack reveal">
              {[".NET & C#", "React & TypeScript", "Microservices", "Cloud & DevOps", "SQL & NoSQL", "System Design"].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <div className="site-container">
            <div className="section-label reveal">Experience</div>
            {companiesData.companies.map((company, i) => (
              <div
                key={company.name}
                className="exp-row reveal reveal-stagger"
                style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className="exp-name">
                  {company.link && company.link !== "#" ? (
                    <a href={company.link} target="_blank" rel="noopener noreferrer">
                      {company.name}
                    </a>
                  ) : (
                    company.name
                  )}
                </span>
                <span className="exp-title">{company.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <div className="site-container">
            <div className="section-label reveal">Projects</div>
            {projectsData.projects.map((project) => (
              <div key={project.id} className="project reveal">
                <div className="project-top">
                  <span className="pname">
                    <ProjectIcon name={project.icon} />
                    {project.title}
                  </span>
                  <div className="plinks">
                    {project.liveLink && project.liveLink !== "#" && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </a>
                    )}
                    {project.githubLink && project.githubLink !== "#" && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="pdesc">{project.description}</p>
                <div className="pstack">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="site-container" style={{ textAlign: "center" }}>
            <div className="section-label reveal" style={{ justifyContent: "center" }}>
              <span>Contact</span>
            </div>
            <div className="contact-row reveal">
              <a href="mailto:mikheil.berishvili@outlook.com" className="gbtn">
                mikheil.berishvili@outlook.com
              </a>
              <a href="tel:+995591300569" className="gbtn">
                +995 591 30 05 69
              </a>
              <a href="https://linkedin.com/in/mberrishdev" target="_blank" rel="noopener noreferrer" className="gbtn">
                LinkedIn <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </section>

        <footer
          className="reveal"
          style={{ padding: "32px 0", textAlign: "center", fontSize: "12px", color: "var(--text-3)" }}
        >
          © {new Date().getFullYear()} Mikheil Berishvili
        </footer>
      </div>

      <ScrollToTopButton />
    </>
  );
}
