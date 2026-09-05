import { MetadataRoute } from "next";
import meta from "@/data/meta.json";
import { pagedProjects } from "@/lib/projects";
import { getPosts } from "@/lib/blog";

/**
 * Only URLs on this origin belong here. External project links
 * (getcamus.app, xarji.app, nuget.org, …) are deliberately excluded — a
 * sitemap may only declare URLs you control — and fragment URLs (#about) are
 * not separate documents, so Google discards them.
 *
 * /blog appears only once a post exists, matching the 404 in the route itself.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = meta.siteUrl;
  const lastModified = new Date();
  const posts = await getPosts();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
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
    ...(posts.length > 0
      ? [
          {
            url: `${baseUrl}/blog`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          ...posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated ?? post.date),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          })),
        ]
      : []),
  ];
}
