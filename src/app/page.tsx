import projectsData from "@/data/projects.json";
import companiesData from "@/data/companies.json";
import Image from "next/image";

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
                    className="object-contain"
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
    </div>
  );
}
