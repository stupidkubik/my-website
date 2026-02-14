import PageTitle from "@/components/ui/PageTitle";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { BodyMuted, MetaLabel } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Contact() {
  return (
    <>
      <SeoHead
        description="Contact Evgenii Rubin for frontend development focused on fast, user-friendly, optimized interfaces."
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
                <BodyMuted className="max-w-text">
                  Interested in working together or have a question about React development, UX, or
                  frontend performance? Reach out via email, Telegram, or phone.
                </BodyMuted>
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
                  <MetaLabel>Timezone</MetaLabel>
                  <BodyMuted>Novi Sad, Serbia (CET/CEST)</BodyMuted>
                </Stack>
                <Stack size="sm">
                  <MetaLabel>Work Permit</MetaLabel>
                  <BodyMuted>Serbia (active)</BodyMuted>
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
