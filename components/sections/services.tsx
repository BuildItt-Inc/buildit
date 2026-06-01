'use client'
// components/sections/services.tsx

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Globe, LayoutDashboard, Smartphone, Zap, Bot, Puzzle } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────── */

interface Service {
  id: number
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }>
  label: string
  title: string
  description: string
  tags: string[]
  accent: boolean
}

/* ─── Data ───────────────────────────────────────────────────── */

const SERVICES: Service[] = [
  {
    id: 1,
    icon: Globe,
    label: '01',
    title: 'Websites',
    description:
      'High-performance marketing sites, landing pages, and corporate platforms built for speed, SEO, and conversion. Pixel-precise on every screen.',
    tags: ['Next.js', 'CMS', 'SEO', 'Animation'],
    accent: false,
  },
  {
    id: 2,
    icon: LayoutDashboard,
    label: '02',
    title: 'Web Apps',
    description:
      'Full-stack web applications with complex logic, real-time features, authentication, and dashboards. Engineered to scale.',
    tags: ['React', 'TypeScript', 'APIs', 'Auth'],
    accent: false,
  },
  {
    id: 3,
    icon: Zap,
    label: '03',
    title: 'PWAs',
    description:
      'Progressive web apps that work offline, install on any device, and deliver native-app experiences — without the App Store.',
    tags: ['Offline-first', 'Push', 'Installable'],
    accent: true,
  },
  {
    id: 4,
    icon: Smartphone,
    label: '04',
    title: 'Mobile Apps',
    description:
      'Cross-platform iOS and Android apps built with React Native. One codebase, two stores, full native performance.',
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
    accent: false,
  },
  {
    id: 5,
    icon: Bot,
    label: '05',
    title: 'AI Tools',
    description:
      'Custom AI-powered tools — chatbots, document processors, content engines, and intelligent workflows — built for your exact use case.',
    tags: ['LLMs', 'RAG', 'Fine-tuning', 'Agents'],
    accent: false,
  },
  {
    id: 6,
    icon: Puzzle,
    label: '06',
    title: 'AI Integrations',
    description:
      'Embed AI into your existing product or workflow. We connect models, APIs, and data pipelines so intelligence becomes part of your stack.',
    tags: ['OpenAI', 'Anthropic', 'Webhooks', 'APIs'],
    accent: false,
  },
]

/* ─── Service Card ───────────────────────────────────────────── */

interface ServiceCardProps {
  service: Service
  index: number
  inView: boolean
  reduce: boolean
}

function ServiceCard({ service, index, inView, reduce }: ServiceCardProps) {
  const Icon = service.icon

  const cardVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn(
        'group relative flex flex-col p-6 lg:p-7 rounded-2xl',
        'transition-all duration-300 ease-out',
        'border',
      )}
      style={{
        backgroundColor: service.accent
          ? 'var(--color-primary)'
          : 'var(--color-surface)',
        borderColor: service.accent
          ? 'var(--color-primary-dark)'
          : 'var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      whileHover={
        reduce
          ? {}
          : {
              y: -4,
              boxShadow: service.accent
                ? '0 16px 40px rgba(10,107,60,0.3)'
                : '0 16px 40px rgba(10,107,60,0.10)',
              transition: { duration: 0.2, ease: 'easeOut' },
            }
      }
    >
      {/* Top row: number label + icon */}
      <div className="flex items-start justify-between mb-5">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: service.accent
              ? 'rgba(240,247,241,0.5)'
              : 'var(--color-text-muted)',
          }}
        >
          {service.label}
        </span>

        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300"
          style={{
            backgroundColor: service.accent
              ? 'rgba(255,255,255,0.12)'
              : 'var(--color-accent-glow)',
          }}
        >
          <Icon
            size={19}
            strokeWidth={1.75}
            style={{
              color: service.accent ? 'var(--color-accent)' : 'var(--color-primary)',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          color: service.accent ? 'var(--color-text-light)' : 'var(--color-text)',
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="flex-1 mb-5"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          lineHeight: 1.65,
          color: service.accent
            ? 'rgba(240,247,241,0.75)'
            : 'var(--color-text-muted)',
        }}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
              padding: '3px 9px',
              borderRadius: '4px',
              backgroundColor: service.accent
                ? 'rgba(255,255,255,0.1)'
                : 'var(--color-bg)',
              color: service.accent
                ? 'rgba(240,247,241,0.7)'
                : 'var(--color-text-muted)',
              border: `1px solid ${
                service.accent
                  ? 'rgba(255,255,255,0.12)'
                  : 'var(--color-border)'
              }`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover accent line — bottom edge */}
      {!service.accent && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            scaleX: 0,
            originX: 0,
          }}
          whileHover={reduce ? {} : { scaleX: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}
    </motion.article>
  )
}

/* ─── Services Section ───────────────────────────────────────── */

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion() ?? false

  const headingVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="section-container">

        {/* ── Section header ── */}
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
            What we build
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              id="services-heading"
              variants={headingVariants}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text)',
                maxWidth: '480px',
              }}
            >
              Everything your
              <br />
              product needs.
            </motion.h2>

            <motion.p
              variants={headingVariants}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-text-muted)',
                maxWidth: '340px',
              }}
            >
              From concept to deployment — we cover the full stack so you can focus on what matters.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          className="grid gap-4 sm:gap-5"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              inView={inView}
              reduce={reduce}
            />
          ))}
        </div>

      </div>
    </section>
  )
}