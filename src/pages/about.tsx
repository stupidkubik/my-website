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
        description="About Evgenii Rubin: frontend developer with experience in high-traffic publishing and interactive advertising, focused on reusable systems and reliable delivery."
        path="/about"
        title="About"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <PageTitle>About</PageTitle>
              <Stack size="md" className="max-w-text">
                <p className="text-body text-muted-fg">
                  I’m a frontend developer based in Novi Sad, Serbia. My experience spans high-traffic
                  publishing at Tinkoff Journal and interactive advertising at Playbox.
                </p>
                <p className="text-body text-muted-fg">
                  I started by owning technical production for complex editorial releases—building reusable
                  UI patterns, automating content workflows, and improving QA. At Playbox, I apply the same
                  systems mindset to TypeScript and Cocos Creator playables, adapting component-driven
                  experiences across orientations, platform requirements, and advertising networks.
                </p>
              </Stack>
              <Stack size="md">
                <h2 className="text-h3 font-semibold">Core Strengths</h2>
                <BulletList>
                  <li>Component-driven delivery: reusable UI and interactive systems across web and Cocos.</li>
                  <li>Cross-platform reliability: browser QA, responsive orientations, and network constraints.</li>
                  <li>Automation & production systems: structured imports, repeatable workflows, and faster releases.</li>
                  <li>Cross-functional ownership: clear collaboration with design, content, and creative teams.</li>
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
