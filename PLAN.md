# Project Plan

## Core Track
- [x] Initialize git repository and create `dev` branch
- [x] Define project decisions (Systematic Minimalist + Stack A)
- [x] Scaffold Next.js Pages Router with TypeScript and Tailwind
- [x] Create base pages (Home, About, Projects, Project Detail, Contact, Resume, 404)
- [x] Add content from CV (copy, experience, links, project details)
- [x] Add demo and GitHub links for projects
- [x] Establish design tokens and typography scale
- [x] Add shared layout (Header/Footer) and navigation
- [x] Add UI primitives (Button, TextLink, ProjectCard, Badge, Section)
- [x] Add Grid system and apply to key layouts
- [x] Stabilize typography and copy consistency
- [x] Add modular rhythm with `Stack` and align spacing across pages
- [x] Add optional grid overlay (currently disabled)
- [x] Add extra-small breakpoint (`375px`) and tiny-screen adjustments
- [x] Lint passes

## Current Focus
- [x] Stabilize layouts and modular rhythm (final pass)
- [x] Decide on grid overlay treatment (keep off)

## Backlog
- [x] Replace placeholders with project screenshots/media
- [x] Implement downloadable neutral CV (PDF)
- [x] Add SEO metadata baseline (title/description/OG/canonical/twitter)
- [x] Add sitemap.xml and robots.txt
- [x] Add accessibility pass (focus states, aria labels where needed)
- [x] Consider subtle motion (page load/staggered reveals)
- [x] Optional: dark mode after light theme is finalized

## Review Remediation Plan (2026-02-08)
- [ ] [P1] Replace internal navigation on plain `<a>` with `next/link` (`ButtonLink`, `ProjectCard`, inline internal links) to avoid full page reloads.
- [ ] [P1] Fix font variable scope for Geist (`--font-geist-sans` / `--font-geist-mono`) so `font-sans` is applied reliably without serif fallback.
- [ ] [P1] Restore working lint quality gate (align ESLint v9 config and `npm run lint` script).
- [ ] [P2] Re-apply project detail page media integration (`next/image`, responsive sizes, no placeholders).
- [ ] [P2] Re-check SEO layer end-to-end (`SeoHead`, canonical/OG URLs, sitemap/robots availability on routes).
- [ ] [P2] Re-check accessibility baseline end-to-end (visible focus states, skip-link target on `main`, `aria-current` in nav).
- [ ] [P3] Deduplicate project data into a single source shared by home/projects/project-detail pages.
- [ ] [P3] Add lightweight perf verification checklist before deploy (LCP image, route transitions, no unexpected full reloads).
