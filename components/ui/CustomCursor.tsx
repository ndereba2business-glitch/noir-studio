// components/ui/CustomCursor.tsx
// ─────────────────────────────────────────────────────
// Replaces the default browser cursor with a custom one.
// Two layers: a small dot that follows instantly,
// and a larger circle that follows with a slight delay.
// The lag between them creates a liquid, premium feel.
// ─────────────────────────────────────────────────────

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) return

    // ── Track mouse position ───────────────────────────
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      // Dot follows cursor instantly — no delay
      gsap.set(dot, { x, y })

      // Circle follows with smooth lag — creates luxury feel
      gsap.to(circle, {
        x,
        y,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    // ── Grow cursor on hoverable elements ─────────────
    const growCursor = () => {
      gsap.to(circle, {
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

    // ── Shrink cursor back to normal ──────────────────
    const shrinkCursor = () => {
      gsap.to(circle, {
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

    // ── Add event listeners ───────────────────────────
    window.addEventListener('mousemove', moveCursor)

    // Find all clickable elements and add hover effects
    const hoverElements = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    )
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', growCursor)
      el.addEventListener('mouseleave', shrinkCursor)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', growCursor)
        el.removeEventListener('mouseleave', shrinkCursor)
      })
    }
  }, [])

  return (
    <>
      {/* Small instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-noir-accent rounded-full 
                   pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
                   mix-blend-difference"
      />

      {/* Larger lagging circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 border border-noir-accent 
                   rounded-full pointer-events-none z-[9998] 
                   -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}