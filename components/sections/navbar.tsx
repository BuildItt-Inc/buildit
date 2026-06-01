'use client'
// components/sections/navbar.tsx

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BuildItLogo } from '@/components/icons/buildit-logo'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────── */

interface NavLink {
  label: string
  href: string
}

/* ─── Constants ──────────────────────────────────────────────── */

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/work'     },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
]

const SCROLL_THRESHOLD = 20 // px before backdrop activates

/* ─── Mobile Menu Overlay ────────────────────────────────────── */

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion()

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
    exit:   { opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.15 } },
  }

  const menuVariants = {
    hidden:  { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  }

  const linkVariants = {
    hidden:  { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        delay: shouldReduceMotion ? 0 : 0.1 + i * 0.06,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[98]"
            style={{ backgroundColor: 'rgba(13, 31, 16, 0.4)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.nav
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 bottom-0 z-[99] flex flex-col"
            style={{
              width: 'min(320px, 85vw)',
              backgroundColor: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Menu header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <BuildItLogo size={32} />
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-glow)'
                  e.currentTarget.style.color = 'var(--color-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--color-text-muted)'
                }}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col px-4 py-6 gap-1 flex-1" role="list">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.li key={link.href} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors"
                      data-active={isActive}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '1.0625rem',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                        backgroundColor: isActive ? 'var(--color-accent-glow)' : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-bg)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* CTA at bottom */}
            <motion.div
              className="px-4 py-6"
              style={{ borderTop: '1px solid var(--color-border)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: shouldReduceMotion ? 0 : 0.3, duration: 0.3 },
              }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="btn-primary w-full justify-center text-base"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                Start a Project
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
              <p
                className="text-center text-sm mt-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Free consultation. No commitment.
              </p>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Scroll detection for backdrop blur
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navbarVariants = {
    initial: { opacity: 0, y: -8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
    },
  }

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-[100]',
          'transition-all duration-300',
        )}
        style={{
          backgroundColor: scrolled
            ? 'rgba(255, 255, 255, 0.88)'
            : 'rgba(255, 255, 255, 1)',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div
          className="section-container"
          style={{ maxWidth: '1280px', paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}
        >
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            {/* ── Logo ── */}
            <Link
              href="/"
              aria-label="BuildIt — Go to homepage"
              className="flex-shrink-0"
            >
              <BuildItLogo size={36} />
            </Link>

            {/* ── Desktop Nav Links (centered) ── */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-1"
            >
              <ul className="flex items-center gap-1" role="list">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="nav-link px-3 py-2 rounded-md block"
                        data-active={isActive}
                        style={{
                          color: isActive
                            ? 'var(--color-text)'
                            : 'var(--color-text-muted)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'
                          ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-bg)'
                        }}
                        onMouseLeave={e => {
                          ;(e.currentTarget as HTMLAnchorElement).style.color = isActive
                            ? 'var(--color-text)'
                            : 'var(--color-text-muted)'
                          ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Optional ghost link */}
              <Link
                href="/work"
                className="btn-ghost hidden lg:inline-flex py-2 px-4 text-sm"
              >
                See Our Work
              </Link>

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="btn-primary py-2.5 px-5 text-sm"
              >
                Start a Project
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                'md:hidden flex items-center justify-center',
                'w-10 h-10 rounded-lg',
                'transition-colors duration-200',
              )}
              style={{ color: 'var(--color-text)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Subtle green accent line at very bottom of navbar */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-accent-glow), var(--color-accent-glow), transparent)',
            }}
            aria-hidden="true"
          />
        )}
      </motion.header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16 lg:h-[4.5rem]" aria-hidden="true" />
    </>
  )
}
