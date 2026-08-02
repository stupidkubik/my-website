# Systematic design audit

Date: 2026-08-02

## Scope

Combined visual, UX, responsive, and observable accessibility audit of the portfolio’s main recruiter journey:

1. Landing page
2. Project discovery
3. Case-study review
4. Resume review
5. Contact
6. Mobile reflow at 375 px and 320 px
7. Keyboard entry, dark theme, and supporting About content

Primary user goal: quickly understand Evgenii’s positioning, assess the quality and relevance of his work, verify experience, and make contact.

## Overall verdict

This is a good, disciplined foundation—not a poor design. The site consistently expresses its Systematic Minimalist / Swiss direction and feels technically trustworthy. Its main weakness is persuasion: the interface is more successful at showing cleanliness than at proving the impact, depth, and visual quality of the work.

The highest-value improvement is not more decoration. It is stronger evidence: project thumbnails in discovery, multiple annotated visuals in each case study, scannable outcomes, and a clearer contact conversion.

## Strengths

- Consistent typographic hierarchy, restrained palette, generous spacing, and aligned content widths.
- Stable reflow down to 320 px with no horizontal overflow observed.
- Real content throughout; no filler copy or decorative noise.
- Clear semantic landmarks, one primary heading per page, descriptive external-link labels, image alt text, and `aria-current` navigation state.
- A visible skip link and strong keyboard focus treatment.
- Dark mode is coherent, and motion is disabled under `prefers-reduced-motion`.
- Production build completed successfully and the audited pages produced no browser console errors.

## Highest-impact findings

### 1. Project discovery lacks visual proof — high impact

Evidence: `01-home-desktop.png`, `02-projects-desktop.png`, `06-home-mobile.png`, `08-projects-mobile.png`.

All three projects are presented as nearly identical text cards. This makes the page clean but forces the visitor to read before they can compare. For a portfolio, screenshots are evidence, not decoration.

Recommendation: add a consistent 16:10 or 3:2 project thumbnail to every card, followed by title, one outcome-oriented sentence, role, and 2–3 key technologies. Keep the whole card clickable; retain demo/source as secondary actions.

### 2. Case studies explain architecture but do not fully demonstrate outcomes — high impact

Evidence: `03-case-study-desktop.png`, `11-case-study-mobile-dark.png`.

The case-study structure is logical, but one wide screenshot and several text sections leave the visitor with little observable proof. On mobile, the full-product screenshot becomes too small to inspect. “Outcome” is a claim rather than a demonstrated result.

Recommendation: use a repeatable narrative: problem → constraints → role/scope → key decisions → 3–5 annotated product views → measurable result → lessons/trade-offs. On mobile, use cropped detail images or stacked close-ups rather than relying only on one scaled desktop screenshot.

### 3. The home-page promise is credible but generic — high impact

Evidence: `01-home-desktop.png`, `06-home-mobile.png`, `07-home-small-mobile.png`.

The headline communicates reliability, but it could describe many frontend developers. The paragraph is long for an entry screen and hides the strongest differentiators: high-traffic publishing, 20+ ad platforms, a 100M+ combined campaign audience, automation, and quantified QA improvements.

Recommendation: make the headline role- and outcome-specific, then place 2–3 proof points directly below it. Preserve the restrained tone and current two-button hierarchy.

### 4. Contact is usable but visually underweighted — medium/high impact

Evidence: `05-contact-desktop.png`.

The page has a very large empty field while its primary action appears as a row of ordinary text links. “Email” also hides the address a recruiter may want to copy or recognize immediately.

Recommendation: make email the clear primary action, show the address, add a copy affordance if desired, and state availability or typical response time. Use the remaining space for a compact “best fit” summary, not decoration.

### 5. Small navigation is legible but not comfortably touch-oriented — medium impact

Evidence: `07-home-small-mobile.png`, `08-projects-mobile.png`, `10-projects-dark-mobile.png`.

At 320 px, primary navigation text is 10 px and link boxes are 32 px tall. No overflow was observed, and the targets exceed WCAG 2.2’s 24 px minimum, but they are smaller than the commonly recommended 44 px ergonomic target and feel visually subordinate.

Recommendation: keep labels at least 12 px, increase the vertical hit area toward 40–44 px, and consider a two-row header or compact menu only if it improves clarity without adding friction.

### 6. UI boundaries are too subtle for some users — medium accessibility risk

Evidence: all light/dark screenshots; implementation tokens.

