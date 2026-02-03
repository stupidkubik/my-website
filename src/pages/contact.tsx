import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Contact() {
  return (
    <main>
      <Section>
        <Grid>
          <GridCol lg={8}>
            <Stack size="md">
              <PageTitle>Contact</PageTitle>
              <p className="max-w-text text-body text-muted-fg">
                Interested in working together or have a question about my work? I’m just an email away.
              </p>
              <div className="flex flex-wrap gap-3">
                <TextLink href="mailto:stupidkubik@gmail.com">Email</TextLink>
                <TextLink href="https://www.linkedin.com/in/evgenii-rubin-60804724b/">LinkedIn</TextLink>
                <TextLink href="https://t.me/stupidpotato">Telegram</TextLink>
              </div>
            </Stack>
          </GridCol>
        </Grid>
      </Section>
    </main>
  );
}
