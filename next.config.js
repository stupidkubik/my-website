/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createHash } = require("node:crypto");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const themeInitScript = require("./src/security/theme-init-script.cjs");
const themeScriptHash = createHash("sha256").update(themeInitScript).digest("base64");

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const contentSecurityPolicy =
      process.env.NODE_ENV === "production"
        ? [
            "default-src 'self'",
            `script-src 'self' 'sha256-${themeScriptHash}'`,
            "script-src-attr 'none'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "object-src 'none'"
          ].join("; ")
        : "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