Muted body text measured 4.83:1 in light mode and 7.72:1 in dark mode, which is healthy for normal text. However, borders measure about 1.27:1 on light and 1.33:1 on dark backgrounds. These borders define cards, the theme toggle, and outline buttons; where a boundary is needed to identify a control, 3:1 non-text contrast is the relevant target.

Recommendation: introduce a stronger interactive-border token for buttons, toggles, and focusable cards while retaining the quieter border for purely structural dividers.

### 7. Some hierarchy and state cues are overly subtle — medium/low impact

Evidence: `02-projects-desktop.png`, `08-projects-mobile.png`, DOM snapshot.

- The Projects page jumps from an `h1` to project titles marked as `h3`; use `h2` for the card titles.
- The active navigation item is differentiated mainly by a muted-to-foreground color change. Add a restrained non-color cue, such as weight or an underline.
- Desktop Projects and Contact pages contain large unused vertical regions. Whitespace fits the concept, but here it can read as unfinished because the information density is low.

## Page-by-page health

1. Home — healthy foundation; positioning and evidence need strengthening.
2. Projects — structurally healthy; weak visual differentiation and proof.
3. Case study — readable and coherent; insufficient visual/process evidence.
4. Resume — strong and scannable; long but appropriately structured.
5. Contact — functional; conversion hierarchy is too weak.
6. Mobile home — healthy reflow at 375 px and 320 px; header is too small.
7. Keyboard entry — healthy; skip link is immediately visible and focus is clear.
8. Dark projects — healthy and consistent; subtle border contrast remains a risk.
9. Mobile case study — functional; the product screenshot is not inspectable at this scale.
10. About — readable but overlaps with Resume; it could contribute more personal working principles or collaboration context.

## Approved implementation scope

The implementation should retain the existing Systematic Minimalist / Swiss direction. The goal is to make the portfolio more persuasive and accessible without turning it into a decorative marketing site.

Approved changes:

1. Add real project previews and integrate them into the existing card system.
2. Expand case studies moderately without adding new product screenshots.
3. Make the home-page positioning more specific and surface verified evidence.
4. Strengthen the Contact page and display the email address directly.
5. Increase the size and touch comfort of mobile navigation.
6. Increase the contrast of interactive boundaries.
7. Correct the project-card heading hierarchy.

Explicitly out of scope for this pass:

- A complete visual redesign or a change of design concept.
- New project screenshots, illustrations, generated imagery, or decorative assets.
- A backend contact form.
- New routes or a new content-management system.
- Unverified performance, audience, conversion, or business claims.
- Changes to external project applications.

## Detailed implementation roadmap

The stages below are ordered by dependency. Shared interface rules come first, then the most visible reusable component, followed by page-level content and composition. Each stage should remain independently reviewable and reversible.

### Stage 0 — establish the implementation baseline

#### Goal

Create a stable reference point so later visual changes can be compared against the audit rather than judged from memory.

#### Steps

1. Keep the screenshots in this audit folder as the accepted “before” set.
2. Confirm that the current production build still passes before source changes begin.
3. Record the target viewports used for comparison: 1440 px desktop, 375 px mobile, and 320 px narrow mobile.
4. Treat both light and dark themes as required output, not optional polish.
5. Preserve the existing grid, container widths, Geist typography, restrained radii, and lack of decorative shadows.
6. Do not change copy and layout in the same implementation step unless the change cannot be evaluated separately.

#### Acceptance criteria

- The existing audit images remain available for side-by-side comparison.
- The starting production build succeeds.
- No unrelated source or content changes are included.

### Stage 1 — strengthen shared interface foundations

#### Goal

Resolve the cross-site accessibility and hierarchy issues before building new card layouts on top of them.

#### Primary files

- `src/styles/globals.css`
- `tailwind.config.js`
- `src/components/Header.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/pages/projects/index.tsx`

#### Steps

1. Add a dedicated interactive-border token for both themes.
   - Keep the current `--color-border` for quiet structural dividers.
   - Add a stronger token for buttons, toggles, and interactive card boundaries.
   - Select the final values by measurement, targeting at least 3:1 contrast against the adjacent background wherever the boundary is necessary to identify a control.
2. Expose the new token through Tailwind so components can use one shared class instead of hard-coded colors.
3. Apply the stronger border to:
   - outline buttons;
   - the theme toggle;
   - project cards;
   - any other focusable surface whose clickable boundary is otherwise ambiguous.
