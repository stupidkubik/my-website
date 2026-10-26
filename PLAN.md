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
- [x] Close security, runtime, SEO, and quality-gate priorities from the 2026-07-20 debug review
- [x] Close P3 demo-entry and repository security-header findings
- [ ] Start the controlled content/refactoring pass

## Backlog
- [x] Replace placeholders with project screenshots/media
- [x] Implement downloadable neutral CV (PDF)
- [x] Add SEO metadata baseline (title/description/OG/canonical/twitter)
- [x] Add sitemap.xml and robots.txt
- [x] Add accessibility pass (focus states, aria labels where needed)
- [x] Consider subtle motion (page load/staggered reveals)
- [x] Optional: dark mode after light theme is finalized

## Review Remediation Plan (2026-02-08)
- [x] [P1] Replace internal navigation on plain `<a>` with `next/link` (`ButtonLink`, `ProjectCard`, inline internal links) to avoid full page reloads.
- [x] [P1] Fix font variable scope for Geist (`--font-geist-sans` / `--font-geist-mono`) so `font-sans` is applied reliably without serif fallback.
- [x] [P1] Restore working lint quality gate (align ESLint v9 config and `npm run lint` script).
- [x] [P2] Re-apply project detail page media integration (`next/image`, responsive sizes, no placeholders).
- [x] [P2] Re-check SEO layer end-to-end (`SeoHead`, canonical/OG URLs, sitemap/robots availability on routes).
- [x] [P2] Re-check accessibility baseline end-to-end (visible focus states, skip-link target on `main`, `aria-current` in nav).
- [x] [P3] Deduplicate project data into a single source shared by home/projects/project-detail pages.
- [ ] [P3] Add lightweight perf verification checklist before deploy (LCP image, route transitions, no unexpected full reloads).

## Remediation (2026-10-26)
Plan and findings: `REVIEW_AND_FIX_PLAN_2026-10-26.md`. Merge in order.
- [x] #19 Patch zod advisory, align Next.js minors, move to Node 24 LTS, untrack `next-env.d.ts`
- [x] #20 Migrate to Tailwind CSS v4 (pixel-identical to the v3 build)
- [x] #21 Build with webpack so the hash CSP allows every inline script (production had no client JS since 2026-09-30)
- [x] #22 Split audit from build in CI, enforce engines, configure Dependabot
- [x] #23 Playwright smoke tests and `e2e` CI job
- [x] ESLint 10 (#24 was closed; the commit landed with #25)
- [x] #25 Docs and evidence (`output/security-audit/2026-10-26/`)
- [x] #29 TypeScript 6; Dependabot holds TypeScript 7 until typescript-eslint supports it
- [ ] Decide whether to enable the intended desktop type scale and section spacing that v3 never applied

## Post-merge review and metrics (2026-10-26)
Findings: `POST_MERGE_REVIEW_2026-10-26.md`.
- [x] Re-verify `main` after the merges: check, build, e2e, audit, production headers
- [x] Production metrics workflow (Lighthouse, MDN HTTP Observatory) and README badges
- [x] Verify every commit on `main` in CI instead of cancelling superseded runs
- [ ] Theme toggle: accessible name must contain the visible label (WCAG 2.5.3)
- [ ] Preload only the Geist Sans font; Geist Mono is preloaded on every page
- [ ] Delete merged branches and enable automatic head-branch deletion
