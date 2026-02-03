import BulletList from "@/components/ui/BulletList";
import Section from "@/components/ui/Section";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function About() {
  return (
    <main>
      <Section>
        <Grid>
          <GridCol lg={8}>
            <h1 className="text-h2 font-semibold">About</h1>
            <p className="mt-6 max-w-text text-body text-muted-fg">
              I’m a frontend developer based in Novi Sad, Serbia. I build content-heavy publishing
              workflows and design systems with a focus on semantic markup, accessibility, and
              predictable releases.
            </p>
            <p className="mt-4 max-w-text text-body text-muted-fg">
              Over the past 2+ years, I’ve built and maintained UI components in production CMS
              environments, improved delivery speed through reusable patterns, and contributed to
              internal tooling that reduces manual work.
            </p>
            <div className="mt-8">
              <h2 className="text-h3 font-semibold">Core Strengths</h2>
              <BulletList className="mt-4">
                <li>Quality-focused development: semantic HTML, accessible & responsive CSS, QA mindset.</li>
                <li>Design systems & CMS experience: reusable components, consistency at scale.</li>
                <li>React & Next.js with TypeScript: state management, API integration, testing.</li>
                <li>Team collaboration: code reviews, documentation, checklists.</li>
              </BulletList>
            </div>
            <div className="mt-10">
              <h2 className="text-h3 font-semibold">Languages</h2>
              <BulletList className="mt-4">
                <li>Russian — Native</li>
                <li>English — Professional working proficiency (B2)</li>
                <li>Serbian — Elementary proficiency (A1)</li>
              </BulletList>
            </div>
          </GridCol>
        </Grid>
      </Section>
    </main>
  );
}
