import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly commentInput: Locator;
  private readonly submitButton: Locator;
  private readonly clearButton: Locator;

  constructor(private readonly page: Page) {
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.subjectInput = page.locator("#subject");
    this.commentInput = page.locator("#comment");
    this.clearButton = page.locator("input[name='clear']");
    this.submitButton = page.locator("input[type='submit']");
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string
  ) {
    await this.nameInput.fill("deez");
    await this.emailInput.fill("nuts@lig.ma");
    await this.subjectInput.fill("bolz");
    await this.commentInput.fill(
      "The missile knows where it is at all times. It knows this because it knows where it isn't, by subtracting where it is, from where it isn't, or where it isn't, from where it is, whichever is greater, it obtains a difference, or deviation. The guidance sub-system uses deviations to generate corrective commands to drive the missile from a position where it is, to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position where it was, is now the position that it isn't. In the event of the position that it is in is not the position that it wasn't, the system has required a variation. The variation being the difference between where the missile is, and where it wasn't. If variation is considered to be a significant factor, it too, may be corrected by the GEA. However, the missile must also know where it was. The missile guidance computance scenario works as follows: Because a variation has modified some of the information the missile has obtained, it is not sure just where it is, however it is sure where it isn't, within reason, and it knows where it was. It now subracts where it should be, from where it wasn't, or vice versa. By differentiating this from the algebraic sum og where it shouldn't be, and where it was. It is able to obtain a deviation, and a variation, which is called air"
    );
  }

  async clearForm() {
    await this.clearButton.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async assertClearForm() {
    for (const element of [
      this.nameInput,
      this.emailInput,
      this.subjectInput,
      this.commentInput,
    ]) {
      await expect(element).toBeEmpty();
    }
  }

  async assertSuccessfulSubmit() {
    await this.page.waitForSelector("#feedback-title");
  }
}
