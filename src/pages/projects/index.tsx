import Badge from "@/components/ui/Badge";
import PageTitle from "@/components/ui/PageTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";

const projects = [
  {
    name: "Kanban Board App",
    summary: "Real-time collaborative Kanban board with auth, roles, and drag-and-drop.",
    slug: "kanban-board",
    demo: "https://kanban-board-app-ten-psi.vercel.app/",
    code: "https://github.com/stupidkubik/kanban-board-app",
    stack: ["Next.js", "TypeScript", "Firebase", "dnd-kit"]
  },
  {
    name: "Stripe Mini App",
    summary: "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    slug: "stripe-mini-app",
    demo: "https://stripe-mini-shop.vercel.app/",
    code: "https://github.com/stupidkubik/Stripe-mini-app",
    stack: ["Next.js", "TypeScript", "Stripe", "Zod"]
  },
  {
    name: "Admin Dashboard MVP",
    summary: "Dashboard UI for data-heavy screens with tables, charts, filters, and i18n.",
    slug: "admin-dashboard",
    demo: "https://admin-dashboard-mvp-three.vercel.app/",
    code: "https://github.com/stupidkubik/Admin-Dashboard-MVP",
    stack: ["Next.js", "TypeScript", "RTK Query", "i18n"]
  }
];

export default function Projects() {
  return (
    <main>
      <Section>
        <Grid>
          <GridCol lg={8}>
            <Stack size="md">
              <PageTitle>Projects</PageTitle>
              <p className="max-w-text text-body text-muted-fg">
                Projects & Code — a focused set of projects I’ve shipped to sharpen my React and TypeScript
                skills. Each one tackles a different challenge, from drag-and-drop interaction design to API
                integrations. Click a project for the full case study.
              </p>
            </Stack>
          </GridCol>
        </Grid>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              href={`/projects/${project.slug}`}
              title={project.name}
              summary={project.summary}
            >
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <TextLink href={project.demo}>Live Demo</TextLink>
                <TextLink href={project.code}>Source Code</TextLink>
              </div>
            </ProjectCard>
          ))}
        </div>
      </Section>
    </main>
  );
}
