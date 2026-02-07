import type { GetServerSideProps } from "next";
import type { IncomingHttpHeaders } from "node:http";

const projectSlugs = ["kanban-board", "stripe-mini-app", "admin-dashboard"] as const;

function getBaseUrl(headers: IncomingHttpHeaders) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;

  const host = (headers["x-forwarded-host"] as string | undefined) ?? headers.host;
  const protocol = (headers["x-forwarded-proto"] as string | undefined) ?? "https";
  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

function buildSitemap(baseUrl: string) {
  const staticPaths = ["/", "/about", "/projects", "/resume", "/contact"];
  const projectPaths = projectSlugs.map((slug) => `/projects/${slug}`);
  const now = new Date().toISOString();

  const entries = [...staticPaths, ...projectPaths]
    .map((path) => {
      return [
        "<url>",
        `<loc>${baseUrl}${path}</loc>`,
        `<lastmod>${now}</lastmod>`,
        "<changefreq>weekly</changefreq>",
        "<priority>0.7</priority>",
        "</url>"
      ].join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseUrl = getBaseUrl(req.headers);
  const sitemap = buildSitemap(baseUrl);

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
