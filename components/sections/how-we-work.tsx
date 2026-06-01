'use client'
// components/sections/how-we-work.tsx

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Search, Pencil, Code2, Rocket } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────────── */

interface Step {
  id: number
  label: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  title: string
  description: string
  detail: string[]
}

/* ─── Data ───────────────────────────────────────────────────── */

const STEPS: Step[] = [
  {
    id: 1,
    label: 'Discover',
    icon: Search,
    title: 'We listen before we build.',
    description:
      'Every project starts with a deep discovery session. We map your goals, users, constraints, and competitive landscape before a single line of code is written.',
    detail: ['Requirements audit', 'User research', 'Tech scoping', 'Timeline planning'],
  },
  {
    id: 2,
    label: 'Design',
    icon: Pencil,
    title: 'Clarity before pixels.',
    description:
      'We design systems, not screens. Wireframes, design tokens, and component architecture come first — so building feels inevitable, not improvised.',
    detail: ['Wireframes', 'Design system', 'Prototype', 'Stakeholder review'],
  },
  {
    id: 3,
    label: 'Build',
    icon: Code2,
    title: 'Engineered, not assembled.',
    description:
      'Clean TypeScript, tested components, CI/CD pipelines from day one. We build with the long game in mind — readable, maintainable, fast.',
    detail: ['Sprints & milestones', 'Code reviews', 'Testing', 'Staging previews'],
  },
  {
    id: 4,
    label: 'Launch',
    icon: Rocket,
    title: 'Ship with confidence.',
    description:
      'Deployment, monitoring, and handoff done right. We stay through go-live and beyond — because shipping is the beginning, not the end.',
    detail: ['Zero-downtime deploy', 'Analytics setup', 'Docs & handoff', 'Post-launch support'],
  },
]

/* ─── Step Card ──────────────────────────────────────────────── */

interface StepCardProps {
  step: Step
  index: number
  isLast: boolean
  inView: boolean
  reduce: boolean
}

function StepCard({ step, index, isLast, inView, reduce }: StepCardProps) {
  const Icon = step.icon
  const isEven = index % 2 === 1

  const cardVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : index * 0.12 + 0.3,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="relative flex gap-5 md:gap-8">

      {/* ── Left column: step number + connector line ── */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '48px' }}>

        {/* Step badge */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0 z-10"
          style={{
            backgroundColor: isEven ? 'var(--color-primary)' : 'var(--color-surface)',
            border: isEven
              ? '1.5px solid var(--color-primary-dark)'
              : '1.5px solid var(--color-border-strong)',
            boxShadow: isEven
              ? '0 4px 20px rgba(10,107,60,0.25)'
              : 'var(--shadow-sm)',
          }}
        >
          <Icon
            size={20}
            strokeWidth={1.75}
            style={{
              color: isEven ? 'var(--color-accent)' : 'var(--color-primary)',
            }}
          />

          {/* Step number pip */}
          <span
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full text-center"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 600,
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-text)',
              lineHeight: 1,
            }}
          >
            {step.id}
          </span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex-1 w-px mt-3"
            style={{
              background:
                'linear-gradient(to bottom, var(--color-border-strong), var(--color-border))',
              originY: 0,
              minHeight: '40px',
            }}
          />
        )}
      </div>

      {/* ── Right column: content ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex-1 pb-10 md:pb-14"
        style={{ paddingBottom: isLast ? 0 : undefined }}
      >
        {/* Label */}
        <p
          className="mb-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
          }}
        >
          Phase {step.id} — {step.label}
        </p>

        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: 'var(--color-text)',
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="mb-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            maxWidth: '520px',
          }}
        >
          {step.description}
        </p>

        {/* Detail pills */}
        <div className="flex flex-wrap gap-2">
          {step.detail.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                padding: '5px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              {item}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

/* ─── How We Work Section ────────────────────────────────────── */

export function HowWeWork() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion() ?? false

  const headingVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section
      ref={ref}
      aria-labelledby="process-heading"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 xl:gap-28">

          {/* ── Left: sticky header ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
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
                How we work
              </motion.p>

              <motion.h2
                id="process-heading"
                variants={headingVariants}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--color-text)',
                  marginBottom: '1.25rem',
                }}
              >
                A process built
                <br />
                for outcomes.
              </motion.h2>

              <motion.p
                variants={headingVariants}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-muted)',
                  marginBottom: '2rem',
                }}
              >
                No guesswork. No surprises. Four focused phases designed to move fast without breaking things.
              </motion.p>

              {/* Stat callout */}
              <motion.div
                variants={headingVariants}
                className="inline-flex flex-col p-5 rounded-2xl"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'var(--color-primary)',
                  }}
                >
                  4–8
                  <span
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginLeft: '4px',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    wks
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}
                >
                  Average time to launch
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: steps timeline ── */}
          <div className="relative">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
                inView={inView}
                reduce={reduce}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}