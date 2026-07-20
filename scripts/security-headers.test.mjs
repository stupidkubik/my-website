import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config.js";

test("all routes receive the repository security-header policy", async () => {
  assert.equal(nextConfig.poweredByHeader, false);

  const rules = await nextConfig.headers();
  const catchAllRule = rules.find((rule) => rule.source === "/:path*");

  assert.ok(catchAllRule, "Expected a catch-all security-header rule");

  const headers = Object.fromEntries(
    catchAllRule.headers.map(({ key, value }) => [key.toLowerCase(), value])
  );

  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(headers["permissions-policy"], /camera=\(\)/);
  assert.match(headers["permissions-policy"], /microphone=\(\)/);
  assert.match(headers["content-security-policy"], /frame-ancestors 'none'/);
  assert.equal(headers["x-frame-options"], "DENY");
});
