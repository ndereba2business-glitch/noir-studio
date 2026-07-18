'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  'Business Website',
  'Restaurant Website',
  'Construction Website',
  'Real Estate Website',
  'Portfolio Website',
  'Landing Pages',
  'Digital Strategy',
  'Brand Identity',
  'Medical Website',
  'E-Commerce Website',
  'Mobile App Design',
  'Barbershop Website', 
]

const DIAMOND = (
  <span style={{ color: '#c9a96e', margin: '0 28px', fontSize: '8px', verticalAlign: 'middle' }}>
    ◆
  </span>
)

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    animRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (animRef.current) {
          const velocity = self.getVelocity()
          const speedMultiplier = 1 + Math.abs(velocity) / 2000
          gsap.to(animRef.current, {
            timeScale: speedMultiplier,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(animRef.current, {
                timeScale: 1,
                duration: 0.8,
                ease: 'power2.out',
              })
            }
          })
        }
      },
    })

    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      animRef.current?.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const renderItems = () =>
    ITEMS.map((item, i) => (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <span style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          color: 'rgba(240,237,230,0.7)',
        }}>
          {item}
        </span>
        {DIAMOND}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '48px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(240,237,230,0.06)',
        borderBottom: '1px solid rgba(240,237,230,0.06)',
        background: '#080808',
      }}
    >
      <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', alignItems: 'center', willChange: 'transform' }}
        >
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </section>
  )
}
