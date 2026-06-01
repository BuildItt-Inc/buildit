// app/page.tsx

import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { HowWeWork } from '@/components/sections/how-we-work'
import { FeaturedWork } from '@/components/sections/featured-work'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/sections/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowWeWork />
        <FeaturedWork />
        <CTA />
      </main>
      <Footer />
    </>
  )
}