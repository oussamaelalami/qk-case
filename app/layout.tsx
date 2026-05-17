import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: { default: 'QK Case — Premium Custom Phone Cases', template: '%s | QK Case' },
  description: 'Découvrez des coques de téléphone personnalisées uniques. Protection militaire, expression artistique.',
  keywords: ['phone case', 'custom case', 'coque téléphone', 'personnalisé'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
