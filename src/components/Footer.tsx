import TextLink from "@/components/ui/TextLink";

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
          <TextLink href="mailto:stupidkubik@gmail.com">Email</TextLink>
          <TextLink href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">
            LinkedIn
          </TextLink>
          <TextLink href="https://t.me/stupidpotato">Telegram</TextLink>
          <TextLink href="https://github.com/stupidkubik">GitHub</TextLink>
        </div>
      </div>
    </footer>
  );
}
