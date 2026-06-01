'use client'
// components/sections/hero.tsx

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Animated background: floating geometric blocks ─────────── */

interface Block {
  id: number
  x: string
  y: string
  width: number
  height: number
  rx: number
  opacity: number
  duration: number
  delay: number
  yRange: number
  rotate: number
  rotateRange: number
}

const BLOCKS: Block[] = [
  { id: 1, x: '6%',  y: '12%', width: 56,  height: 46,  rx: 9,  opacity: 0.07, duration: 9,  delay: 0,    yRange: 18, rotate: -8,  rotateRange: 4  },
  { id: 2, x: '14%', y: '58%', width: 88,  height: 36,  rx: 8,  opacity: 0.05, duration: 12, delay: 1.5,  yRange: 14, rotate: 6,   rotateRange: 3  },
  { id: 3, x: '72%', y: '8%',  width: 44,  height: 44,  rx: 8,  opacity: 0.08, duration: 10, delay: 0.8,  yRange: 22, rotate: 12,  rotateRange: 5  },
  { id: 4, x: '82%', y: '42%', width: 72,  height: 30,  rx: 7,  opacity: 0.06, duration: 14, delay: 2.2,  yRange: 16, rotate: -14, rotateRange: 4  },
  { id: 5, x: '88%', y: '72%', width: 36,  height: 56,  rx: 6,  opacity: 0.05, duration: 11, delay: 0.4,  yRange: 20, rotate: 18,  rotateRange: 6  },
  { id: 6, x: '48%', y: '78%', width: 52,  height: 22,  rx: 6,  opacity: 0.04, duration: 13, delay: 3,    yRange: 12, rotate: -4,  rotateRange: 3  },
  { id: 7, x: '32%', y: '4%',  width: 30,  height: 30,  rx: 6,  opacity: 0.06, duration: 8,  delay: 1.2,  yRange: 24, rotate: 22,  rotateRange: 7  },
  { id: 8, x: '60%', y: '62%', width: 60,  height: 26,  rx: 7,  opacity: 0.04, duration: 15, delay: 0.6,  yRange: 10, rotate: -20, rotateRange: 4  },
]

function FloatingBlock({ block, reduce }: { block: Block; reduce: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-lg"
      style={{
        left: block.x,
        top: block.y,
        width: block.width,
        height: block.height,
        borderRadius: block.rx,
        backgroundColor: 'var(--color-primary)',
        opacity: block.opacity,
        rotate: block.rotate,
        willChange: 'transform',
      }}
      animate={
        reduce
          ? {}
          : {
              y: [0, -block.yRange, 0],
              rotate: [block.rotate, block.rotate + block.rotateRange, block.rotate],
            }
      }
      transition={{
        duration: block.duration,
        delay: block.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ─── Animated code/tag line badges ─────────────────────────── */

const TAGS = [
  { label: 'Next.js 15', icon: '⬡' },
  { label: 'AI-Native',  icon: '◈' },
  { label: 'TypeScript', icon: '◇' },
  { label: 'React',      icon: '○' },
]

/* ─── Main Hero Component ────────────────────────────────────── */

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion() ?? false

  /* Framer variants */
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren:   shouldReduceMotion ? 0 : 0.15,
      },
    },
  }

  const fadeUp = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const fadeIn = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{
        minHeight: 'calc(100svh - 4.5rem)',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── Ambient background gradient ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(10,107,60,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 85% 80%, rgba(45,214,123,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 90%, rgba(10,107,60,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(10,107,60,0.13) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* ── Floating geometric blocks ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {BLOCKS.map((block) => (
          <FloatingBlock key={block.id} block={block} reduce={shouldReduceMotion} />
        ))}
      </div>

      {/* ── Main content ── */}
      <div
        className="section-container relative z-10 flex flex-col items-center text-center"
        style={{
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >

          {/* ── Headline ── */}
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="w-full"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              maxWidth: '900px',
              marginInline: 'auto',
            }}
          >
            We build digital{' '}
            <br className="hidden sm:block" />
            products that{' '}
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                think.
              </span>
              {/* Underline accent */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 bottom-1 h-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  width: '100%',
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  delay: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </span>
          </motion.h1>

          {/* ── Subheadline ── */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              maxWidth: '580px',
              marginInline: 'auto',
              marginTop: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            }}
          >
            Websites, web apps, PWAs, mobile apps, and custom AI solutions —
            engineered with precision for ambitious teams and bold ideas.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{ marginTop: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            <Link
              href="/contact"
              className="btn-primary group"
              style={{
                fontSize: '1rem',
                padding: '0.8125rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 20px rgba(10,107,60,0.2)',
              }}
            >
              Start Building
              <ArrowUpRight
                size={17}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              href="/work"
              className="btn-ghost group"
              style={{
                fontSize: '1rem',
                padding: '0.8125rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              View Our Work
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--color-primary)' }}
              />
            </Link>
          </motion.div>

          {/* ── Scroll indicator ── */}
          <motion.div
            variants={fadeIn}
            className="mt-14 md:mt-16 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Bottom fade-out ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
        }}
      />
    </section>
  )
}
