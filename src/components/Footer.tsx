export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted-fg">
        <p>Frontend Developer Portfolio</p>
        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-fg" href="mailto:stupidkubik@gmail.com">
            stupidkubik@gmail.com
          </a>
          <a className="transition hover:text-fg" href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">
            LinkedIn
          </a>
          <a className="transition hover:text-fg" href="https://t.me/stupidpotato">
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
