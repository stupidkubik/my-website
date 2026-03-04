# Project Decisions

## Design Concept
- Concept: Systematic Minimalist (Swiss Style)
- Mood: strict, clean, grid-first, lots of whitespace, large type, minimal decoration.
- References: Vercel Design System, Geist/Inter, Notion-like content structure.
- Fonts: Geist Sans or Inter (UI), Geist Mono for technical details.
- Default: light theme first (dark mode optional later).

## Stack (Option A - fast start)
- Framework: Next.js Pages Router with static generation (SSG).
- Language: React + TypeScript.
- UI: Tailwind CSS + shadcn/ui (copy-in components).
- Content: TypeScript data modules for projects/case studies and resume; MDX optional later.
- Contact: mailto link (no backend form yet).
- Hosting target: Vercel (CDN).

## Content Priorities
- Content-first, real copy from PDFs, no lorem.
- Accessibility and semantic HTML.
- Fully responsive layouts with careful QA.
