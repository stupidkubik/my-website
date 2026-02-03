export default function About() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="mt-6 text-base leading-7 text-zinc-700">
          I’m a front-end developer experienced in building and maintaining content-heavy web
          platforms. Over the past two years, I’ve helped implement and refine design systems for a
          large publishing site, ensuring consistency and accessibility across pages.
        </p>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          I pride myself on writing clean, semantic code and thoroughly testing every feature for a
          smooth release. I focus on predictable UI behavior, clear information hierarchy, and
          accessible interfaces across devices.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Core Strengths</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
            <li>Quality-focused development: semantic HTML, accessible & responsive CSS, QA mindset.</li>
            <li>Design systems & CMS experience: reusable components, consistency at scale.</li>
            <li>React & Next.js with TypeScript: state management, API integration, testing.</li>
            <li>Team collaboration: code reviews, documentation, checklists.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
