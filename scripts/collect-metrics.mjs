import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Turns Lighthouse reports and an MDN HTTP Observatory scan of the production site
// into shields.io endpoint badges, a JSON summary, and a Markdown report.

export const categories = [
  { id: "performance", label: "performance" },
  { id: "accessibility", label: "accessibility" },
  { id: "best-practices", label: "best practices" },
  { id: "seo", label: "seo" }
];

// Compressed JavaScript a page may load before the badge stops being green.
export const scriptBudgetBytes = 170_000;

// Same bands as the Lighthouse report: 90-100 good, 50-89 needs improvement.
export function scoreColor(score) {
  if (score >= 90) return "brightgreen";
  if (score >= 50) return "orange";
  return "red";
}

export function sizeColor(bytes, budget = scriptBudgetBytes) {
  if (bytes <= budget) return "brightgreen";
  if (bytes <= budget * 2) return "orange";
  return "red";
}

export function gradeColor(grade) {
  return { A: "brightgreen", B: "green", C: "yellow", D: "orange" }[grade.charAt(0)] ?? "red";
}

export function formatKilobytes(bytes) {
  return `${Math.round(bytes / 1000)} kB`;
}

function getTransferSize(lhr, resourceType) {
  const item = lhr.audits["resource-summary"].details.items.find(
    (entry) => entry.resourceType === resourceType
  );
  return item?.transferSize ?? 0;
}

