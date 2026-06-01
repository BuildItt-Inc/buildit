'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { BuildItLogo } from '@/components/icons/buildit-logo'

/* ─── Types ──────────────────────────────────────────────────── */

interface FooterLink {
  label: string
  href: string
}

interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
}

/* ─── Data ───────────────────────────────────────────────────── */

const NAV_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Websites',        href: '/services#websites'        },
      { label: 'Web Apps',        href: '/services#web-apps'        },
      { label: 'Mobile Apps',     href: '/services#mobile'          },
      { label: 'PWAs',            href: '/services#pwas'            },
      { label: 'AI Tools',        href: '/services#ai-tools'        },
      { label: 'AI Integrations', href: '/services#ai-integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Work',    href: '/work'    },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use',   href: '/terms'   },
    ],
  },
]

const SOCIALS: SocialLink[] = [
  { label: 'GitHub',   href: 'https://github.com',        icon: Github   },
  { label: 'Twitter',  href: 'https://twitter.com',       icon: Twitter  },
  { label: 'LinkedIn', href: 'https://linkedin.com',      icon: Linkedin },
  { label: 'Email',    href: 'mailto:hello@buildit.agency', icon: Mail   },
]

/* ─── Footer ─────────────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container">

        {/* ── Main footer grid ── */}
        <div
          className="grid gap-10 py-14 md:py-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
          }}
        >
          {/* Brand column */}
          <div className="col-span-full md:col-span-1 lg:col-span-2 max-w-xs">
            <Link href="/" aria-label="BuildIt — homepage">
              <BuildItLogo size={36} />
            </Link>

            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
              }}
            >
              An AI-native digital agency building products that think. Based in Abuja, working everywhere.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--color-primary)'
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-glow)'
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  marginBottom: '1rem',
                }}
              >
                {group.title}
              </p>

              <ul className="flex flex-col gap-2.5" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-primary)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--color-text-muted)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            © {year} BuildIt. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}