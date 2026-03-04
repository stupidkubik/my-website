import { projectSlugs, projectsBySlug } from "@/data/projects";
import type { ProjectListItem, ProjectSlug } from "@/data/projects";

type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectOgImage = {
  src: string;
  width: number;
  height: number;
};

type ProjectCaseStudyContent = {
  context: string;
  role: string;
  stack: readonly string[];
  challenges: readonly string[];
  approach: readonly string[];
  outcome: string;
  media: ProjectMedia;
  ogImage: ProjectOgImage;
};

export type ProjectCaseStudy = ProjectListItem & ProjectCaseStudyContent;

const caseStudyContentBySlug: Record<ProjectSlug, ProjectCaseStudyContent> = {
  "kanban-board": {
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
    media: {
      src: "/media/projects/kanban-board/cover.webp",
      alt: "Kanban board project screenshot with column layout and cards.",
      width: 1600,
      height: 973
    },
    ogImage: {
      src: "/og/kanban-board.webp",
      width: 1200,
      height: 630
    }
  },
  "stripe-mini-app": {
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
    media: {
      src: "/media/projects/stripe-mini-app/cover.webp",
      alt: "Stripe mini app screenshot with product list and checkout flow.",
      width: 1600,
      height: 973
    },
    ogImage: {
      src: "/og/stripe-mini-shop.webp",
      width: 1200,
      height: 630
    }
  },
  "admin-dashboard": {
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
    outcome:
      "Shipped a scalable admin layout with clear information hierarchy and stable state management.",
    media: {
      src: "/media/projects/admin-dashboard/cover.webp",
      alt: "Admin dashboard screenshot with data table, charts, and filters.",
      width: 1600,
      height: 973
    },
    ogImage: {
      src: "/og/admin-dashboard.webp",
      width: 1200,
      height: 630
    }
  }
};

export const projectCaseStudiesBySlug: Record<ProjectSlug, ProjectCaseStudy> = projectSlugs.reduce(
  (accumulator, slug) => {
    accumulator[slug] = {
      ...projectsBySlug[slug],
      ...caseStudyContentBySlug[slug]
    };
    return accumulator;
  },
  {} as Record<ProjectSlug, ProjectCaseStudy>
);
