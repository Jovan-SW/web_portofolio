import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '@/data/projects';
import { SEO_CONFIG } from '@/data/seo-keywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;

  const projectUrls: MetadataRoute.Sitemap = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectUrls,
  ];
}

