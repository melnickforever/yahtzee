import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Yahtzee Score Table Generator | Dice Game Scorer',
  description: 'Free Yahtzee score calculator and table generator. Track scores for multiple players with automatic bonus calculations and built-in rules reference.',
  keywords: ['Yahtzee', 'score table', 'dice game', 'calculator', 'score tracker', 'game scorer'],
  authors: [{ name: 'Yahtzee Scorer Team' }],
  openGraph: {
    title: 'Yahtzee Score Table Generator',
    description: 'Free online tool to generate and calculate Yahtzee score tables. Track scores, calculate bonuses, and play by official rules.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yahtzee Score Table Generator',
    description: 'Free online Yahtzee score calculator with real-time bonus tracking',
  },
  robots: {
    index: true,
    follow: true,
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
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#007bff" />
        <link rel="canonical" href="https://yahtzee-scorer.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
