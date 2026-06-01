// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light:   'var(--color-primary-light)',
          dark:    'var(--color-primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          glow:    'var(--color-accent-glow)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          dark:    'var(--color-surface-dark)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          dark:    'var(--color-bg-dark)',
        },
        muted: 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
      borderRadius: {
        sm:  'var(--radius-sm)',
        md:  'var(--radius-md)',
        lg:  'var(--radius-lg)',
        xl:  'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'marquee':    'marqueeScroll 25s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marqueeScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(45, 214, 123, 0.15)' },
          '50%':      { boxShadow: '0 0 24px rgba(45, 214, 123, 0.4)' },
        },
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
