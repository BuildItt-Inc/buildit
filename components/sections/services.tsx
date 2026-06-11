'use client'
// components/sections/services.tsx

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Sprout, Wallet, ScrollText, Users, Receipt, Stethoscope, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────── */

interface Service {
  id: number
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }>
  label: string
  title: string
  description: string
  tags: string[]
  status: 'Live' | 'Beta' | 'Coming Soon'
  accent: boolean
}

/* ─── Data ───────────────────────────────────────────────────── */

const SERVICES: Service[] = [
  {
    id: 1,
    icon: Sprout,
    label: '01',
    title: 'AgriTrack',
    description:
      'AI-powered farm management for smallholder farmers across West Africa. Real-time crop monitoring, yield forecasting, and offline-first data capture.',
    tags: ['Farm management', 'AI forecasting', 'Offline-first'],
    status: 'Live',
    accent: false,
  },
  {
    id: 2,
    icon: Wallet,
    label: '02',
    title: 'PayVault',
    description:
      'Savings groups and cooperative lending, reimagined for mobile. Offline-first sync, biometric auth, and instant group payouts — built for communities that banks ignore.',
    tags: ['Fintech', 'Savings groups', 'Mobile-first'],
    status: 'Live',
    accent: true,
  },
  {
    id: 3,
    icon: ScrollText,
    label: '03',
    title: 'LexAI',
    description:
      'Legal document intelligence for African businesses. Extract clauses, flag risks, and summarise contracts — without paying a lawyer for every read.',
    tags: ['Legal tech', 'Document AI', 'LLMs'],
    status: 'Beta',
    accent: false,
  },
  {
    id: 4,
    icon: Users,
    label: '04',
    title: 'PulseHR',
    description:
      'HR and payroll built for Nigerian SMEs. Manage staff, run payroll, and stay compliant — without the complexity of enterprise software.',
    tags: ['HR', 'Payroll', 'Nigeria'],
    status: 'Coming Soon',
    accent: false,
  },
  {
    id: 5,
    icon: Receipt,
    label: '05',
    title: 'TallyBooks',
    description:
      'Simple bookkeeping for small businesses in emerging markets. Snap a receipt. Track expenses. Know where your money goes.',
    tags: ['Accounting', 'Small business', 'Cash flow'],
    status: 'Coming Soon',
    accent: false,
  },
  {
    id: 6,
    icon: Stethoscope,
    label: '06',
    title: 'ClinicOS',
    description:
      'Patient management for independent clinics. Appointments, records, and billing — designed for one-doctor practices, not hospital networks.',
    tags: ['Health tech', 'Clinics', 'Records'],
    status: 'Coming Soon',
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

  const statusStyles = {
    Live: {
      bg: service.accent ? 'rgba(255,255,255,0.15)' : 'rgba(45,214,123,0.12)',
      color: service.accent ? 'var(--color-accent)' : 'var(--color-primary)',
      border: service.accent ? 'rgba(255,255,255,0.2)' : 'rgba(45,214,123,0.25)',
    },
    Beta: {
      bg: 'rgba(234,179,8,0.12)',
      color: '#92400E',
      border: 'rgba(234,179,8,0.3)',
    },
    'Coming Soon': {
      bg: service.accent ? 'rgba(255,255,255,0.08)' : 'rgba(128,128,128,0.08)',
      color: service.accent ? 'rgba(240,247,241,0.5)' : 'var(--color-text-muted)',
      border: service.accent ? 'rgba(255,255,255,0.12)' : 'var(--color-border)',
    },
  }[service.status]

  const ctaLabel =
    service.status === 'Live'
      ? 'Subscribe'
      : service.status === 'Beta'
      ? 'Join Beta'
      : 'Join Waitlist'

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
      {/* Top row: status badge + icon */}
      <div className="flex items-start justify-between mb-5">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: statusStyles.bg,
            color: statusStyles.color,
            border: `1px solid ${statusStyles.border}`,
          }}
        >
          ● {service.status}
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

      {/* Bottom: tags + CTA */}
      <div className="flex flex-col gap-4 mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
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

        {/* CTA */}
        <div
          className="pt-3"
          style={{
            borderTop: `1px solid ${
              service.accent ? 'rgba(255,255,255,0.12)' : 'var(--color-border)'
            }`,
          }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: service.accent
                ? 'var(--color-accent)'
                : service.status === 'Coming Soon'
                ? 'var(--color-text-muted)'
                : 'var(--color-primary)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = service.accent
                ? '#ffffff'
                : 'var(--color-primary-light)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = service.accent
                ? 'var(--color-accent)'
                : service.status === 'Coming Soon'
                ? 'var(--color-text-muted)'
                : 'var(--color-primary)'
            }}
          >
            {ctaLabel}
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
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
      id="services"
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
            What we've shipped
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
              Products built for
              <br />
              markets that matter.
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
              AI-powered tools for the people the world's software ignores. We build them, own them, and ship them on subscription.
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