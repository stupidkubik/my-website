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
        description="Resume of Evgenii Rubin: frontend developer with production CMS and web production experience, reliable delivery, and React/TypeScript expertise."
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
                <ButtonLink href="/media/resume/evgenii-rubin-cv.pdf" variant="outline">
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
                      Frontend developer with a background in production work where quality and deadlines
                      matter.
                    </li>
                    <li>
                      I’m used to collaborating with content and design teams, keeping releases stable, and
                      making processes more predictable.
                    </li>
                    <li>
                      Comfortable owning tasks end-to-end: clarifying requirements, documenting decisions,
                      and shipping reliably.
                    </li>
                    <li>
                      Curious and fast-learning, I leverage AI-assisted tools to stay efficient and focused
                      on user value.
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Experience</h2>
                  <div className="space-y-8 text-body text-muted-fg">
                    <article className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                      <p className="pt-1 text-label uppercase text-muted-fg">Aug 2023 — Jan 2026</p>
                      <Stack size="sm">
                        <p className="text-[1.125rem] font-medium leading-snug text-fg">
                          Frontend Developer (CMS & Web Production)
                        </p>
                        <p className="text-sm uppercase tracking-[0.06em] text-muted-fg">
                          Tinkoff Journal · Part of Tinkoff Group (40M+ customers)
                        </p>
                        <BulletList className="text-body">
                          <li>
                            Shipped and maintained user-facing pages in a CMS-driven production workflow
                            where quality and deadlines matter.
                          </li>
                          <li>
                            Worked closely with content and design teams to keep releases stable and layouts
                            consistent across browsers.
                          </li>
                          <li>
                            Improved publishing reliability by introducing clear content rules and structured
                            data formats for import (JSON/XML).
                          </li>
                          <li>
                            Built reusable HTML/CSS patterns and resolved tricky layout and typography edge
                            cases in production.
                          </li>
                          <li>
                            Automated repetitive production tasks with JavaScript and regex (with AI-assisted
                            tooling), reducing manual work and review friction.
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
                        HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">State & Integrations</h3>
                      <p className="text-sm text-muted-fg">
                        Redux Toolkit, Firebase, Stripe API, JSON/XML
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">Quality & Delivery</h3>
                      <p className="text-sm text-muted-fg">
                        Git, CI/CD (GitHub Actions), Cross-browser QA, Vitest, Playwright
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">AI-assisted Tools</h3>
                      <p className="text-sm text-muted-fg">GitHub Copilot, Cursor, Codex</p>
                    </Stack>
                  </div>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Personal Projects</h2>
                  <BulletList>
                    <li>
                      <strong>Kanban Board</strong> (Next.js, React, TypeScript, Redux Toolkit, Firebase,
                      dnd-kit, Vitest): real-time collaborative Kanban with auth, roles, and drag-and-drop.
                      Leveraged AI-assisted development workflows to speed up routine delivery.
                    </li>
                    <li>
                      <strong>Stripe E-commerce</strong> (Next.js, TypeScript, Stripe, Tailwind, shadcn/ui,
                      Zod, Playwright/Vitest): Stripe-powered catalog with cart and checkout-to-success flow.
                      Added Zod validation and automated tests.
                    </li>
                    <li>
                      <strong>Admin Dashboard MVP</strong> (Next.js, React, TypeScript, RTK Query, Tailwind,
                      Charts, i18n): MVP focused on complex UI states (tables, charts, filters, i18n) with
                      reusable UI components.
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
