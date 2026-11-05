import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA, getProjectBySlug } from '@/data/projects';
import { SEO_CONFIG } from '@/data/seo-keywords';
import ProjectDetailContent from '@/components/projects/ProjectDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: `Proyek Tidak Ditemukan | ${SEO_CONFIG.name}`,
    };
  }

  const title = project.seo?.metaTitle || `${project.title} — Studi Kasus`;
  const description =
    project.seo?.metaDescription ||
    `${project.summary} Oleh ${SEO_CONFIG.name}, ${SEO_CONFIG.role} Indonesia.`;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/projects/${slug}`;

  return {
    title,
    description,
    keywords: [
      ...(project.seo?.keywords || []),
      SEO_CONFIG.name,
      'Portofolio Jovan Sebastian William',
      'Full Stack Developer Indonesia',
      project.title,
      project.category,
    ],
    authors: [{ name: SEO_CONFIG.name, url: SEO_CONFIG.siteUrl }],
    creator: SEO_CONFIG.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | ${SEO_CONFIG.name}`,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      authors: [SEO_CONFIG.siteUrl],
      images: project.media?.thumbnail?.url ? [{ url: project.media.thumbnail.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${SEO_CONFIG.name}`,
      description,
      images: project.media?.thumbnail?.url ? [project.media.thumbnail.url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${SEO_CONFIG.siteUrl}/projects/${slug}`;

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: SEO_CONFIG.siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Proyek',
            item: `${SEO_CONFIG.siteUrl}/#projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${projectUrl}#work`,
        headline: project.title,
        name: project.title,
        description: project.summary,
        url: projectUrl,
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.name,
          url: SEO_CONFIG.siteUrl,
        },
        creator: {
          '@type': 'Person',
          name: SEO_CONFIG.name,
          url: SEO_CONFIG.siteUrl,
        },
        datePublished: project.publishedAt,
        dateModified: project.updatedAt,
        image: project.media?.thumbnail?.url ? `${SEO_CONFIG.siteUrl}${project.media.thumbnail.url}` : undefined,
        keywords: [
          SEO_CONFIG.name,
          'Full Stack Developer Indonesia',
          project.title,
          project.category,
          ...(project.tags || []),
        ].join(', '),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailContent slug={slug} initialProject={project} />
    </>
  );
}
