import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import SeoHead from "@/components/SeoHead";
import Badge from "@/components/ui/Badge";
import BulletList from "@/components/ui/BulletList";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { ButtonLink } from "@/components/ui/Button";
import { BodyMuted, MetaLabel } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";

const projectData = {
  "kanban-board": {
    title: "Kanban Board App",
    summary:
      "Real-time collaborative Kanban board with authentication, roles, and drag-and-drop.",
    context:
      "Built as a collaboration-focused Kanban tool to explore real-time workflows, access control, and complex drag-and-drop interactions.",
    role: "Frontend Developer",
    stack: [
      "Next.js App Router",
      "React",
      "TypeScript",
      "Redux Toolkit / RTK Query",
      "Firebase Auth + Firestore",
      "dnd-kit",
      "shadcn/ui",
      "Vitest"
    ],
    challenges: [
      "Managing complex drag-and-drop state across columns with real-time updates.",
      "Keeping the UI responsive while syncing with Firestore listeners.",
      "Defining roles and protecting operations for collaboration."
    ],
    approach: [
      "Implemented boards/columns/cards CRUD with optimistic UI updates and Firestore listeners.",
      "Added collaboration controls (owner/editor/viewer), email invites, and protected operations via Firebase Admin SDK.",
      "Tested core logic with Vitest, including Firestore rules via emulator."
    ],
    outcome:
      "Delivered a responsive, accessible board with a clear collaboration model and stable real-time sync.",
    links: {
      demo: "https://kanban-board-app-ten-psi.vercel.app/",
      code: "https://github.com/stupidkubik/kanban-board-app"
    },
    media: {
      src: "/media/projects/kanban-board/cover.webp",
      alt: "Kanban board project screenshot with column layout and cards.",
      width: 1600,
      height: 973
    },
    ogImage: "/og/kanban-board.webp"
  },
  "stripe-mini-app": {
    title: "Stripe Mini App",
    summary:
      "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    context:
      "Created to validate a full checkout flow with Stripe, from catalog to payment confirmation and webhook handling.",
    role: "Frontend Developer",
    stack: [
      "Next.js App Router",
      "React",
      "TypeScript",
      "Stripe Checkout + Webhooks",
      "Tailwind",
      "shadcn/ui",
      "Zod",
      "Playwright",
      "Vitest"
    ],
    challenges: [
      "Building a reliable checkout flow with server-side validation.",
      "Handling payment events safely and surfacing status to users.",
      "Maintaining SEO fundamentals in a small demo."
    ],
    approach: [
      "Implemented checkout session creation with validation for price IDs, quantity limits, and promo codes.",
      "Verified Stripe webhooks with signature verification and built a payment events timeline UI.",
      "Added OG/canonical/sitemap/robots and E2E coverage with Playwright."
    ],
    outcome: "Completed an end-to-end payment flow demo with robust validation and testing.",
    links: {
      demo: "https://stripe-mini-shop.vercel.app/",
      code: "https://github.com/stupidkubik/Stripe-mini-app"
    },
    media: {
      src: "/media/projects/stripe-mini-app/cover.webp",
      alt: "Stripe mini app screenshot with product list and checkout flow.",
      width: 1600,
      height: 973
    },
    ogImage: "/og/stripe-mini-shop.webp"
  },
  "admin-dashboard": {
    title: "Admin Dashboard MVP",
    summary:
      "Dashboard UI for data-heavy screens with tables, charts, filters, and i18n.",
    context:
      "Designed to practice building complex dashboard layouts with data states, reusable components, and localization.",
    role: "Frontend Developer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit / RTK Query",
      "Tailwind CSS",
      "Charts",
      "i18n"
    ],
    challenges: [
      "Designing reusable dashboard components for complex UI states.",
      "Handling async data with consistent loading and error states."
    ],
    approach: [
      "Built data-heavy screens with robust loading/error handling and reusable UI pieces.",
      "Implemented API data layer with RTK Query for caching and consistent request handling.",
      "Added localization to support multi-language UI."
    ],
    outcome: "Shipped a scalable admin layout with clear information hierarchy and stable state management.",
    links: {
      demo: "https://admin-dashboard-mvp-three.vercel.app/",
      code: "https://github.com/stupidkubik/Admin-Dashboard-MVP"
    },
    media: {
      src: "/media/projects/admin-dashboard/cover.webp",
      alt: "Admin dashboard screenshot with data table, charts, and filters.",
      width: 1600,
      height: 973
    },
    ogImage: "/og/admin-dashboard.webp"
  }
} as const;

type ProjectSlug = keyof typeof projectData;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(projectData).map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as ProjectSlug;
  return {
    props: {
      project: projectData[slug],
      slug
    }
  };
};

type ProjectPageProps = {
  project: (typeof projectData)[ProjectSlug];
  slug: ProjectSlug;
};

export default function ProjectDetail({ project, slug }: ProjectPageProps) {
  return (
    <>
      <SeoHead
        description={project.summary}
        ogImage={project.ogImage}
        path={`/projects/${slug}`}
        title={project.title}
        type="article"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="py-10 xs:py-12 sm:py-14 motion-reveal">
        <Stack size="lg">
          <ButtonLink className="w-fit" href="/projects" openInNewTab={false} variant="ghost">
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
            <h2 className="text-h3 font-semibold">Context</h2>
            <BodyMuted className="max-w-text">{project.context}</BodyMuted>
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
              <MetaLabel as="h2">Role</MetaLabel>
              <BodyMuted>{project.role}</BodyMuted>
            </Stack>
            <Stack size="sm">
              <MetaLabel as="h2">Stack</MetaLabel>
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
            <BodyMuted className="max-w-text">{project.outcome}</BodyMuted>
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
