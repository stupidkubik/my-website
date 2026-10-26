import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  buildBadges,
  collectMetrics,
  gradeColor,
  pickRepresentativeRun,
  scoreColor,
  sizeColor,
  summarizeLighthouse,
  summarizeObservatory,
  summarizeRun
} from "./collect-metrics.mjs";

function lighthouseReport(url, { performance = 1, accessibility = 1, script = 120_000 } = {}) {
  return {
    requestedUrl: url,
    lighthouseVersion: "13.5.0",
    categories: {
      performance: { score: performance },
      accessibility: { score: accessibility },
      "best-practices": { score: 1 },
      seo: { score: 1 }
    },
    audits: {
      "largest-contentful-paint": { numericValue: 2345.6 },
      "cumulative-layout-shift": { numericValue: 0.01234 },
      "total-blocking-time": { numericValue: 19.6 },
      "resource-summary": {
        details: {
          items: [
            { resourceType: "total", transferSize: 330_000 },
            { resourceType: "script", transferSize: script }
          ]
        }
      }
    }
  };
}

const observatoryScan = {
  grade: "A+",
  score: 115,
  tests_passed: 12,
  tests_quantity: 12,
  details_url: "https://developer.mozilla.org/en-US/observatory/analyze?host=example.com",
  error: null
};

test("colors follow the Lighthouse bands, the JS budget, and the Observatory grade", () => {
  assert.deepEqual([100, 90, 89, 50, 49].map(scoreColor), [
    "brightgreen",
    "brightgreen",
    "orange",
    "orange",
    "red"
  ]);
  assert.deepEqual([170_000, 170_001, 340_001].map((bytes) => sizeColor(bytes)), [
    "brightgreen",
    "orange",
    "red"
  ]);
  assert.deepEqual(["A+", "B-", "C", "D+", "F"].map(gradeColor), [
    "brightgreen",
    "green",
    "yellow",
    "orange",
    "red"
  ]);
});

test("summarizeRun converts scores to 0-100 and rejects failed runs", () => {
  const run = summarizeRun(lighthouseReport("https://example.com/", { performance: 0.976 }));

  assert.equal(run.scores.performance, 98);
  assert.equal(run.largestContentfulPaintMs, 2346);
  assert.equal(run.cumulativeLayoutShift, 0.012);
  assert.equal(run.scriptBytes, 120_000);
  assert.equal(run.totalBytes, 330_000);

  const failedRun = {
    ...lighthouseReport("https://example.com/"),
    runtimeError: { code: "ERRORED_DOCUMENT_REQUEST", message: "Status code: 500" }
  };
  assert.throws(() => summarizeRun(failedRun), /ERRORED_DOCUMENT_REQUEST/);
  const missingScore = lighthouseReport("https://example.com/");
  missingScore.categories.seo.score = null;
  assert.throws(() => summarizeRun(missingScore), /no seo score/);
});

test("pickRepresentativeRun takes the median, or the slower middle run", () => {
  const runs = [0.99, 0.9, 0.95].map((performance) =>
    summarizeRun(lighthouseReport("https://example.com/", { performance }))
  );

  assert.equal(pickRepresentativeRun(runs).scores.performance, 95);
  assert.equal(pickRepresentativeRun(runs.slice(0, 2)).scores.performance, 90);
});

test("summarizeLighthouse reports the weakest page per category", () => {
  const summary = summarizeLighthouse([
    lighthouseReport("https://example.com/", { performance: 0.97 }),
    lighthouseReport("https://example.com/", { performance: 0.99 }),
    lighthouseReport("https://example.com/", { performance: 0.98 }),
    lighthouseReport("https://example.com/about", { accessibility: 0.95, script: 150_000 }),
    lighthouseReport("https://example.com/about", { accessibility: 0.95, script: 150_000 }),
    lighthouseReport("https://example.com/about", { accessibility: 0.95, script: 150_000 })
  ]);

  assert.equal(summary.runsPerPage, 3);
  assert.deepEqual(
    summary.pages.map((page) => page.url),
    ["https://example.com/", "https://example.com/about"]
  );
  assert.deepEqual(summary.scores, {
    performance: 98,
    accessibility: 95,
    "best-practices": 100,
    seo: 100
  });
  assert.equal(summary.scriptBytes, 150_000);
  assert.throws(() => summarizeLighthouse([]), /No Lighthouse reports/);
});

test("summarizeObservatory rejects failed scans", () => {
  assert.equal(summarizeObservatory(observatoryScan).grade, "A+");
  assert.throws(
    () => summarizeObservatory({ ...observatoryScan, grade: null, error: "recursion-detected" }),
    /recursion-detected/
  );
});

test("buildBadges produces shields.io endpoint documents", () => {
  const badges = buildBadges({
    lighthouse: summarizeLighthouse([lighthouseReport("https://example.com/", { performance: 0.87 })]),
    observatory: summarizeObservatory(observatoryScan)
  });

  assert.deepEqual(Object.keys(badges).sort(), [
    "javascript.json",
    "lighthouse-accessibility.json",
    "lighthouse-best-practices.json",
    "lighthouse-performance.json",
    "lighthouse-seo.json",
    "observatory.json"
  ]);
  assert.deepEqual(badges["lighthouse-performance.json"], {
    schemaVersion: 1,
    label: "performance",
    message: "87",
    color: "orange",
    namedLogo: "lighthouse"
  });
  assert.equal(badges["javascript.json"].message, "120 kB");
  assert.equal(badges["observatory.json"].message, "A+");
});

test("collectMetrics writes badges, JSON, and a Markdown report", async (t) => {
  const workDir = await mkdtemp(path.join(tmpdir(), "metrics-"));
  t.after(() => rm(workDir, { recursive: true, force: true }));
  const lighthouseDir = path.join(workDir, "lighthouse");
  const observatoryFile = path.join(workDir, "observatory.json");
  const outDir = path.join(workDir, "out");

  await mkdir(lighthouseDir);
  await writeFile(
    path.join(lighthouseDir, "01-run1.report.json"),
    JSON.stringify(lighthouseReport("https://example.com/projects/demo"))
  );
  await writeFile(path.join(lighthouseDir, "01-run1.report.html"), "<html></html>");
  await writeFile(observatoryFile, JSON.stringify(observatoryScan));

  const markdown = await collectMetrics({ lighthouseDir, observatoryFile, outDir, commit: "0123456789abcdef" });
  const metrics = JSON.parse(await readFile(path.join(outDir, "metrics.json"), "utf8"));
  const badge = JSON.parse(await readFile(path.join(outDir, "badges", "observatory.json"), "utf8"));

  assert.equal(metrics.siteUrl, "https://example.com");
  assert.equal(metrics.commit, "0123456789abcdef");
  assert.equal(badge.message, "A+");
  assert.equal(await readFile(path.join(outDir, "README.md"), "utf8"), markdown);
  assert.match(markdown, /at commit `0123456`/);
  assert.match(markdown, /\| `\/projects\/demo` \| 100 \| 100 \| 100 \| 100 \| 2\.3 s \| 0\.012 \| 20 ms \| 120 kB \| 330 kB \|/);
  assert.match(markdown, /Grade A\+ \(115\/100\), 12 of 12 tests passed/);
});
