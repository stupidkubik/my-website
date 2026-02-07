import Head from "next/head";

const SITE_NAME = "Evgenii Rubin";
const DEFAULT_TITLE = "Evgenii Rubin — Frontend Developer";
const DEFAULT_DESCRIPTION =
  "Frontend developer focused on content-rich, high-quality web interfaces: semantic markup, accessibility, and predictable delivery.";

type SeoHeadProps = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
};

function toAbsoluteUrl(url: string, fallbackToRelative = true) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (!siteUrl) {
    return fallbackToRelative ? url : undefined;
  }
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage,
  noindex = false,
  type = "website"
}: SeoHeadProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = path ? toAbsoluteUrl(path, false) : undefined;
  const ogImageUrl = ogImage ? toAbsoluteUrl(ogImage, true) : undefined;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta content={description} name="description" />
      {noindex ? <meta content="noindex, nofollow" name="robots" /> : null}
      {canonicalUrl ? <link href={canonicalUrl} rel="canonical" /> : null}

      <meta content={type} property="og:type" />
      <meta content={pageTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={SITE_NAME} property="og:site_name" />
      {canonicalUrl ? <meta content={canonicalUrl} property="og:url" /> : null}
      {ogImageUrl ? <meta content={ogImageUrl} property="og:image" /> : null}

      <meta content={ogImageUrl ? "summary_large_image" : "summary"} name="twitter:card" />
      <meta content={pageTitle} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      {ogImageUrl ? <meta content={ogImageUrl} name="twitter:image" /> : null}
    </Head>
  );
}
