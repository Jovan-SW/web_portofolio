import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA, getProjectBySlug } from '@/data/projects';
import ProjectDetailContent from '@/components/projects/ProjectDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

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
      title: 'Proyek Tidak Ditemukan | Jovan Portfolio',
    };
  }

  return {
    title: project.seo?.metaTitle || `${project.title} | Studi Kasus Rekayasa Perangkat Lunak`,
    description: project.seo?.metaDescription || project.summary,
    keywords: project.seo?.keywords || [project.title, project.category, 'Full-Stack Developer'],
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      images: project.media?.thumbnail?.url ? [{ url: project.media.thumbnail.url }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent slug={slug} initialProject={project} />;
}
