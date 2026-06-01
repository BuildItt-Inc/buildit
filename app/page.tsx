// app/page.tsx

import { Navbar } from '@/components/sections/navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero section — coming next */}
        <section
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
            }}
          >
            Hero section coming next →
          </p>
        </section>
      </main>
    </>
  )
}
