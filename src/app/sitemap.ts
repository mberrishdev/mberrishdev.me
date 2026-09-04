import { MetadataRoute } from "next";
import meta from "@/data/meta.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = meta.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
