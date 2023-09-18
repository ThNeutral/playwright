import { expect, Locator, Page } from "@playwright/test";

export class SearchPage {
  private readonly tableElements: Locator;

  constructor(private readonly page: Page) {
    this.tableElements = page.locator("li > a");
  }

  async assertTable(num: number) {
    await expect(this.tableElements).toHaveCount(num);
  }
}
