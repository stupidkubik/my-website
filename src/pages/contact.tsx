import { ButtonLink } from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import SeoHead from "@/components/SeoHead";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import TextLink from "@/components/ui/TextLink";
import { MetaLabel } from "@/components/ui/typography";
import { Grid, GridCol } from "@/components/ui/Grid";

export default function Contact() {
  return (
    <>
      <SeoHead
        description="Contact Evgenii Rubin for frontend development across reliable web interfaces and interactive TypeScript experiences."
        path="/contact"
        title="Contact"
      />
      <main id="main-content" tabIndex={-1}>
        <Section containerClassName="motion-reveal" size="lg">
          <Grid className="items-start">
            <GridCol lg={7}>
              <Stack size="xl">
                <Stack size="md">
                  <PageTitle>Contact</PageTitle>
                  <p className="max-w-text text-body text-muted-fg">
                    I&apos;m open to frontend roles and collaboration opportunities across reliable web interfaces and
                    interactive experiences.
                  </p>
                </Stack>
                <Stack size="md">
                  <div className="border-y border-border py-5">
                    <Stack size="sm">
                      <MetaLabel>Email</MetaLabel>
                      <TextLink
                        className="w-fit text-[1.125rem] font-medium text-fg"
                        href="mailto:stupidkubik@gmail.com"
                      >
                        stupidkubik@gmail.com
                      </TextLink>
                      <ButtonLink className="min-h-10 w-fit" href="mailto:stupidkubik@gmail.com">
                        Email me
                      </ButtonLink>
                    </Stack>
                  </div>
                </Stack>
              </Stack>
            </GridCol>
            <GridCol className="lg:col-start-9" lg={4}>
              <aside aria-labelledby="contact-details-title" className="border-y border-border py-5">
                <Stack size="lg">
                  <Stack size="sm">
                    <h2 className="text-h3 font-semibold" id="contact-details-title">
                      Availability
                    </h2>
                    <p className="text-body text-muted-fg">
                      Open to frontend roles and project collaborations.
                    </p>
                  </Stack>

                  <dl className="grid gap-5 text-body">
                    <div>
                      <dt className="text-label uppercase text-muted-fg">Location</dt>
                      <dd className="mt-2 text-fg">Novi Sad, Serbia</dd>
                    </div>
                    <div>
                      <dt className="text-label uppercase text-muted-fg">Time zone</dt>
                      <dd className="mt-2 text-fg">CET/CEST</dd>
                    </div>
                    <div>
                      <dt className="text-label uppercase text-muted-fg">Work permit</dt>
                      <dd className="mt-2 text-fg">Serbia (active)</dd>
                    </div>
                  </dl>

                  <Stack className="border-t border-border pt-5" size="sm">
                    <MetaLabel>Other channels</MetaLabel>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
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
                </Stack>
              </aside>
            </GridCol>
          </Grid>
        </Section>
      </main>
    </>
  );
}
