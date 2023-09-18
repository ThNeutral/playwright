import { expect, Locator, Page } from "@playwright/test";

export class PurchaseForeignCurrencyPage {
  private readonly hyperlink: Locator;
  private readonly currencyDropdown: Locator;
  private readonly amountInput: Locator;
  private readonly selectedCurrencyRadiobutton: Locator;
  private readonly calculateButton: Locator;
  private readonly conversionLabel: Locator;
  private readonly purchaseButton: Locator;
  private readonly message: Locator;

  constructor(private readonly page: Page) {
    this.hyperlink = page.locator("a[href='#ui-tabs-3']");
    this.currencyDropdown = page.locator("#pc_currency");
    this.amountInput = page.locator("#pc_amount");
    this.selectedCurrencyRadiobutton = page.locator("#pc_inDollars_false");
    this.calculateButton = page.locator("#pc_calculate_costs");
    this.conversionLabel = page.locator("#pc_conversion_amount");
    this.purchaseButton = page.locator("#purchase_cash");
    this.message = page.locator("#alert_content");
  }

  async visit() {
    await this.hyperlink.click();
  }

  async calculateCost() {
    await this.currencyDropdown.selectOption("GBP");
    await this.amountInput.fill("420");
    await this.selectedCurrencyRadiobutton.click();
    await this.calculateButton.click();
  }

  async assertConversionLabel() {
    await expect(this.conversionLabel).toContainText(
      "420.00 pound (GBP) = 711.56 U.S. dollar (USD)"
    );
  }

  async submitForm() {
    await this.purchaseButton.click();
  }

  async assertFormSubmition() {
    await expect(this.message).toContainText(
      "Foreign currency cash was successfully purchased."
    );
  }
}
