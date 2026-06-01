// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for catching potential issues
  reactStrictMode: true,

  // Image optimization domains (add your CDN/storage domains here)
  images: {
    remotePatterns: [
      // Example: { protocol: 'https', hostname: 'assets.buildit.agency' }
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for Next.js 15
  experimental: {
    // Optimizes CSS output
    optimizeCss: true,
  },
}

export default nextConfig
