import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { createRequire } from "node:module";
import nextConfig from "../next.config.js";

const require = createRequire(import.meta.url);
const themeInitScript = require("../src/security/theme-init-script.cjs");

async function getHeadersForEnvironment(nodeEnv) {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = nodeEnv;
  try {
    const rules = await nextConfig.headers();
    const catchAllRule = rules.find((rule) => rule.source === "/:path*");
    assert.ok(catchAllRule, "Expected a catch-all security-header rule");
    return Object.fromEntries(
      catchAllRule.headers.map(({ key, value }) => [key.toLowerCase(), value])
    );
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
}

test("all routes receive the repository security-header policy", async () => {
  assert.equal(nextConfig.poweredByHeader, false);
  const headers = await getHeadersForEnvironment("production");

  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(headers["permissions-policy"], /camera=\(\)/);
  assert.match(headers["permissions-policy"], /microphone=\(\)/);
  assert.match(headers["content-security-policy"], /frame-ancestors 'none'/);
  assert.equal(headers["x-frame-options"], "DENY");
});

test("production CSP allows only same-origin scripts and the exact theme initializer", async () => {
  const { "content-security-policy": csp } = await getHeadersForEnvironment("production");
  const expectedHash = createHash("sha256").update(themeInitScript).digest("base64");

  assert.ok(csp.includes(`script-src 'self' 'sha256-${expectedHash}'`));
  assert.match(csp, /script-src-attr 'none'/);
  const scriptPolicy = csp.split("; ").find((directive) => directive.startsWith("script-src "));
  assert.ok(scriptPolicy, "Expected an explicit script-src directive");
  assert.doesNotMatch(scriptPolicy, /'unsafe-inline'|'unsafe-eval'/);
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /style-src 'self' 'unsafe-inline'/);
});

test("development retains the existing CSP for the Next.js development runtime", async () => {
  const { "content-security-policy": csp } = await getHeadersForEnvironment("development");

  assert.equal(
    csp,
    "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'"
  );
});
