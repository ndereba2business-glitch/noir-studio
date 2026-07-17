'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    title: 'Lumara Skincare',
    category: 'Brand Identity / Web Design',
    year: '2024',
    color: '#c9a96e',
    image: '/work/lumara-skincare.jpg',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0e 50%, #1a1208 100%)',
    description:
      'A full brand identity and e-commerce experience for a botanical skincare line, built around restraint and quiet luxury — soft type, warm tones, and a shopping flow that feels more like a boutique visit than a checkout.',
  },
  {
    id: '02',
    title: 'Voss Architecture',
    category: 'Web Design / Motion',
    year: '2023',
    color: '#8BA3B8',
    image: '/work/voss-architecture.jpg',
    bg: 'linear-gradient(135deg, #080d12 0%, #111820 50%, #080d12 100%)',
    description:
      'A portfolio site for an architecture studio, structured around large-format imagery and scroll-triggered motion that mirrors the pacing of walking through a physical space.',
  },
  {
    id: '03',
    title: 'Serac Collective',
    category: 'Creative Direction / UI',
    year: '2025',
    color: '#B8A898',
    image: '/work/serac-collective.jpg',
    bg: 'linear-gradient(135deg, #100e0a 0%, #1e1a14 50%, #100e0a 100%)',
    description:
      'Creative direction and interface design for a multidisciplinary studio, unifying a fragmented brand under one clear visual language across web, deck, and social.',
  },
  {
    id: '04',
    title: 'Farmers Connect',
    category: 'Web App / Design System',
    year: '2026',
    color: '#7A8A9A',
    image: '/work/farmers-connect2.png',
    bg: 'linear-gradient(135deg, #0a0a0f 0%, #14141e 50%, #0a0a0f 100%)',
    description:
      'A full-stack web application connecting farmers with veterinarians, marketplaces, AI-powered farming assistance, vaccination tracking, and community discussions. Designed mobile-first for Kenyan farmers, with a focus on accessibility, trust, and practical farm management.',
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
        width: isActive ? '340px' : '64px',
        maxWidth: isActive ? '50vw' : '64px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: item.bg,
        border: '1px solid rgba(240,237,230,0.08)',
      }}
    >
      {/* Real project imagery layer — increased opacity for sharpness */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes={isActive ? "340px" : "64px"}
        style={{ 
          objectFit: 'cover',
          opacity: isActive ? 0.75 : 0.15,
          transition: 'opacity 0.7s ease-in-out',
        }}
        priority={item.id === '01'}
      />

      {/* Ambient overlay — pushed lower down to protect UI legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 40%, transparent 100%)',
          transition: 'opacity 0.7s ease',
          opacity: isActive ? 1 : 0.5,
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
          opacity: isActive ? 0.9 : 0.35,
          transition: 'opacity 0.5s ease',
          lineHeight: 1,
          zIndex: 10,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
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
            zIndex: 10,
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
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
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
                color: 'rgba(240,237,230,0.8)',
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
                color: 'rgba(240,237,230,0.6)',
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
            zIndex: 10,
          }}
        >
          {item.title}
        </span>
      )}
    </div>
  )
}

function DescriptionPanel({ project }: { project: Project }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [project.id])

  return (
    <div
      ref={panelRef}
      style={{
        flex: 1,
        minWidth: '280px',
        paddingLeft: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '480px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: project.color,
          marginBottom: '20px',
          display: 'block',
          fontWeight: 500,
        }}
      >
        {project.id} — {project.category}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
          fontWeight: 300,
          color: '#f0ede6',
          marginBottom: '24px',
          lineHeight: 1.15,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'rgba(240,237,230,0.5)',
          maxWidth: '420px',
          marginBottom: '32px',
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            width: '32px',
            height: '1px',
            background: project.color,
            display: 'block',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.35)',
          }}
        >
          {project.year}
        </span>
      </div>
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

      gsap.from('.accordion-row', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.accordion-row',
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
        className="accordion-row"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <div
          className="accordion-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            flexShrink: 0,
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

        <DescriptionPanel project={PROJECTS[activeIndex]} />
      </div>
    </section>
  )
}