import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
  {
    name: "Kanban Board App",
    summary: "Realtime collaborative Kanban board with auth, roles, and drag-and-drop.",
    slug: "kanban-board",
    demo: "https://kanban-board-app-ten-psi.vercel.app/",
    code: "https://github.com/stupidkubik/kanban-board-app"
  },
  {
    name: "Stripe Mini App",
    summary: "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    slug: "stripe-mini-app",
    demo: "https://stripe-mini-shop.vercel.app/",
    code: "https://github.com/stupidkubik/Stripe-mini-app"
  },
  {
    name: "Admin Dashboard MVP",
    summary: "Dashboard UI for data-heavy screens with tables, charts, filters, and i18n.",
    slug: "admin-dashboard",
    demo: "https://admin-dashboard-mvp-three.vercel.app/",
    code: "https://github.com/stupidkubik/Admin-Dashboard-MVP"
  }
];

export default function Projects() {
  return (
    <main>
      <div className="container py-section">
        <h1 className="text-h2 font-semibold">Projects</h1>
        <p className="mt-4 max-w-text text-body text-muted-fg">
          Projects & Code: here are a few projects I’ve developed to sharpen my React and TypeScript
          skills. Each one tackled a different challenge—from drag-and-drop interaction design to API
          integrations. Click a project for the full case study.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              href={`/projects/${project.slug}`}
              title={project.name}
              summary={project.summary}
            >
              <a className="underline" href={project.demo}>
                Live Demo
              </a>
              <a className="underline" href={project.code}>
                Source Code
              </a>
            </ProjectCard>
          ))}
        </div>
      </div>
    </main>
  );
}
