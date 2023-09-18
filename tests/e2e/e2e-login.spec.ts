import { test, expect } from "@playwright/test";

test.describe.parallel("Login/Logout Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");
  });

  test("Negative scenario", async ({ page }) => {
    await page.fill("#user_login", "deez");
    await page.fill("#user_password", "nuts");
    await page.click("text=Sign in");

    const errorDiv = page.locator(".alert-error");
    await expect(errorDiv).toContainText("Login and/or password are wrong.");
  });

  test("Positive scenario", async ({ page }) => {
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");

    const tab = await page.locator("#account_summary_tab");
    await expect(tab).toBeVisible();

    await page.goto("http://zero.webappsecurity.com/logout.html");
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");
  });
});
