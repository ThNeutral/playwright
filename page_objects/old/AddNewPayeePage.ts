import { expect, Locator, Page } from "@playwright/test";

export class AddNewPayeePage {
  private readonly nameInput: Locator;
  private readonly addressInput: Locator;
  private readonly accountInput: Locator;
  private readonly detailsInput: Locator;
  private readonly hyperlink: Locator;
  private readonly submitButton: Locator;
  private readonly message: Locator;

  constructor(private readonly page: Page) {
    this.hyperlink = page.locator("a[href='#ui-tabs-2']");
    this.nameInput = page.locator("#np_new_payee_name");
    this.addressInput = page.locator("#np_new_payee_address");
    this.accountInput = page.locator("#np_new_payee_account");
    this.detailsInput = page.locator("#np_new_payee_details");
    this.submitButton = page.locator("input[value='Add']");
    this.message = page.locator("#alert_content");
  }

  async visit() {
    await this.hyperlink.click();
  }

  async fillForm() {
    await this.nameInput.fill("ivan");
    await this.addressInput.fill("address");
    await this.accountInput.fill("account");
    await this.detailsInput.fill("deez");
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async assertFormSubmition() {
    await expect(this.message).toContainText(
      "The new payee ivan was successfully created."
    );
  }
}
