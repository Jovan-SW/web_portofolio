import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/data/seo-keywords';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: SEO_CONFIG.siteUrl,
  };
}

