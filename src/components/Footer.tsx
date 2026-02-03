export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted-fg">
        <div>
          <p className="text-fg">Frontend Developer Portfolio</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-fg">
            Content-first UI systems
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-fg" href="mailto:stupidkubik@gmail.com">
            Email
          </a>
          <a
            className="transition hover:text-fg"
            href="https://www.linkedin.com/in/evgenii-rubin-60804724b/"
          >
            LinkedIn
          </a>
          <a className="transition hover:text-fg" href="https://t.me/stupidpotato">
            Telegram
          </a>
          <a className="transition hover:text-fg" href="https://github.com/stupidkubik">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
