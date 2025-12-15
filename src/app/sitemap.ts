import { MetadataRoute } from 'next'
import meta from '@/data/meta.json'
import projectsData from '@/data/projects.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = meta.siteUrl

  // Get all project URLs with live links
  const projectUrls = projectsData.projects
    .filter(project => project.liveLink && project.liveLink !== '#')
    .map(project => ({
      url: project.liveLink,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
  ]
}
