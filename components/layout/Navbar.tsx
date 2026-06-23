// components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────
// Minimal luxury navbar.
// Hides when scrolling down (gives content full screen).
// Reappears when scrolling up (always accessible).
// This behavior is used by Awwwards-winning sites.
// ─────────────────────────────────────────────────────

'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [lastScroll, setLastScroll] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // ── Animate navbar in on page load ────────────────
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    )

    // ── Hide/show on scroll ───────────────────────────
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling DOWN — hide navbar
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.4,
          ease: 'power2.in',
        })
      } else {
        // Scrolling UP — show navbar
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-8 py-6 
                 flex items-center justify-between"
    >
      {/* ── Logo ──────────────────────────────────────── */}
      <Link
        href="/"
        className="font-heading text-2xl text-noir-text tracking-wider
                   hover:text-noir-accent transition-colors duration-300"
      >
        NOIR
      </Link>

      {/* ── Desktop Navigation Links ──────────────────── */}
      <div className="hidden md:flex items-center gap-10">
        {['Work', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="font-body text-sm tracking-[0.2em] uppercase 
                       text-noir-muted hover:text-noir-text 
                       transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* ── CTA Button ────────────────────────────────── */}
      
        href="mailto:hello@youremail.com"
        className="hidden md:block font-body text-sm tracking-widest 
                   uppercase border border-noir-accent text-noir-accent 
                   px-6 py-2.5 hover:bg-noir-accent hover:text-noir-bg 
                   transition-all duration-300"
      >
        Let's Talk
      </a>

      {/* ── Mobile Hamburger ──────────────────────────── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px bg-noir-text transition-all duration-300
                         ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-px bg-noir-text transition-all duration-300
                         ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-noir-text transition-all duration-300
                         ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* ── Mobile Menu ───────────────────────────────── */}
      <div className={`absolute top-full left-0 w-full bg-noir-bg border-t 
                       border-noir-muted flex flex-col items-center gap-8 
                       py-10 md:hidden transition-all duration-500
                       ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['Work', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-4xl text-noir-text 
                       hover:text-noir-accent transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  )
}