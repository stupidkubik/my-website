export default function About() {
  return (
    <main>
      <div className="container py-section">
        <h1 className="text-h2 font-semibold">About</h1>
        <p className="mt-6 max-w-text text-body text-muted-fg">
          I’m a frontend developer based in Novi Sad, Serbia. I build content-heavy publishing
          workflows and design systems with a focus on semantic markup, accessibility, and
          predictable releases.
        </p>
        <p className="mt-4 max-w-text text-body text-muted-fg">
          Over the past 2+ years, I’ve built and maintained UI components in production CMS
          environments, improved delivery speed through reusable patterns, and contributed to
          internal tooling that reduces manual work.
        </p>
        <div className="mt-8">
          <h2 className="text-h3 font-semibold">Core Strengths</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-fg">
            <li>Quality-focused development: semantic HTML, accessible & responsive CSS, QA mindset.</li>
            <li>Design systems & CMS experience: reusable components, consistency at scale.</li>
            <li>React & Next.js with TypeScript: state management, API integration, testing.</li>
            <li>Team collaboration: code reviews, documentation, checklists.</li>
          </ul>
        </div>
        <div className="mt-10">
          <h2 className="text-h3 font-semibold">Languages</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-fg">
            <li>Russian — Native</li>
            <li>English — Professional working proficiency (B2)</li>
            <li>Serbian — Elementary proficiency (A1)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
