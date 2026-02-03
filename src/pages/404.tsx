import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import { Grid, GridCol } from "@/components/ui/Grid";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main>
      <Section className="text-center">
        <Grid>
          <GridCol lg={8} className="lg:col-start-3">
            <Stack size="lg" className="items-center">
              <p className="text-label uppercase text-muted-fg">404</p>
              <h1 className="text-h2 font-semibold">Page not found</h1>
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
  );
}
