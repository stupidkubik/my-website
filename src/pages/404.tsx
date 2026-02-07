import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { Grid, GridCol } from "@/components/ui/Grid";
import { ButtonLink } from "@/components/ui/Button";
import SeoHead from "@/components/SeoHead";

export default function NotFound() {
  return (
    <>
      <SeoHead noindex path="/404" title="Page Not Found" />
      <main id="main-content" tabIndex={-1}>
        <Section className="text-center" containerClassName="motion-reveal">
        <Grid>
          <GridCol lg={8} className="lg:col-start-3">
            <Stack size="lg" className="items-center">
              <p className="text-label uppercase text-muted-fg">404</p>
              <h1 className="text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.01em] xs:text-[2rem] sm:text-h2">
                Page not found
              </h1>
              <p className="text-body text-muted-fg">
                The page you are looking for doesn’t exist. Head back to the homepage.
              </p>
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
