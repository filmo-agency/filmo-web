import type { Metadata } from "next";
import './styles/fonts.css';
import './styles/global.css';

export const metadata: Metadata = {
  title: "• Filmo •",
  description: "Filmo",
  icons: {
    icon: '/svg/filmo.svg'
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
