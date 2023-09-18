import { test, expect } from "@playwright/test";

test.describe.parallel("Filter tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto(
      "http://zero.webappsecurity.com/bank/account-activity.html"
    );
  });

  test("Containing results", async ({ page }) => {
    await page.selectOption("#aa_accountId", "3");

    const table = page.locator("tbody > tr");
    await expect(table).toHaveCount(3);
  });

  test("Not containing results", async ({ page }) => {
    await page.selectOption("#aa_accountId", "6");

    const table = page.locator("tbody > tr");
    await expect(table).toHaveCount(0);
  });
});
