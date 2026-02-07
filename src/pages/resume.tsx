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
        description="Resume of Evgenii Rubin: frontend developer with CMS/design systems experience, shipped projects, and strong quality and accessibility focus."
        path="/resume"
        title="Resume"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
        <Grid>
          <GridCol lg={8}>
            <Stack size="xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <Stack size="sm">
                  <PageTitle>Evgenii Rubin</PageTitle>
                  <p className="text-sm text-muted-fg">Frontend Developer · Novi Sad, Serbia</p>
                </Stack>
                <ButtonLink href="/media/resume/evgenii-rubin-cv.pdf" variant="outline">
                  Download PDF
                </ButtonLink>
              </div>

              <section className="text-sm text-muted-fg">
                <div className="flex flex-wrap gap-4">
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
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Summary</h2>
                  <BulletList>
                    <li>
                      Frontend developer with 2+ years in production CMS and design systems (content-heavy
                      publishing). Strong quality mindset: semantic markup, cross-browser responsiveness,
                      predictable releases, and careful QA.
                    </li>
                    <li>
                      Growing as a junior React/Next.js + TypeScript developer through shipped pet projects
                      (state management, API integration, testing, CI). Comfortable with code reviews,
                      debugging, and maintaining docs/checklists.
                    </li>
                  </BulletList>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Experience</h2>
                  <Stack size="lg" className="text-muted-fg">
                    <Stack size="sm">
                      <p className="text-label uppercase text-muted-fg">Aug 2024 — Present</p>
                      <p className="font-medium text-fg">
                        Senior Markup Developer (CMS & Design Systems) · Junior UI Engineer
                      </p>
                      <p className="text-sm text-muted-fg">Tinkoff Journal</p>
                      <BulletList className="text-sm">
                        <li>
                          Owned end-to-end publishing in the in-house CMS (content-heavy pages), shipping
                          ~140 pieces/month with consistent QA and on-time releases.
                        </li>
                        <li>
                          Cut longread production time by up to 50% by standardizing reusable layout patterns
                          and resolving typography edge cases that bypassed the auto-formatter.
                        </li>
                        <li>
                          Built internal tooling: co-created a Figma script saving ~3 minutes per screenshot
                          (15–20 per article) and co-developed CMS snippets to reduce manual markup and rework.
                        </li>
                      </BulletList>
                    </Stack>

                    <Stack size="sm">
                      <p className="text-label uppercase text-muted-fg">Aug 2023 — Aug 2024</p>
                      <p className="font-medium text-fg">Markup Developer</p>
                      <p className="text-sm text-muted-fg">Tinkoff Journal</p>
                      <BulletList className="text-sm">
                        <li>
                          Built a set of reusable, regression-tested CMS components that increased layout
                          delivery speed by ~20% and removed a class of common production bugs.
                        </li>
                        <li>
                          Improved the Google Docs → CMS pipeline with a structured data format, reducing
                          rework from late editorial changes by 50%+.
                        </li>
                        <li>
                          Wrote onboarding docs and a pre-release checklist, reducing ramp-up time and
                          deployment blockers.
                        </li>
                      </BulletList>
                    </Stack>
                  </Stack>
                </Stack>
              </section>

              <section>
                <Stack size="md">
                  <h2 className="text-h3 font-semibold">Skills</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">Core</h3>
                      <p className="text-sm text-muted-fg">
                        TypeScript, React, Next.js, JavaScript, HTML/CSS/SCSS, Tailwind.
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">State & Data</h3>
                      <p className="text-sm text-muted-fg">
                        Redux Toolkit / RTK Query, Zustand, REST.
                      </p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">Testing</h3>
                      <p className="text-sm text-muted-fg">Vitest, Jest, RTL, Playwright, MSW.</p>
                    </Stack>
                    <Stack size="sm">
                      <h3 className="text-label uppercase text-muted-fg">Tooling</h3>
                      <p className="text-sm text-muted-fg">Git, GitHub Actions, Vercel.</p>
                    </Stack>
                  </div>
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
                  <h2 className="text-h3 font-semibold">Certificates & Professional Development</h2>
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
