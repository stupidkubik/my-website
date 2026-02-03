export default function Contact() {
  return (
    <main>
      <div className="container py-section">
        <h1 className="text-h2 font-semibold">Contact</h1>
        <p className="mt-6 max-w-text text-body text-muted-fg">
          Interested in working together or have a question about my work? I’m just an email away.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-sm">
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
    </main>
  );
}
