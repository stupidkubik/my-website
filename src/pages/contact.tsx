import PageTitle from "@/components/ui/PageTitle";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Contact() {
  return (
    <>
      <SeoHead
        description="Contact Evgenii Rubin for frontend development work: content-heavy interfaces, design systems, and quality-first implementation."
        path="/contact"
        title="Contact"
      />
      <main>
        <Section size="lg">
        <Grid>
          <GridCol lg={9}>
            <Stack size="lg">
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
              <div className="grid gap-6 sm:grid-cols-2">
                <Stack size="sm">
                  <p className="text-label uppercase text-muted-fg">Timezone</p>
                  <p className="text-body text-muted-fg">Novi Sad, Serbia (CET/CEST)</p>
                </Stack>
                <Stack size="sm">
                  <p className="text-label uppercase text-muted-fg">Response Time</p>
                  <p className="text-body text-muted-fg">Usually within one business day.</p>
                </Stack>
              </div>
            </Stack>
          </GridCol>
        </Grid>
        </Section>
      </main>
    </>
  );
}
