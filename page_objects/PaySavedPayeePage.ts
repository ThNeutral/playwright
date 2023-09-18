import { expect, Locator, Page } from "@playwright/test";

export class PaySavedPayeePage {
  private readonly payeeDropdown: Locator;
  private readonly accountDropdown: Locator;
  private readonly amountInput: Locator;
  private readonly dateInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly payButton: Locator;
  private readonly message: Locator;

  constructor(private readonly page: Page) {
    this.payeeDropdown = page.locator("#sp_payee");
    this.accountDropdown = page.locator("#sp_account");
    this.amountInput = page.locator("#sp_amount");
    this.dateInput = page.locator("#sp_date");
    this.descriptionInput = page.locator("#sp_description");
    this.payButton = page.locator("input[type='submit']");
    this.message = page.locator("#alert_content");
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
  }

  async fillForm() {
    await this.payeeDropdown.selectOption("bofa");
    await this.accountDropdown.selectOption("3");
    await this.amountInput.fill("420");
    await this.dateInput.fill("2023-09-14");
    await this.descriptionInput.fill("deez");
  }

  async submitForm() {
    await this.payButton.click();
  }

  async assertFormSubmition() {
    await expect(this.message).toContainText(
      "The payment was successfully submitted."
    );
  }
}
