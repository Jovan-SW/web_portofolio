import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #09090b 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38bdf8',
          fontWeight: 900,
          borderRadius: 36,
          border: '2px solid rgba(56, 189, 248, 0.4)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        J
      </div>
    ),
    {
      ...size,
    }
  );
}

