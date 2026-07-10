// components/ui/CustomCursor.tsx
// ─────────────────────────────────────────────────────────────────
// Two-layer cursor system:
// Layer 1 (dot)   → Follows mouse instantly. Snappy and precise.
// Layer 2 (ring)  → Follows with a slight delay. Creates depth.
// On hover over links/buttons → ring expands. Luxury interaction.
// ─────────────────────────────────────────────────────────────────

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // ── Track mouse position ───────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Dot follows instantly
      gsap.set(dot, { x: clientX, y: clientY })

      // Ring follows with smooth lag — this creates the premium feel
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // ── Hover effect on interactive elements ──────────────────
    const onMouseEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
      })
    }

    const onMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      })
    }

    // ── Hide cursor when leaving window ───────────────────────
    const onMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }

    const onMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    // ── Attach all event listeners ────────────────────────────
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    // Apply hover effect to all links and buttons
    const interactives = document.querySelectorAll('a, button')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Inner dot — snappy, precise */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-noir-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* Outer ring — lagged, expands on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-noir-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}