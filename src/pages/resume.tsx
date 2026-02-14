import { ButtonLink } from "@/components/ui/Button";
import BulletList from "@/components/ui/BulletList";
import SeoHead from "@/components/SeoHead";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { BodyMuted, MetaLabel } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Resume() {
  return (
    <>
      <SeoHead
        description="Resume of Evgenii Rubin: frontend developer focused on web production automation, scalable React apps, and quality-first implementation."
        path="/resume"
        title="Resume"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
        <Grid>
          <GridCol lg={9}>
            <Stack size="xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <Stack size="sm">
                  <PageTitle>Evgenii Rubin</PageTitle>
                  <BodyMuted>Frontend Developer (React, Next.js) · Novi Sad, Serbia</BodyMuted>
                </Stack>
                <ButtonLink href="/media/resume/evgenii-rubin-cv.pdf" variant="outline">
                  Download PDF
                </ButtonLink>
              </div>

              <BodyMuted as="section">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <TextLink href="tel:+381638355517">+381 63 835 5517</TextLink>
                  <TextLink href="mailto:stupidkubik@gmail.com">stupidkubik@gmail.com</TextLink>
                  <TextLink
                    href="https://www.linkedin.com/in/evgenii-rubin-60804724b/"
                    openInNewTab
                    withExternalIndicator
                  >
                    LinkedIn
                  </TextLink>
                  <TextLink href="https://t.me/stupidpotato" openInNewTab withExternalIndicator>
                    Telegram
                  </TextLink>
                  <TextLink href="https://github.com/stupidkubik" openInNewTab withExternalIndicator>
                    GitHub
                  </TextLink>
                </div>
                <MetaLabel className="mt-3">Serbian Work Permit</MetaLabel>
              </BodyMuted>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Summary</h2>
                  <BulletList className="text-body">
                    <li>
                      Frontend developer with a strong background in web production automation. Proven track
                      record of optimizing editorial workflows by 50% through custom scripts and structured
                      data implementation.
                    </li>
                    <li>
                      Skilled in the modern React ecosystem (Next.js, TypeScript, Redux) with a focus on
                      building performant and scalable interfaces.
                    </li>
                    <li>
                      Passionate about solving real user problems and using AI-assisted tools to build
                      efficient, scalable web applications.
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Experience</h2>
                  <div className="space-y-8 text-body text-muted-fg">
                    <article className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                      <MetaLabel className="pt-1">Aug 2023 — Jan 2026</MetaLabel>
                      <Stack size="sm">
                        <p className="text-[1.125rem] font-medium leading-snug text-fg">
                          Frontend Developer
                        </p>
                        <MetaLabel>
                          Tinkoff Journal · Part of Tinkoff (40M+ customers)
                        </MetaLabel>
                        <BulletList className="text-body">
                          <li>
                            Owned the web content delivery pipeline, ensuring cross-browser compatibility
                            (Chrome DevTools, Safari Web Inspector), design system consistency, and quality for
                            140+ monthly releases.
                          </li>
                          <li>
                            Designed and implemented a structured JSON/XML schema for Google Docs to CMS,
                            cutting content formatting errors by over 50%.
                          </li>
                          <li>
                            Introduced frontend quality gates (Markdown/Git) and technical documentation that
                            reduced production bugs and cut onboarding time for new content specialists.
                          </li>
                          <li>
                            Implemented standardized HTML5/CSS3 layout patterns and resolved complex
                            CSS/typography edge cases, reducing assembly time for complex pages by 50%.
                          </li>
                          <li>
                            Built a JavaScript automation script to batch-process Figma assets into CMS-ready
                            content, saving over 10 hours of manual work monthly.
                          </li>
                          <li>
                            Optimized content sanitization workflows via complex regular expressions with
                            AI-assisted tooling, reducing manual cleanup time.
                          </li>
                        </BulletList>
                      </Stack>
                    </article>
                  </div>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Skills</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Stack size="sm">
                      <MetaLabel as="h3">Core</MetaLabel>
                      <BodyMuted>
                        TypeScript, React, Next.js, Redux Toolkit, Node.js, HTML5/CSS3, Tailwind CSS
                      </BodyMuted>
                    </Stack>
                    <Stack size="sm">
                      <MetaLabel as="h3">Data & APIs</MetaLabel>
                      <BodyMuted>
                        Firebase, Stripe API, REST, JSON/XML content schemas
                      </BodyMuted>
                    </Stack>
                    <Stack size="sm">
                      <MetaLabel as="h3">Testing</MetaLabel>
                      <BodyMuted>Vitest, Playwright</BodyMuted>
                    </Stack>
                    <Stack size="sm">
                      <MetaLabel as="h3">Tooling</MetaLabel>
                      <BodyMuted>
                        Git, CI/CD (GitHub Actions), GitHub Copilot, Codex IDE, Cursor IDE
                      </BodyMuted>
                    </Stack>
                  </div>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Personal Projects</h2>
                  <BulletList className="text-body">
                    <li>
                      <strong>Kanban Board</strong> (Next.js, React, TypeScript, Redux Toolkit, Firebase,
                      dnd-kit, Vitest): real-time collaborative Kanban board with auth and roles. Used
                      AI-assisted workflows to speed up feature delivery by ~30%.
                    </li>
                    <li>
                      <strong>Stripe E-commerce</strong> (Next.js, TypeScript, Stripe, Tailwind, shadcn/ui,
                      Zod, Playwright, Vitest): live catalog from Stripe Products/Prices with checkout and
                      success timeline.
                    </li>
                    <li>
                      <strong>Admin Dashboard MVP</strong> (Next.js, React, TypeScript, RTK Query, Tailwind,
                      Charts, i18n): dashboard app focused on complex UI states (tables, charts, filters).
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Languages</h2>
                  <BulletList className="text-body">
                    <li>Russian — Native</li>
                    <li>English — Professional working proficiency (B2)</li>
                    <li>Serbian — Elementary proficiency (A1)</li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Education & Certificates</h2>
                  <BulletList className="text-body">
                    <li>Advanced TypeScript — Hexlet.io (Nov 2024 — Feb 2025)</li>
                    <li>Web Developer ~720h — Yandex Practicum (Jan 2023 — Nov 2023)</li>
                    <li>Responsive Web Design — freeCodeCamp (Jul 2022 — Nov 2022)</li>
                  </BulletList>
                </Stack>
              </section>
            </Stack>
          </GridCol>
        </Grid>
        </Section>
      </main>
    </>
  );
}
