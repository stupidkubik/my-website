import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import SeoHead from "@/components/SeoHead";
import Badge from "@/components/ui/Badge";
import BulletList from "@/components/ui/BulletList";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { ButtonLink } from "@/components/ui/Button";
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
                <p className="text-label uppercase text-muted-fg">Projects</p>
                <PageTitle>{project.title}</PageTitle>
                <p className="max-w-text text-body text-muted-fg">{project.summary}</p>
              </Stack>
            </GridCol>
          </Grid>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Context</h2>
            <p className="max-w-text text-body text-muted-fg">{project.context}</p>
          </Stack>

          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              alt={project.media.alt}
              className="h-auto w-full"
              height={project.media.height}
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              src={project.media.src}
              width={project.media.width}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Stack size="sm">
              <h2 className="text-label uppercase text-muted-fg">Role</h2>
              <p className="text-sm text-muted-fg">{project.role}</p>
            </Stack>
            <Stack size="sm">
              <h2 className="text-label uppercase text-muted-fg">Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Stack>
          </div>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Challenges</h2>
            <BulletList className="max-w-text">
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </BulletList>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Approach</h2>
            <BulletList className="max-w-text">
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </BulletList>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Outcome</h2>
            <p className="max-w-text text-body text-muted-fg">{project.outcome}</p>
          </Stack>

          <Stack size="md">
            <h2 className="text-h3 font-semibold">Links</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <ButtonLink href={project.links.demo} openInNewTab>
                Live Demo
              </ButtonLink>
              <ButtonLink href={project.links.code} openInNewTab variant="outline">
                Source Code
              </ButtonLink>
            </div>
          </Stack>
        </Stack>
        </Section>
      </main>
    </>
  );
}
