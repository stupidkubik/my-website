export default function NotFound() {
  return (
    <main>
      <div className="container py-section text-center">
        <p className="text-label uppercase text-muted-fg">404</p>
        <h1 className="mt-4 text-h2 font-semibold">Page not found</h1>
        <p className="mt-4 text-body text-muted-fg">
          The page you are looking for doesn’t exist. Head back to the homepage.
        </p>
        <a
          className="mt-8 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-fg"
          href="/"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
