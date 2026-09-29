import { projectSlugs, projectsBySlug } from "@/data/projects";
import type { ProjectListItem, ProjectSlug } from "@/data/projects";

type ProjectOgImage = {
  src: string;
  width: number;
  height: number;
};

type ProjectSnapshotItem = {
  label: string;
  value: string;
};

type ProjectDecision = {
  title: string;
  detail: string;
};

type ProjectCaseStudyContent = {
  context: string;
  snapshot: readonly ProjectSnapshotItem[];
  stack: readonly string[];
  constraints: readonly string[];
  keyDecisions: readonly ProjectDecision[];
  outcomes: readonly string[];
  tradeOff?: string;
  ogImage: ProjectOgImage;
};

export type ProjectCaseStudy = ProjectListItem & ProjectCaseStudyContent;

const caseStudyContentBySlug: Record<ProjectSlug, ProjectCaseStudyContent> = {
  "kanban-board": {
    context:
      "A real-time collaboration workspace where board changes, permissions, and drag-and-drop need to remain predictable across clients.",
    snapshot: [
      { label: "Role", value: "Frontend Developer" },
      { label: "Product type", value: "Real-time collaboration" },
      { label: "Scope", value: "Boards, roles & drag-and-drop" },
      { label: "Quality & delivery", value: "Emulator E2E & rules coverage" }
    ],
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
    constraints: [
      "Keeping Firestore listeners, the RTK Query cache, optimistic mutations, and drag-and-drop order consistent across clients.",
      "Enforcing owner, editor, and viewer permissions across the interface, Firestore rules, and server-owned operations.",
      "Evolving the data model for shared labels, multiple assignees, and legacy records without exposing credentials or letting tests write to production."
    ],
    keyDecisions: [
      {
        title: "Synchronize through Firestore listeners and RTK Query",
        detail:
          "Structure boards, columns, cards, participants, and invites around live listeners and optimistic patches so interactions stay responsive."
      },
      {
        title: "Move sensitive mutations into validated API routes",
        detail:
          "Use Firebase Admin for atomic board creation, invite acceptance, role changes, and cascade deletes."
      },
      {
        title: "Test against isolated Firebase emulators",
        detail:
          "Cover E2E flows and Firestore rules without allowing tests to write to production."
      }
    ],
    outcomes: [
      "Delivered a bilingual real-time workspace with owner, editor, and viewer roles.",
      "Kept interactions responsive with Firestore listeners, RTK Query cache updates, and optimistic mutations.",
      "Added isolated Firebase Emulator E2E and Firestore-rules coverage to protect production data during testing."
    ],
    ogImage: {
      src: "/og/kanban-board.webp",
      width: 1200,
      height: 630
    }
  },
  "stripe-mini-app": {
    context:
      "An e-commerce storefront that needs a Stripe-led catalogue, trustworthy Checkout data, and durable order records.",
    snapshot: [
      { label: "Role", value: "Frontend Developer" },
      { label: "Product type", value: "E-commerce storefront" },
      { label: "Scope", value: "Catalogue, Checkout & receipts" },
      { label: "Quality & delivery", value: "Signed webhooks & idempotent orders" }
    ],
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
    constraints: [
      "Keeping the live Stripe catalog consistent between the storefront and Checkout without trusting browser-owned product, price, currency, or quantity data.",
      "Authorizing receipt access, authenticating webhook events, and persisting order state safely across duplicate deliveries and retries.",
      "Keeping builds and CI deterministic and secretless while still supporting a live Stripe-backed production deployment."
    ],
    keyDecisions: [
      {
        title: "Validate the catalogue before Checkout",
        detail:
          "Index one cached Stripe snapshot by product, slug, and price, then revalidate every item, quantity, currency, redirect, and promotion."
      },
      {
        title: "Protect receipts and webhook processing",
        detail:
          "Use a per-session HttpOnly proof for receipts and verify signed raw-body webhooks before recording payment outcomes."
      },
      {
        title: "Persist monotonic order state",
        detail:
          "Store durable payment outcomes and a unique fulfillment outbox record in Postgres to handle duplicate deliveries and retries."
      }
    ],
    outcomes: [
      "Connected a Stripe-backed catalogue to Checkout while revalidating browser-supplied items and quantities.",
      "Protected itemized receipts with a per-session HttpOnly proof.",
      "Stored idempotent, monotonic order state and a unique fulfillment outbox record in Postgres."
    ],
    tradeOff:
      "The deployed storefront uses Stripe test mode. It demonstrates the catalogue, Checkout, and protected receipt flow without representing a live retail operation.",
    ogImage: {
      src: "/og/stripe-mini-shop.webp",
      width: 1200,
      height: 630
    }
  },
  "admin-dashboard": {
    context:
      "A dashboard starter that needs reusable data-heavy UI without blurring the boundary between demo data and production adapters.",
    snapshot: [
      { label: "Role", value: "Frontend Developer" },
      { label: "Product type", value: "B2B admin template" },
      { label: "Scope", value: "Tables, forms & charts" },
      { label: "Quality & delivery", value: "Four locales & Playwright/axe" }
    ],
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
    constraints: [
      "Making dense tables, charts, forms, dialogs, and navigation reusable, responsive, and accessible across realistic loading and error states.",
      "Providing useful mock data without implying that demo authentication or persistence is production-ready.",
      "Resolving locale on the server and keeping the four-language interface stable across hydration, automated accessibility checks, and visual regression tests."
    ],
    keyDecisions: [
      {
        title: "Build reusable data-heavy patterns",
        detail:
          "Use an App Router shell with navigation, breadcrumbs, KPI charts, a TanStack Table management flow, forms, settings, and mock authentication screens."
      },
      {
        title: "Keep demo and real data explicitly separate",
        detail:
          "Combine RTK Query, validated API envelopes, route handlers, and MSW behind a boundary that fails safely until real adapters are configured."
      },
      {
        title: "Resolve locale on the server",
        detail:
          "Keep English, Spanish, French, and Russian stable across hydration, automated accessibility checks, and visual-regression tests."
      }
    ],
    outcomes: [
      "Delivered reusable dashboard patterns for tables, charts, forms, and navigation.",
      "Kept demo data behind an explicit demo/real-data boundary that fails safely until real adapters exist.",
      "Validated four locales with strict TypeScript, Playwright/axe, and visual-regression coverage."
    ],
    tradeOff:
      "Authentication and persistence remain intentionally mocked until real adapters are configured, so the template does not imply production-ready data handling.",
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
