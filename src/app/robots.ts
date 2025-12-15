import { MetadataRoute } from 'next'
import meta from '@/data/meta.json'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${meta.siteUrl}/sitemap.xml`,
    host: meta.siteUrl,
  }
}
