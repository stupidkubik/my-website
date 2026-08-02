import { ButtonLink } from "@/components/ui/Button";
import BulletList from "@/components/ui/BulletList";
import SeoHead from "@/components/SeoHead";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Resume() {
  return (
    <>
      <SeoHead
        description="Resume of Evgenii Rubin: frontend developer with experience in high-traffic publishing, interactive advertising, React, TypeScript, and Cocos Creator."
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
                  <p className="text-sm text-muted-fg">Frontend Developer (React, Next.js) · Novi Sad, Serbia</p>
                </Stack>
                <ButtonLink download href="/media/resume/evgenii-rubin-cv.pdf" variant="outline">
                  Download PDF
                </ButtonLink>
              </div>

              <section className="text-sm text-muted-fg">
                <div className="flex flex-wrap gap-4">
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
                <p className="mt-3 text-label uppercase tracking-[0.06em]">Serbian Work Permit</p>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Summary</h2>
                  <BulletList>
                    <li>
                      Frontend developer with 3+ years of experience across high-traffic publishing and
                      interactive advertising.
                    </li>
                    <li>
                      Expanded from CMS and web production automation at Tinkoff Journal into TypeScript and
                      Cocos Creator playable experiences at Playbox.
                    </li>
                    <li>
                      Build reusable component structures, responsive layouts, platform integrations, and
                      dependable release workflows.
                    </li>
                    <li>
                      Complement production experience with React and Next.js projects covering real-time
                      collaboration, payments, and data-heavy UI.
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Experience</h2>
                  <div className="space-y-8 text-body text-muted-fg">
                    <article className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                      <p className="pt-1 text-label uppercase text-muted-fg">Mar 2026 — Present</p>
                      <Stack size="sm">
                        <p className="text-[1.125rem] font-medium leading-snug text-fg">
                          Creative Developer (Playable Ads)
                        </p>
                        <p className="text-sm uppercase tracking-[0.06em] text-muted-fg">
                          Playbox · Part-time · Remote
                        </p>
                        <BulletList className="text-body">
                          <li>
                            Develop and optimize interactive playable ads in TypeScript and Cocos Creator for
                            20+ advertising platforms, including ironSource and Unity Ads, for campaigns with
                            a combined audience of 100M+ users.
                          </li>
                          <li>
                            Build reusable component-driven structures—systems, views, state flows, and
                            adapters—to speed up creative variants and platform-specific releases.
                          </li>
                          <li>
                            Implement portrait and landscape layouts, CTA and analytics integrations,
                            audio and animation flows, and build variants for differing network requirements.
                          </li>
                        </BulletList>
                        <p className="text-sm text-muted-fg">
                          Tools: Cocos Creator, TypeScript, Component-driven Architecture, Responsive Layout,
                          Platform Integrations
                        </p>
                      </Stack>
                    </article>
                    <article className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                      <p className="pt-1 text-label uppercase text-muted-fg">Aug 2023 — Aug 2026</p>
                      <Stack size="sm">
                        <p className="text-[1.125rem] font-medium leading-snug text-fg">
                          Frontend Developer (CMS & Web Production)
                        </p>
                        <p className="text-sm uppercase tracking-[0.06em] text-muted-fg">
                          Tinkoff Journal · Tinkoff Group · Full-time · Remote
                        </p>
                        <BulletList className="text-body">
                          <li>
                            Cut manual assembly time for complex articles by 50% by creating automation
                            scripts and standardizing JSON/XML content imports.
                          </li>
                          <li>
                            Engineered and maintained a library of reusable UI components and snippets for a
                            high-traffic CMS used to publish approximately 140 articles per month.
                          </li>
                          <li>
                            Owned end-to-end technical production for feature articles, ensuring performance
                            and cross-browser compatibility for a readership of millions.
                          </li>
                          <li>
                            Reduced post-launch bugs by 30% by introducing a standardized pre-release QA
                            checklist and robust content validation rules.
                          </li>
                        </BulletList>
                        <p className="text-sm text-muted-fg">
                          Tools: HTML/CSS, JavaScript, Git, JSON/XML, Regex, Cross-browser QA, Automation
                        </p>
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
                      <h3 className="text-label uppercase text-muted-fg">Core</h3>
                      <p className="text-sm text-muted-fg">
                        HTML, CSS, JavaScript, TypeScript, React, Next.js, Cocos Creator
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">UI & Interactive</h3>
                      <p className="text-sm text-muted-fg">
                        Tailwind CSS, shadcn/ui, Radix UI, Responsive Layouts, Animation & Audio
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">State & Integrations</h3>
                      <p className="text-sm text-muted-fg">
                        Redux Toolkit, Zustand, Firebase, Stripe, Postgres, Event-driven Systems
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">Quality & Delivery</h3>
                      <p className="text-sm text-muted-fg">
                        Git, CI/CD, Cross-browser & Multi-platform QA, Vitest, Playwright, Cypress
                      </p>
                    </Stack>
                  </div>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Personal Projects</h2>
                  <BulletList>
                    <li>
                      <strong>Kanban Board</strong> (Next.js, TypeScript, RTK Query, Firebase, dnd-kit,
                      Vitest/Cypress): bilingual real-time workspace with role-based collaboration, optimistic
                      updates, labels, multiple assignees, and isolated emulator E2E.
                    </li>
                    <li>
                      <strong>Verdant Lane</strong> (Next.js, TypeScript, Stripe, Postgres, Zustand,
                      Zod, Playwright/Vitest): live test-mode storefront with a Stripe-backed catalog,
                      persistent cart, protected receipts, signed webhooks, and idempotent order processing.
                    </li>
                    <li>
                      <strong>Admin Dashboard Template</strong> (Next.js, TypeScript, RTK Query, TanStack Table,
                      Tailwind, MSW, Playwright/axe): reusable B2B dashboard template with charts, data
                      tables, form patterns, four locales, mock API boundaries, and accessibility-focused QA.
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Languages</h2>
                  <BulletList>
                    <li>Russian — Native</li>
                    <li>English — Professional working proficiency (B2)</li>
                    <li>Serbian — Elementary proficiency (A1)</li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Education & Certificates</h2>
                  <BulletList>
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
