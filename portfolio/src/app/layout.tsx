import type { Metadata } from 'next';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashLoading from '@/components/SplashLoading';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import ApiBanner from '@/components/ApiBanner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portofolio Musyami',
  description: 'Portofolio interaktif bertema kartu remi karya Muhammad Rasya Islami (Musyami)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ApiBanner />
        <SplashLoading />
        <i className="amb" style={{ left: '-120px', top: '-100px' }} />
        <i className="amb" style={{ right: '-160px', top: '55vh' }} />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Toast />
      </body>
    </html>
  );
}
