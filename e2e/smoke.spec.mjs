import { expect, test } from "@playwright/test";
import nextConfig from "../next.config.js";

const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/kanban-board",
  "/projects/stripe-mini-app",
  "/projects/admin-dashboard",
  "/resume",
  "/contact"
];
const missingRoute = "/this-page-does-not-exist";

async function getProductionHeaders() {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    const rules = await nextConfig.headers();
    return rules
      .find((rule) => rule.source === "/:path*")
      .headers.map(({ key, value }) => [key.toLowerCase(), value]);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
}

// Console errors include CSP violations, so a blocked script fails the test.
// The 404 response for the missing route itself is expected.
function collectErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (new URL(message.location().url || "about:blank").pathname === missingRoute) return;
    errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  return errors;
}

for (const route of [...routes, missingRoute]) {
  test(`${route} renders with the production security headers`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(route, { waitUntil: "networkidle" });

    expect(response.status()).toBe(route === missingRoute ? 404 : 200);
    for (const [key, value] of await getProductionHeaders()) {
      expect(response.headers()[key], key).toBe(value);
    }
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect.poll(() => page.evaluate(() => Boolean(window.next?.router))).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("theme toggle switches and persists the theme", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Dark theme" });

  // WCAG 2.5.3: the accessible name contains the visible label.
  await expect(toggle).toHaveText("Dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => window.localStorage.getItem("theme"))).toBe("dark");

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(errors).toEqual([]);
});

test("primary navigation routes on the client", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__notReloaded = true;
  });

  const navigation = page.getByRole("navigation", { name: "Primary" });
  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(navigation.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  expect(await page.evaluate(() => window.__notReloaded)).toBe(true);
});

test("screenshots for visual review", async ({ page }, testInfo) => {
  test.slow();
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 800 });
      for (const route of routes) {
        await page.goto(route, { waitUntil: "networkidle" });
        const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}-${colorScheme}.png`;
        await testInfo.attach(name, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png"
        });
      }
    }
  }
});
