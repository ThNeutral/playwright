import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly singInButton: Locator;
  private readonly searchBox: Locator;
  private readonly feedbackButton: Locator;

  constructor(private readonly page: Page) {
    this.singInButton = page.locator("#signin_button");
    this.searchBox = page.locator("#searchTerm");
    this.feedbackButton = page.locator("#feedback");
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com/index.html");
  }

  async clickOnSignInButton() {
    await this.singInButton.click();
  }

  async clickOnFeedbackButton() {
    await this.feedbackButton.click();
  }

  async searchForPhrase(phrase: string) {
    await this.searchBox.fill(phrase);
    await this.page.keyboard.press("Enter");
  }

  async assertURL() {
    await expect(this.page).toHaveURL(
      "http://zero.webappsecurity.com/index.html"
    );
  }
}
