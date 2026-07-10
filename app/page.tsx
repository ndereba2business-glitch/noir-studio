import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main style={{ background: '#080808' }}>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Contact />
    </main>
  )
}