4. Preserve the quiet structural border for section separators and the footer/header dividers.
5. Increase mobile navigation typography from 10–11 px to at least 12 px.
6. Increase the mobile navigation hit area from 32 px toward 40–44 px while keeping the labels visible without horizontal overflow at 320 px.
7. Adjust mobile gaps only as much as necessary; do not introduce a menu unless the direct-navigation layout stops fitting cleanly.
8. Strengthen the current-page navigation state with a restrained non-color cue.
   - Preferred direction: medium weight plus a fine underline or bottom rule.
   - Avoid layout shift when moving between active items.
   - Keep `aria-current="page"` intact.
9. Make the project-card heading level configurable.
   - Use `h3` on the home page because the cards sit beneath the `Selected Work` `h2`.
   - Use `h2` on the Projects page because those cards sit directly beneath the page `h1`.
   - Do not globally replace every project title with `h2`, as that would create the wrong hierarchy on the home page.
10. Recheck focus-visible styles after the border changes to ensure focus remains more prominent than the resting state.

#### Acceptance criteria

- Interactive boundaries meet the chosen contrast target in light and dark themes.
- Structural dividers remain visually quiet.
- Primary navigation is at least 12 px and has a 40–44 px target height on narrow screens.
- The header fits at 320 px without clipping or horizontal scrolling.
- Current navigation state is visible without relying only on color.
- Heading order is `h1 → h2` on Projects and `h1 → h2 → h3` on Home.
- Keyboard focus remains clearly visible on links, buttons, and cards.

#### Suggested commit boundary

`refactor(design): strengthen interactive foundations`

### Stage 2 — add real project previews to the card system

#### Goal

Make the three projects visually distinguishable before the visitor reads their descriptions, while keeping the cards systematic and minimal.

#### Existing assets

Use the real cover images already available in the repository:

- `public/media/projects/kanban-board/cover.webp`
- `public/media/projects/stripe-mini-app/cover.webp`
- `public/media/projects/admin-dashboard/cover.webp`

No generated imagery or new screenshots are required for this stage.

#### Primary files

- `src/data/projects.ts`
- `src/data/project-case-studies.ts`
- `src/components/ui/ProjectCard.tsx`
- `src/pages/index.tsx`
- `src/pages/projects/index.tsx`
- `src/pages/projects/[slug].tsx`

#### Visual direction

- Use one consistent media ratio close to the source images, approximately 16:10.
- Place the preview full-width at the top of the card.
- Use a muted canvas behind the image and a clean border around the card.
- Keep the image treatment flat: no shadows, gradients, tinted overlays, floating browser frames, or decorative badges over the image.
- Retain the existing rounded radius and spacing system.
- Keep title and summary visually stronger than technology badges and secondary links.

#### Steps

1. Add a typed `cover` or `preview` object to each project in `src/data/projects.ts`.
   - Include `src`, `alt`, `width`, and `height`.
   - Prefer a single source of truth that can be reused by both project cards and the case-study hero.
2. Remove duplicated media metadata from the case-study data if the shared cover object can represent the same asset cleanly.
3. Extend `ProjectCard` with a typed image prop and render the asset through `next/image`.
4. Give the media area a stable aspect ratio so image loading does not cause layout shift.
5. Use `object-cover` only if important interface content remains visible. If a project needs a different focal point, store an explicit object-position value in project data rather than adding card-specific CSS.
6. Restructure the card as:
   - preview;
   - title;
   - concise summary;
   - optional technology badges;
   - optional demo/source actions.
7. Keep the whole card discoverable as the case-study link while preserving independent access to Live Demo and Source Code.
8. Verify that the stretched-link technique does not cover the demo/source links and does not create nested interactive elements.
9. Use one component for both surfaces:
   - Home: preview, title, and concise summary.
   - Projects: preview, title, summary, technology badges, demo/source links, and the sign-in note when applicable.
10. Make cards equal-height within each desktop row without forcing excess whitespace inside shorter cards.
11. Define responsive `sizes` for the image based on one-column mobile, two-column tablet, and three-column desktop grids.
12. Verify the image alt text describes what the preview shows rather than repeating the project title.

#### Acceptance criteria

