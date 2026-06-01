'use client'
// components/sections/featured-work.tsx

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────── */

interface Project {
  id: number
  slug: string
  category: string
  title: string
  description: string
  tags: string[]
  year: string
  accentColor: string
  bgPattern: 'grid' | 'dots' | 'lines'
  featured: boolean
}

/* ─── Data ───────────────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'agritrack',
    category: 'Web App · AI Integration',
    title: 'AgriTrack',
    description:
      'A farm management platform with AI-powered yield forecasting and real-time crop monitoring for smallholder farmers across West Africa.',
    tags: ['Next.js', 'Python', 'ML', 'PostgreSQL'],
    year: '2024',
    accentColor: '#0A6B3C',
    bgPattern: 'grid',
    featured: true,
  },
  {
    id: 2,
    slug: 'payvault',
    category: 'Mobile App · PWA',
    title: 'PayVault',
    description:
      'Cross-platform fintech app for savings groups and cooperative lending, with offline-first sync and biometric auth.',
    tags: ['React Native', 'Expo', 'Node.js', 'SQLite'],
    year: '2024',
    accentColor: '#12894D',
    bgPattern: 'dots',
    featured: false,
  },
  {
    id: 3,
    slug: 'lexai',
    category: 'AI Tool · Web App',
    title: 'LexAI',
    description:
      'Legal document intelligence platform that extracts clauses, flags risks, and summarises contracts using fine-tuned LLMs.',
    tags: ['RAG', 'OpenAI', 'Next.js', 'Pinecone'],
    year: '2025',
    accentColor: '#074D2B',
    bgPattern: 'lines',
    featured: false,
  },
]

/* ─── SVG Background Patterns ────────────────────────────────── */

function PatternGrid({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid-pat" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            strokeOpacity="0.35"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pat)" />
    </svg>
  )
}

function PatternDots({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots-pat" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={color} fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-pat)" />
    </svg>
  )
}

function PatternLines({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="lines-pat" width="20" height="20" patternUnits="userSpaceOnUse">
          <line
            x1="0" y1="20" x2="20" y2="0"
            stroke={color}
            strokeWidth="0.6"
            strokeOpacity="0.28"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lines-pat)" />
    </svg>
  )
}

const PATTERNS = {
  grid:  PatternGrid,
  dots:  PatternDots,
  lines: PatternLines,
}

/* ─── Project Card — Featured (large) ───────────────────────── */

interface CardProps {
  project: Project
  index: number
  inView: boolean
  reduce: boolean
}

function FeaturedCard({ project, index, inView, reduce }: CardProps) {
  const Pattern = PATTERNS[project.bgPattern]

  const variants = {
    hidden:  { opacity: 0, y: reduce ? 0 : 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      whileHover={
        reduce ? {} : {
          y: -5,
          boxShadow: '0 20px 48px rgba(10,107,60,0.12)',
          transition: { duration: 0.22, ease: 'easeOut' },
        }
      }
    >
      {/* Visual area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 'clamp(200px, 28vw, 280px)',
          backgroundColor: project.accentColor,
        }}
      >
        <Pattern color="#ffffff" />

        {/* Geometric logo blocks — decorative echo of brand mark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.12 }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <rect x="4"  y="4"  width="52" height="44" rx="6" fill="white" />
            <rect x="4"  y="54" width="52" height="42" rx="6" fill="white" />
            <rect x="62" y="4"  width="34" height="20" rx="5" fill="white" />
            <rect x="62" y="30" width="34" height="20" rx="5" fill="white" />
            <rect x="62" y="56" width="34" height="40" rx="5" fill="white" />
          </svg>
        </div>

        {/* Year badge */}
        <span
          className="absolute top-4 left-5"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.08em',
          }}
        >
          {project.year}
        </span>

        {/* Arrow button — reveals on hover */}
        <motion.div
          className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileHover={{ opacity: 1, scale: 1 }}
          animate={reduce ? { opacity: 1 } : undefined}
        >
          <ExternalLink size={15} strokeWidth={2} style={{ color: 'white' }} />
        </motion.div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${project.accentColor}, transparent)`,
          }}
        />
      </div>

      {/* Content area */}
      <div className="p-6">
        <p
          className="mb-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
          }}
        >
          {project.category}
        </p>

        <h3
          className="mb-2.5"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
          }}
        >
          {project.title}
        </h3>

        <p
          className="mb-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--color-text-muted)',
          }}
        >
          {project.description}
        </p>

        {/* Tags + CTA row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  padding: '3px 9px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 flex-shrink-0 transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--color-primary-light)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
          >
            View case study
            <ArrowUpRight
              size={15}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2.5px]"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor}, var(--color-accent))`,
          scaleX: 0,
          originX: 0,
        }}
        whileHover={reduce ? {} : { scaleX: 1, transition: { duration: 0.28, ease: 'easeOut' } }}
      />
    </motion.article>
  )
}

/* ─── Featured Work Section ──────────────────────────────────── */

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion() ?? false

  const headingVariants = {
    hidden:  { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section
      id="work"
      ref={ref}
      aria-labelledby="work-heading"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
        >
          <motion.p
            variants={headingVariants}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '0.75rem',
            }}
          >
            Selected work
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <motion.h2
              id="work-heading"
              variants={headingVariants}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text)',
              }}
            >
              Problems solved.
              <br />
              Products shipped.
            </motion.h2>

            <motion.div variants={headingVariants}>
              <Link
                href="/work"
                className="btn-ghost inline-flex items-center gap-2"
                style={{ fontSize: '0.9375rem' }}
              >
                See all projects
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        {/* First card spans full width on md+, others split */}
        <div className="space-y-5">

          {/* Row 1 — full-width featured card */}
          <div className="grid grid-cols-1">
            <FeaturedCard
              project={PROJECTS[0]}
              index={0}
              inView={inView}
              reduce={reduce}
            />
          </div>

          {/* Row 2 — two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(1).map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i + 1}
                inView={inView}
                reduce={reduce}
              />
            ))}
          </div>

        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.45 }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                marginBottom: '2px',
              }}
            >
              Your project could be next.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
              }}
            >
              We take on a limited number of projects each quarter.
            </p>
          </div>

          <Link
            href="/contact"
            className="btn-primary flex-shrink-0"
            style={{ fontSize: '0.9375rem', padding: '0.75rem 1.5rem' }}
          >
            Start a project
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}