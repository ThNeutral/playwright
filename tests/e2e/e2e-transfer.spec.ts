import { test, expect } from "@playwright/test";

test.describe.parallel("Transfer funds and something something", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");

    const tab = await page.locator("#account_summary_tab");
    await expect(tab).toBeVisible();
  });

  test("transfer funds", async ({ page }) => {
    await page.click("#transfer_funds_tab");
    await page.selectOption("#tf_fromAccountId", "2");
    await page.selectOption("#tf_toAccountId", "3");

    await page.fill("#tf_amount", "500");
    await page.fill("#tf_description", "desc");
    await page.click("#btn_submit");

    const header = await page.locator("h2.board-header");
    await expect(header).toContainText("Verify");
    await page.click("#btn_submit");

    const success = await page.locator(".alert-success");
    await expect(success).toContainText(
      "You successfully submitted your transaction"
    );
  });
});
