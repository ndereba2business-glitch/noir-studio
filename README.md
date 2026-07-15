# Noir Studio

Cinematic web experiences for ambitious brands. Built with Next.js, GSAP (ScrollTrigger), Lenis smooth scroll, Framer Motion, and Resend for contact form delivery.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Stack

- **Next.js** — framework
- **Tailwind CSS** — utility styling
- **GSAP + ScrollTrigger** — scroll-driven animation
- **Lenis** — smooth scrolling
- **Framer Motion** — component-level motion
- **Resend** — contact form email delivery

## Environment Variables

Set `RESEND_API_KEY` in your deployment environment (Vercel dashboard → Settings → Environment Variables). Never commit this to `.env.local` or push it to the repo.

## Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new). Connect this GitHub repo, add the `RESEND_API_KEY` environment variable in the dashboard, and deploy.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)