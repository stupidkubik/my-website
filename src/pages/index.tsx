const selectedProjects = [
  {
    name: "Kanban Board App",
    summary: "Realtime collaborative Kanban board with roles, auth, and drag-and-drop.",
    href: "/projects/kanban-board"
  },
  {
    name: "Stripe Mini App",
    summary: "Compact e-commerce demo with Stripe Checkout, webhooks, and validation.",
    href: "/projects/stripe-mini-app"
  },
  {
    name: "Admin Dashboard MVP",
    summary: "Dashboard UI for data-heavy screens with tables, charts, and filters.",
    href: "/projects/admin-dashboard"
  }
];

export default function Home() {
  return (
    <main>
      <div className="container py-section-lg">
        <p className="text-label uppercase text-muted-fg">Frontend Developer</p>
        <h1 className="mt-4 text-display font-semibold">
          Front-End Developer focused on content-rich, high-quality web interfaces.
        </h1>
        <p className="mt-4 max-w-text text-body text-muted-fg">
          UI developer with ~2 years in production CMS and design systems. I take a quality-first
          approach: semantic markup, accessible layouts, cross-browser responsiveness, and careful QA.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-contrast"
            href="/projects"
          >
            View Projects
          </a>
          <a
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-fg"
            href="/contact"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <section className="border-t border-border">
        <div className="container py-section">
          <div className="flex items-baseline justify-between">
            <h2 className="text-h2 font-semibold">Selected Work</h2>
            <a className="text-sm text-muted-fg underline" href="/projects">
              All projects
            </a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {selectedProjects.map((project) => (
              <a
                key={project.name}
                className="rounded-lg border border-border p-5 transition hover:border-fg"
                href={project.href}
              >
                <h3 className="text-h3 font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-muted-fg">{project.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container py-section">
          <h2 className="text-h2 font-semibold">Contact</h2>
          <p className="mt-3 text-body text-muted-fg">
            Interested in working together or have a question? I’m just an email away.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a className="underline" href="mailto:stupidkubik@gmail.com">
              stupidkubik@gmail.com
            </a>
            <a className="underline" href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">
              LinkedIn
            </a>
            <a className="underline" href="https://t.me/stupidpotato">
              Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
