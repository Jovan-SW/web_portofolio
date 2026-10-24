/**
 * ==============================================================================
 * PORTFOLIO PROJECT TYPE DEFINITIONS (ENTERPRISE / INTERNATIONAL STANDARD)
 * ==============================================================================
 * 
 * Standardized data models for portfolio showcases, case studies, and engineering projects.
 * Designed to support rich SEO metadata, detailed case studies, quantifiable impact metrics,
 * structured tech stacks, and multi-platform media assets.
 * 
 * @author Senior Portfolio Architecture
 * @version 1.0.0
 */

// ------------------------------------------------------------------------------
// ENUMS & UNION TYPES
// ------------------------------------------------------------------------------

/**
 * Primary domain/category of the project.
 */
export type ProjectCategory =
  | 'Full-Stack'
  | 'Frontend'
  | 'Backend / API'
  | 'Mobile App'
  | 'AI & Machine Learning'
  | 'Cloud & DevOps'
  | 'Open Source'
  | 'CLI & Tooling'
  | 'UI/UX Design'
  | 'Web3 / Blockchain';

/**
 * Current lifecycle status of the project.
 */
export type ProjectStatus =
  | 'completed'       // Fully delivered and active
  | 'in-progress'     // Currently being developed
  | 'maintained'      // Actively maintained with updates
  | 'archived'        // Deprecated or legacy reference
  | 'concept';        // Prototype / design exploratory

/**
 * Categorization for tech stack items to enable filtered views (e.g. frontend vs backend).
 */
export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'ai-ml'
  | 'styling'
  | 'state-management'
  | 'testing'
  | 'tooling'
  | 'mobile';

/**
 * Supported media format types in the project gallery.
 */
export type ProjectMediaType = 'image' | 'video' | 'gif' | 'figma-embed' | 'interactive-embed';

/**
 * Directional trend for quantifiable metric highlights.
 */
export type MetricTrend = 'up' | 'down' | 'neutral';

/**
 * Repository hosting service provider.
 */
export type GitProvider = 'github' | 'gitlab' | 'bitbucket' | 'custom';

// ------------------------------------------------------------------------------
// SUB-SCHEMAS & DETAILED INTERFACES
// ------------------------------------------------------------------------------

/**
 * Tech stack element with rich contextual details.
 */
export interface TechStackItem {
  /** Technology name (e.g., 'Next.js', 'PostgreSQL', 'Docker') */
  name: string;
  /** Primary category of the technology */
  category: TechCategory;
  /** Icon identifier (Lucide icon name, SimpleIcons slug, or SVG path) */
  icon?: string;
  /** Major/Minor version used in the project (e.g., '15.1', '5.0') */
  version?: string;
  /** Specific architectural rationale for choosing this tool */
  purpose?: string;
  /** Whether this is a core highlight technology shown on summary badges */
  isPrimary?: boolean;
}

/**
 * Image or visual asset reference with optimization metadata (Next.js Image compliant).
 */
export interface MediaAsset {
  /** Relative or absolute URL to the asset */
  url: string;
  /** Accessible text description for screen readers and SEO */
  alt: string;
  /** Width in pixels for layout reservation */
  width?: number;
  /** Height in pixels for layout reservation */
  height?: number;
  /** Base64 blur placeholder or LQIP (Low Quality Image Placeholder) */
  blurDataUrl?: string;
  /** Caption or descriptive note displayed beneath the image */
  caption?: string;
}

/**
 * Media item inside an interactive gallery or carousel.
 */
export interface GalleryItem extends MediaAsset {
  /** Unique ID for React rendering keys */
  id: string;
  /** Media asset type */
  type: ProjectMediaType;
  /** Aspect ratio hint (e.g., '16/9', '4/3', '9/16') */
  aspectRatio?: '16/9' | '4/3' | '9/16' | '1/1' | string;
  /** Poster thumbnail if this item is a video */
  poster?: string;
}

/**
 * Repository details including privacy status and social metrics.
 */
export interface ProjectRepository {
  /** Direct URL to the repository */
  url: string;
  /** Git hosting service */
  provider: GitProvider;
  /** If the code is private/under NDA */
  isPrivate?: boolean;
  /** Star count (fetched or manual) */
  stars?: number;
  /** Fork count (fetched or manual) */
  forks?: number;
  /** Specific branch showcased (defaults to main) */
  branch?: string;
}

/**
 * Comprehensive link matrix for demos, documentation, and app stores.
 */
