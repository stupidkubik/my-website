import ProjectCard from "@/components/ui/ProjectCard";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
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
    <>
      <SeoHead
        description="Frontend developer portfolio focused on reliable, user-friendly interfaces with stable delivery and strong production quality."
        ogImage="/media/projects/kanban-board/cover.webp"
        path="/"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal" size="lg" as="div">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <p className="text-label uppercase text-muted-fg">Frontend Developer</p>
              <h1 className="text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.02em] xs:text-[2.5rem] sm:text-display">
                Frontend developer building reliable, user-friendly web interfaces.
              </h1>
              <p className="max-w-text text-body text-muted-fg">
                I have 2.5+ years of production experience where quality and deadlines matter. I work closely
                with content and design teams to ship stable, accessible releases and predictable results.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects">
                  View Projects
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Get in Touch
                </ButtonLink>
              </div>
            </Stack>
            </GridCol>
          </Grid>
        </Section>

        <Section borderTop containerClassName="motion-reveal motion-delay-1">
        <Stack size="lg">
          <div className="flex flex-col gap-2 xs:flex-row xs:items-baseline xs:justify-between lg:justify-start lg:gap-8">
            <h2 className="text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.01em] xs:text-[2rem] sm:text-h2">Selected Work</h2>
            <TextLink className="self-end whitespace-nowrap xs:self-auto" href="/projects">All projects</TextLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {selectedProjects.map((project) => (
              <ProjectCard
                key={project.name}
                href={project.href}
                title={project.name}
                summary={project.summary}
              />
            ))}
          </div>
        </Stack>
        </Section>

        <Section borderTop containerClassName="motion-reveal motion-delay-2">
          <Grid>
            <GridCol lg={9}>
            <Stack size="md">
              <h2 className="text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.01em] xs:text-[2rem] sm:text-h2">Contact</h2>
              <p className="text-body text-muted-fg">
                Interested in working together? I’m available via email, Telegram, and phone.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
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
              </div>
            </Stack>
            </GridCol>
          </Grid>
        </Section>
      </main>
    </>
  );
}
