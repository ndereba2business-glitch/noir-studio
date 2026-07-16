'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ShapeConfig {
  width: number
  height: number
  rotate: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  delay: number
}

const SHAPES: ShapeConfig[] = [
  { width: 480, height: 110, rotate: 12, top: '22%', left: '3%', delay: 0.2 },
  { width: 380, height: 90, rotate: -15, bottom: '68%', right: '5%', delay: 0.4 },
  { width: 240, height: 60, rotate: -10, bottom: '78%', left: '18%', delay: 0.5 },
  { width: 160, height: 40, rotate: 18, top: '12%', right: '20%', delay: 0.6 },
]

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shapes = containerRef.current?.querySelectorAll('.floating-shape')
    if (!shapes || shapes.length === 0) return

    shapes.forEach((el, i) => {
      const rotate = SHAPES[i].rotate

      gsap.set(el, { opacity: 0, y: -100, rotate: rotate - 15 })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotate,
        duration: 2.2,
        delay: SHAPES[i].delay,
        ease: 'power3.out',
      })

      gsap.to(el, {
        y: '+=16',
        duration: 7 + i,
        delay: SHAPES[i].delay + 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, overflow: 'visible' }}
      aria-hidden="true"
    >
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="floating-shape absolute rounded-full"
          style={{
            width: s.width,
            height: s.height,
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            background: 'linear-gradient(135deg, rgba(201,169,110,0.14) 0%, transparent 70%)',
            border: '1px solid rgba(201,169,110,0.18)',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        />
      ))}
    </div>
  )
}