# Pre-deploy checklist

A lightweight verification list before shipping.

## Build & hygiene
- [ ] Use the pinned Node version with `nvm use`.
- [ ] Run `npm ci` from the committed lockfile.
- [ ] Run `npm run check` (lint, typecheck, and tests).
- [ ] Run `npm audit --omit=dev` (no production vulnerabilities).
- [ ] Run `npm run build` (no errors).
- [ ] Confirm the Git worktree stays clean apart from intentional source changes.

## Performance (quick pass)
- [ ] **Home**: hero content renders immediately; no layout jumps.
- [ ] **Projects detail**: the main `next/image` loads fast; `sizes` looks correct on mobile/desktop.
- [ ] **LCP**: identify LCP element on `/` and one `/projects/[slug]`; ensure the LCP image is appropriately sized and not excessively large.

## Navigation & routing
- [ ] Internal navigation uses client-side routing (no full page reload).
- [ ] 404 page renders for unknown routes.

## Accessibility (baseline)
- [ ] Keyboard: all interactive elements reachable via Tab.
- [ ] Focus is visible for links/buttons.
- [ ] Skip link moves focus to `#main-content`.
- [ ] `aria-current="page"` reflects active navigation item.
- [ ] With `prefers-reduced-motion: reduce`, animations are disabled.

## SEO & social
- [ ] `NEXT_PUBLIC_SITE_URL` is set correctly for production.
- [ ] Canonical URLs are present on indexable pages.
- [ ] `/sitemap.xml` returns valid XML with all routes.
- [ ] `/robots.txt` includes the correct sitemap URL.
- [ ] Open Graph: verify `og:title`, `og:description`, `og:image` (and width/height where provided).
- [ ] Twitter card renders expected preview.

## Assets
- [ ] `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` exist in `public/`.
- [ ] Resume PDF link downloads/opens as expected.

## Security headers
- [x] Production HTML includes `X-Content-Type-Options: nosniff`.
- [x] Production HTML includes the expected `Referrer-Policy` and `Permissions-Policy`.
- [x] Framing is denied by CSP `frame-ancestors 'none'` (with `X-Frame-Options: DENY` fallback).
- [x] Vercel continues to provide HSTS on the HTTPS production domain.
