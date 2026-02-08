import BulletList from "@/components/ui/BulletList";
import SeoHead from "@/components/SeoHead";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function About() {
  return (
    <>
      <SeoHead
        description="About Evgenii Rubin: frontend developer with 2+ years in CMS and design systems, focused on semantic markup, accessibility, and stable delivery."
        path="/about"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <PageTitle>About</PageTitle>
              <Stack size="md" className="max-w-text">
                <p className="text-body text-muted-fg">
                  I’m a frontend developer based in Novi Sad, Serbia. I build content-heavy publishing
                  workflows and design systems with a focus on semantic markup, accessibility, and
                  predictable releases.
                </p>
                <p className="text-body text-muted-fg">
                  Over the past 2+ years, I’ve built and maintained UI components in production CMS
                  environments, improved delivery speed through reusable patterns, and contributed to
                  internal tooling that reduces manual work.
                </p>
              </Stack>
              <Stack size="md">
                <h2 className="text-h3 font-semibold">Core Strengths</h2>
                <BulletList>
                  <li>Quality-focused development: semantic HTML, accessible & responsive CSS, QA mindset.</li>
                  <li>Design systems & CMS experience: reusable components, consistency at scale.</li>
                  <li>React & Next.js with TypeScript: state management, API integration, testing.</li>
                  <li>Team collaboration: code reviews, documentation, checklists.</li>
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
