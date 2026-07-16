'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ShapeConfig {
  size: number
  top: string
  left?: string
  right?: string
  delay: number
  opacity: number
}

const SHAPES: ShapeConfig[] = [
  { size: 420, top: '10%', left: '-8%', delay: 0.2, opacity: 0.06 },
  { size: 320, top: '65%', right: '-6%', delay: 0.4, opacity: 0.05 },
  { size: 180, top: '5%', right: '18%', delay: 0.6, opacity: 0.04 },
]

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shapes = containerRef.current?.querySelectorAll('.floating-shape')
    if (!shapes) return

    gsap.set(shapes, { opacity: 0, y: -60 })
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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
            background: 'radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)',
            filter: 'blur(2px)',
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}