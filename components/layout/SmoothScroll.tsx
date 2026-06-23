// components/layout/SmoothScroll.tsx
// ─────────────────────────────────────────────────────
// Wraps the entire site with Lenis smooth scroll.
// Every page automatically gets buttery smooth scrolling.
// This is what separates amateur sites from agency sites.
// ─────────────────────────────────────────────────────

'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // ── Create Lenis instance ──────────────────────────
    const lenis = new Lenis({
      duration: 1.4,        // How long the scroll momentum lasts
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,    // Smooth mouse wheel scrolling
    })

    // ── Connect Lenis to GSAP's ticker ────────────────
    // This makes GSAP ScrollTrigger and Lenis work together
    // Without this, scroll animations would feel janky
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // ── Cleanup on unmount ────────────────────────────
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}