export interface ProjectLinks {
  /** Live interactive deployment URL (e.g., Vercel, Railway, custom domain) */
  demo?: string;
  /** Source code repository specification */
  repository?: ProjectRepository | string;
  /** In-depth case study article (Medium, Substack, Dev.to, or internal route) */
  caseStudy?: string;
  /** Documentation portal (e.g., Mintlify, GitBook, Swagger/OpenAPI) */
  documentation?: string;
  /** Figma design file or prototype */
  figma?: string;
  /** Package registry URL (npm, PyPI, Crates.io) */
  package?: string;
  /** Apple App Store listing */
  appStore?: string;
  /** Google Play Store listing */
  playStore?: string;
  /** Custom extra links (e.g., ProductHunt, YouTube demo, Press Release) */
  additional?: Array<{
    label: string;
    url: string;
    icon?: string;
  }>;
}

/**
 * Project media container (cover, thumbnail, gallery, video previews).
 */
export interface ProjectMedia {
  /** Compact card thumbnail (optimized for grid views & cards) */
  thumbnail?: MediaAsset;
  /** High-resolution hero banner for the project detail page */
  banner?: MediaAsset;
  /** Full interactive gallery showing screenshots and responsive states */
  gallery?: GalleryItem[];
  /** Short teaser/preview video or animation (e.g., MP4, WebM) */
  videoPreview?: {
    url: string;
    poster?: string;
    autoPlay?: boolean;
    aspectRatio?: '16/9' | '4/3' | '9/16' | '1/1';
  };
}

/**
 * Quantifiable business/technical impact metric (essential for senior portfolios).
 */
export interface ProjectMetric {
  /** Label describing what was measured (e.g., "Lighthouse Score", "Active Users", "Latency Reduction") */
  label: string;
  /** Highlighted stat value (e.g., "99/100", "120k+", "-45%", "$1.2M") */
  value: string;
  /** Contextual explanation of how this result was achieved */
  description?: string;
  /** Positive, negative, or neutral indicator */
  trend?: MetricTrend;
  /** Icon representation for visual cards */
  icon?: string;
}

/**
 * Breakdown of a specific technical challenge and its engineering solution.
 */
export interface ProjectChallenge {
  /** Problem title (e.g., "Real-time sync bottleneck with 10k concurrent WebSockets") */
  title: string;
  /** Context and symptoms of the issue */
  problem: string;
  /** Architectural or algorithmic solution implemented */
  solution: string;
  /** Outcome and performance delta */
  result?: string;
}

/**
 * Key feature breakdown with title, description, and preview screenshot.
 */
export interface ProjectFeature {
  /** Feature headline */
  title: string;
  /** Detailed feature explanation */
  description: string;
  /** Icon name (e.g. from Lucide) */
  icon?: string;
  /** Optional screenshot illustrating this specific capability */
  image?: MediaAsset;
}

/**
 * Client or organization context (for freelance, agency, or corporate projects).
 */
export interface ProjectClient {
  /** Company or organization name */
  name: string;
  /** Industry sector (e.g., 'Fintech', 'EdTech', 'Healthcare', 'E-Commerce') */
  industry?: string;
  /** Official company website */
  website?: string;
  /** Company logo URL */
  logo?: string;
  /** Geographic location or headquarters */
  location?: string;
}

/**
 * Project timeline and duration information.
 */
export interface ProjectTimeline {
  /** Start date (format: YYYY-MM or ISO-8601 or readable string like "Jan 2024") */
  startDate: string;
  /** End date (format: YYYY-MM, "Present", or undefined if ongoing) */
  endDate?: string;
  /** Human-readable duration (e.g., "4 months", "Ongoing") */
  duration?: string;
}

/**
 * Client or stakeholder testimonial validating work quality.
 */
export interface ProjectTestimonial {
  /** Person providing the recommendation */
  author: string;
  /** Professional title / position */
  role: string;
  /** Company name */
  company: string;
  /** Avatar photo URL */
  avatar?: string;
  /** Quote / recommendation text */
  quote: string;
  /** LinkedIn profile or public reference */
  linkedIn?: string;
}

/**
 * Search engine and social graph optimization metadata.
 */
export interface ProjectSEO {
  /** Custom title tag for detail page (defaults to project title) */
  metaTitle?: string;
  /** Custom meta description (defaults to project summary) */
  metaDescription?: string;
  /** Target keywords for search indexers */
  keywords?: string[];
  /** OpenGraph preview image URL (typically 1200x630) */
  ogImage?: string;
  /** Twitter card display style */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Canonical URL if syndicated */
  canonicalUrl?: string;
}

// ------------------------------------------------------------------------------
// MAIN PROJECT ENTITY
// ------------------------------------------------------------------------------

