import type { Metadata } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Jovan | Full-Stack Engineer & Product Builder',
  description:
    'Web portofolio Jovan — Full-Stack Engineer yang berfokus pada ekosistem Next.js, React, TypeScript, dan arsitektur aplikasi digital modern.',
  keywords: [
    'Jovan',
    'Full-Stack Developer',
    'Next.js Portfolio',
    'Software Engineer Indonesia',
    'Frontend Developer',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Jovan' }],
  openGraph: {
    title: 'Jovan | Full-Stack Engineer & Product Builder',
    description:
      'Web portofolio Jovan — Full-Stack Engineer yang berfokus pada ekosistem Next.js, React, TypeScript, dan arsitektur aplikasi digital modern.',
    type: 'website',
    locale: 'id_ID',
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
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,800,700,600,500,400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
