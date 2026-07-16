'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ShapeConfig {
  size: number
  top: string
  left?: string
  right?: string
  delay: number
}

const SHAPES: ShapeConfig[] = [
  { size: 380, top: '18%', left: '2%', delay: 0.2 },
  { size: 280, top: '55%', right: '4%', delay: 0.4 },
  { size: 160, top: '8%', right: '22%', delay: 0.6 },
]

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shapes = containerRef.current?.querySelectorAll('.floating-shape')
    if (!shapes || shapes.length === 0) return

    gsap.set(shapes, { opacity: 0, y: -40 })
    gsap.to(shapes, {
      opacity: 1,
      y: 0,
      duration: 1.8,
      stagger: 0.15,
      ease: 'power3.out',
    })

    shapes.forEach((el, i) => {
      gsap.to(el, {
        y: '+=18',
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="floating-shape absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            background: 'radial-gradient(circle, rgba(201,169,110,0.55) 0%, transparent 72%)',
            filter: 'blur(30px)',
          }}
        />
      ))}
    </div>
  )
}