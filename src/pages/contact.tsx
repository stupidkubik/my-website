export default function Contact() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-6 text-base leading-7 text-zinc-700">
          Interested in working together or have a question about my work? I’m just an email away.
        </p>
        <div className="mt-6">
          <a
            className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900"
            href="mailto:youremail@example.com"
          >
            youremail@example.com
          </a>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          You can also reach me on LinkedIn (link to be added).
        </p>
      </div>
    </main>
  );
}
