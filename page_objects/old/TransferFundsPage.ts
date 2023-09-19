import { expect, Locator, Page } from "@playwright/test";

export class TransferFundsPage {
  private readonly accountSummaryTab: Locator;

  constructor(private readonly page: Page) {
    this.accountSummaryTab = page.locator("#account_summary_tab");
  }

  async visit() {
    await this.page.goto(
      "http://zero.webappsecurity.com/bank/transfer-funds.html"
    );
  }

  async assertVisibility() {
    await expect(this.accountSummaryTab).toBeVisible();
  }
}
