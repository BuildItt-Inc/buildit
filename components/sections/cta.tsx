'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

/* ─── Floating blocks (mirrored from Hero, denser) ───────────── */

const BLOCKS = [
  { id: 1, x: '3%',  y: '10%', w: 48,  h: 40,  rx: 8, op: 0.12, dur: 9,  del: 0,   yr: 16, rot: -6  },
  { id: 2, x: '8%',  y: '62%', w: 72,  h: 28,  rx: 7, op: 0.08, dur: 12, del: 1.4, yr: 12, rot: 8   },
  { id: 3, x: '78%', y: '6%',  w: 36,  h: 56,  rx: 7, op: 0.1,  dur: 10, del: 0.7, yr: 20, rot: 14  },
  { id: 4, x: '86%', y: '55%', w: 60,  h: 24,  rx: 6, op: 0.08, dur: 14, del: 2,   yr: 14, rot: -12 },
  { id: 5, x: '45%', y: '75%', w: 44,  h: 18,  rx: 5, op: 0.06, dur: 11, del: 0.3, yr: 10, rot: 4   },
  { id: 6, x: '55%', y: '5%',  w: 28,  h: 28,  rx: 5, op: 0.09, dur: 8,  del: 1.8, yr: 18, rot: -18 },
]

/* ─── Email form state ───────────────────────────────────────── */

type FormState = 'idle' | 'loading' | 'success' | 'error'

/* ─── CTA Section ────────────────────────────────────────────── */

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion() ?? false

  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  function validateEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setFormState('loading')

    // Placeholder — wire up to your email API / CRM
    await new Promise((res) => setTimeout(res, 1200))
    setFormState('success')
  }

  const fadeUp = {
    hidden:  { opacity: 0, y: reduce ? 0 : 24 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : d,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: 'var(--color-primary-dark)' }}
    >
      {/* ── Ambient green glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 60% at 50% 0%, rgba(45,214,123,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 90% 100%, rgba(10,107,60,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 35% 45% at 5% 80%, rgba(10,107,60,0.3) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Dot grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* ── Floating blocks ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {BLOCKS.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-xl"
            style={{
              left: b.x,
              top: b.y,
              width: b.w,
              height: b.h,
              borderRadius: b.rx,
              backgroundColor: 'var(--color-accent)',
              opacity: b.op,
              rotate: b.rot,
            }}
            animate={reduce ? {} : {
              y: [0, -b.yr, 0],
              rotate: [b.rot, b.rot + 4, b.rot],
            }}
            transition={{
              duration: b.dur,
              delay: b.del,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1.25rem',
            }}
          >
            Ready to build?
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="cta-heading"
            custom={0.08}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--color-text-light)',
              marginBottom: '1.25rem',
            }}
          >
            Let's turn your idea
            <br />
            into a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #7FFFC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              real product.
            </span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            custom={0.16}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'rgba(240,247,241,0.65)',
              marginBottom: '2.5rem',
            }}
          >
            Drop your email and we'll reach out within 24 hours to schedule
            a free strategy call — no strings, no pitch deck, just a conversation.
          </motion.p>

          {/* ── Email form ── */}
          <motion.div
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {formState === 'success' ? (
              <div
                className="flex flex-col items-center gap-3 py-6"
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ backgroundColor: 'rgba(45,214,123,0.15)', border: '1.5px solid rgba(45,214,123,0.4)' }}
                >
                  <CheckCircle2
                    size={28}
                    strokeWidth={1.75}
                    style={{ color: 'var(--color-accent)' }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--color-text-light)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  You're on the list.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'rgba(240,247,241,0.6)',
                  }}
                >
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Get in touch form"
              >
                <div
                  className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'rgba(240,247,241,0.35)' }}
                    />
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="your@email.com"
                      aria-label="Email address"
                      aria-describedby={error ? 'cta-email-error' : undefined}
                      aria-invalid={!!error}
                      disabled={formState === 'loading'}
                      className="w-full outline-none bg-transparent"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-light)',
                        padding: '0.75rem 0.875rem 0.75rem 2.5rem',
                        caretColor: 'var(--color-accent)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="btn-primary flex-shrink-0 justify-center sm:justify-start"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text)',
                      fontSize: '0.9375rem',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.625rem',
                      opacity: formState === 'loading' ? 0.7 : 1,
                      cursor: formState === 'loading' ? 'wait' : 'pointer',
                    }}
                  >
                    {formState === 'loading' ? (
                      <>
                        <span
                          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Get in touch
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </div>

                {/* Inline error */}
                {error && (
                  <p
                    id="cta-email-error"
                    role="alert"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: '#FF8A8A',
                      marginTop: '0.625rem',
                      textAlign: 'left',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Or — book a call */}
          <motion.p
            custom={0.32}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'rgba(240,247,241,0.45)',
              marginTop: '1.25rem',
            }}
          >
            Prefer to talk?{' '}
            <Link
              href="/contact"
              style={{
                color: 'rgba(240,247,241,0.7)',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(45,214,123,0.4)',
                textUnderlineOffset: '3px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(240,247,241,0.7)'
              }}
            >
              Book a call directly →
            </Link>
          </motion.p>

        </div>
      </div>
    </section>
  )
}