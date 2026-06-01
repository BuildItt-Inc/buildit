import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { HowWeWork } from '@/components/sections/how-we-work'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowWeWork />
        {/* Featured Work — coming next */}
      </main>
    </>
  )
}