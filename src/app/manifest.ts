import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/data/seo-keywords';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_CONFIG.name} | ${SEO_CONFIG.role}`,
    short_name: 'Jovan Portfolio',
    description: SEO_CONFIG.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/img/inimahgw.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

