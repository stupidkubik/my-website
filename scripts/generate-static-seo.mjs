import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { projectSlugs } from "../src/data/project-slugs.mjs";

const { loadEnvConfig } = nextEnv;
const staticPaths = ["/", "/about", "/projects", "/resume", "/contact"];
const allPaths = [...staticPaths, ...projectSlugs.map((slug) => `/projects/${slug}`)];

export function normalizeSiteUrl(rawSiteUrl) {
  if (!rawSiteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required to generate static SEO files.");
  }

  const siteUrl = new URL(rawSiteUrl);

  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use the http or https protocol.");
  }

  if (siteUrl.search || siteUrl.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must not include a query string or hash.");
  }

  return siteUrl.href.replace(/\/$/, "");
}

export function validateProductionSiteUrl(siteUrl, deploymentEnvironment) {
  const hostname = new URL(siteUrl).hostname;

  if (
    deploymentEnvironment === "production" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(hostname)
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use the public production host on Vercel.");
  }
}

export function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildSitemap(siteUrl, paths = allPaths) {
  const sitemapEntries = paths
    .map((pathname) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.7</priority>",
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    "</urlset>",
    ""
  ].join("\n");
}

export function buildRobots(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

export async function generateStaticSeoFiles(projectRoot = process.cwd()) {
  loadEnvConfig(projectRoot);

  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  validateProductionSiteUrl(siteUrl, process.env.VERCEL_ENV);

  const publicDir = path.join(projectRoot, "public");

  await mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(publicDir, "sitemap.xml"), buildSitemap(siteUrl), "utf8"),
    writeFile(path.join(publicDir, "robots.txt"), buildRobots(siteUrl), "utf8")
  ]);
}

const isDirectRun =
  Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await generateStaticSeoFiles();
  console.log("Generated public/sitemap.xml and public/robots.txt");
}
