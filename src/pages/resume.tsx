export default function Resume() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
          <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900">
            Download PDF
          </button>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="mt-3 text-base leading-7 text-zinc-700">
            Front-end developer focused on content-rich, high-quality web interfaces. I build
            accessible, reliable UI with a quality-first process.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="mt-4 space-y-4 text-zinc-700">
            <div>
              <p className="text-sm uppercase tracking-wide text-zinc-500">2024 — Present</p>
              <p className="mt-1 font-medium">UI Developer, Company Name</p>
              <p className="mt-2 text-sm leading-6">
                Built and maintained a content-rich publishing platform, implemented design system
                components, and ensured front-end quality through testing and reviews.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm uppercase tracking-wide text-zinc-500">Front-End</h3>
              <p className="mt-2 text-sm text-zinc-700">
                HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Next.js, Redux Toolkit, Tailwind
                CSS.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide text-zinc-500">Testing & Tools</h3>
              <p className="mt-2 text-sm text-zinc-700">Vitest, Playwright, ESLint, Prettier.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