export function summarizeRun(lhr) {
  if (lhr.runtimeError) {
    throw new Error(
      `Lighthouse failed for ${lhr.requestedUrl}: ${lhr.runtimeError.code} ${lhr.runtimeError.message}`
    );
  }

  const scores = {};
  for (const { id } of categories) {
    const score = lhr.categories[id]?.score;
    if (typeof score !== "number") {
      throw new Error(`Lighthouse report for ${lhr.requestedUrl} has no ${id} score.`);
    }
    scores[id] = Math.round(score * 100);
  }

  return {
    url: lhr.requestedUrl,
    scores,
    largestContentfulPaintMs: Math.round(lhr.audits["largest-contentful-paint"].numericValue),
    cumulativeLayoutShift: Number(lhr.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
    totalBlockingTimeMs: Math.round(lhr.audits["total-blocking-time"].numericValue),
    scriptBytes: getTransferSize(lhr, "script"),
    totalBytes: getTransferSize(lhr, "total")
  };
}

// The median run by performance score represents a page. With an even number of
// runs the slower of the two middle runs wins, so noise never flatters the result.
export function pickRepresentativeRun(runs) {
  const sorted = [...runs].sort((a, b) => a.scores.performance - b.scores.performance);
  return sorted[Math.floor((sorted.length - 1) / 2)];
}

// Badges report the weakest page: the lowest score and the heaviest JavaScript.
export function summarizeLighthouse(reports) {
  if (reports.length === 0) {
    throw new Error("No Lighthouse reports to summarize.");
  }

  const runsByUrl = Map.groupBy(reports.map(summarizeRun), (run) => run.url);
  const pages = [...runsByUrl.values()].map(pickRepresentativeRun);

  return {
    lighthouseVersion: reports[0].lighthouseVersion,
    runsPerPage: Math.min(...[...runsByUrl.values()].map((runs) => runs.length)),
    scores: Object.fromEntries(
      categories.map(({ id }) => [id, Math.min(...pages.map((page) => page.scores[id]))])
    ),
    scriptBytes: Math.max(...pages.map((page) => page.scriptBytes)),
    pages
  };
}

export function summarizeObservatory(scan) {
  if (scan.error || !scan.grade) {
    throw new Error(`MDN HTTP Observatory scan failed: ${scan.error ?? "no grade returned"}`);
  }

  return {
    grade: scan.grade,
    score: scan.score,
    testsPassed: scan.tests_passed,
    testsQuantity: scan.tests_quantity,
    detailsUrl: scan.details_url
  };
}

function badge(label, message, color, namedLogo) {
  return { schemaVersion: 1, label, message, color, namedLogo };
}

export function buildBadges({ lighthouse, observatory }) {
  return {
    ...Object.fromEntries(
      categories.map(({ id, label }) => [
        `lighthouse-${id}.json`,
        badge(label, String(lighthouse.scores[id]), scoreColor(lighthouse.scores[id]), "lighthouse")
      ])
    ),
    "javascript.json": badge(
      "first-load JS",
      formatKilobytes(lighthouse.scriptBytes),
      sizeColor(lighthouse.scriptBytes),
      "javascript"
    ),
    "observatory.json": badge("observatory", observatory.grade, gradeColor(observatory.grade), "mozilla")
  };
}

function formatSeconds(milliseconds) {
  return `${(milliseconds / 1000).toFixed(1)} s`;
}

export function renderMarkdown({ siteUrl, measuredAt, commit, lighthouse, observatory }) {
  const rows = lighthouse.pages.map((page) =>
    [
      `\`${new URL(page.url).pathname}\``,
      ...categories.map(({ id }) => page.scores[id]),
      formatSeconds(page.largestContentfulPaintMs),
      page.cumulativeLayoutShift,
      `${page.totalBlockingTimeMs} ms`,
      formatKilobytes(page.scriptBytes),
      formatKilobytes(page.totalBytes)
    ].join(" | ")
  );

  return [
    "# Production metrics",
    "",
    `Measured ${measuredAt} for ${siteUrl}${commit ? ` at commit \`${commit.slice(0, 7)}\`` : ""}.`,
    "",
    "## Lighthouse",
    "",
    `Lighthouse ${lighthouse.lighthouseVersion}, mobile emulation, median of ${lighthouse.runsPerPage} runs per page. ` +
      `The README badges show the weakest page; the JavaScript budget is ${formatKilobytes(scriptBudgetBytes)}.`,
    "",
    "| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | JS | Total |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...rows.map((row) => `| ${row} |`),
    "",
    "## MDN HTTP Observatory",
    "",
    `Grade ${observatory.grade} (${observatory.score}/100), ${observatory.testsPassed} of ${observatory.testsQuantity} tests passed. ` +
      `[Full report](${observatory.detailsUrl})`,
    ""
  ].join("\n");
}

export async function collectMetrics({ lighthouseDir, observatoryFile, outDir, commit }) {
  const reportFiles = (await readdir(lighthouseDir)).filter((name) => name.endsWith(".json")).sort();
  const reports = await Promise.all(
    reportFiles.map(async (name) => JSON.parse(await readFile(path.join(lighthouseDir, name), "utf8")))
  );
  const lighthouse = summarizeLighthouse(reports);
  const metrics = {
    siteUrl: new URL(lighthouse.pages[0].url).origin,
    measuredAt: new Date().toISOString(),
    commit: commit ?? null,
    lighthouse,
    observatory: summarizeObservatory(JSON.parse(await readFile(observatoryFile, "utf8")))
  };
  const markdown = renderMarkdown(metrics);
  const badgesDir = path.join(outDir, "badges");

  await mkdir(badgesDir, { recursive: true });
  await Promise.all([
    ...Object.entries(buildBadges(metrics)).map(([name, content]) =>
      writeFile(path.join(badgesDir, name), `${JSON.stringify(content, null, 2)}\n`, "utf8")
    ),
    writeFile(path.join(outDir, "metrics.json"), `${JSON.stringify(metrics, null, 2)}\n`, "utf8"),
    writeFile(path.join(outDir, "README.md"), markdown, "utf8")
  ]);

  return markdown;
}

const isDirectRun =
  Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const [lighthouseDir, observatoryFile, outDir] = process.argv.slice(2);
  if (!lighthouseDir || !observatoryFile || !outDir) {
    console.error("Usage: node scripts/collect-metrics.mjs <lighthouse-dir> <observatory.json> <out-dir>");
    process.exit(1);
  }
  console.log(
    await collectMetrics({ lighthouseDir, observatoryFile, outDir, commit: process.env.GITHUB_SHA })
  );
}
