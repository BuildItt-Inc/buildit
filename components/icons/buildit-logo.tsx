// components/icons/buildit-logo.tsx

import { cn } from '@/lib/utils'

interface BuildItLogoProps {
  /** Width of the mark in pixels. Height is auto-calculated. */
  size?: number
  className?: string
  /** 'mark' = icon only | 'full' = icon + wordmark | 'wordmark' = text only */
  variant?: 'mark' | 'full' | 'wordmark'
  /** Color override for the mark (defaults to --color-primary) */
  color?: string
}

/**
 * BuildIt logo — SVG recreation of the geometric block mark.
 *
 * The mark consists of 5 rounded rectangles arranged in a modular
 * isometric-leaning stack:
 *   - Large block:  top-left spanning two rows (tall)
 *   - Wide block:   bottom-left spanning full width (wide, short)
 *   - 3 stacked blocks on the right column
 *
 * Faithfully matches the provided logo image proportions.
 */
export function BuildItMark({
  size = 40,
  color = 'var(--color-primary)',
  className,
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/*
        Layout grid (viewBox 100×100, gap = 5):
        Left column:  x=4,  w=52
        Right column: x=62, w=34
        Row 1: y=4,  h=44  (tall top block)
        Row 2: y=54, h=20  (mid right block)
        Row 3: y=76, h=20  (bottom row)

        5 blocks:
        A — top-left large block  (spans rows 1)
        B — bottom-left wide bar  (spans full width bottom)
        C — top-right block
        D — mid-right block
        E — bottom-right block
      */}

      {/* A: Large top-left block */}
      <rect
        x="4"
        y="4"
        width="52"
        height="44"
        rx="6"
        ry="6"
        fill={color}
      />

      {/* B: Wide bottom-left block */}
      <rect
        x="4"
        y="54"
        width="52"
        height="42"
        rx="6"
        ry="6"
        fill={color}
      />

      {/* C: Top-right small block */}
      <rect
        x="62"
        y="4"
        width="34"
        height="20"
        rx="5"
        ry="5"
        fill={color}
      />

      {/* D: Mid-right small block */}
      <rect
        x="62"
        y="30"
        width="34"
        height="20"
        rx="5"
        ry="5"
        fill={color}
      />

      {/* E: Bottom-right small block */}
      <rect
        x="62"
        y="56"
        width="34"
        height="40"
        rx="5"
        ry="5"
        fill={color}
      />
    </svg>
  )
}

export function BuildItLogo({
  size = 40,
  className,
  variant = 'full',
  color = 'var(--color-primary)',
}: BuildItLogoProps) {
  if (variant === 'wordmark') {
    return (
      <span
        className={cn('font-display font-800 tracking-tight', className)}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: size * 0.55,
          color,
          letterSpacing: '-0.03em',
        }}
      >
        BuildIt
      </span>
    )
  }

  if (variant === 'mark') {
    return <BuildItMark size={size} color={color} className={className} />
  }

  // variant === 'full' — mark + wordmark side by side
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <BuildItMark size={size} color={color} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: size * 0.55,
          color,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        BuildIt
      </span>
    </div>
  )
}
