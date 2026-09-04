import projectsData from "@/data/projects.json";

export type Project = (typeof projectsData.projects)[number];

export const allProjects: Project[] = projectsData.projects;

/** Projects with enough unique substance to justify an indexable page. */
export const pagedProjects: Project[] = allProjects.filter(
  (p) => p.hasPage && p.overview.length > 0
);

export function getProjectBySlug(slug: string): Project | undefined {
  return pagedProjects.find((p) => p.slug === slug);
}

export function projectPath(project: Project): string | null {
  return project.hasPage && project.overview.length > 0
    ? `/projects/${project.slug}`
    : null;
}

/** The canonical outbound link for a project: live site first, else source. */
export function primaryLink(project: Project): string | null {
  if (project.liveLink && project.liveLink !== "#") return project.liveLink;
  if (project.githubLink && project.githubLink !== "#") return project.githubLink;
  return null;
}

export function hasLive(project: Project): boolean {
  return Boolean(project.liveLink && project.liveLink !== "#");
}

export function hasSource(project: Project): boolean {
  return Boolean(project.githubLink && project.githubLink !== "#");
}

/** "2026-08" -> "August 2026"; empty stays empty. */
export function formatCreated(created: string): string {
  if (!created) return "";
  const [y, m] = created.split("-");
  if (!m) return y;
  const month = new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  return `${month} ${y}`;
}