- All three projects can be distinguished visually without reading their titles.
- Images use a consistent ratio and do not look arbitrarily cropped.
- The cards remain recognizably part of the current Swiss/minimal system.
- There is no cumulative layout shift from image loading.
- Home and Projects use the same card component without duplicated layout markup.
- Live Demo and Source Code remain separately keyboard-accessible.
- Cards remain readable and balanced at 320, 375, 768, 1024, and 1440 px.
- Light and dark themes both provide an appropriate canvas around the screenshots.

#### Suggested commit boundary

`feat(projects): add real project previews`

### Stage 3 — make the home page more specific

#### Goal

Help a recruiter understand the role, domains, and strongest evidence within the first 10–15 seconds.

#### Primary file

- `src/pages/index.tsx`

Create a separate proof-point component only if it will be reused elsewhere; otherwise keep the implementation local and simple.

#### Content direction

Working headline direction:

> Frontend developer building reliable product interfaces and interactive experiences.

Working supporting direction:

> Production experience across high-traffic publishing and playable advertising, with a focus on reusable systems, cross-platform QA, and predictable delivery.

Candidate verified proof points:

- `3+ years` — production experience.
- `20+ platforms` — playable-ad platform delivery.
- `50% less assembly time` — complex editorial production after automation.
- `30% fewer post-launch bugs` — after introducing standardized QA and validation.

Use three proof points, not all four, to preserve the current restraint. The 100M+ combined campaign audience may be retained in Resume copy but should not automatically become the main hero metric because it can imply direct ownership of audience growth.

#### Steps

1. Replace the generic headline with a role-specific version that still accommodates both web product work and interactive experiences.
2. Reduce the opening paragraph to approximately 2–3 desktop lines and avoid repeating the headline.
3. Add a semantic proof-point list between the supporting copy and the primary actions.
4. Give each proof point:
   - one prominent value;
   - one concise label explaining what the value measures.
5. Use only claims already supported by Resume content or project documentation.
6. Keep `View Projects` as the primary action and `Get in Touch` as the secondary action.
7. Rebalance the hero’s vertical spacing after project cards gain images; judge the hero and Selected Work transition as one composition.
8. Avoid adding a portrait, decorative illustration, logo strip, or background effect in this pass.
9. Check mobile line breaks manually at 320 and 375 px; the headline should remain strong without producing isolated one-word lines.
10. Ensure proof points collapse into a readable stack or compact grid on mobile.

#### Acceptance criteria

- Role and specialization are clear without reading the entire paragraph.
- Three verified proof points are visible before the project section on common desktop viewports.
- The hero does not become visually busier than the project cards.
- Mobile line breaks remain deliberate at 320 and 375 px.
- Existing primary and secondary actions remain obvious and keyboard-accessible.
- No claim is broader than the supporting Resume or project evidence.

#### Suggested commit boundary

`feat(home): sharpen positioning and proof`

### Stage 4 — expand case studies without adding screens

#### Goal

Make the case studies easier to scan and more convincing using existing assets and verified project facts.

#### Primary files

- `src/data/project-case-studies.ts`
- `src/pages/projects/[slug].tsx`
- Existing typography, list, grid, badge, and stack primitives.

#### Target structure

1. Back navigation.
2. Project title and concise summary.
3. Project Snapshot.
4. Context / problem.
5. Existing product cover.
6. Constraints or challenges.
7. Key decisions.
8. Verified outcome evidence.
9. Trade-offs or next improvements, when honest and useful.
10. Demo and source links.

#### Steps

1. Add a typed `snapshot` collection to each case study.
   - Suggested fields: Role, Product Type, Scope, and Quality/Delivery.
   - Keep values short enough to scan in a 2×2 desktop grid and a single-column mobile stack.
2. Shorten `context` so it explains the product problem and intended user outcome without repeating the summary.
3. Keep the existing Challenges content but present it as constraints where that wording is more accurate.
4. Rename or reshape Approach into Key Decisions.
   - Each item should state the decision first.
   - Follow with the reason or reliability benefit.
   - Avoid long architecture inventories that belong in repository documentation.
5. Replace the single Outcome paragraph with 2–3 verified outcome items.
6. Use verifiable scope evidence instead of invented business metrics.
   - Kanban: bilingual workspace, owner/editor/viewer roles, isolated emulator E2E.
   - Verdant Lane: Stripe-backed catalogue, protected receipt flow, idempotent order processing.
   - Admin Dashboard: four locales, explicit demo/real-data boundary, Playwright/axe and visual-regression coverage.
