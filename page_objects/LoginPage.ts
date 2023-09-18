import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly sumbitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator("#user_login");
    this.passwordInput = page.locator("#user_password");
    this.sumbitButton = page.locator("text=Sign in");
    this.errorMessage = page.locator(".alert-error");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.sumbitButton.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText(
      "Login and/or password are wrong."
    );
  }
}
