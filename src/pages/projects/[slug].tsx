import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import SeoHead from "@/components/SeoHead";
import Badge from "@/components/ui/Badge";
import BulletList from "@/components/ui/BulletList";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { ButtonLink } from "@/components/ui/Button";
import { BodyMuted, MetaLabel } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";
import { isProjectSlug, projectSlugs } from "@/data/projects";
import { projectCaseStudiesBySlug } from "@/data/project-case-studies";
import type { ProjectCaseStudy } from "@/data/project-case-studies";
import type { ProjectSlug } from "@/data/projects";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: projectSlugs.map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

type ProjectPageProps = {
  project: ProjectCaseStudy;
  slug: ProjectSlug;
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string" || !isProjectSlug(slug)) {
    return { notFound: true };
  }
  const project = projectCaseStudiesBySlug[slug];
  return {
    props: {
      project,
      slug
    }
  };
};

export default function ProjectDetail({ project, slug }: ProjectPageProps) {
  return (
    <>
      <SeoHead
        description={project.summary}
        ogImage={project.ogImage.src}
        ogImageWidth={project.ogImage.width}
        ogImageHeight={project.ogImage.height}
        path={`/projects/${slug}`}
        title={project.title}
        type="article"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="py-10 xs:py-12 sm:py-14 motion-reveal">
        <Stack size="lg">
          <ButtonLink className="w-fit" href="/projects" variant="ghost">
            &larr; Back
          </ButtonLink>

          <Grid>
            <GridCol lg={9}>
              <Stack size="sm">
                <MetaLabel>Projects</MetaLabel>
                <PageTitle>{project.title}</PageTitle>
                <BodyMuted className="max-w-text">{project.summary}</BodyMuted>
              </Stack>
            </GridCol>
          </Grid>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Project Snapshot</h2>
            <dl className="grid gap-x-6 gap-y-5 border-y border-border py-5 sm:grid-cols-2">
              {project.snapshot.map((item) => (
                <div key={item.label}>
                  <dt className="text-label uppercase text-muted-fg">{item.label}</dt>
                  <dd className="mt-2 text-sm text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <MetaLabel>Stack</MetaLabel>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Context</h2>
            <BodyMuted className="max-w-text">{project.context}</BodyMuted>
          </Stack>

          <Stack size="sm">
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                alt={project.cover.alt}
                className="h-auto w-full"
                height={project.cover.height}
                priority
                sizes="(min-width: 1200px) 1200px, 100vw"
                src={project.cover.src}
                width={project.cover.width}
              />
            </div>
            <TextLink
              aria-label={`Open full-size screenshot for ${project.title} (opens in a new tab)`}
              className="w-fit"
              href={project.cover.src}
              openInNewTab
            >
              Open full-size screenshot
            </TextLink>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Constraints</h2>
            <BulletList className="max-w-text">
              {project.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </BulletList>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Key Decisions</h2>
            <ol className="max-w-text list-decimal space-y-3 pl-5 text-muted-fg">
              {project.keyDecisions.map((decision) => (
                <li key={decision.title}>
                  <strong className="font-medium text-fg">{decision.title}.</strong> {decision.detail}
                </li>
              ))}
            </ol>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Verified Outcomes</h2>
            <BulletList className="max-w-text">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </BulletList>
          </Stack>

          {project.tradeOff ? (
            <Stack size="md">
              <h2 className="text-h3 font-semibold">Trade-off</h2>
              <BodyMuted className="max-w-text">{project.tradeOff}</BodyMuted>
            </Stack>
          ) : null}

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Links</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <ButtonLink href={project.links.demo} openInNewTab>
                {project.demoNote ? "Live Demo (sign-in)" : "Live Demo"}
              </ButtonLink>
              <ButtonLink href={project.links.code} openInNewTab variant="outline">
                Source Code
              </ButtonLink>
            </div>
            {project.demoNote ? <BodyMuted className="text-sm">{project.demoNote}</BodyMuted> : null}
          </Stack>
        </Stack>
        </Section>
      </main>
    </>
  );
}
