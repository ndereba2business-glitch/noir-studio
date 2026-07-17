'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [hovered, setHovered] = useState(false)

  // ── Form state ──────────────────────────────────────────────
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

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

      gsap.from('.contact-form-field', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
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

  // ── Submit handler ──────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(240,237,230,0.15)',
    color: '#f0ede6',
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: '1rem',
    padding: '14px 0',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(240,237,230,0.35)',
    marginBottom: '10px',
    display: 'block',
  }

  return (
    <section
      ref={sectionRef}
      className="contact-section-padding"
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
        href="mailto:hello@forgeleven.com"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: hovered ? '#c9a96e' : 'rgba(240,237,230,0.5)',
          letterSpacing: '0.02em',
          marginBottom: '80px',
          borderBottom: hovered ? '1px solid #c9a96e' : '1px solid rgba(240,237,230,0.15)',
          paddingBottom: '6px',
          transition: 'color 0.4s ease, border-color 0.4s ease',
        }}
      >
        hello@forgeleven.com
      </a>

      {/* ── Contact Form ──────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="contact-form"
        style={{
          maxWidth: '640px',
          marginBottom: '100px',
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '48px',
        }}
      >
        <div className="contact-form-field" style={{ marginBottom: '32px' }}>
          <label style={labelStyle} htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Your name"
          />
        </div>

        <div className="contact-form-field" style={{ marginBottom: '32px' }}>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>

        <div className="contact-form-field" style={{ marginBottom: '40px' }}>
          <label style={labelStyle} htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'var(--font-dm-sans), sans-serif' }}
            placeholder="Tell us about your project"
          />
        </div>

        <div className="contact-form-field" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#080808',
              background: '#c9a96e',
              border: 'none',
              padding: '16px 40px',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              opacity: status === 'sending' ? 0.6 : 1,
            }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <span style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              color: '#c9a96e',
              letterSpacing: '0.05em',
            }}>
              Message sent — thank you.
            </span>
          )}

          {status === 'error' && (
            <span style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              color: '#d98b8b',
              letterSpacing: '0.05em',
            }}>
              Something went wrong. Please try again.
            </span>
          )}
        </div>
      </form>

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
            Meru, Kenya
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
            Open for Projects 24/7
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
            Social media
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
          © 2024 Forge Eleven. All rights reserved.
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