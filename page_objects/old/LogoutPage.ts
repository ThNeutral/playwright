import { Page } from "@playwright/test";

export class LogoutPage {
  constructor(private readonly page: Page) {}

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com/logout.html");
  }
}
