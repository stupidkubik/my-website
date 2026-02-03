const projects = [
  {
    name: "Kanban Board App",
    summary: "Drag-and-drop task management with real-time sync.",
    slug: "kanban-board"
  },
  {
    name: "Stripe Mini App",
    summary: "Checkout prototype with Stripe integration and validation.",
    slug: "stripe-mini-app"
  },
  {
    name: "Admin Dashboard MVP",
    summary: "Data dashboard with modular components and charts.",
    slug: "admin-dashboard"
  }
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
          Projects & Code: Here are a few projects I’ve developed to sharpen my React and TypeScript
          skills. Each one tackled a different challenge—from drag-and-drop interaction design to API
          integrations. Click a project to see the case study.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.slug}
              className="rounded-lg border border-zinc-200 p-5 transition hover:border-zinc-900"
              href={`/projects/${project.slug}`}
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-zinc-600">{project.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
