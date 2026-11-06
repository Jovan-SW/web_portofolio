import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import JsonLd from '@/components/seo/JsonLd';
import { SEO_CONFIG } from '@/data/seo-keywords';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const newsreader = Newsreader({
  variable: '--font-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  applicationName: `Portofolio ${SEO_CONFIG.name}`,
  authors: [{ name: SEO_CONFIG.name, url: SEO_CONFIG.siteUrl }],
  creator: SEO_CONFIG.name,
  publisher: SEO_CONFIG.name,
  keywords: SEO_CONFIG.keywords,
  category: 'technology',
  classification: 'Portfolio, Software Engineering, Full Stack Web Development',
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
      'en-US': '/',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    siteName: `Portofolio ${SEO_CONFIG.name}`,
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SEO_CONFIG.name} | ${SEO_CONFIG.role} Indonesia`,
    description: SEO_CONFIG.defaultDescription,
  },
  verification: {
    google: 'KeVtt_czP_Gp-4InBVlZF_krqOSX-psBjft9DBY3E28',
  },
  other: {
    'geo.region': 'ID',
    'geo.placename': 'Indonesia',
    'target': 'all',
    'rating': 'general',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased dark scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,800,700,600,500,400&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
