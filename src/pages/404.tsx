import Section from "@/components/ui/Section";
import { Grid, GridCol } from "@/components/ui/Grid";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main>
      <Section className="text-center">
        <Grid>
          <GridCol lg={8} className="lg:col-start-3">
            <p className="text-label uppercase text-muted-fg">404</p>
            <h1 className="mt-4 text-h2 font-semibold">Page not found</h1>
            <p className="mt-4 text-body text-muted-fg">
              The page you are looking for doesn’t exist. Head back to the homepage.
            </p>
            <div className="mt-8 inline-flex">
              <ButtonLink href="/" variant="outline">
                Go Home
              </ButtonLink>
            </div>
          </GridCol>
        </Grid>
      </Section>
    </main>
  );
}
