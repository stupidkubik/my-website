import type { GetServerSideProps } from "next";
import type { IncomingHttpHeaders } from "node:http";

function getBaseUrl(headers: IncomingHttpHeaders) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;

  const host = (headers["x-forwarded-host"] as string | undefined) ?? headers.host;
  const protocol = (headers["x-forwarded-proto"] as string | undefined) ?? "https";
  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

function buildRobots(baseUrl: string) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseUrl = getBaseUrl(req.headers);
  const robots = buildRobots(baseUrl);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(robots);
  res.end();

  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}

