// components/sections/Hero.tsx
// ─────────────────────────────────────────────────────
// The first thing every visitor sees.
// Built to create a strong emotional first impression.
//
// What it does:
// 1. Fades in on page load with staggered text reveals
// 2. Headline splits into words and animates in from below
// 3. Scroll-triggered parallax on background text
// 4. A scroll indicator that pulses gently
// ─────────────────────────────────────────────────────

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Split headline into individual words ──────
      // Each word gets wrapped in a span so we can
      // animate them in one by one (stagger effect)
      if (headlineRef.current) {
        const words = headlineRef.current.innerText.split(' ')
        headlineRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="word-wrapper" style="overflow:hidden; display:inline-block;">
                <span class="word" style="display:inline-block; transform:translateY(110%)">
                  ${word}
                </span>
              </span>`
          )
          .join(' ')
      }

      // ── 2. Page load animation timeline ─────────────
      // Everything animates in sequence on first load
      const tl = gsap.timeline({ delay: 0.3 })

      // Words slide up into view one by one
      tl.to('.word', {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.out',
      })

      // Subline fades in after headline
      .fromTo(
        sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      // Scroll indicator fades in last
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // ── 3. Background text parallax on scroll ────────
      // Large decorative text moves at different speed
      // than the page — creates depth illusion
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true, // Ties animation directly to scroll position
          },
        })
      }

      // ── 4. Hero fades out as user scrolls away ───────
      gsap.to(heroRef.current, {
        opacity: 0.3,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center top',
          end: 'bottom top',
          scrub: true,
        },
      })

    }, heroRef)

    return () => ctx.revert() // Cleanup all GSAP animations
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col 
                 items-center justify-center overflow-hidden px-8"
    >

      {/* ── Decorative background text (parallax) ─────── */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center
                   pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading text-[20vw] font-bold leading-none
                     text-white opacity-[0.02] whitespace-nowrap"
        >
          NOIR
        </span>
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">

        {/* Eyebrow label */}
        <p className="font-body text-noir-accent text-xs tracking-[0.4em] 
                      uppercase mb-8 opacity-80">
          Creative Digital Studio
        </p>

        {/* Main headline — words animate in individually */}
        <h1
          ref={headlineRef}
          className="font-heading text-[clamp(3rem,9vw,9rem)] 
                     font-light leading-[1.05] text-noir-text mb-8
                     tracking-tight"
        >
          We craft digital experiences that move people
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-noir-muted text-lg md:text-xl 
                     max-w-xl mx-auto leading-relaxed mb-12"
        >
          Cinematic websites and brand identities for companies 
          that refuse to be ordinary.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          
            href="#work"
            className="font-body text-sm tracking-widest uppercase
                       bg-noir-accent text-noir-bg px-8 py-4
                       hover:bg-transparent hover:text-noir-accent
                       border border-noir-accent
                       transition-all duration-500"
            data-cursor-hover
          >
            View Work
          </a>
          
            href="#contact"
            className="font-body text-sm tracking-widest uppercase
                       text-noir-text border-b border-noir-muted pb-1
                       hover:border-noir-accent hover:text-noir-accent
                       transition-all duration-300"
            data-cursor-hover
          >
            Start a Project →
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-3"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase 
                         text-noir-muted">
          Scroll
        </span>
        {/* Animated scroll line */}
        <div className="w-px h-12 bg-noir-muted relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-noir-accent
                       animate-scroll-line"
            style={{ height: '100%' }}
          />
        </div>
      </div>

    </section>
  )
}