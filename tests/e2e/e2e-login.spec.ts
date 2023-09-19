import { test } from "@playwright/test";
import { LoginPage } from "../../page_objects/old/LoginPage";
import { HomePage } from "../../page_objects/old/HomePage";
import { TransferFundsPage } from "../../page_objects/old/TransferFundsPage";
import { LogoutPage } from "../../page_objects/old/LogoutPage";

test.describe.parallel.only("Login/Logout Flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let transferFundsPage: TransferFundsPage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    transferFundsPage = new TransferFundsPage(page);
    logoutPage = new LogoutPage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
  });

  test("Negative scenario", async ({ page }) => {
    await loginPage.login("deez", "nuts");
    await loginPage.assertErrorMessage();
  });

  test("Positive scenario", async ({ page }) => {
    await loginPage.login("username", "password");
    await transferFundsPage.visit();
    await transferFundsPage.assertVisibility();

    await logoutPage.visit();
    await homePage.assertURL();
  });
});
