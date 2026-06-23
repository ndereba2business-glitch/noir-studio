// components/sections/WorkPreview.tsx
// Placeholder — we'll build this fully in Stage 3

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'Brand Identity', category: 'Branding' },
  { id: '02', title: 'E-Commerce Platform', category: 'Web Design' },
  { id: '03', title: 'Mobile Experience', category: 'UI/UX' },
]

export default function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="min-h-screen px-8 py-32 max-w-6xl mx-auto"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-20 
                      border-b border-noir-muted pb-8">
        <h2 className="font-heading text-6xl md:text-8xl text-noir-text font-light">
          Selected <br />
          <em>Work</em>
        </h2>
        
          href="/work"
          className="font-body text-sm tracking-widest uppercase
                     text-noir-accent hover:text-noir-text
                     transition-colors duration-300 mb-3"
        >
          All Projects →
        </a>
      </div>

      {/* Project list */}
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="project-item group flex items-center justify-between
                       py-8 border-b border-noir-muted cursor-pointer
                       hover:px-4 transition-all duration-500"
            data-cursor-hover
          >
            <div className="flex items-center gap-8">
              <span className="font-body text-xs text-noir-muted tracking-widest">
                {project.id}
              </span>
              <h3 className="font-heading text-3xl md:text-5xl text-noir-text 
                             font-light group-hover:text-noir-accent 
                             transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <span className="font-body text-sm text-noir-muted tracking-widest 
                             uppercase hidden md:block">
              {project.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}