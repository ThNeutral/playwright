import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/LoginPage";
import { HomePage } from "../../page_objects/HomePage";

test.describe.parallel("Filter tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");
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
