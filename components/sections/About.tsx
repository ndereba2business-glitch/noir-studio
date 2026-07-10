'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: '04', label: 'Years Experience' },
  { number: '32', label: 'Projects Delivered' },
  { number: '18', label: 'Happy Clients' },
  { number: '100', label: 'Percent Obsession', suffix: '%' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Split statement into lines and animate each one
      const lines = statementRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-label', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Counter animation for numbers
      document.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0')
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-row',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        background: '#080808',
        overflow: 'hidden',
      }}
    >

      <div className="about-label" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a96e',
        }}>
          About
        </span>
      </div>

      <h2
        ref={statementRef}
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(2rem, 5vw, 4.2rem)',
          fontWeight: 300,
          color: '#f0ede6',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          maxWidth: '1100px',
          marginBottom: '120px',
        }}
      >
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            I design and build digital experiences
          </span>
        </span>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            that feel <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>cinematic</span>, intentional,
          </span>
        </span>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block', color: 'rgba(240,237,230,0.35)' }}>
            and unmistakably premium.
          </span>
        </span>
      </h2>

      <div
        className="stats-row responsive-grid-4"
        style={{
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '48px', 
        }}
      >
        {STATS.map((stat, i) => (
          <div key={i} className="stat-item">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span
                className="stat-number"
                data-target={stat.number}
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#f0ede6',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              {stat.suffix && (
                <span style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  color: '#f0ede6',
                }}>
                  {stat.suffix}
                </span>
              )}
            </div>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,230,0.35)',
              marginTop: '12px',
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}
