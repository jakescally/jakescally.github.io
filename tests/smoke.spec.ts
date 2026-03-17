import { expect, test } from "@playwright/test";

test("home page exposes the editorial shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /a resource for my work in tech/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Writing" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Bar menu" })).toBeVisible();
});

test("core pages render", async ({ page }) => {
  await page.goto("/writing/");
  await expect(page.getByRole("heading", { name: /articles, notes, reviews, and more/i })).toBeVisible();

  await page.goto("/writing/how-i-run-this-blog/");
  await expect(page.getByRole("heading", { name: "How I run (ran) this blog" })).toBeVisible();

  await page.goto("/projects/");
  await expect(page.getByRole("heading", { name: /projects and experiences/i })).toBeVisible();

  await page.goto("/photography/");
  await expect(page.getByRole("heading", { name: /sets of photos, camera reviews, and photography adventures/i })).toBeVisible();

  await page.goto("/about/");
  await expect(page.getByRole("heading", { name: "About Scally Network" })).toBeVisible();

  await page.goto("/search/");
  await expect(page.getByRole("heading", { name: "Search" })).toBeVisible();
});

test("bar menu shell renders with local controls and published drinks", async ({ page }) => {
  await page.goto("/bar/");

  await expect(page.getByRole("heading", { name: "Cocktail menu" })).toBeVisible();
  await expect(page.getByLabel("Search the menu")).toBeVisible();
  await expect(page.getByRole("button", { name: "All sections" })).toBeVisible();
  await expect(page.getByRole("button", { name: "All spirits" })).toBeVisible();
  await expect(page.locator("[data-drink-card]").first()).toBeVisible();
  await expect(page.locator("[data-drink-card]").first()).toContainText("Old Fashioned");
  await expect(page.getByRole("button", { name: "Search" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /back to scally network home/i })).toHaveCount(1);
});

test("home page stays compact and overflow-free on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /a resource for my work in tech/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();

  const closedMetrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    headerHeight: Math.round(document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0),
    viewport: document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? ""
  }));

  expect(closedMetrics.scrollWidth).toBeLessThanOrEqual(closedMetrics.innerWidth);
  expect(closedMetrics.headerHeight).toBeLessThan(120);
  expect(closedMetrics.viewport).toContain("viewport-fit=cover");

  const writingLink = page.getByRole("link", { name: "Writing" });
  const menuToggle = page.getByRole("button", { name: "Menu" });

  await expect(menuToggle).toBeVisible();
  await expect(writingLink).not.toBeVisible();
  await menuToggle.click();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await expect(writingLink).toBeVisible();
});

test("bar modal stays within the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/bar/");

  const firstDrink = page.locator("[data-drink-card]").first();
  await expect(firstDrink).toBeVisible();
  await firstDrink.click();
  await expect(page.locator("dialog[open]")).toBeVisible();

  const metrics = await page.evaluate(() => {
    const dialog = document.querySelector<HTMLDialogElement>("dialog[open]");
    const paper = dialog?.querySelector<HTMLElement>(".drink-modal__paper");
    const rect = dialog?.getBoundingClientRect();

    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      top: rect ? Math.round(rect.top) : null,
      bottom: rect ? Math.round(rect.bottom) : null,
      paperClientHeight: paper?.clientHeight ?? null,
      paperScrollHeight: paper?.scrollHeight ?? null
    };
  });

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth);
  expect(metrics.top).not.toBeNull();
  expect(metrics.bottom).not.toBeNull();
  expect(metrics.top!).toBeGreaterThanOrEqual(0);
  expect(metrics.bottom!).toBeLessThanOrEqual(metrics.innerHeight);
  expect(metrics.paperScrollHeight).toBeGreaterThan(metrics.paperClientHeight ?? 0);
});

test("sitemap includes the bar landing page", async ({ page }) => {
  await page.goto("/sitemap.xml/");
  await expect(page.locator("body")).toContainText("https://jakescally.com/bar/");
});

test("legacy redirects still land in the new archive", async ({ page }) => {
  await page.goto("/my-crt-history/");
  await page.waitForURL("**/writing/crt-stash-2024/");
  await expect(page).toHaveURL(/\/writing\/crt-stash-2024\/$/);
});
