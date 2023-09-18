import { test, expect } from "@playwright/test";

test.describe.parallel("Search Results", () => {
  test("Should find search results", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.fill("#searchTerm", "bank");
    await page.keyboard.press("Enter");

    const number = page.locator("li > a");
    await expect(number).toHaveCount(2);
  });

  test("Should not find search results", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.fill("#searchTerm", "deez");
    await page.keyboard.press("Enter");

    const number = page.locator("li > a");
    await expect(number).toHaveCount(0);
  });
});
