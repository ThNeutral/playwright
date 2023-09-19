import { test } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { LoginPage } from "../../page_objects/LoginPage";

test.describe.parallel("Login visual tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
  });

  test("Login form", async ({ page }) => {
    await loginPage.snapshotLoginForm();
  });

  test("Error", async ({ page }) => {
    await loginPage.login("deez", "nuts");
    await loginPage.snapshotErrorMessage();
  });
});
