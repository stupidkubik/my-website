import assert from "node:assert/strict";
import test from "node:test";
import { projectSlugs } from "../src/data/project-slugs.mjs";
import {
  buildRobots,
  buildSitemap,
  normalizeSiteUrl,
  validateProductionSiteUrl
} from "./generate-static-seo.mjs";

test("normalizeSiteUrl validates and normalizes the configured origin", () => {
  assert.equal(normalizeSiteUrl("https://example.com/"), "https://example.com");
  assert.throws(() => normalizeSiteUrl("ftp://example.com"), /http or https/);
  assert.throws(() => normalizeSiteUrl("https://example.com/?preview=1"), /query string or hash/);
});

test("production generation rejects localhost origins", () => {
  assert.throws(
    () => validateProductionSiteUrl("http://localhost:3000", "production"),
    /public production host/
  );
  assert.doesNotThrow(() =>
    validateProductionSiteUrl("https://portfolio.example.com", "production")
  );
  assert.doesNotThrow(() => validateProductionSiteUrl("http://localhost:3000", "development"));
});

test("buildSitemap is deterministic and contains every project route", () => {
  const sitemap = buildSitemap("https://example.com");

  assert.equal(sitemap, buildSitemap("https://example.com"));
  assert.doesNotMatch(sitemap, /<lastmod>/);

  for (const slug of projectSlugs) {
    assert.match(sitemap, new RegExp(`<loc>https://example\\.com/projects/${slug}</loc>`));
  }
});

test("buildSitemap escapes XML-sensitive URL characters", () => {
  const sitemap = buildSitemap("https://example.com/?source=one&target=two", [""]);

  assert.match(sitemap, /source=one&amp;target=two/);
});

test("buildRobots points crawlers to the generated sitemap", () => {
  assert.equal(
    buildRobots("https://example.com"),
    "User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml\n"
  );
});
