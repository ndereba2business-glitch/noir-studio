// app/layout.tsx

import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// ── Font Configuration ───────────────────────────────────────────
// Next.js loads these fonts from Google with zero layout shift
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

// ── SEO Metadata ─────────────────────────────────────────────────
// This appears in Google search results and browser tabs
export const metadata: Metadata = {
  title: 'Noir Studio — Creative Digital Agency',
  description: 'Cinematic web experiences for ambitious brands.',
  keywords: ['web design', 'creative agency', 'UI/UX', 'freelance developer'],
  openGraph: {
    title: 'Noir Studio',
    description: 'Cinematic web experiences for ambitious brands.',
    type: 'website',
  },
}

// ── Root Layout ──────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable}`}
    >
      <body className="bg-noir-bg text-noir-text font-body antialiased">
        {children}
      </body>
    </html>
  )
}