// app/layout.tsx

import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'

/* ─── Font Configuration ──────────────────────────────────── */

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false, // mono font — load lazily
})

/* ─── Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'BuildIt — AI-Native Product Studio',
    template: '%s | BuildIt',
  },
  description:
    'BuildIt is a product studio shipping AI-powered subscription software for emerging markets. We build it. You subscribe.',
  keywords: [
    'product studio',
    'AI products',
    'subscription software',
    'emerging markets',
    'Africa',
    'Nigeria',
    'SaaS',
    'Next.js',
    'React',
    'AI tools',
    'Abuja',
    'African tech',
  ],
  authors: [{ name: 'BuildIt' }],
  creator: 'BuildIt',
  metadataBase: new URL('https://buildit.agency'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://buildit.agency',
    siteName: 'BuildIt',
    title: 'BuildIt — AI-Native Product Studio',
    description:
      'We build AI-powered subscription tools for emerging markets. Solving real problems for the people the world\'s software ignores.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BuildIt — AI-Native Product Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildIt — AI-Native Product Studio',
    description: 'AI-powered subscription tools for emerging markets. Built in Abuja, shipped globally.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#F8FAF8',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

/* ─── Root Layout ─────────────────────────────────────────── */

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:rounded-md focus:bg-white focus:text-primary focus:font-semibold focus:shadow-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  )
}
