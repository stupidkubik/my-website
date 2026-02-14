import ProjectCard from "@/components/ui/ProjectCard";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { ButtonLink } from "@/components/ui/Button";
import { BodyMuted, SectionTitle } from "@/components/ui/typography";
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
        description="Frontend developer portfolio focused on fast, user-friendly, and optimized React interfaces."
        ogImage="/media/projects/kanban-board/cover.webp"
        path="/"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal" size="lg">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <h1 className="text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.02em] xs:text-[2.5rem] sm:text-display">
                Frontend developer building fast, user-friendly, and optimized web interfaces.
              </h1>
              <BodyMuted className="max-w-text">
                I have 2.5+ years of production frontend experience in CMS and design systems. I build
                responsive and accessible interfaces with strong performance, clear UX, and reliable delivery.
              </BodyMuted>
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
        <Grid className="gap-y-8">
          <GridCol lg={9}>
            <div className="flex flex-col gap-2 xs:flex-row xs:items-baseline xs:justify-between lg:justify-start lg:gap-8">
              <SectionTitle>Selected Work</SectionTitle>
              <TextLink className="self-end whitespace-nowrap xs:self-auto" href="/projects">All projects</TextLink>
            </div>
          </GridCol>
          <GridCol span={12}>
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
          </GridCol>
        </Grid>
        </Section>

        <Section borderTop containerClassName="motion-reveal motion-delay-2">
          <Grid>
            <GridCol lg={9}>
            <Stack size="md">
              <SectionTitle>Contact</SectionTitle>
              <BodyMuted>
                Interested in building a fast, user-friendly product interface? I’m just an email away.
              </BodyMuted>
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
