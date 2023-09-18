import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/LoginPage";
import { HomePage } from "../../page_objects/HomePage";

test.describe.parallel("Login/Logout Flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
  });

  test("Negative scenario", async ({ page }) => {
    await loginPage.login("deez", "nuts");
    await loginPage.assertErrorMessage();
  });

  test("Positive scenario", async ({ page }) => {
    await loginPage.login("username", "password");
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");

    const tab = await page.locator("#account_summary_tab");
    await expect(tab).toBeVisible();

    await page.goto("http://zero.webappsecurity.com/logout.html");
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");
  });
});
