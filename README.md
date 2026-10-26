# Evgenii Rubin - Frontend Portfolio

[![Quality](https://github.com/stupidkubik/my-website/actions/workflows/quality.yml/badge.svg?branch=main)](https://github.com/stupidkubik/my-website/actions/workflows/quality.yml)
[![CodeQL](https://github.com/stupidkubik/my-website/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/stupidkubik/my-website/actions/workflows/github-code-scanning/codeql)
[![Vercel](https://img.shields.io/github/deployments/stupidkubik/my-website/Production?label=vercel&logo=vercel)](https://evgenii-rubin.vercel.app)

[![Lighthouse performance](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Flighthouse-performance.json)](https://github.com/stupidkubik/my-website/blob/metrics/README.md)
[![Lighthouse accessibility](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Flighthouse-accessibility.json)](https://github.com/stupidkubik/my-website/blob/metrics/README.md)
[![Lighthouse best practices](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Flighthouse-best-practices.json)](https://github.com/stupidkubik/my-website/blob/metrics/README.md)
[![Lighthouse SEO](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Flighthouse-seo.json)](https://github.com/stupidkubik/my-website/blob/metrics/README.md)
[![First-load JS](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Fjavascript.json)](https://github.com/stupidkubik/my-website/blob/metrics/README.md)
[![MDN HTTP Observatory](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fstupidkubik%2Fmy-website%2Fmetrics%2Fbadges%2Fobservatory.json)](https://developer.mozilla.org/en-US/observatory/analyze?host=evgenii-rubin.vercel.app)

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
- Fonts: `Geist Sans` + `Geist Mono` (from the `geist` package); only Geist Sans is preloaded, Geist Mono loads once a page uses it
- Linting: `ESLint 10` + `eslint-config-next`
- Testing: Node.js test runner for build scripts, `Playwright` smoke tests, Lighthouse and MDN HTTP Observatory for production metrics
- Runtime: `Node.js 24.22.1+` (Node 24 LTS only)
- Hosting target: `Vercel`

## Implemented Scope

- Pages: Home, About, Projects, Project Detail (`/projects/[slug]`), Resume, Contact, 404
- Shared layout: header + footer + skip-link
- Theme switcher (light/dark) with `localStorage` persistence
- SEO baseline: title/description/canonical/OG/Twitter tags
- Technical SEO: `sitemap.xml` and `robots.txt`
- Defence-in-depth response headers: production CSP with a hash for the theme initializer, framing protection, nosniff, referrer, and permissions policy
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
- `/sitemap.xml` - Static build artifact generated before dev/build
- `/robots.txt` - Static build artifact generated before dev/build

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

- Tailwind CSS v4, configured CSS-first in `src/styles/globals.css` (`@theme`, no `tailwind.config.js`); PostCSS uses `@tailwindcss/postcss`
- Class sources are limited to `src/pages` and `src/components` via `@source`
- Core token groups:
  - colors: `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`, `--color-primary` (dark values are overridden on `html[data-theme="dark"]`)
  - typography: `h3`, `body`, `label`
  - widths: `max-w-content`, `max-w-text`
- Layout wrapper: `site-container` (full width with `1rem` inline padding, capped at `1024px`/`1200px`)
- Additional breakpoint: `xs` - `min-width: 376px` (`23.5rem`); use `max-xs:` for screens up to 375px
- The `dark:` variant follows `html[data-theme="dark"]` (the theme toggle), not `prefers-color-scheme`

## Content and Media

### Projects

Project data is split by page needs:
- `src/data/projects.ts` contains list/card data
- `src/data/project-case-studies.ts` contains detailed case studies
- `src/data/project-slugs.mjs` is the shared route source for Next.js and the SEO generator

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
- `sitemap.xml` and `robots.txt` are generated by `scripts/generate-static-seo.mjs` before dev/build
- Generated files are deterministic build artifacts and are not tracked in Git
- Absolute URLs require `NEXT_PUBLIC_SITE_URL`; production generation rejects localhost values
- Generator behavior is covered by the built-in Node.js test suite

## Accessibility

- Skip link at the top of layout (`Skip to content`)
- `aria-current` on active navigation items
- Theme toggle is a toggle button: its accessible name (`Dark theme`) stays the same and contains the visible label, and `aria-pressed` carries the state
- Visible `focus-visible` styles for links and buttons
- Semantic sections and heading hierarchy
- `prefers-reduced-motion` support

## Metrics

The badges at the top come from two sources.

Status badges are served by GitHub and shields.io: the `Quality` workflow on `main`, CodeQL code scanning, and the latest Vercel production deployment.

Production metrics are collected by `.github/workflows/metrics.yml` against `https://evgenii-rubin.vercel.app` after every successful production deployment, every Monday, and on manual dispatch:

- Lighthouse (mobile emulation) runs three times on every page listed in `sitemap.xml`; the median run represents a page, and each score badge shows the weakest page
- `first-load JS` is the compressed script transfer of the heaviest page, against a 170 kB budget (green within budget, orange up to twice the budget, red beyond)
- MDN HTTP Observatory grades the response headers
- `scripts/collect-metrics.mjs` turns the results into shields.io endpoint files and replaces the `metrics` branch with a single commit holding them and a [per-page report](https://github.com/stupidkubik/my-website/blob/metrics/README.md); the branch carries a `vercel.json` that keeps Vercel from deploying it
- HTML Lighthouse reports are kept for 14 days as the `lighthouse-reports` workflow artifact
- If any measurement fails, nothing is published and the badges keep the last good values

## Themes (Light / Dark)

- Initial theme is set in `_document.tsx` before hydration
- Theme switching is handled by `ThemeToggle`; its pressed look uses the `dark:` variant, so it is correct from the first paint, before hydration
- Theme state is stored in `localStorage` under the `theme` key
- Theme colors are driven by CSS variables (`html[data-theme="dark"]`)

## Environment Variables

Copy `.env.example` to `.env.local` and set the deployment URL:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

For local development you can use:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local Development

```bash
nvm use
npm ci
npm run dev
```

Notes:
- `dev` and `build` both use webpack. Turbopack's production build inlines a per-build bootstrap script that the hash-based CSP cannot allow, which stops client JavaScript from running
- Node.js is pinned in `.nvmrc`; `engines` in `package.json` plus `engine-strict` in `.npmrc` make npm refuse other versions
- The local quality gate is available via `npm run check`
- SEO generator tests are available via `npm run test:seo`
- GitHub Actions runs three jobs for pull requests and `main`: `quality` (clean install, check, build with the CSP inline-script check), `e2e` (build plus Playwright smoke tests; the report with screenshots is uploaded as an artifact) and `audit` (full audit at high severity and above, plus a production audit), so an advisory never hides a broken build. Superseded pull request runs are cancelled; every commit on `main` is verified
- The `Metrics` workflow measures production separately; see [Metrics](#metrics)
- Dependabot (`.github/dependabot.yml`) opens weekly grouped minor/patch PRs for npm and GitHub Actions; major versions arrive as separate PRs

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build, then verify that every inline script in the generated HTML is allowed by the CSP (`postbuild`)
- `npm run start` - run production server
- `npm run lint` - run ESLint checks
- `npm run typecheck` - run TypeScript without emitting files
- `npm test` - run the project test suite
- `npm run check` - run lint, typecheck, and tests
- `npm run generate:seo` - generate static sitemap and robots files
- `npm run test:seo` - test URL validation and deterministic SEO output
- `npm run test:security` - test the catch-all response security-header policy
- `npm run test:build` - check built HTML for inline scripts the CSP would block (requires `npm run build`)
- `npm run test:metrics` - test how Lighthouse and Observatory results become badges and the metrics report
- `npm run test:e2e` - Playwright smoke tests against `next start` on port 3200: every route renders with the configured security headers, no console or CSP errors, hydration, theme toggle, client-side navigation, plus light/dark screenshots at 1280/375 in `playwright-report/` (requires `npm run build` and `npx playwright install chromium`)

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

- ESLint 10 is used since 2026-10-26 (ESLint 9 reached [end of life](https://eslint.org/version-support/) on August 6, 2026). `eslint-plugin-react`, `eslint-plugin-import`, and `eslint-plugin-jsx-a11y` (bundled by `eslint-config-next` 16.4.3) still declare peers up to ESLint 9, so npm prints peer warnings and `npm ls --all` reports them as invalid. Lint output was verified to match ESLint 9 rule-for-rule; drop this note once the plugins widen their peer ranges.
- TypeScript stays on 6.x: TypeScript 7 has no JavaScript API yet, so `typescript-eslint` (used by `eslint-config-next`) refuses to run, and `.github/dependabot.yml` ignores `>=7`. Lift the ignore once typescript-eslint supports TS 7 ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)); `baseUrl` is already removed from `tsconfig.json`
- List and case-study content stay separate intentionally; route slugs have one shared source
- Local TypeScript cache files (`*.tsbuildinfo`) are ignored via `.gitignore`
- Working PDFs in repo root are ignored, but production assets in `public/` (including resume PDF) are tracked