7. Add a short Trade-offs or Next Improvements section only where the statement can be grounded in the actual project.
8. Keep the current single cover image; do not introduce extra screens during this pass.
9. Make the existing cover inspectable on mobile.
   - Preferred minimal solution: provide an explicit “Open full-size screenshot” link adjacent to the image.
   - Preserve descriptive alt text.
   - Do not silently wrap the image in a link without an accessible name.
10. Keep text measure near the existing 65-character width and avoid making every section full-width.
11. Reuse existing layout primitives before creating a case-study-only component.
12. Verify that all three case studies render from the same typed template.

#### Acceptance criteria

- A visitor can scan role, scope, decisions, and outcomes without reading every paragraph.
- Each outcome is traceable to existing project evidence.
- No additional product screenshot is required.
- The existing screenshot can be opened or inspected at a useful size on mobile.
- All case-study pages share one consistent structure.
- No section becomes a wall of text longer than the current case study.
- Heading hierarchy remains sequential and semantic.

#### Suggested commit boundary

`feat(case-studies): strengthen evidence and scanability`

### Stage 5 — strengthen the Contact page

#### Goal

Make email the unmistakable primary action and use the current empty space to clarify fit and availability.

#### Primary file

- `src/pages/contact.tsx`

Reuse existing Button, TextLink, Grid, Stack, MetaLabel, and typography primitives where possible.

#### Desktop composition

- Main column: title, concise invitation, visible email address, and primary email action.
- Supporting column: availability, location/timezone, work permit, and secondary channels.

On mobile, the supporting information should follow the primary email action in a single natural reading order.

#### Steps

1. Rewrite the opening sentence to identify the kinds of opportunities that are relevant.
2. Display `stupidkubik@gmail.com` directly instead of hiding it behind the word “Email.”
3. Add a prominent `Email me` mailto action using the primary button style.
4. Keep the visible address selectable and recognizable independently from the button.
5. Keep LinkedIn, Telegram, and phone as secondary text actions.
6. Do not add a copy-to-clipboard interaction in the first pass; it introduces client-side state without being necessary to meet the user goal.
7. Combine timezone, location, and work-permit information into a compact supporting block.
8. Add a short availability or preferred-role statement using only accurate current information.
9. Reduce the impression of an unfinished empty page through grid balance and content grouping, not decorative filler.
10. Verify that `mailto:` and `tel:` links retain accessible names and visible focus states.

#### Acceptance criteria

- The email address is visible without interaction.
- Email is clearly the primary contact method.
- Secondary contact methods remain available but do not compete with the primary action.
- Location, timezone, work permit, and availability are understandable at a glance.
- The desktop page feels intentionally composed rather than sparsely unfinished.
- Mobile reading order begins with the contact invitation and primary email action.

#### Suggested commit boundary

`feat(contact): clarify primary contact action`

### Stage 6 — run production QA and repeat the visual audit

#### Goal

Verify that the changes improve persuasion and accessibility without breaking the restrained design system or responsive behavior.

#### Functional checks

1. Run linting, TypeScript, and project tests through the existing `npm run check` command.
2. Run a production build.
3. Confirm that all static routes and three project routes still generate successfully.
4. Check the browser console on Home, Projects, one case study, Resume, About, and Contact.
5. Verify internal navigation, theme switching, card links, demo/source links, `mailto:`, `tel:`, and the PDF link.

#### Visual checks

1. Capture Home, Projects, one representative case study, and Contact at 1440 px.
2. Capture the same important surfaces at 375 px and 320 px.
3. Repeat Projects and the representative case study in dark mode.
4. Compare the new images directly with the accepted audit screenshots.
5. Check image crops, card height consistency, heading wraps, section spacing, footer placement, border strength, and active navigation state.
6. Confirm that the new project previews provide differentiation without overpowering the content.

#### Accessibility checks

1. Enter every audited page with the keyboard and verify the skip link.
2. Tab through navigation, theme toggle, project cards, demo/source actions, email action, and footer links.
3. Confirm visible focus in both themes.
4. Confirm sequential heading structure through a semantic snapshot.
5. Recalculate text and interactive-boundary contrast after token changes.
6. Confirm no horizontal overflow at 320 px.
7. Check reflow at browser zoom where practical, especially the header, project cards, and contact actions.
8. Confirm that reduced-motion behavior still disables reveal animations.

#### Audit update

