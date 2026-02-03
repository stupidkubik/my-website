import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Contact() {
  return (
    <main>
      <Section>
        <Grid>
          <GridCol lg={8}>
            <h1 className="text-h2 font-semibold">Contact</h1>
            <p className="mt-6 max-w-text text-body text-muted-fg">
              Interested in working together or have a question about my work? I’m just an email away.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TextLink href="mailto:stupidkubik@gmail.com">Email</TextLink>
              <TextLink href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">LinkedIn</TextLink>
              <TextLink href="https://t.me/stupidpotato">Telegram</TextLink>
            </div>
          </GridCol>
        </Grid>
      </Section>
    </main>
  );
}
