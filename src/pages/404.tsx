export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-base text-zinc-600">
          The page you are looking for doesn’t exist. Head back to the homepage.
        </p>
        <a
          className="mt-8 inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900"
          href="/"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
