import ProjectCard from "@/components/ui/ProjectCard";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { ButtonLink } from "@/components/ui/Button";
import { Grid, GridCol } from "@/components/ui/Grid";
import { featuredProjects } from "@/data/projects";

const proofPoints = [
  { value: "3+ years", label: "production frontend delivery" },
  { value: "20+ platforms", label: "playable-ad releases" },
  { value: "50% less", label: "complex article assembly" }
] as const;

export default function Home() {
  return (
    <>
      <SeoHead
        description="Frontend developer portfolio spanning high-traffic web publishing and interactive TypeScript experiences, with a focus on reusable systems and reliable delivery."
        ogImage="/og/kanban-board.webp"
        ogImageHeight={630}
        ogImageWidth={1200}
        path="/"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal" as="div">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <p className="text-label uppercase text-muted-fg">Frontend Developer · Interactive Experiences</p>
              <h1 className="text-balance text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] xs:text-[2.125rem] sm:text-display">
                Frontend developer building reliable product interfaces and interactive ads.
              </h1>
              <p className="max-w-text text-body text-muted-fg">
                Production experience across high-traffic publishing and playable advertising, focused on
                reusable systems, cross-platform QA, and predictable delivery.
              </p>
              <ul
                aria-label="Experience highlights"
                className="grid gap-4 border-y border-border py-5 sm:grid-cols-3 sm:gap-6"
              >
                {proofPoints.map((proofPoint) => (
                  <li key={proofPoint.value}>
                    <p className="text-[1.375rem] font-semibold tracking-[-0.01em] text-fg">
                      {proofPoint.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.06em] text-muted-fg">
                      {proofPoint.label}
                    </p>
                  </li>
                ))}
              </ul>
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
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                cover={project.cover}
                title={project.title}
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
