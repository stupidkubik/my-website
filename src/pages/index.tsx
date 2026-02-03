export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Front-End Developer Portfolio
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Front-End Developer focused on content-rich, high-quality web interfaces.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          UI developer with 2+ years building content-heavy CMS platforms and design systems. I take a
          quality-first approach: semantic, accessible markup, fully responsive layouts, and thorough QA
          for each release.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            href="#projects"
          >
            View Projects
          </a>
          <a
            className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900"
            href="#contact"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