/**
 * Root Project Interface representing a single portfolio project item.
 * Conforms to modern international design standards for top-tier software engineering portfolios.
 */
export interface Project {
  // --- Core Identity & Routing ---
  /** Unique identifier (UUID or database ID) */
  id: string;
  /** Project display title */
  title: string;
  /** SEO-friendly URL slug (e.g., 'ai-task-orchestrator' for /projects/[slug]) */
  slug: string;
  /** Catchy one-liner elevator pitch */
  tagline: string;
  /** Primary category grouping */
  category: ProjectCategory;
  /** Secondary categories if cross-disciplinary */
  subCategories?: ProjectCategory[];
  /** Current development and delivery status */
  status: ProjectStatus;
  /** Displayed prominently on homepage / hero section */
  featured: boolean;
  /** Custom ordering priority (lower number = higher priority) */
  order?: number;

  // --- Dates & Metadata ---
  /** Project timeline and development duration */
  timeline: ProjectTimeline;
  /** When this portfolio entry was published (ISO 8601 string) */
  publishedAt: string;
  /** Last updated date of this project record (ISO 8601 string) */
  updatedAt?: string;

  // --- Narrative & Case Study Content ---
  /** Short synopsis (2-3 sentences) used for preview cards, tooltips, and feeds */
  summary: string;
  /** In-depth description or overview */
  description: string;
  /** Full markdown/MDX content for dedicated case study page */
  content?: string;
  /** Architectural overview or engineering summary */
  architectureOverview?: string;
  /** High-level problem definition this project aimed to solve */
  problemStatement?: string;
  /** Detailed architectural solution and approach */
  solution?: string;
  /** Key engineering takeaways and retrospective learnings */
  keyLearnings?: string[];
  /** Specific complex engineering challenges conquered */
  challenges?: ProjectChallenge[];
  /** Highlights of key capabilities & features */
  features?: ProjectFeature[];

  // --- Technical Specifications ---
  /** Detailed, categorized tech stack breakdown */
  techStack: TechStackItem[];
  /** Keyword tags for quick filtering, search indexing, and badges (e.g., ["Next.js", "AI", "PostgreSQL"]) */
  tags: string[];

  // --- Media & Assets ---
  /** Visual assets, thumbnails, banners, and interactive screenshots */
  media?: ProjectMedia;

  // --- External Connections ---
  /** External URLs (demo, source code, docs, designs, app store) */
  links: ProjectLinks;

  // --- Professional Context & Social Proof ---
  /** Your exact role in this project (e.g., "Lead Full-Stack Engineer", "Solo Creator", "Frontend Architect") */
  role: string;
  /** Specific key responsibilities held */
  responsibilities?: string[];
  /** Team context (e.g. "Solo", "Team of 5", "Cross-functional squad") */
  teamSize?: string | number;
  /** Client or organization details (if applicable) */
  client?: ProjectClient;
  /** Quantifiable metrics and performance achievements */
  metrics?: ProjectMetric[];
  /** Testimonial or stakeholder review */
  testimonial?: ProjectTestimonial;

  // --- SEO & Social Sharing ---
  /** OpenGraph and Meta tags configuration */
  seo?: ProjectSEO;
}

// ------------------------------------------------------------------------------
// UTILITY & QUERY TYPES
// ------------------------------------------------------------------------------

/**
 * Filter options for querying or filtering projects on a portfolio page.
 */
export interface ProjectFilterCriteria {
  /** Filter by category */
  category?: ProjectCategory | 'All';
  /** Filter by technology tag (e.g., 'TypeScript', 'Docker') */
  tag?: string;
  /** Filter only featured projects */
  featuredOnly?: boolean;
  /** Filter by current status */
  status?: ProjectStatus;
  /** Free-text search keyword */
  searchQuery?: string;
}

/**
 * Sorting options for project listings.
 */
export type ProjectSortOption =
  | 'featured-first'
  | 'newest'
  | 'oldest'
  | 'alphabetical'
  | 'custom-order';

/**
 * Summary representation for lightweight listings (cards, mini-grids, RSS).
 */
export type ProjectCardData = Pick<
  Project,
  | 'id'
  | 'title'
  | 'slug'
  | 'tagline'
  | 'summary'
  | 'category'
  | 'status'
  | 'featured'
  | 'media'
  | 'tags'
  | 'links'
  | 'timeline'
  | 'role'
>;

/**
 * Grouped projects structure for categorized showcase sections.
 */
export interface GroupedProjects {
  category: ProjectCategory;
  projects: Project[];
}
