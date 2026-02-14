import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { ButtonLink } from "@/components/ui/Button";
import { BodyMuted, MetaLabel, SectionTitle } from "@/components/ui/typography";
import SeoHead from "@/components/SeoHead";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function NotFound() {
  return (
    <>
      <SeoHead noindex path="/404" title="Page Not Found" />
      <main id="main-content" tabIndex={-1}>
        <Section className="text-center" containerClassName="motion-reveal">
        <Grid>
          <GridCol lg={9} className="lg:col-start-2">
            <Stack size="lg" className="items-center">
              <MetaLabel>404</MetaLabel>
              <SectionTitle as="h1">Page not found</SectionTitle>
              <BodyMuted>
                The page you are looking for doesn’t exist. Head back to the homepage.
              </BodyMuted>
              <ButtonLink href="/" variant="outline">
                Go Home
              </ButtonLink>
            </Stack>
          </GridCol>
        </Grid>
        </Section>
      </main>
    </>
  );
}
