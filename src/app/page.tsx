import projectsData from "@/data/projects.json";
import companiesData from "@/data/companies.json";
import Image from "next/image";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50 rounded-3xl" />
        <div className="relative space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block text-gray-900">Mikheil</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Berishvili</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed text-balance">
              Full-Stack Developer from Georgia 🇬🇪 crafting elegant solutions
              for complex problems. Passionate about building performant,
              scalable applications with modern technologies.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Projects
            </a>
            <a
              href="mailto:mikheil.berishvili@outlook.com"
              className="btn-secondary"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </a>
            <a
              href="https://drive.google.com/file/d/1PKL2O3Jd1YmBL4gNkTghjmIyMU7TcfTZ/view?usp=sharing"
              className="btn-secondary"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="section-heading">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="section-description">
              With years of experience in full-stack development, I specialize in building scalable,
              high-performance applications that solve real-world problems. My expertise spans from
              modern frontend frameworks to robust backend systems.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I thrive on tackling complex challenges and transforming them into elegant,
              maintainable solutions. Whether it&apos;s architecting microservices, optimizing database
              performance, or crafting intuitive user interfaces, I bring a meticulous approach
              to every project.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Core Expertise</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">.NET & C#</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">React & TypeScript</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Microservices</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Cloud & DevOps</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">SQL & NoSQL</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">System Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="section-heading">Experience</h2>
          <p className="section-description max-w-2xl">
            Trusted by leading organizations across finance, technology, and enterprise sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesData.companies.map((company) => (
            <a
              key={company.name}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex h-full items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={64}
                    height={64}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.role}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <div className="space-y-3">
          <h2 className="section-heading">Selected Work</h2>
          <p className="section-description max-w-2xl">
            A collection of projects demonstrating expertise in full-stack development,
            system architecture, and scalable solutions.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projectsData.projects.map((project) => (
            <div key={project.id} className="card group relative">
              {project.liveLink && project.liveLink !== "#" ? (
                <a
                  href={project.liveLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.githubLink && project.githubLink !== "#" && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}
                </a>
              ) : (
                <div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.githubLink && project.githubLink !== "#" && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="section-heading">Let&apos;s Connect</h2>
          <p className="section-description max-w-xl mx-auto">
            Interested in collaborating or have a project in mind? Feel free to reach out.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex flex-col sm:flex-row w-full justify-around items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#2563eb"
                    strokeWidth="2"
                    d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
                  />
                  <path stroke="#2563eb" strokeWidth="2" d="m5 7 7 6 7-6" />
                </svg>
              </span>
              <a
                href="mailto:mikheil.berishvili@outlook.com"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                mikheil.berishvili@outlook.com
              </a>
            </div>
            <div className="hidden sm:block h-12 border-l border-gray-300" />
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#2563eb"
                    strokeWidth="2"
                    d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z"
                  />
                </svg>
              </span>
              <a
                href="tel:+995591300569"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                +995 591 30 05 69
              </a>
            </div>
            <div className="hidden sm:block h-12 border-l border-gray-300" />
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    stroke="#2563eb"
                    strokeWidth="2"
                    rx="5"
                  />
                  <path
                    stroke="#2563eb"
                    strokeWidth="2"
                    d="M7 17v-6M7 7v.01M12 17v-3a2 2 0 1 1 4 0v3"
                  />
                </svg>
              </span>
              <a
                href="https://linkedin.com/in/mberrishdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                linkedin.com/in/mberrishdev
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Mikheil Berishvili. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/mberrishdev"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mberrish"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}
