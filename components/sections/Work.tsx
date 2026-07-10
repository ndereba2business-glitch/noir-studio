'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

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

      gsap.from('.project-row', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(previewRef.current, {
      x: x - 140,
      y: y - 100,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleProjectEnter = (index: number) => {
    setActiveProject(index)
    gsap.killTweensOf(previewRef.current)
    gsap.to(previewRef.current, {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const handleProjectLeave = () => {
    setActiveProject(null)
    gsap.killTweensOf(previewRef.current)
    gsap.to(previewRef.current, {
      opacity: 0,
      scaleX: 0.88,
      scaleY: 0.88,
      duration: 0.35,
      ease: 'power2.in',
    })
  }

  const handleRowOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    gsap.to(el, { paddingLeft: 16, duration: 0.35, ease: 'power2.out' })
    el.style.borderTopColor = 'rgba(201,169,110,0.4)'
  }

  const handleRowOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    gsap.to(el, { paddingLeft: 0, duration: 0.35, ease: 'power2.out' })
    el.style.borderTopColor = 'rgba(240,237,230,0.07)'
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 0',
        background: '#080808',
        overflow: 'hidden',
      }}
    >

      <div
        ref={previewRef}
        style={{
          position: 'absolute',
          width: '300px',
          height: '210px',
          borderRadius: '3px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 50,
          opacity: 0,
          scaleX: 0.88,
          scaleY: 0.88,
          top: 0,
          left: 0,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              background: project.bg,
              opacity: activeProject === i ? 1 : 0,
              transition: 'opacity 0.35s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '4rem',
              color: project.color,
              opacity: 0.5,
              fontWeight: 300,
              lineHeight: 1,
            }}>
              {project.id}
            </span>
            <span style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: project.color,
              opacity: 0.4,
            }}>
              {project.title}
            </span>
          </div>
        ))}
      </div>

      <div className="work-header" style={{ marginBottom: '72px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
          <span style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#c9a96e',
          }}>
            Selected Work
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            color: '#f0ede6',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            Recent Projects
          </h2>
          
          <a
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
          </a>
        </div>
      </div>

      <div className="projects-list">
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            className="project-row"
            onMouseEnter={() => handleProjectEnter(i)}
            onMouseLeave={handleProjectLeave}
            onMouseOver={handleRowOver}
            onMouseOut={handleRowOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '32px 0',
              paddingLeft: '0px',
              borderTop: '1px solid rgba(240,237,230,0.07)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
              <span style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                color: 'rgba(240,237,230,0.18)',
                letterSpacing: '0.08em',
                minWidth: '24px',
              }}>
                {project.id}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)',
                fontWeight: 300,
                color: '#f0ede6',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}>
                {project.title}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
              <span style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                color: 'rgba(240,237,230,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                {project.category}
              </span>
              <span style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                color: 'rgba(240,237,230,0.18)',
                letterSpacing: '0.08em',
                minWidth: '36px',
                textAlign: 'right' as const,
              }}>
                {project.year}
              </span>
            </div>
          </div>
        ))}

        <div style={{ borderTop: '1px solid rgba(240,237,230,0.07)' }} />
      </div>

    </section>
  )
}