'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link' // Added next/link import

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    title: 'Lumara Skincare',
    category: 'Brand Identity / Web Design',
    year: '2024',
    color: '#c9a96e',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0e 50%, #1a1208 100%)',
  },
  {
    id: '02',
    title: 'Voss Architecture',
    category: 'Web Design / Motion',
    year: '2024',
    color: '#8BA3B8',
    bg: 'linear-gradient(135deg, #080d12 0%, #111820 50%, #080d12 100%)',
  },
  {
    id: '03',
    title: 'Serac Collective',
    category: 'Creative Direction / UI',
    year: '2023',
    color: '#B8A898',
    bg: 'linear-gradient(135deg, #100e0a 0%, #1e1a14 50%, #100e0a 100%)',
  },
  {
    id: '04',
    title: 'Onyx Finance',
    category: 'Web App / Design System',
    year: '2023',
    color: '#7A8A9A',
    bg: 'linear-gradient(135deg, #0a0a0f 0%, #14141e 50%, #0a0a0f 100%)',
  },
]

type Project = (typeof PROJECTS)[number]

function AccordionItem({
  item,
  isActive,
  onActivate,
}: {
  item: Project
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      className="transition-all duration-700 ease-in-out"
      style={{
        position: 'relative',
        flexShrink: 0,
        height: '480px',
        width: isActive ? '420px' : '64px',
        maxWidth: isActive ? '60vw' : '64px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: item.bg,
        border: '1px solid rgba(240,237,230,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)',
        }}
      />

      <span
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '2.5rem',
          fontWeight: 300,
          color: item.color,
          opacity: isActive ? 0.6 : 0.35,
          transition: 'opacity 0.5s ease',
          lineHeight: 1,
        }}
      >
        {item.id}
      </span>

      {isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            opacity: 1,
            transition: 'opacity 0.5s ease 0.15s',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
              fontWeight: 300,
              color: '#f0ede6',
              marginBottom: '10px',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.title}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(240,237,230,0.45)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.category}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: 'rgba(240,237,230,0.3)',
              }}
            >
              {item.year}
            </span>
          </div>
        </div>
      )}

      {!isActive && (
        <span
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%) rotate(90deg)',
            transformOrigin: 'left center',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.4)',
          }}
        >
          {item.title}
        </span>
      )}
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.accordion-track', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.accordion-track',
          start: 'top 85%',
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
        padding: '100px 0',
        background: '#080808',
        overflow: 'hidden',
      }}
    >
      <div className="work-header" style={{ marginBottom: '72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '10px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#c9a96e',
            }}
          >
            Selected Work
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              color: '#f0ede6',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Recent Projects
          </h2>

          <Link
            href="/work"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,230,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              paddingBottom: '6px',
            }}
          >
            <span>View All</span>
            <span style={{ width: '28px', height: '1px', background: 'currentColor', display: 'block' }} />
          </Link>
        </div>
      </div>

      <div
        className="accordion-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {PROJECTS.map((project, i) => (
          <AccordionItem
            key={project.id}
            item={project}
            isActive={i === activeIndex}
            onActivate={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}