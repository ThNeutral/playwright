import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/old/HomePage";
import { FeedbackPage } from "../../page_objects/old/FeedbackPage";

test.describe.parallel("Feedback Form", () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);

    homePage.visit();
    homePage.clickOnFeedbackButton();
    await feedbackPage.fillForm(
      "deez",
      "nuts@lig.ma",
      "bolz",
      "The missile knows where it is at all times."
    );
  });

  test("Reset feedback form", async ({ page }) => {
    await feedbackPage.clearForm();
    await feedbackPage.assertClearForm();
  });

  test("Submit feedback form", async ({ page }) => {
    await feedbackPage.submitForm();
    await feedbackPage.assertSuccessfulSubmit();
  });
});
