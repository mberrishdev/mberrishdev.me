import { MetadataRoute } from "next";
import meta from "@/data/meta.json";
import { pagedProjects } from "@/lib/projects";

/**
 * Only URLs on this origin belong here. External project links
 * (getcamus.app, xarji.app, nuget.org, …) are deliberately excluded — a
 * sitemap may only declare URLs you control — and fragment URLs (#about) are
 * not separate documents, so Google discards them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = meta.siteUrl;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...pagedProjects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
