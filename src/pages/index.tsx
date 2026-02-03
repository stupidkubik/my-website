import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";
import { ButtonLink } from "@/components/ui/Button";
import { Grid, GridCol } from "@/components/ui/Grid";

const selectedProjects = [
  {
    name: "Kanban Board App",
    summary: "Real-time collaborative Kanban board with roles, auth, and drag-and-drop.",
    href: "/projects/kanban-board"
  },
  {
    name: "Stripe Mini App",
    summary: "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    href: "/projects/stripe-mini-app"
  },
  {
    name: "Admin Dashboard MVP",
    summary: "Dashboard UI for data-heavy screens with tables, charts, and filters.",
    href: "/projects/admin-dashboard"
  }
];

export default function Home() {
  return (
    <main>
      <Section size="lg" as="div">
        <Grid>
          <GridCol lg={8}>
            <p className="text-label uppercase text-muted-fg">Frontend Developer</p>
            <h1 className="mt-4 text-display font-semibold">
              Frontend developer focused on content-rich, high-quality web interfaces.
            </h1>
            <p className="mt-4 max-w-text text-body text-muted-fg">
              I have 2+ years in production CMS and design systems. I take a quality-first
              approach: semantic markup, accessible layouts, cross-browser responsiveness, and careful QA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">
                View Projects
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Get in Touch
              </ButtonLink>
            </div>
          </GridCol>
        </Grid>
      </Section>

      <Section borderTop>
        <div className="flex items-baseline justify-between">
          <h2 className="text-h2 font-semibold">Selected Work</h2>
          <TextLink href="/projects">All projects</TextLink>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {selectedProjects.map((project) => (
            <ProjectCard
              key={project.name}
              href={project.href}
              title={project.name}
              summary={project.summary}
            />
          ))}
        </div>
      </Section>

      <Section borderTop>
        <Grid>
          <GridCol lg={8}>
            <h2 className="text-h2 font-semibold">Contact</h2>
            <p className="mt-3 text-body text-muted-fg">
              Interested in working together or have a question? I’m just an email away.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <TextLink href="mailto:stupidkubik@gmail.com">stupidkubik@gmail.com</TextLink>
              <TextLink href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">LinkedIn</TextLink>
              <TextLink href="https://t.me/stupidpotato">Telegram</TextLink>
            </div>
          </GridCol>
        </Grid>
      </Section>
    </main>
  );
}
