import TextLink from "@/components/ui/TextLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-muted-fg xs:gap-4 xs:py-8">
        <p className="text-muted-fg">
          © {currentYear} Evgenii Rubin
        </p>
        <nav aria-label="Social links" className="flex flex-wrap gap-3 xs:gap-4">
          <TextLink href="mailto:stupidkubik@gmail.com">Email</TextLink>
          <TextLink
            href="https://www.linkedin.com/in/evgenii-rubin-60804724b/"
            openInNewTab
            withExternalIndicator
          >
            LinkedIn
          </TextLink>
          <TextLink href="https://t.me/stupidpotato" openInNewTab withExternalIndicator>
            Telegram
          </TextLink>
          <TextLink href="https://github.com/stupidkubik" openInNewTab withExternalIndicator>
            GitHub
          </TextLink>
        </nav>
      </div>
    </footer>
  );
}
