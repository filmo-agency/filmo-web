import type { Metadata } from "next";
import './styles/fonts.css';
import './styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://filmostudio.com'),
  applicationName: 'Filmo',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/svg/filmo.svg', type: 'image/svg+xml' }
    ]
  },
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
