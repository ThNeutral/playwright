import { test, expect } from "@playwright/test";

test.skip("First basic test", async ({ page }) => {
  await page.goto("https://www.example.com");
  const pageTitle = await page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
});

test("Clicking test", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.click("text=Sign in");

  const errorMessage = page.locator(".alert-error");
  await expect(errorMessage).toContainText("Login and/or password are wrong.");
});

test.describe("First test suite", () => {
  test("Input test", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "some username");
    await page.fill("#user_password", "some spassword");
    await page.click("text=Sign in");

    const errorMessage = page.locator(".alert-error");
    await expect(errorMessage).toContainText(
      "Login and/or password are wrong."
    );
  });

  test("Assertions", async ({ page }) => {
    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle("Example Domain");

    const element = await page.locator("h1");
    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);

    const nonExistingElement = await page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();
  });
});
