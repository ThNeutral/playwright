import { test, expect, Page } from "@playwright/test";
import { getRandomNumber, getRandomString } from "../../utils/data-helpers";

test.describe.parallel("Tips Section", () => {
  test.only("TestInfo Object", async ({ page }, testInfo) => {
    await page.goto("https://www.example.com");
    // console.log(testInfo.title);
    let newNumber = await getRandomNumber(1000);
    let newString = await getRandomString(64);
    console.log(newNumber, newString);
  });

  test("Omit Chromium", async ({ page, browserName }) => {
    test.skip(browserName === "chromium", "Feature not ready for Chromium");
    await page.goto("https://www.example.com");
  });

  test("Fixme Chromium", async ({ page, browserName }) => {
    test.fixme(browserName === "chromium", "Feature not stable for Chromium");
    await page.goto("https://www.example.com");
  });

  const people = ["Mike", "Judy", "Peter", "Elon", "Alice"];
  for (const person of people) {
    test(`Running test for ${person}`, async ({ page }) => {
      await page.goto("http://zero.webappsecurity.com/index.html");
      await page.fill("#searchTerm", person);
    });
  }

  test("Mouse movement simulation", async ({ page }) => {
    await page.goto("https://www.example.com");
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(0, 100);
    await page.mouse.up();
  });

  test("Multiple tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const pages: Page[] = [];

    for (const _ of Array(20).fill(1)) {
      pages.push(await context.newPage());
    }

    for (const page of pages) {
      await page.goto("http://zero.webappsecurity.com/index.html");
    }
    await pages[0].waitForTimeout(5000);
  });
});
