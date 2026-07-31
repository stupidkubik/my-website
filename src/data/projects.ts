import { projectSlugs } from "@/data/project-slugs.mjs";

export { projectSlugs };
export type ProjectSlug = (typeof projectSlugs)[number];

type ProjectLinks = {
  demo: string;
  code: string;
};

export type ProjectListItem = {
  slug: ProjectSlug;
  title: string;
  summary: string;
  featured: boolean;
  stackPreview: readonly string[];
  links: ProjectLinks;
  demoNote: string | null;
};

export const projectsList = [
  {
    slug: "kanban-board",
    title: "Kanban Board App",
    summary:
      "Real-time collaborative Kanban with role-based access, optimistic updates, labels, assignees, and drag-and-drop.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "Firebase", "dnd-kit"],
    demoNote: "Sign in with Google or email; boards are private by default.",
    links: {
      demo: "https://kanban-board-app-ten-psi.vercel.app/",
      code: "https://github.com/stupidkubik/kanban-board-app"
    }
  },
  {
    slug: "stripe-mini-app",
    title: "Verdant Lane",
    summary:
      "Production-minded storefront with a Stripe-backed catalog, persistent cart, protected receipts, and durable order processing.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "Stripe", "Postgres"],
    demoNote: null,
    links: {
      demo: "https://stripe-mini-shop.vercel.app/",
      code: "https://github.com/stupidkubik/Stripe-mini-app"
    }
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard Template",
    summary:
      "Production-ready B2B dashboard template with reusable data views, four locales, mock APIs, and accessibility-focused QA.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "RTK Query", "TanStack Table"],
    demoNote: null,
    links: {
      demo: "https://admin-dashboard-mvp-three.vercel.app/",
      code: "https://github.com/stupidkubik/Admin-Dashboard-MVP"
    }
  }
] as const satisfies readonly ProjectListItem[];

export const featuredProjects = projectsList.filter((project) => project.featured);

export const projectsBySlug = projectsList.reduce(
  (accumulator, project) => {
    accumulator[project.slug] = project;
    return accumulator;
  },
  {} as Record<ProjectSlug, ProjectListItem>
);

const projectSlugSet = new Set<ProjectSlug>(projectSlugs);

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugSet.has(value as ProjectSlug);
}
