export const projectSlugs = ["kanban-board", "stripe-mini-app", "admin-dashboard"] as const;
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
};

export const projectsList = [
  {
    slug: "kanban-board",
    title: "Kanban Board App",
    summary: "Real-time collaborative Kanban board with auth, roles, and drag-and-drop.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "Firebase", "dnd-kit"],
    links: {
      demo: "https://kanban-board-app-ten-psi.vercel.app/",
      code: "https://github.com/stupidkubik/kanban-board-app"
    }
  },
  {
    slug: "stripe-mini-app",
    title: "Stripe Mini App",
    summary: "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "Stripe", "Zod"],
    links: {
      demo: "https://stripe-mini-shop.vercel.app/",
      code: "https://github.com/stupidkubik/Stripe-mini-app"
    }
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard MVP",
    summary: "Dashboard UI for data-heavy screens with tables, charts, filters, and i18n.",
    featured: true,
    stackPreview: ["Next.js", "TypeScript", "RTK Query", "i18n"],
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
