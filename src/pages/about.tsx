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
        description="About Evgenii Rubin: frontend developer with production CMS and web production experience, focused on reliable delivery and user-friendly interfaces."
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
                  I’m a frontend developer based in Novi Sad, Serbia. I work in production environments
                  where quality and deadlines matter, building user-facing interfaces and keeping releases
                  stable.
                </p>
                <p className="text-body text-muted-fg">
                  Over the past 2.5+ years, I’ve collaborated with content and design teams, improved
                  publishing reliability with clearer rules and structured formats, and reduced repetitive
                  manual work with practical tooling.
                </p>
              </Stack>
              <Stack size="md">
                <h2 className="text-h3 font-semibold">Core Strengths</h2>
                <BulletList>
                  <li>Production reliability: stable releases, predictable workflows, deadline discipline.</li>
                  <li>Content & design collaboration: clear communication and smoother handoffs.</li>
                  <li>Frontend delivery: React/Next.js + TypeScript, reusable UI patterns, QA mindset.</li>
                  <li>Continuous improvement: docs, checklists, and practical automation for routine tasks.</li>
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
