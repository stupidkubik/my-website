import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import nextConfig from "../next.config.js";

const pagesDir = fileURLToPath(new URL("../.next/server/pages/", import.meta.url));
const executableTypes = new Set(["", "text/javascript", "application/javascript", "module"]);

async function getProductionScriptHashes() {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    const rules = await nextConfig.headers();
    const csp = rules
      .flatMap((rule) => rule.headers)
      .find(({ key }) => key.toLowerCase() === "content-security-policy").value;
    const scriptPolicy = csp.split("; ").find((directive) => directive.startsWith("script-src "));
    return new Set(scriptPolicy.match(/sha256-[A-Za-z0-9+/=]+/g) ?? []);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
}

function findHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(entryPath);
    return entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

function getExecutableInlineScripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script[^>]*>/gi)]
    .filter(([, attributes]) => !/\ssrc\s*=/i.test(attributes))
    .filter(([, attributes]) => {
      const type = attributes.match(/\stype\s*=\s*["']?([^"'\s>]*)/i)?.[1] ?? "";
      return executableTypes.has(type.toLowerCase());
    })
    .map(([, , body]) => body);
}

test("every inline script in the production build is allowed by the CSP hash list", async () => {
  const allowedHashes = await getProductionScriptHashes();
  const htmlFiles = findHtmlFiles(pagesDir);
  assert.ok(htmlFiles.length > 0, `Expected prerendered HTML in ${pagesDir}; run next build first`);

  for (const file of htmlFiles) {
    for (const script of getExecutableInlineScripts(readFileSync(file, "utf8"))) {
      const hash = `sha256-${createHash("sha256").update(script).digest("base64")}`;
      assert.ok(
        allowedHashes.has(hash),
        `${path.relative(pagesDir, file)} has an inline script blocked by the CSP (${hash}): ${script.slice(0, 80)}`
      );
    }
  }
});
