import BulletList from "@/components/ui/BulletList";
import SeoHead from "@/components/SeoHead";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { BodyMuted } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function About() {
  return (
    <>
      <SeoHead
        description="About Evgenii Rubin: frontend developer with 2.5+ years in CMS and design systems, focused on performance, usability, and stable delivery."
        path="/about"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <PageTitle>About</PageTitle>
              <Stack size="md" className="max-w-text">
                <BodyMuted>
                  I’m a frontend developer based in Novi Sad, Serbia. I build content-heavy publishing
                  workflows and design systems with a focus on semantic markup, accessibility, performance,
                  and predictable releases.
                </BodyMuted>
                <BodyMuted>
                  Over the past 2.5+ years, I’ve owned delivery in production CMS environments, improved UI
                  consistency through reusable patterns, and reduced bugs with clear standards and QA
                  checklists.
                </BodyMuted>
              </Stack>
              <Stack size="md">
                <h2 className="text-h3 font-semibold">Core Strengths</h2>
                <BulletList>
                  <li>Performance & UX: fast loading, clear interaction patterns, smooth responsive behavior.</li>
                  <li>Design systems & CMS delivery: reusable components, consistency at scale.</li>
                  <li>React & Next.js with TypeScript: scalable UI, state management, API integration.</li>
                  <li>Quality mindset: semantic HTML, responsive CSS, cross-browser QA, documentation.</li>
                </BulletList>
              </Stack>
              <Stack size="md">
                <h2 className="text-h3 font-semibold">Languages</h2>
                <BulletList>
                  <li>Russian — Native</li>
                  <li>English — Professional working proficiency (B2)</li>
                  <li>Serbian — Elementary proficiency (A1)</li>
                </BulletList>
              </Stack>
            </Stack>
            </GridCol>
          </Grid>
        </Section>
      </main>
    </>
  );
}
