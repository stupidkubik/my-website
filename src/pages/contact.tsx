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
        description="Contact Evgenii Rubin for frontend development work focused on reliable, user-friendly interfaces."
        path="/contact"
        title="Contact"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal" size="lg">
          <Grid>
            <GridCol lg={9}>
            <Stack size="lg">
              <Stack size="md">
                <PageTitle>Contact</PageTitle>
                <p className="max-w-text text-body text-muted-fg">
                  Interested in working together or have a question? Reach out via email, Telegram, LinkedIn,
                  or phone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <TextLink href="mailto:stupidkubik@gmail.com">Email</TextLink>
                  <TextLink href="tel:+381638355517">Phone</TextLink>
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
                </div>
              </Stack>
              <div className="grid gap-6 sm:grid-cols-2">
                <Stack size="sm">
                  <p className="text-label uppercase text-muted-fg">Timezone</p>
                  <p className="text-body text-muted-fg">Novi Sad, Serbia (CET/CEST)</p>
                </Stack>
                <Stack size="sm">
                  <p className="text-label uppercase text-muted-fg">Work Permit</p>
                  <p className="text-body text-muted-fg">Serbia (active)</p>
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
