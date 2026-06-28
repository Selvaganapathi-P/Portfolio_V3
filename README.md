# Selvaganapathi P — Portfolio

Production-grade personal brand portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + CSS Variables design system
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **AI Chat**: Anthropic Claude (with smart fallback)
- **Analytics**: Vercel Analytics + Speed Insights
- **Fonts**: Geist Sans + Geist Mono

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
ANTHROPIC_API_KEY=       # For AI chatbot (optional - falls back to rule-based)
RESEND_API_KEY=           # For contact form email delivery
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured projects, experience, skills |
| `/about` | About — story, values, education |
| `/projects` | Projects grid with filtering + search |
| `/projects/[slug]` | Project case study (problem/solution/architecture) |
| `/experience` | Timeline of work & education |
| `/skills` | Animated skill bars + tech stack icons |
| `/blog` | Blog (scaffolded, ready for MDX posts) |
| `/contact` | Contact form with Resend email API |
| `/resume` | Rendered resume + PDF download |
| `/uses` | Tools & setup |

## Data Source

All content is extracted from `src/data/resume.ts` — the single source of truth.
To update portfolio content, only edit that file.

## AI Chat Widget

Floating chat widget on every page. Without an API key it uses smart keyword-based fallback responses.
With `ANTHROPIC_API_KEY` set, it uses `claude-haiku-4-5-20251001` for accurate, context-aware answers.

## Deployment

```bash
npm run build
# Deploy to Vercel: vercel --prod
```

## Architecture

```
src/
├── app/
│   ├── (main)/          # Main layout group (Navbar + Footer)
│   │   ├── page.tsx     # Home
│   │   ├── about/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── skills/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── resume/
│   │   └── uses/
│   ├── api/
│   │   ├── chat/        # AI chatbot endpoint
│   │   └── contact/     # Contact form + Resend
│   ├── layout.tsx       # Root layout (fonts, theme, analytics)
│   └── globals.css      # Design system (CSS variables)
├── components/
│   ├── ai/              # ChatWidget
│   ├── home/            # Hero, FeaturedProjects, etc.
│   ├── layout/          # Navbar, Footer
│   ├── projects/        # ProjectDetail
│   └── providers/       # ThemeProvider
├── data/
│   └── resume.ts        # Single source of truth
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```
