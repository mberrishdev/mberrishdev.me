import projectsData from "@/data/projects.json";
import companiesData from "@/data/companies.json";
import Image from "next/image";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
        <div className="relative space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl">
              <span className="block text-gray-900">Mikheil</span>
              <span className="block text-gray-600">Berishvili</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Full-Stack Developer from Georgia 🇬🇪, crafting elegant solutions
              for complex problems. Passionate about building performant,
              scalable applications with modern technologies.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a
              href="mailto:mikheil.berishvili@outlook.com"
              className="btn-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Companies I&apos;ve Worked With
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            height: "100%",
          }}
        >
          {companiesData.companies.map((company) => (
            <a
              key={company.name}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                key={company.name}
                className="flex h-[200px] items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {company.name}
                  </h3>
                  <p className="text-gray-600">{company.role}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div className="flex justify-center mt-20">
        <div className="w-full  bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200 rounded-2xl shadow-lg px-8 py-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
          <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-6">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              {/* Email SVG */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"/><path stroke="#2563eb" strokeWidth="2" d="m5 7 7 6 7-6"/></svg>
              </span>
              <a href="mailto:mikheil.berishvili@outlook.com" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                mikheil.berishvili@outlook.com
              </a>
            </div>
            <div className="hidden sm:block h-8 border-l border-gray-200" />
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              {/* Phone SVG */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z"/></svg>
              </span>
              <a href="tel:+995591300569" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                +995 591 30 05 69
              </a>
            </div>
            <div className="hidden sm:block h-8 border-l border-gray-200" />
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              {/* LinkedIn SVG */}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" stroke="#2563eb" strokeWidth="2" rx="5"/><path stroke="#2563eb" strokeWidth="2" d="M7 17v-6M7 7v.01M12 17v-3a2 2 0 1 1 4 0v3"/></svg>
              </span>
              <a href="https://linkedin.com/in/mberrishdev" target="_blank" rel="noopener noreferrer" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                linkedin.com/in/mberrishdev
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Selected Work
          </h2>
          <p className="text-gray-600 max-w-2xl">
            A collection of projects that showcase my expertise in full-stack
            development, user experience design, and problem-solving.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projectsData.projects.map((project) => (
            <div key={project.id} className="card group relative">
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
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            © 2024 Mikheil Berishvili. All rights reserved.
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
