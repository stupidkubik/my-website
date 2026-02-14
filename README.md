# Evgenii Rubin - Frontend Portfolio

A personal portfolio website built with Next.js (Pages Router), focused on fast, user-friendly interfaces, strong typography, accessibility, and predictable front-end delivery.

## Concept

- Design concept: **Systematic Minimalist (Swiss Style)**
- Mood: strict grid, generous whitespace, bold typography, minimal decoration
- Light-first experience with dark theme support
- Content-first approach: real copy from resume and case studies, no placeholder lorem ipsum

## Tech Stack

- Framework: `Next.js 16` (Pages Router)
- UI: `React 19`, `TypeScript`
- Styling: `Tailwind CSS` + custom design tokens via CSS variables
- Fonts: `Geist Sans` + `Geist Mono` (via `geist` package)
- Linting: `ESLint 9` + `eslint-config-next`
- Hosting target: `Vercel`

## Implemented Scope

- Pages: Home, About, Projects, Project Detail (`/projects/[slug]`), Resume, Contact, 404
- Shared layout: header + footer + skip-link
- Theme switcher (light/dark) with `localStorage` persistence
- SEO baseline: title/description/canonical/OG/Twitter tags
- Technical SEO: `sitemap.xml` and `robots.txt`
- Responsive behavior including tiny-screen layer (`<=375px`)
- Subtle motion with `prefers-reduced-motion` support
- Project media and OG images integrated from `public/`
- Unified typography primitives (`BodyMuted`, `MetaLabel`, `SectionTitle`)

## Project Architecture

### Pages (`src/pages`)

- `/` - Home page
- `/about` - About/skills/languages
- `/projects` - Project list
- `/projects/[slug]` - Detailed project case study (SSG via `getStaticPaths/getStaticProps`)
- `/resume` - Web resume + PDF download button
- `/contact` - Contact page
- `/404` - Custom not found page
- `/sitemap.xml` - Runtime sitemap generation
- `/robots.txt` - Runtime robots generation

### Components (`src/components`)

- `Layout`, `Header`, `Footer`, `ThemeToggle`
- `SeoHead` - centralized meta/OG/canonical component
- UI primitives in `src/components/ui`:
  `Button`, `TextLink`, `ProjectCard`, `Badge`, `Section`, `Grid`, `Stack`, `BulletList`, `PageTitle`
- Typography layer in `src/components/ui`:
  `BodyMuted`, `MetaLabel`, `SectionTitle`
- Typography re-export module:
  `src/components/ui/typography/index.ts`

### Styling and Tokens

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.js`
- Core token groups:
  - colors: `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`, `--color-primary`
  - typography: `display`, `h2`, `h3`, `body`, `label`
  - spacing: `section`, `section-lg`
- Additional breakpoints:
  - `xxs` - `max-width: 375px`
  - `xs` - `min-width: 376px`

## Content and Media

### Projects

Project data is currently defined directly in code:
- `src/pages/projects/index.tsx` (cards/list)
- `src/pages/projects/[slug].tsx` (detailed case studies)

Project media files:
- `public/media/projects/kanban-board/cover.webp`
- `public/media/projects/stripe-mini-app/cover.webp`
- `public/media/projects/admin-dashboard/cover.webp`

### Resume

- Downloadable PDF: `public/media/resume/evgenii-rubin-cv.pdf`
- Web resume page: `src/pages/resume.tsx`

### OG Images

- `public/og/kanban-board.webp`
- `public/og/stripe-mini-shop.webp`
- `public/og/admin-dashboard.webp`

## SEO and Indexing

- `SeoHead` sets:
  - `<title>`, `description`
  - `canonical`
  - Open Graph (`og:*`)
  - Twitter Card tags
- `sitemap.xml` and `robots.txt` are generated server-side at runtime
- Absolute URLs use `NEXT_PUBLIC_SITE_URL` (if missing, host headers are used as fallback)

## Accessibility

- Skip link at the top of layout (`Skip to content`)
- `aria-current` on active navigation items
- Visible `focus-visible` styles for links and buttons
- Semantic sections and heading hierarchy
- `prefers-reduced-motion` support

## Themes (Light / Dark)

- Initial theme is set in `_document.tsx` before hydration
- Theme switching is handled by `ThemeToggle`
- Theme state is stored in `localStorage` under the `theme` key
- Theme colors are driven by CSS variables (`html[data-theme="dark"]`)

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

For local development you can use:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local Development

```bash
npm install
npm run dev
```

Notes:
- The dev script uses `next dev --webpack` for stable local behavior
- Lint is available via `npm run lint`
- Typecheck can be run via `npx tsc --noEmit`

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Directory Structure

```text
src/
  components/
    ui/
  pages/
    projects/
  styles/
public/
  media/
    projects/
    resume/
  og/
PLAN.md
README.md
```

## Workflow and Plan

- Roadmap and active tasks are tracked in `PLAN.md`
- `PLAN.md` includes a dedicated `Review Remediation Plan` section with P1/P2/P3 priorities

## Known Technical Notes

- Project data is duplicated between project list and project detail page (planned to be consolidated into a single source)
- Local TypeScript cache files (`*.tsbuildinfo`) are ignored via `.gitignore`
- Working PDFs in repo root are ignored, but production assets in `public/` (including resume PDF) are tracked
