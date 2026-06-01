import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        {/* How We Work — coming next */}
      </main>
    </>
  )
}