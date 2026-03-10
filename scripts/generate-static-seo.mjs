import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const projectRoot = process.cwd();
loadEnvConfig(projectRoot);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required to generate static SEO files.");
}

const staticPaths = ["/", "/about", "/projects", "/resume", "/contact"];
const projectSlugs = ["kanban-board", "stripe-mini-app", "admin-dashboard"];
const allPaths = [...staticPaths, ...projectSlugs.map((slug) => `/projects/${slug}`)];
const lastModified = new Date().toISOString();

const sitemapEntries = allPaths
  .map((pathname) => {
    return [
      "<url>",
      `<loc>${siteUrl}${pathname}</loc>`,
      `<lastmod>${lastModified}</lastmod>`,
      "<changefreq>weekly</changefreq>",
      "<priority>0.7</priority>",
      "</url>"
    ].join("");
  })
  .join("");

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`;
const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const publicDir = path.join(projectRoot, "public");

await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8"),
  writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8")
]);

console.log("Generated public/sitemap.xml and public/robots.txt");
