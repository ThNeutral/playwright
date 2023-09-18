import { test, expect } from "@playwright/test";

test.describe.parallel("Payment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
  });

  test("Pay Saved Payee", async ({ page }) => {
    await page.selectOption("#sp_payee", "bofa");
    await page.selectOption("#sp_account", "3");
    await page.fill("#sp_amount", "420");
    await page.fill("#sp_date", "2023-09-14");
    await page.fill("#sp_description", "deez");
    await page.click("input[type='submit']");

    const message = await page.locator("#alert_content");
    await expect(message).toContainText(
      "The payment was successfully submitted."
    );
  });

  test("Add New Payee", async ({ page }) => {
    await page.click("a[href='#ui-tabs-2']");

    await page.fill("#np_new_payee_name", "ivan");
    await page.fill("#np_new_payee_address", "address");
    await page.fill("#np_new_payee_account", "account");
    await page.fill("#np_new_payee_details", "deez");

    await page.click("input[value='Add']");

    const message = await page.locator("#alert_content");
    await expect(message).toContainText(
      "The new payee ivan was successfully created."
    );
  });

  test("Purchase Foreign Currency", async ({ page }) => {
    await page.click("a[href='#ui-tabs-3']");

    await page.selectOption("#pc_currency", "GBP");
    await page.fill("#pc_amount", "420");

    await page.click("#pc_inDollars_false");
    await page.click("#pc_calculate_costs");

    const conversion = await page.locator("#pc_conversion_amount");
    await expect(conversion).toContainText(
      "420.00 pound (GBP) = 711.56 U.S. dollar (USD)"
    );

    await page.click("#purchase_cash");

    const message = await page.locator("#alert_content");
    await expect(message).toContainText(
      "Foreign currency cash was successfully purchased."
    );
  });
});
