import type { Metadata } from "next";
import './styles/fonts.css';
import './styles/global.css';

export const metadata: Metadata = {
  title: 'Filmo',
  description: 'Cobertura de vídeos y fotos para colegios 🎓',
  icons: {
    icon: [
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/svg/filmo.svg', type: 'image/svg+xml' }
    ]
  },
  openGraph: {
    title: 'Filmo',
    description: 'Cobertura de vídeos y fotos para colegios 🎓',
    url: 'https://filmostudio.com',
    siteName: 'Filmo',
    images: [
      {
        url: 'https://filmostudio.com/og/filmo-og.png',
        width: 1200,
        height: 630,
        alt: 'Filmo'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filmo',
    description: 'Cobertura de vídeos y fotos para colegios 🎓',
    images: ['https://filmostudio.com/og/filmo-og.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body>
        {children}
      </body>
    </html>
  );
}
