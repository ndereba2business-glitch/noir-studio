'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.contact-label', {
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

      gsap.from('.contact-row', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-details',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.footer-row', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-row',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
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
        padding: '160px 80px 60px 80px',
        background: '#080808',
        overflow: 'hidden',
      }}
    >

      <div className="contact-label" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a96e',
        }}>
          Get In Touch
        </span>
      </div>

      <h2
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          fontWeight: 300,
          color: '#f0ede6',
          lineHeight: 0.98,
          letterSpacing: '-0.02em',
          marginBottom: '20px',
        }}
      >
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            Let&apos;s create something
          </span>
        </span>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>unforgettable.</span>
          </span>
        </span>
      </h2>

      <a
        href="mailto:hello@noirstudio.com"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: hovered ? '#c9a96e' : 'rgba(240,237,230,0.5)',
          letterSpacing: '0.02em',
          marginBottom: '100px',
          borderBottom: hovered ? '1px solid #c9a96e' : '1px solid rgba(240,237,230,0.15)',
          paddingBottom: '6px',
          transition: 'color 0.4s ease, border-color 0.4s ease',
        }}
      >
        hello@noirstudio.com
      </a>

      <div
        className="contact-details"
        style={{
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '48px',
          marginBottom: '120px',
        }}
      >
        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Based In
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            color: '#f0ede6',
            fontWeight: 300,
          }}>
            Nairobi, Kenya
          </p>
        </div>

        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Availability
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            color: '#f0ede6',
            fontWeight: 300,
          }}>
            Open for Projects
          </p>
        </div>

        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Social
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Instagram', 'LinkedIn', 'Twitter'].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '1.4rem',
                  color: 'rgba(240,237,230,0.5)',
                  fontWeight: 300,
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="footer-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '32px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(240,237,230,0.25)',
        }}>
          © 2024 Noir Studio. All rights reserved.
        </span>
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(240,237,230,0.25)',
        }}>
          Designed & Built with Care
        </span>
      </div>

    </section>
  )
}