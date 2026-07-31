import Badge from "@/components/ui/Badge";
import SeoHead from "@/components/SeoHead";
import PageTitle from "@/components/ui/PageTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";
import { projectsList } from "@/data/projects";


export default function Projects() {
  return (
    <>
      <SeoHead
        description="Frontend case studies by Evgenii Rubin: a real-time Kanban workspace, the Verdant Lane Stripe storefront, and a production-ready admin dashboard template."
        ogImage="/og/kanban-board.webp"
        ogImageWidth={1200}
        ogImageHeight={630}
        path="/projects"
        title="Projects"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal">
        <Stack size="lg">
          <Grid>
            <GridCol lg={9}>
              <Stack size="md">
                <PageTitle>Projects</PageTitle>
                <p className="max-w-text text-body text-muted-fg">
                  Three production-minded case studies spanning real-time collaboration, payments, and
                  data-heavy product UI. Each project documents its architecture, reliability boundaries,
                  testing strategy, and the trade-offs behind the implementation.
                </p>
              </Stack>
            </GridCol>
          </Grid>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projectsList.map((project) => (
              <ProjectCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                title={project.title}
                summary={project.summary}
              >
                <div className="flex flex-wrap gap-2">
                  {project.stackPreview.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                <div className="pointer-events-auto inline-flex w-fit flex-wrap gap-4">
                  <TextLink href={project.links.demo} openInNewTab>
                    {project.demoNote ? "Live Demo (sign-in)" : "Live Demo"}
                  </TextLink>
                  <TextLink href={project.links.code} openInNewTab>
                    Source Code
                  </TextLink>
                </div>
                {project.demoNote ? (
                  <p className="text-xs leading-relaxed text-muted-fg">{project.demoNote}</p>
                ) : null}
              </ProjectCard>
            ))}
          </div>
        </Stack>
        </Section>
      </main>
    </>
  );
}
