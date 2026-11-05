import { SEO_CONFIG } from '@/data/seo-keywords';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SEO_CONFIG.siteUrl}/#person`,
        name: SEO_CONFIG.name,
        alternateName: SEO_CONFIG.alternateNames,
        jobTitle: SEO_CONFIG.role,
        description: SEO_CONFIG.defaultDescription,
        url: SEO_CONFIG.siteUrl,
        image: `${SEO_CONFIG.siteUrl}/img/inimahgw.png`,
        email: `mailto:${SEO_CONFIG.email}`,
        nationality: {
          '@type': 'Country',
          name: SEO_CONFIG.locationDetails.country,
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: SEO_CONFIG.locationDetails.countryCode,
        },
        sameAs: [
          SEO_CONFIG.social.github,
          SEO_CONFIG.social.linkedin,
          SEO_CONFIG.social.website,
        ],
        knowsAbout: SEO_CONFIG.knowsAbout,
      },
      {
        '@type': 'WebSite',
        '@id': `${SEO_CONFIG.siteUrl}/#website`,
        url: SEO_CONFIG.siteUrl,
        name: `Portofolio ${SEO_CONFIG.name}`,
        alternateName: `${SEO_CONFIG.name} - ${SEO_CONFIG.role} Indonesia`,
        description: SEO_CONFIG.defaultDescription,
        inLanguage: ['id-ID', 'en-US'],
        publisher: {
          '@id': `${SEO_CONFIG.siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SEO_CONFIG.siteUrl}/#profilepage`,
        url: SEO_CONFIG.siteUrl,
        name: `${SEO_CONFIG.name} | Portofolio ${SEO_CONFIG.role} Indonesia`,
        isPartOf: {
          '@id': `${SEO_CONFIG.siteUrl}/#website`,
        },
        mainEntity: {
          '@id': `${SEO_CONFIG.siteUrl}/#person`,
        },
        description: SEO_CONFIG.defaultDescription,
        inLanguage: 'id-ID',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