1. Save a numbered “after” screenshot set next to this report or in a clearly named sibling folder.
2. Add a Post-implementation verification section to this file.
3. Mark each approved finding as resolved, partially resolved, or deferred.
4. Document any intentional trade-off, especially if a border, crop, or mobile header choice does not fully meet the original target.

#### Acceptance criteria

- `npm run check` passes.
- Production build passes.
- No browser console errors appear on audited routes.
- No horizontal overflow appears at 320 px.
- Project previews are visually consistent in both themes.
- Keyboard flow and focus remain intact.
- Interactive-boundary contrast meets the chosen target.
- The report contains a clear before/after verification record.

#### Suggested commit boundary

`test(design): verify responsive and accessible polish`

## Implementation order and dependency notes

1. Stage 1 must come first because project cards, buttons, and navigation all depend on the shared border and interaction rules.
2. Stage 2 comes before the Home rewrite because the new image-led cards change the visual weight immediately below the hero.
3. Stage 3 should be evaluated against the finished cards so the hero and Selected Work section form one balanced opening composition.
4. Stage 4 can reuse the shared cover metadata introduced in Stage 2.
5. Stage 5 is mostly independent, but it should use the button and border behavior finalized in Stage 1.
6. Stage 6 begins only after the five implementation stages are complete; do not treat isolated screenshots from intermediate stages as final QA.

Recommended review checkpoints:

- Checkpoint A: approve foundations after Stage 1.
- Checkpoint B: approve the card visual direction after the first project card is implemented, then apply it to all three.
- Checkpoint C: approve Home positioning and proof-point selection before finalizing copy.
- Checkpoint D: review one fully restructured case study before applying the data shape to the other two.
- Checkpoint E: approve the complete site through the repeated visual audit in Stage 6.

## Commit strategy

Keep commits aligned with reviewable product outcomes rather than individual files. Each commit should contain one coherent change, its directly related tests or content updates, and no unrelated cleanup.

Planned sequence:

1. `docs(design): add audit and implementation roadmap`
   - This audit report.
   - Accepted baseline screenshots.
   - Ignore rule for local browser-session data.
2. `refactor(design): strengthen interactive foundations`
   - Interactive-border tokens.
   - Mobile navigation sizing.
   - Active navigation cue.
   - Context-sensitive project-card heading levels.
3. `feat(projects): add real project previews`
   - Shared typed cover metadata.
   - Image-enabled project-card layout.
   - Home and Projects integration.
4. `feat(home): sharpen positioning and proof`
   - Specific headline and supporting copy.
   - Verified proof-point list.
   - Hero spacing adjustments required by the image-led cards.
5. `feat(case-studies): strengthen evidence and scanability`
   - Snapshot metadata.
   - Key decisions and verified outcomes.
   - Full-size screenshot access on mobile.
6. `feat(contact): clarify primary contact action`
   - Visible email address.
   - Primary mail action.
   - Availability and supporting contact composition.
7. `test(design): verify responsive and accessible polish`
   - Final fixes discovered during QA.
   - Post-implementation audit status.
   - Accepted “after” screenshots when they are intended to remain in the repository.

Commit rules:

- Run the checks relevant to the stage before committing it.
- Review `git diff --staged` before every commit.
- Do not combine two stages merely because they touch the same component.
- Do not commit `.playwright-cli` or the saved browser-session folder.
- Do not mix dependency upgrades, formatting churn, or unrelated refactors into design commits.
- If a stage needs a prerequisite refactor, keep it in the same commit only when the refactor has no useful standalone outcome.
- Use an additional fix commit only when a problem is discovered after the stage commit; avoid rewriting already reviewed history without a clear reason.

## Evidence limits

This audit verifies captured visual states, real responsive reflow at 1440/375/320 px, observed keyboard entry, semantic browser snapshots, source tokens, and one light/dark theme transition. It does not establish full WCAG compliance. Screen-reader behavior, 200–400% zoom, Windows high-contrast mode, multiple browsers/devices, external demo flows, email/tel handlers, and every interactive state still require dedicated testing.

## Evidence files

- `01-home-desktop.png`
- `02-projects-desktop.png`
- `03-case-study-desktop.png`
- `04-resume-desktop.png`
- `05-contact-desktop.png`
- `06-home-mobile.png`
- `07-home-small-mobile.png`
- `08-projects-mobile.png`
- `09-keyboard-skip-link.png`
- `10-projects-dark-mobile.png`
- `11-case-study-mobile-dark.png`
- `12-about-mobile-dark.png`
