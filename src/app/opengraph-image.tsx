import { ImageResponse } from 'next/og';
import { SEO_CONFIG } from '@/data/seo-keywords';

export const alt = `${SEO_CONFIG.name} - ${SEO_CONFIG.role} Indonesia`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(56, 189, 248, 0.08) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          border: '8px solid #18181b',
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                boxShadow: '0 0 16px #38bdf8',
              }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#94a3b8',
                textTransform: 'uppercase',
              }}
            >
              jovansw.is-a.dev
            </span>
          </div>

          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              color: '#7dd3fc',
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            Indonesia (UTC+7)
          </span>
        </div>

        {/* Center Main Identity */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: '-1.5px',
              margin: 0,
              color: '#f8fafc',
              textShadow: '0 4px 24px rgba(0,0,0,0.8)',
            }}
          >
            {SEO_CONFIG.name}
          </h1>

          <p
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#38bdf8',
              margin: 0,
            }}
          >
            {SEO_CONFIG.role}
          </p>

          <p
            style={{
              fontSize: 20,
              color: '#cbd5e1',
              maxWidth: '900px',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Next.js App Router • React • TypeScript • PostgreSQL • Sistem Web Performa Tinggi
          </p>
        </div>

        {/* Bottom Bar: Quick Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #27272a',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px' }}>
            {['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Architecture'].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 16,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    color: '#e2e8f0',
                    border: '1px solid #27272a',
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>

          <span
            style={{
              fontSize: 18,
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            Official Portfolio & Case Studies
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

