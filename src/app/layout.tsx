import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Success in Eternity — Islamic Lectures by Dr. Mamdouh Salama',
  description:
    'An Islamic lecture platform featuring Quranic reflections, surah theme analyses, and educational videos by Dr. Mamdouh Salama — a distinguished scholar and MIT graduate.',
  keywords: [
    'Islamic lectures',
    'Quran',
    'Surah themes',
    'Dr. Mamdouh Salama',
    'Tadabbur',
    'Islamic education',
  ],
  openGraph: {
    title: 'Success in Eternity — Islamic Lectures by Dr. Mamdouh Salama',
    description:
      'Quranic reflections and Islamic educational content by Dr. Mamdouh Salama.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
