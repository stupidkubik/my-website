import type { GetStaticPaths, GetStaticProps } from "next";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const projectData = {
  "kanban-board": {
    title: "Kanban Board App",
    summary:
      "Real-time collaborative Kanban board with authentication, roles, and drag-and-drop.",
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
    }
  },
  "stripe-mini-app": {
    title: "Stripe Mini App",
    summary:
      "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
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
    }
  },
  "admin-dashboard": {
    title: "Admin Dashboard MVP",
    summary:
      "Dashboard UI for data-heavy screens with tables, charts, filters, and i18n.",
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
    }
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
      project: projectData[slug]
    }
  };
};

type ProjectPageProps = {
  project: (typeof projectData)[ProjectSlug];
};

export default function ProjectDetail({ project }: ProjectPageProps) {
  return (
    <main>
      <div className="container py-section">
        <p className="text-label uppercase text-muted-fg">Projects</p>
        <h1 className="mt-2 text-h2 font-semibold">{project.title}</h1>
        <p className="mt-3 max-w-text text-body text-muted-fg">{project.summary}</p>

        <div className="mt-8 rounded-lg border border-dashed border-border bg-muted px-6 py-10 text-center text-sm text-muted-fg">
          Screenshot placeholder (to be replaced)
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-label uppercase text-muted-fg">Role</h2>
            <p className="mt-2 text-sm text-muted-fg">{project.role}</p>
          </div>
          <div>
            <h2 className="text-label uppercase text-muted-fg">Stack</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge>{item}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-h3 font-semibold">Challenges</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-fg">
            {project.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-h3 font-semibold">Approach</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-fg">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-h3 font-semibold">Outcome</h2>
          <p className="mt-3 text-body text-muted-fg">{project.outcome}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-h3 font-semibold">Links</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <ButtonLink href={project.links.demo}>Live Demo</ButtonLink>
            <ButtonLink href={project.links.code} variant="outline">
              Source Code
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
