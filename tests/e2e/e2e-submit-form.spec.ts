import { test, expect } from "@playwright/test";

test.describe.parallel("Feedback Form", () => {
  test.beforeEach(async ({ page }) => {
    page.goto("http://zero.webappsecurity.com/index.html");
    page.click("#feedback");
  });

  test("Reset feedback form", async ({ page }) => {
    await page.fill("#name", "deez");
    await page.fill("#email", "nuts@lig.ma");
    await page.fill("#subject", "bolz");
    await page.fill(
      "#comment",
      "The missile knows where it is at all times. It knows this because it knows where it isn't, by subtracting where it is, from where it isn't, or where it isn't, from where it is, whichever is greater, it obtains a difference, or deviation. The guidance sub-system uses deviations to generate corrective commands to drive the missile from a position where it is, to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position where it was, is now the position that it isn't. In the event of the position that it is in is not the position that it wasn't, the system has required a variation. The variation being the difference between where the missile is, and where it wasn't. If variation is considered to be a significant factor, it too, may be corrected by the GEA. However, the missile must also know where it was. The missile guidance computance scenario works as follows: Because a variation has modified some of the information the missile has obtained, it is not sure just where it is, however it is sure where it isn't, within reason, and it knows where it was. It now subracts where it should be, from where it wasn't, or vice versa. By differentiating this from the algebraic sum og where it shouldn't be, and where it was. It is able to obtain a deviation, and a variation, which is called air"
    );
    await page.click("input[name='clear']");

    const name = await page.locator("#name");
    const email = await page.locator("#email");
    const subject = await page.locator("#subject");
    const comment = await page.locator("#comment");

    for (const item of [name, email, subject, comment])
      await expect(item).toBeEmpty();
  });

  test("Submit feedback form", async ({ page }) => {
    await page.fill("#name", "deez");
    await page.fill("#email", "nuts@lig.ma");
    await page.fill("#subject", "bolz");
    await page.fill(
      "#comment",
      "The missile knows where it is at all times. It knows this because it knows where it isn't, by subtracting where it is, from where it isn't, or where it isn't, from where it is, whichever is greater, it obtains a difference, or deviation. The guidance sub-system uses deviations to generate corrective commands to drive the missile from a position where it is, to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position where it was, is now the position that it isn't. In the event of the position that it is in is not the position that it wasn't, the system has required a variation. The variation being the difference between where the missile is, and where it wasn't. If variation is considered to be a significant factor, it too, may be corrected by the GEA. However, the missile must also know where it was. The missile guidance computance scenario works as follows: Because a variation has modified some of the information the missile has obtained, it is not sure just where it is, however it is sure where it isn't, within reason, and it knows where it was. It now subracts where it should be, from where it wasn't, or vice versa. By differentiating this from the algebraic sum og where it shouldn't be, and where it was. It is able to obtain a deviation, and a variation, which is called air"
    );

    await page.click("input[type='submit']");
    await page.waitForSelector("#feedback-title");
  });
});
