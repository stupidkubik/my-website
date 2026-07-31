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
      "Built as a production-minded collaboration app to solve real-time synchronization, role-based access, and dense drag-and-drop workflows across boards, columns, and cards.",
    role: "Frontend Developer",
    stack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Redux Toolkit / RTK Query",
      "Firebase Auth + Firestore + Admin SDK",
      "dnd-kit",
      "Radix UI / shadcn/ui",
      "Vitest + Cypress"
    ],
    challenges: [
      "Keeping Firestore listeners, the RTK Query cache, optimistic mutations, and drag-and-drop order consistent across clients.",
      "Enforcing owner, editor, and viewer permissions across the interface, Firestore rules, and server-owned operations.",
      "Evolving the data model for shared labels, multiple assignees, and legacy records without exposing credentials or letting tests write to production."
    ],
    approach: [
      "Structured the codebase around boards, columns, cards, participants, and invites, with Firestore listeners feeding RTK Query caches and optimistic patches keeping interactions responsive.",
      "Moved sensitive mutations into validated Next.js API routes backed by Firebase Admin, including atomic board creation, invite acceptance, role changes, and cascade deletes.",
      "Added isolated Firebase emulator E2E, Firestore rules coverage, guarded production smoke tests, dry-run migrations, and keyboard and mobile accessibility refinements."
    ],
    outcome:
      "Delivered a bilingual real-time workspace with role-based collaboration, resilient optimistic interactions, and a documented release and operations baseline.",
    media: {
      src: "/media/projects/kanban-board/cover.webp",
      alt: "Kanban board project screenshot with column layout and cards.",
      width: 1280,
      height: 778
    },
    ogImage: {
      src: "/og/kanban-board.webp",
      width: 1200,
      height: 630
    }
  },
  "stripe-mini-app": {
    context:
      "Built Verdant Lane as an end-to-end e-commerce case study: Stripe is the catalog and payment source of truth, the browser owns a persistent cart, and Postgres records durable payment outcomes.",
    role: "Frontend Developer",
    stack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Stripe Checkout + Webhooks",
      "Neon Postgres",
      "Zustand",
      "React Hook Form + Zod",
      "Radix UI + CSS Modules",
      "Vitest + Playwright"
    ],
    challenges: [
      "Keeping the live Stripe catalog consistent between the storefront and Checkout without trusting browser-owned product, price, currency, or quantity data.",
      "Authorizing receipt access, authenticating webhook events, and persisting order state safely across duplicate deliveries and retries.",
      "Keeping builds and CI deterministic and secretless while still supporting a live Stripe-backed production deployment."
    ],
    approach: [
      "Created one validated, cached catalog snapshot indexed by product, slug, and price, then revalidated every item, quantity, currency, redirect, and promotion before Checkout.",
      "Protected receipts with a per-session HttpOnly proof, verified signed raw-body webhooks, and stored monotonic order state plus a unique fulfillment outbox record in Postgres.",
      "Added typed environment profiles, redacted operational logging, CSP and HSTS headers, offline fixtures, least-privilege CI, and unit and browser coverage for critical flows."
    ],
    outcome:
      "Shipped a live test-mode storefront covering discovery through Checkout and a protected itemized receipt, backed by durable payment state and production-minded security and delivery practices.",
    media: {
      src: "/media/projects/stripe-mini-app/cover.webp",
      alt: "Verdant Lane storefront screenshot with a product catalog and checkout flow.",
      width: 1280,
      height: 778
    },
    ogImage: {
      src: "/og/stripe-mini-shop.webp",
      width: 1200,
      height: 630
    }
  },
  "admin-dashboard": {
    context:
      "Evolved from a dashboard MVP into a reusable B2B admin template with explicit demo and real-data boundaries, documented extension points, and a production-readiness quality baseline.",
    role: "Frontend Developer",
    stack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Redux Toolkit / RTK Query",
      "TanStack Table + Chart.js",
      "React Hook Form + Zod",
      "Tailwind CSS 4",
      "MSW",
      "Jest + Playwright / axe"
    ],
    challenges: [
      "Making dense tables, charts, forms, dialogs, and navigation reusable, responsive, and accessible across realistic loading and error states.",
      "Providing useful mock data without implying that demo authentication or persistence is production-ready.",
      "Resolving locale on the server and keeping the four-language interface stable across hydration, automated accessibility checks, and visual regression tests."
    ],
    approach: [
      "Built an App Router shell with sidebar navigation, breadcrumbs, KPI charts, a TanStack Table user-management flow, form patterns, settings, and mock authentication screens.",
      "Combined RTK Query, validated API envelopes, route handlers, and MSW behind an explicit demo/real boundary that fails safely until real adapters are configured.",
      "Added server-resolved locale handling for English, Spanish, French, and Russian, plus strict TypeScript, unit coverage, Playwright and axe checks, visual regression tests, and release smoke gates."
    ],
    outcome:
      "Released a documented dashboard starter with clear customization paths, accessible data-heavy patterns, and repeatable quality gates for extending it toward a real product.",
    media: {
      src: "/media/projects/admin-dashboard/cover.webp",
      alt: "Admin dashboard screenshot with data table, charts, and filters.",
      width: 1280,
      height: 778
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
