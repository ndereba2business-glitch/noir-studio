'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Crafting', 'Digital', 'Experiences']

const GRAIN = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
  backgroundSize: '200px 200px',
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set([lineRef.current, labelRef.current, subRef.current, bottomRef.current], {
        opacity: 0,
      })

      const words = headingRef.current?.querySelectorAll('.word')
      gsap.set(words || [], { y: '110%', opacity: 0 })

      const tl = gsap.timeline({ delay: 0.4 })

      tl.to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 1.2,
        ease: 'power4.inOut',
      })

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5')

      tl.to(subRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')

      tl.to(words || [], {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        stagger: 0.13,
        ease: 'power4.out',
      }, '-=0.2')

      tl.to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')

      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(headingRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '50% top',
          scrub: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, top: '-20%', bottom: '-20%' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 40% at 60% 0%, rgba(201,169,110,0.13) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, ...GRAIN }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, padding: '80px 0 0 0' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div
            ref={lineRef}
            style={{ width: '56px', height: '1px', background: '#c9a96e', transform: 'scaleX(1)', transformOrigin: 'left center' }}
          />
          <span
            ref={labelRef}
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}
          >
            Creative Studio
          </span>
        </div>

        <p
          ref={subRef}
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.3)', marginBottom: '32px' }}
        >
          Est. 2024
        </p>

        <h1
          ref={headingRef}
          style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(4rem,11vw,10rem)', lineHeight: 0.9, color: '#f0ede6', marginBottom: '64px', fontWeight: 300 }}
        >
          {WORDS.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.2em' }}>
              <span className="word" style={{ display: 'inline-block' }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div
          ref={bottomRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px', opacity: 0 }}
        >
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(240,237,230,0.4)', maxWidth: '260px', lineHeight: 1.7 }}>
            Bespoke digital experiences for brands that refuse to be ordinary.
          </p>
          
          <a
            href="/work"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.6)' }}
          >
            <span>View Work</span>
            <span style={{ display: 'block', width: '64px', height: '1px', background: 'currentColor' }} />
          </a>
        </div>

      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.2)' }}>
          Scroll
        </span>
        <div style={{ width: '1px', height: '56px', background: 'rgba(240,237,230,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div className="animate-scroll-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#c9a96e' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '96px', right: '80px' }}>
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(240,237,230,0.12)', textTransform: 'uppercase' }}>
          001 / Hero
        </span>
      </div>

    </section>
  )
}
