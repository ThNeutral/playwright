import { test, expect } from "@playwright/test";
import { loadHomepage, assertTitle } from "../helpers";

test("First basic test", async ({ page }) => {
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

  test("Assertions @myTag", async ({ page }) => {
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

test.describe.parallel.only("Screenshots suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.example.com");
  });

  test("Screenshots", async ({ page }) => {
    await page.screenshot({
      path: "./screenshots/screenshot1.png",
      fullPage: true,
    });
  });

  test("Single element screenshot", async ({ page }) => {
    const element = await page.$("h1");
    await element!.screenshot({
      path: "./screenshots/screenshot2.png",
    });
  });
});

test("Custom Helpers", async ({ page }) => {
  await loadHomepage(page);
  await assertTitle(page);
});
