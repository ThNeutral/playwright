import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/LoginPage";
import { HomePage } from "../../page_objects/HomePage";
import { PaySavedPayeePage } from "../../page_objects/PaySavedPayeePage";
import { AddNewPayeePage } from "../../page_objects/AddNewPayeePage";
import { PurchaseForeignCurrencyPage } from "../../page_objects/PurchaseForeignCurrencyPage";

test.describe.parallel.only("Payment", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let paySavedPayeePage: PaySavedPayeePage;
  let addNewPayeePage: AddNewPayeePage;
  let purchaseForeignCurrencyPage: PurchaseForeignCurrencyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    paySavedPayeePage = new PaySavedPayeePage(page);
    addNewPayeePage = new AddNewPayeePage(page);
    purchaseForeignCurrencyPage = new PurchaseForeignCurrencyPage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");
    await paySavedPayeePage.visit();
  });

  test("Pay Saved Payee", async ({ page }) => {
    await paySavedPayeePage.fillForm();
    await paySavedPayeePage.submitForm();
    await paySavedPayeePage.assertFormSubmition();
  });

  test("Add New Payee", async ({ page }) => {
    await addNewPayeePage.visit();
    await addNewPayeePage.fillForm();
    await addNewPayeePage.submitForm();
    await addNewPayeePage.assertFormSubmition();
  });

  test.only("Purchase Foreign Currency", async ({ page }) => {
    await purchaseForeignCurrencyPage.visit();
    await purchaseForeignCurrencyPage.calculateCost();
    await purchaseForeignCurrencyPage.assertConversionLabel();
    await purchaseForeignCurrencyPage.submitForm();
    await purchaseForeignCurrencyPage.assertFormSubmition();
  });
});
